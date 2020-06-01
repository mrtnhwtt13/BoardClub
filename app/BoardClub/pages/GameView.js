import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BaseRouter } from '@react-navigation/native';
import GameDetail from '../Components/GameDetail'

const GameView = ({route, navigation}) => {
    console.log(route.params.gameId)
    return (
        <View style={styles.container}>
            < GameDetail
            gameId={route.params.gameId}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flex: 1,
        width: '100%'
    },
})

export default GameView