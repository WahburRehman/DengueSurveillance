import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Title, Button, TextInput, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

//StyleSheet
import commonStyles from '../StyleSheets/StyleSheet';

//Components
import MyButton from '../Components/Button';
import MyTextInput from '../Components/TextInput';



const Login = ({ navigation }) => {

    const [getUserName, setUserName] = useState('');
    const [getPassword, setPassword] = useState('');

    const [errorMessageUserName, setErrorMessageUserName] = useState('');
    const [showErrorUserName, setShowErrorUsername] = useState(false);

    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [showErrorPassword, setShowErrorPassword] = useState(false);

    const handleLoginButton = () => {
        if (getUserName === '') {
            setErrorMessageUserName('This Should Not Be Empty');
            setShowErrorUsername(true);
        }
        if (getPassword === '') {
            setErrorMessagePassword('This Should Not Be Empty');
            setShowErrorPassword(true);
        }
        else {
            // navigation.navigate("home");
            fetch('http://10.0.2.2:3000/signIn', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'userName': getUserName,
                    'password': getPassword
                })
            })
                .then(res => res.json())
                .then(async (data) => {
                    if (data.token) {
                        try {
                            await AsyncStorage.setItem('userToken', data.token);
                            console.log('token saved!!', data.token);
                        } catch (error) {
                            console.log("token storing error: ", error);
                        }
                    }
                    else {
                        console.log("invalid user: ", data.error);
                    }
                })
        }

         

    }

    const getInputTextUserName = (text) => {
        setUserName(text);
        setShowErrorUsername(false);
        console.log(text);
    }

    const getInputTextPassword = (text) => {
        setPassword(text);
        setShowErrorPassword(false);
        console.log(text);
    }

    const handleOnFocusUserName = () => {
        setShowErrorUsername(false);
    }

    const handleOnFocusPassword = () => {
        setShowErrorPassword(false);
    }

    const handleForgotPassword = () => {
        console.log('forgot Password');
        navigation.navigate('forgotPassword');

    }
    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Title style={styles.titleStyling}>Dengue Surveillance</Title>


            {/**************************************/}
            {/* UserName Field */}
            {/**************************************/}


            <MyTextInput
                textInputMode="outlined"
                textInputLabel="USERNAME"
                getText={getUserName}
                textInputPlaceHolder="Enter Username"
                setText={(text) => getInputTextUserName(text)}
                textInputMarginBottom={0.1}
                isError={showErrorUserName}
                onFocus={handleOnFocusUserName}
                onBlur={handleOnFocusUserName}
            />


            {/**************************************/}
            {/* Helper Text For UserName Field */}
            {/**************************************/}


            <View style={{ width: 290 }}>
                <HelperText
                    type="error"
                    visible={showErrorUserName}
                    style={styles.helperTextStyling}
                >
                    {errorMessageUserName}
                </HelperText>
            </View>


            {/**************************************/}
            {/* Password Field */}
            {/**************************************/}


            <MyTextInput
                textInputMode="outlined"
                textInputLabel="password"
                getText={getPassword}
                textInputPlaceHolder="Enter Password"
                setText={(text) => getInputTextPassword(text)}
                isPasswordField={true}
                textInputMarginBottom={0.1}
                isError={showErrorPassword}
                onFocus={handleOnFocusPassword}
                onBlur={handleOnFocusPassword}
            />


            {/**************************************/}
            {/* Helper Text For Password Field */}
            {/**************************************/}


            <View style={{ width: 290 }}>
                <HelperText
                    type="error"
                    visible={showErrorPassword}
                    style={styles.helperTextStyling}
                >
                    {errorMessagePassword}
                </HelperText>
            </View>


            {/**************************************/}
            {/* Forgot Password Button */}
            {/**************************************/}


            <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleForgotPassword}
            >
                <Text
                    style={styles.forgotPasswordButton}
                >Forgot Password ?</Text>
            </TouchableOpacity>


            {/**************************************/}
            {/* Login Button */}
            {/**************************************/}


            <MyButton
                buttonName="Login"
                buttonMode="contained"
                buttonIcon="arrow-right"
                buttonWidth={250}
                onPress={handleLoginButton}
            />
        </SafeAreaView>
    );
}

export default Login;

const styles = StyleSheet.create({
    titleStyling: {
        fontSize: 30,
        fontWeight: 'bold',
        color: commonStyles.primaryColor.backgroundColor,
        marginBottom: 40,
        fontFamily: "Roboto",
    },
    forgotPasswordButton: {
        fontSize: 15,
        marginBottom: 11,
        fontWeight: 'bold',
        color: commonStyles.primaryColor.backgroundColor,
    },
    helperTextStyling: {
        fontSize: 11,
        color: "red",
        fontWeight: "bold",
    }
});
