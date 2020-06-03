import * as React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const LoginForm = () => {
    const [login, onChangeLogin] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [error_mess, setErrorMessage] = React.useState('');
    const navigation = useNavigation();

    const handleSubimit = () => {
        // console.log(login)
        // console.log(password)
        let userData = {
            login: login,
            password: password
        }
        axios.post('http://10.0.2.2:5000/api/mobile/users/login', userData)
            .then(res => {
                currentUser = res.data.user
                // console.log(currentUser)
                setErrorMessage('')
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Homepage" }]
                });
            })
            .catch(err => {
                error = err.response.data
                // console.log(JSON.stringify(error))
                if (error.login) {
                    // console.log(error.login)
                    setErrorMessage(error.login)
                }
                else {
                    // console.log(error.password)
                    setErrorMessage(error.password)
                }
            })

    }

    return (
        <View style={{alignItems: 'center',}}>
            <View elevation={1} style={styles.container}>
                <Text style={styles.error}>{error_mess}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => onChangeLogin(text)}
                    value={login}
                    placeholder="Login"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => onChangePassword(text)}
                    secureTextEntry={true}
                    value={password}
                    placeholder="Password"
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
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // justifyContent: 'center',
        // borderWidth: 1,
        borderRadius: 8,
        // borderColor: '#595959',
        width: '90%',
        backgroundColor: 'white',
        paddingBottom: 20,
        paddingTop: 10
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        padding: 9,
        margin: 10,
        width: "70%"
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
    },
    error: {
        color: 'red',
        marginBottom: 5,
        marginTop: -5
    }
})

export default LoginForm