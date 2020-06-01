import * as React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList } from 'react-native'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const ListGame = () => {
    const [list, setList] = React.useState('');
    const navigation = useNavigation();
    const getGamesData = () => {
        axios.get('http://10.0.2.2:5000/api/mobile/game/upcoming')
        .then(res => {
            // console.log(res.data)
            setList(res.data)
        })
        .catch(err => {
            console.log(err.data)
        })
    };
    let Gamebloc = null;

    if (list === '') {
        getGamesData();
    };

    if (list !== '') {
        Gamebloc = (
            <FlatList
                data={list}
                renderItem={({ item }) => (
                    <TouchableHighlight style={styles.gameContainer} onPress={() => {
                        navigation.navigate('Game', {gameId: item._id});
                    }}>
                        <View>
                            <Text>{item.title}</Text>
                            <View style={styles.gameDetail}>
                                <View style={styles.BGNameContainer}>
                                    <Text>{item.boardGameName}</Text>
                                </View>
                                <View style={styles.playersContainer}>
                                    <Text style={{ textAlign: 'right' }}>{item.playersNumber}/{item.playersMax}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                )}
                keyExtractor={item => item._id}
            />
        )
    };

    return (
        <View style={styles.container}>
            <Text>
                Upcoming Games
            </Text>
            <View>
                {Gamebloc}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: "100%",


    },
    gameContainer: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#595959',
        marginTop: 20,
        width: 350,
        padding: 15,
    },
    gameDetail: {

        flexDirection: 'row',


    },
    playersContainer: {
        flex: 1,
        textAlign: 'right',
    },
    BGNameContainer: {
        flex: 3,
    }
})

export default ListGame