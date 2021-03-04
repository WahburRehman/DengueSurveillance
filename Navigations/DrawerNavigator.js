import React, { Component } from 'react';
import { View, Text } from 'react-native';

//Navigation
import { createDrawerNavigator } from '@react-navigation/drawer';

//Screens
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="home" component={Home} />
            <Drawer.Screen name="profile" component={Profile} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
