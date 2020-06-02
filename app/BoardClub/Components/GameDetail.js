import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList } from 'react-native'
import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

const GameDetail = ({ gameId }) => {
    const [game, setGame] = React.useState('');
    const [BGdetails, setBGDetails] = React.useState('');
    const [picture, setPicture] = React.useState('');
    var ImageBloc = null;

    const getGameData = (gameId) => {
        axios.get(`http://10.0.2.2:5000/api/mobile/game/find/` + gameId)
            .then(res => {
                setGame(res.data)
            })
            .catch(err => {
                console.log(err.data)
            })
    };

    const getBGGData = () => {
        axios.get(`https://boardgamegeek.com/xmlapi2/thing?id=` + game.boardGameId)
            .then(res => {
                setBGDetails(res)
            })
            .catch((err) => console.log(err))
    }

    const parseResponse = () => {
        var xml2js = require('react-native-xml2js');
        var parser = new xml2js.Parser();
        parser.parseString(BGdetails.data, function (err, result) {
            setPicture(result.items.item[0].image[0]);
        });
    }

    if (game === '') {
        getGameData(gameId)
    }

    if (BGdetails === '' && game.boardGameId) {
        // console.log(game.boardGameId);
        getBGGData();
        console.log(game)
    }

    if (BGdetails !== '' && picture === '') {
        // console.log(BGdetails)
        parseResponse()
    }

    if (picture !== '') {
        console.log(picture)
        ImageBloc = (
            <Image
                style={styles.image}
                source={{ uri: picture }}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {ImageBloc}
            </View>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {game.title}
                    </Text>
                </View>
                <View>
                    <Text style={{ textAlign: 'center' }}>
                        Playing : {game.boardGameName} {' '}
                        {game.playersNumber}/{game.playersMax}
                    </Text>
                </View>
                <View>
                    <Text>
                        Game level : {game.playersLevel}
                    </Text>
                </View>
                <View>
                    <Text>
                        Event on{' '}
                        {new Date(game.gameDate).toLocaleString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}{' '}
                    at {game.city}
                    </Text>
                </View>
                <View>
                    <Text style={styles.descriptionContainer}>
                        {game.description}
                    </Text>
                </View>
                <TouchableHighlight
                style={styles.button}
                underlayColor='#3f62aa'
                >
                    <Text style={styles.buttonText}>
                        Join
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = {
    image: {
        flex: 1,
        resizeMode: 'contain',
        borderRadius: 4,

    },
    imageContainer: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    container: {
        alignItems: 'center',
        width: "100%",
    },
    descriptionContainer: {
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10
    },
    title: {
        fontSize: 20,
    },
    titleContainer: {
        marginBottom: 10,
    },
    button: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#65A2FE",
        borderRadius: 4,
        width: '22%',
        marginTop: 20
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
}

export default GameDetail