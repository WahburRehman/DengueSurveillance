import React from 'react';
import { View, Text } from 'react-native';

//Navigations
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

//Screens
import Login from '../Screens/Login';
import ForgotPassword from '../Screens/ForgotPassword';
import AddPatient from '../Screens/AddPatient';

//Navigators
import BottomTabNavigator from '../Navigations/BottomTabNavigator';

enableScreens();

const Stack = createNativeStackNavigator();


const StackNavigator = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="login"
                    component={Login}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="home"
                    children={BottomTabNavigator}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="forgotPassword"
                    component={ForgotPassword}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="addPatient"
                    component={AddPatient}
                    options={{
                        headerShown: false
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;