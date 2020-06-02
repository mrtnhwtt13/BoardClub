import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'
import LoginForm from '../Components/LoginForm'

export default function Login() {
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Login to BoardClub</Text>
            <View style={styles.container}>
                <LoginForm />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root : {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#F5F9FC',
    },
    formContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    title: {
        textAlign: 'center',
        marginBottom: 50,
        color: "#595959",
        fontWeight: 'bold',
        fontSize: 20
    }
})