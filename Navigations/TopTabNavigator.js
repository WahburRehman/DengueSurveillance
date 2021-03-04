import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//Navigations
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//Screens
import Calls from '../Screens/Calls';
import Chats from '../Screens/Chats';

const TopTab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
    return (
        <TopTab.Navigator
            tabBarOptions={{
                activeTintColor: "#ffffff",
                inactiveTintColor: "#5a5a5a",
                style: { backgroundColor: '#00aaff' },
                labelStyle: {
                    fontSize: 16,
                    textTransform: 'uppercase',
                    fontWeight: "bold"
                }
            }}
        >
            <TopTab.Screen
                name="calls"
                component={Calls}
                options={{
                    tabBarLabel: "Calls",
                }}

            />
            <TopTab.Screen
                name="chats"
                component={Chats}
                options={{
                    tabBarLabel: "Chats",
                }}
            />
        </TopTab.Navigator>
    );
}

export default TopTabNavigator;