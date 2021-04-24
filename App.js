import 'react-native-gesture-handler';
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

//Navigations
import StackNavigator from './Navigations/StackNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="auto" backgroundColor='#4169e1' />
      <SafeAreaView style={{ flex: 1 }}>
        <StackNavigator />
      </SafeAreaView>
    </>
  );
};

export default App;
