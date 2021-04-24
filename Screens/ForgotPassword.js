import React, { useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Dimensions
} from 'react-native';

import { HelperText, Title } from 'react-native-paper';

//StyleSheet
import commonStyles from '../StyleSheets/StyleSheet';

//ICON
import Icon from 'react-native-vector-icons/Ionicons';

//Compoonents
import MyButton from '../Components/Button';
import MyTextInput from '../Components/TextInput';

//SCREEN WIDTH
const screenWidth = Dimensions.get('window').width;

const ForgotPassword = (props) => {

    const [userName, setUserName] = useState('');
    const [showErrorUserName, setShowErrorUsername] = useState(false);
    const [errorMessageUserName, setErrorMessageUserName] = useState('');
    const [userNameTextInputMarginBottm, setUserNameTextInputMarginBottm] = useState(0.0001);

    const [message, setMessage] = useState({
        message: 'adasdadsa',
        showMessage: false,
        isError: false,
        disableButton: false,
    });

    const getInputTextUserName = (text) => {
        setUserName(text);
        setShowErrorUsername(false);
        console.log(text);
    }

    const handleOnFocusUserName = () => {
        setShowErrorUsername(false);
    }

    const handleResetPasswordButton = () => {
        Keyboard.dismiss();
        if (!userName) {
            setErrorMessageUserName('This Should Not Be Empty');
            setShowErrorUsername(true);
        }
        else {
            fetch('http://10.0.2.2:3000/resetPassword', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    actor: 'healthWorker',
                    userName: userName
                })
            })
                .then(result => result.json())
                .then(res => {
                    if (res.message) {
                        setMessage((prevState) => {
                            return {
                                message: res.message,
                                showMessage: true,
                                isError: false,
                                disableButton: true
                            }
                        });
                        console.log(res.message);
                    } else if (res.error) {
                        setMessage((prevState) => {
                            return {
                                message: res.error,
                                showMessage: true,
                                isError: true,
                                disableButton: false
                            }
                        });
                        console.log(res.error);
                    }
                })
        }
    }

    return (
        <>
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#4169e1', padding: 5 }}>
                <View style={styles.headerView}>
                    <TouchableOpacity
                        style={styles.iconView}
                        activeOpacity={0.5}
                        onPress={() => props.navigation.navigate('login')}
                    >
                        <Icon name="arrow-back" size={30} color="#ffffff" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Forgot Password</Text>

                    <View style={styles.iconView}>
                    </View>
                </View>

                <View
                    style={styles.contentView}>
                    <View style={{ ...StyleSheet.absoluteFill }} >
                        <ImageBackground source={require('../Images/bg0.jpg')}
                            style={styles.imageBackground}

                        >
                            {message.showMessage ?
                                <Text style={[
                                    styles.responseMessageStyling,
                                    { color: message.isError ? '#681c1c' : '#4BB543' }
                                ]}
                                >
                                    {message.message}
                                </Text>
                                :
                                null
                            }

                            <Title style={styles.titleStyling}>Enter Your Username To Get New Password</Title>



                            {/* <Form method="POST" onSubmit={handleFormSubmit}> */}
                            {/**************************************/}
                            {/* UserName Field */}
                            {/**************************************/}

                            <MyTextInput
                                textInputMode="contained"
                                textInputLabel="USERNAME"
                                getText={userName}
                                autoFocus={true}
                                backgroundColor="transparent"
                                textInputWidth='90%'
                                textInputPlaceHolder="Enter Username"
                                setText={(text) => getInputTextUserName(text)}
                                textInputMarginBottom={0.1}
                                isError={showErrorUserName}
                                onFocus={handleOnFocusUserName}
                                onBlur={handleOnFocusUserName}
                            />



                            {/**************************************/}
                            {/* HELPER TEXT FOR USERNAME FIELD */}
                            {/**************************************/}



                            <View style={{ width: '90%' }}>
                                <HelperText
                                    type="error"
                                    visible={showErrorUserName}
                                    style={styles.helperTextStyling}
                                >
                                    {errorMessageUserName}
                                </HelperText>
                            </View>



                            {/**************************************/}
                            {/* RESET PASSWORD BUTTON */}
                            {/**************************************/}
                            <View style={{zIndex: 1, width: '90%', borderColor: 'blue', borderWidth: 1}}>
                                <MyButton
                                    buttonName="Reset Password"
                                    buttonMode="contained"
                                    buttonIcon="lock-reset"
                                    buttonWidth='100%'
                                    buttonDisabled={message.disableButton}
                                    onPress={handleResetPasswordButton}
                                />
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </KeyboardAvoidingView >
        </>
    );
}

export default ForgotPassword;

const styles = StyleSheet.create({
    headerView: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#ffffff'
    },
    contentView: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 80,
        borderRadius: 20
    },
    imageBackground: {
        flex: 1,
        height: null,
        width: null,
        paddingVertical: '4%',
        paddingHorizontal: '6%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleStyling: {
        fontSize: 20,
        fontWeight: 'bold',
        color: commonStyles.primaryColor.backgroundColor,
        marginBottom: 10,
        fontFamily: "Roboto",
        textAlign: 'center'
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
        marginBottom: 8,
        paddingHorizontal: 0,
    },
    responseMessageStyling: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
    }
});
