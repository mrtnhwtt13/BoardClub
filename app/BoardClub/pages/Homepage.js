import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'

export default function Homepage() {
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Homepage</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    root : {
        flex: 1,
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        textAlign: 'center',
        marginBottom: 50,
        color: "#595959",
        fontWeight: 'bold',
        fontSize: 20
    }
})