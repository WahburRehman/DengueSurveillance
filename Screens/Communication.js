import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Title, Button, TextInput } from 'react-native-paper';


import TopTabNavigator from '../Navigations/TopTabNavigator';

//Components
import Header from '../Components/Header';



const Communication = ({ navigation }) => {

    const handleLoginButton = () => {
        navigation.navigate("home");
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <Header headerTitle="Communication" /> */}
            <TopTabNavigator />
        </SafeAreaView>
    );
}

export default Communication;
