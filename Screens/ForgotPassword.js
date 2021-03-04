import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
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

    const [getUserName, setUserName] = useState('');
    const [errorMessageUserName, setErrorMessageUserName] = useState('');
    const [showErrorUserName, setShowErrorUsername] = useState(false);
    const [userNameTextInputMarginBottm, setUserNameTextInputMarginBottm] = useState(0.0001);

    const getInputTextUserName = (text) => {
        setUserName(text);
        setShowErrorUsername(false);
        console.log(text);
    }

    const handleOnFocusUserName = () => {
        setShowErrorUsername(false);
    }

    const handleResetPasswordButton = () => {
        if (getUserName === '') {
            setErrorMessageUserName('This Should Not Be Empty');
            setShowErrorUsername(true);
        }
        else {
            console.log('password sent')
        }
    }

    const handleBackTo = () => {
        console.log('back');
        navigation.navigate('login');
    }


    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }} >


            {/**************************************/}
            {/* HEADER VIEW */}
            {/**************************************/}


            <View style={{ width: screenWidth }}>
                <Header headerTitle="Forgot Password" showLeftIcon={true} backTo={handleBackTo} />
            </View>



            {/**************************************/}
            {/* CENTER VIEW */}
            {/**************************************/}



            <View style={{ width: screenWidth, alignItems: 'center' }}>
                <Title style={styles.titleStyling}>Enter Your Username To Get New Password</Title>



                {/**************************************/}
                {/* UserName Field */}
                {/**************************************/}


                <MyTextInput
                    textInputMode="outlined"
                    textInputLabel="USERNAME"
                    getText={getUserName}
                    textInputPlaceHolder="Enter Username"
                    setText={(text) => getInputTextUserName(text)}
                    textInputMarginBottom={userNameTextInputMarginBottm}
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
                    onPress={handleResetPasswordButton}
                />
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
    }
});
