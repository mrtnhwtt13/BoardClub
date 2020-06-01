import * as React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList } from 'react-native'
import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

const GameDetail = ({gameId}) => {
    const [game, setGame] = React.useState('');
    const [BGdetails, setBGDetails] = React.useState('');
    const [picture, setPicture] = React.useState('');
    var requesting = false
    const getGameData = (gameId) => {
        axios.get(`http://10.0.2.2:5000/api/mobile/game/find/`+gameId)
        .then(res => {
            setGame(res.data)
        })
        .catch(err => {
            console.log(err.data)
        })
    };

    if (game === ''){
        getGameData(gameId)
    }

    if (game !== '' && requesting === false){
        requesting = true
        console.log(game.boardGameId)
        axios.get(`https://boardgamegeek.com/xmlapi2/thing?id=9220`)
            .then(res => {
                setBGDetails(res)
                console.log(BGdetails)
            })
            .catch((err) => console.log(err))
    }

    return (
        <View>
            <Text>
                hej hej
            </Text>
        </View>
    )
}

export default GameDetail