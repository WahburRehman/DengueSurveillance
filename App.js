/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

//Screens
import Login from './Screens/Login';

//Navigations
import StackNavigator from './Navigations/StackNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="auto" backgroundColor="#000000" />
      <SafeAreaView style={{ flex: 1 }}>
        <StackNavigator />
      </SafeAreaView>
    </>
  );
};

export default App;
