import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions, Text } from 'react-native';
import { HelperText, Title } from 'react-native-paper';

//StyleSheet
import commonStyles from '../StyleSheets/StyleSheet';

//Compoonents
import Header from '../Components/Header';
import MyButton from '../Components/Button';
import MyTextInput from '../Components/TextInput';

//SCREEN WIDTH
const screenWidth = Dimensions.get('window').width;

const ForgotPassword = ({ navigation }) => {

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

    const handleBackTo = () => {
        console.log('back');
        navigation.navigate('login');
    }

    const handleFormSubmit = (e) => {
        alert(userName);
        e.preventDefault()

    }


    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }} >


            {/**************************************/}
            {/* HEADER VIEW */}
            {/**************************************/}


            <View style={{ width: screenWidth }}>
                <Header
                    headerTitle="Forgot Password"
                    showLeftIcon={true}
                    backTo={handleBackTo}
                />
            </View>



            {/**************************************/}
            {/* CENTER VIEW */}
            {/**************************************/}


            <View style={{ width: screenWidth, alignItems: 'center' }}>
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
                    textInputMode="outlined"
                    textInputLabel="USERNAME"
                    getText={userName}
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
                {/* RESET PASSWORD BUTTON */}
                {/**************************************/}

                <MyButton
                    buttonName="Reset Password"
                    buttonMode="contained"
                    buttonIcon="lock-reset"
                    buttonWidth={250}
                    buttonDisabled={message.disableButton}
                    onPress={handleResetPasswordButton}
                />
                {/* </Form> */}
            </View>


            {/**************************************/}
            {/* EMPTY VIEW */}
            {/**************************************/}

            <View></View>

        </SafeAreaView >
    );
}

export default ForgotPassword;

const styles = StyleSheet.create({
    titleStyling: {
        fontSize: 18,
        fontWeight: 'bold',
        color: commonStyles.primaryColor.backgroundColor,
        marginBottom: 20,
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
        marginBottom: 8
    },
    responseMessageStyling: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'sans-serif',
        fontWeight: 'bold'
    }
});
