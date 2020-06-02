import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import Homepage from './pages/Homepage'
import GameView from './pages/GameView'

import './global/storeUser'


const Stack = createStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{

                    headerStyle: {
                        backgroundColor: 'white',
                        elevation: 0,
                    },
                    headerTintColor: '#595959',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                }}
            >
                <Stack.Screen
                    name="Login"
                    options={{headerShown: false}}
                    component={Login}
                />
                <Stack.Screen
                    name="Homepage"
                    options={{headerShown: false}}
                    component={Homepage}
                />
                <Stack.Screen
                    name="Game"
                    options={{headerShown: true}}
                    component={GameView}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
} 


//console.disableYellowBox = true;
