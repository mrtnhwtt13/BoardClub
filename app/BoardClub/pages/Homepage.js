import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'
import ListGame from '../Components/ListGame'

export default function Homepage() {
    return (
        <View style={styles.root}>
            <View>
                <Text style={styles.title}>Homepage</Text>
            </View>
            <View>
                < ListGame />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root : {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',

    },
    title: {
        marginTop: 30,
        textAlign: 'center',
        marginBottom: 50,
        color: "#595959",
        fontWeight: 'bold',
        fontSize: 20
    }
})