import * as React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList } from 'react-native'
import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

const GameDetail = ({ gameId }) => {
    const [game, setGame] = React.useState('');
    const [BGdetails, setBGDetails] = React.useState('');
    const [picture, setPicture] = React.useState('');
    var ImageBloc = null;
    var ButtonBloc = null;
    var DescBloc = null;
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

    const leaveGame = () => {
        let data = {
            gameId: game._id,
            userId: currentUser._id
        }
        // console.log(data)
        axios.post('http://10.0.2.2:5000/api/mobile/game/leave/', data)
            .then(res => {
                console.log(res)
                setGame('')
            })
            .catch(err => {
                console.log(err)
            })
    }

    const joinGame = () => {
        let data = {
            gameId: game._id,
            userId: currentUser._id
        }
        // console.log(data)
        axios.post('http://10.0.2.2:5000/api/mobile/game/join/', data)
            .then(res => {
                console.log(res)
                setGame('')
            })
            .catch(err => {
                console.log(err)
            })

    }

    if (game === '') {
        getGameData(gameId)
    }

    if (BGdetails === '' && game.boardGameId) {
        // console.log(game.boardGameId);
        getBGGData();
        // console.log(game)
    }

    if (BGdetails !== '' && picture === '') {
        // console.log(BGdetails)
        parseResponse()
    }

    if (picture !== '') {
        ImageBloc = (
            <Image
                style={styles.image}
                source={{ uri: picture }}
            />
        )
        DescBloc = (
            <View>
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
                    <Text style={{textAlign: 'center'}}>
                        Game level : {game.playersLevel}
                    </Text>
                </View>
                <View>
                    <Text style={{textAlign: 'center'}}>
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
            </View>
        )
        if (currentUser && game !== '') {
            console.log(currentUser)
            console.log(game)
            if (currentUser._id === game.userId || game.playersNumber === game.playersMax && game.players.indexOf(currentUser._id) === -1) {
                console.log('creator')
                ButtonBloc = null;
            } else {
    
                if (game.players.indexOf(currentUser._id) === -1) {
                    console.log('Not member')
                    ButtonBloc = (
                        <TouchableHighlight
                            style={styles.button}
                            underlayColor='#3f62aa'
                            onPress={() => joinGame()}
                        >
                            <Text style={styles.buttonText}>
                                Join
                        </Text>
                        </TouchableHighlight>
                    )
                } else {
                    console.log('Member')
                    ButtonBloc = (
                        <TouchableHighlight
                            style={styles.button}
                            underlayColor='#3f62aa'
                            onPress={() => leaveGame()}
                        >
                            <Text style={styles.buttonText}>
                                Leave
                        </Text>
                        </TouchableHighlight>
                    )
                }
            }
        }
    }

    

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {ImageBloc}
            </View>
            <View elevation={1} style={styles.GameInfoContainer}>
                {DescBloc}
                {ButtonBloc}
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
        marginTop: 20,
        
    },
    GameInfoContainer: {
        alignItems: 'center',
        width: "90%",
        marginTop: 20,
        // borderColor: 'black',
        // borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10
        
    },
    descriptionContainer: {
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        
    },
    title: {
        fontSize: 20,
        textAlign: 'center'
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
        fontSize: 15,
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
}

export default GameDetail