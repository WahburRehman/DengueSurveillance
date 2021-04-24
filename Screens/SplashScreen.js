import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { color } from 'react-native-reanimated';

const SplashScreen = () => {
    return (
        <ActivityIndicator style={styles.splashScreenView} size={80} color="#4169e1" />
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    splashScreenView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
