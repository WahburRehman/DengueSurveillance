import 'react-native-gesture-handler';
/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './Redux/Store/store'

const ReduxApp = () =>
    <Provider store={store}>
        <App />
    </Provider>


AppRegistry.registerComponent(appName, () => ReduxApp);
