import * as React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native'



const LoginForm = () => {
    const [login, onChangeLogin] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const handleSubimit = () => {
        console.log(login)
        console.log(password)
        console.log(user)
        let userData = {
            login: login,
            password: password
        }
        fetch('http://localhost:5000/api/mobile/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => onChangeLogin(text)}
                value={login} />
            <TextInput
                style={styles.input}
                onChangeText={text => onChangePassword(text)}
                secureTextEntry={true}
                value={password}
            />
            <TouchableHighlight
                style={styles.button}
                underlayColor='#3f62aa'
                onPress={() => handleSubimit()}
            >
                <Text style={styles.loginText}>
                    Login
                </Text>
            </TouchableHighlight>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        padding: 9,
        margin: 10,
        width: "80%"
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
    loginText: {
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
})

export default LoginForm