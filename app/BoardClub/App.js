import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';


const Stack = createStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#1e3f83',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center'
                }}
            >
                <Stack.Screen
                    name="Login"
                    options={{headerShown: false}}
                    component={Login}
                />
                                    
            </Stack.Navigator>
        </NavigationContainer>
    );
} 


//console.disableYellowBox = true;
