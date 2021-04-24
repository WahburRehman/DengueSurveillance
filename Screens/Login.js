import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Title, Button, TextInput, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../Redux/Actions/actions';
import Spinner from 'react-native-spinkit';

//StyleSheet
import commonStyles from '../StyleSheets/StyleSheet';

//ICON 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


//Components
import MyButton from '../Components/Button';
import MyTextInput from '../Components/TextInput';


const Login = (props) => {

    const dispatch = useDispatch();
    const [values, setValaues] = useState({
        opacity: 1,
        isLoading: false,
        buttonDisabled: false
    })


    const [getUserName, setUserName] = useState('');
    const [getPassword, setPassword] = useState('');
    const [loginErrorTextOpacity, setLoginErrorTextOpacity] = useState(0)

    const [errorMessageUserName, setErrorMessageUserName] = useState('');
    const [showErrorUserName, setShowErrorUsername] = useState(false);

    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [showErrorPassword, setShowErrorPassword] = useState(false);

    const handleLoginButton = () => {
        console.log('?');
        setLoginErrorTextOpacity(0);
        if (getUserName === '') {
            setErrorMessageUserName('This Should Not Be Empty');
            setShowErrorUsername(true);
        }
        if (getPassword === '') {
            setErrorMessagePassword('This Should Not Be Empty');
            setShowErrorPassword(true);
        }
        else {
            setValaues({ opacity: 0.4, buttonDisabled: true, isLoading: true });
            fetch('http://10.0.2.2:3000/signIn', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'userName': getUserName,
                    'password': getPassword,
                    'actor': 'healthWorker'
                })
            })
                .then(res => res.json())
                .then(async (data) => {
                    if (data.error) {
                        console.log(data.error);
                        setLoginErrorTextOpacity(1);
                        setValaues({ opacity: 1, buttonDisabled: false, isLoading: false });
                    }
                    else {
                        try {
                            data.data.authToken = await data.token
                            await AsyncStorage.setItem('userInfoLocal', JSON.stringify(data.data));
                            console.log('token saved!!', data.token);
                            dispatch(actions.storeUserInfo(data.data));
                            dispatch(actions.changeLoginStatus(true));
                        } catch (error) {
                            console.log("token storing error: ", error);
                        }
                    }
                });
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
        props.navigation.navigate('forgotPassword');

    }
    return (
        <SafeAreaView style={{ ...styles.container }, StyleSheet.absoluteFill}>
            {values.isLoading && < Spinner style={{
                position: 'absolute',
                zIndex: 1,
                left: '42%',
                top: '50%'
            }} size={70} color="blue" type="Wave" />}
            <ImageBackground
                source={require('../Images/bg0.jpg')}
                style={{ ...styles.imageBackground, opacity: values.opacity }}
            >
                <View
                    style={{
                        flex: 0.53,
                        backgroundColor: '#4169e1',
                        borderTopStartRadius: 80,
                        borderBottomEndRadius: 100,
                        borderTopEndRadius: 20,
                        borderBottomStartRadius: 25,
                        marginTop: 5,
                        marginHorizontal: 5,
                        alignItems: 'center',
                        paddingVertical: '3%',
                    }}
                >
                    <View>
                        <FontAwesome5 name="hospital" size={66} color="#FAF0EF" />
                    </View>

                    <View style={{ marginTop: 16 }}>
                        <Text style={styles.titleStyling}>A System</Text>
                        <Text style={{ ...styles.titleStyling, fontSize: 22 }}>for</Text>
                        <Text style={styles.titleStyling}>Dengue Surveillance</Text>
                        <Text style={{ ...styles.titleStyling, fontSize: 22 }}>And</Text>
                        <Text style={styles.titleStyling}>Data collection</Text>
                        <Text style={{ ...styles.titleStyling, fontSize: 22 }}>in</Text>
                        <Text style={styles.titleStyling}>Pakistan</Text>
                    </View>

                    <View
                        style={{
                            backgroundColor: '#4169e1',
                            position: 'absolute',
                            bottom: '-8%',
                            borderRadius: 100,
                            padding: 0,
                        }}
                    >
                        <FontAwesome5 name="user-circle" size={70} color="#FAF0EF" />
                    </View>

                </View>

                <View
                    style={{
                        flex: 0.42,
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingHorizontal: 20
                    }}>


                    {/**************************************/}
                    {/* UserName Field */}
                    {/**************************************/}

                    <Text
                        style={{
                            ...styles.helperTextStyling,
                            fontSize: 15,
                            opacity: loginErrorTextOpacity
                        }}
                    >
                        Enter Valid User Name or Password!!
                    </Text>

                    <MyTextInput
                        textInputMode="flat"
                        textInputLabel="USERNAME"
                        getText={getUserName}
                        textInputWidth='100%'
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


                    <View style={{ width: '100%' }}>
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
                        textInputMode="flat"
                        textInputLabel="PASSWORD"
                        getText={getPassword}
                        textInputPlaceHolder="Enter Password"
                        textInputWidth='100%'
                        backgroundColor="transparent"
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


                    <View style={{ width: '100%' }}>
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
                        >
                            Forgot Password ?</Text>
                    </TouchableOpacity>


                    {/**************************************/}
                    {/* Login Button */}
                    {/**************************************/}

                    <View style={{ zIndex: 1, width: '100%' }}>
                        <MyButton
                            buttonName="Login"
                            buttonMode="contained"
                            buttonIcon="login"
                            buttonWidth='100%'
                            buttonDisabled={values.buttonDisabled}
                            onPress={handleLoginButton}
                        />
                    </View>
                </View>

            </ImageBackground>
        </SafeAreaView>

    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    imageBackground: {
        flex: 1,
        height: null,
        width: null,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    titleStyling: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#FAF0E6',
        textTransform: 'capitalize',
        marginVertical: 0,
        textAlign: 'center'
    },
    forgotPasswordButton: {
        fontSize: 15,
        marginBottom: 18,
        fontWeight: 'bold',
        color: commonStyles.primaryColor.backgroundColor,
    },
    helperTextStyling: {
        fontSize: 11,
        color: "red",
        fontWeight: "bold",
        paddingHorizontal: 0
    }
});
