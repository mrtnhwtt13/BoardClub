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

    const getBGGData = () => {
        axios.get(`https://boardgamegeek.com/xmlapi2/thing?id=`+game.boardGameId)
            .then(res => {
                setBGDetails(res)
            })
            .catch((err) => console.log(err))
    }

    if (game === ''){
        getGameData(gameId)
    }

    if (BGdetails === '' && game.boardGameId){
        console.log(game.boardGameId);
        getBGGData();
    }

    if (BGdetails !== ''){
        console.log(BGdetails)
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