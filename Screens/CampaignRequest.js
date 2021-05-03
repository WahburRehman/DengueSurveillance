import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Spinner from 'react-native-spinkit';
import { useSelector, useDispatch } from 'react-redux';

import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';

import {
    HelperText,
    TextInput,
    Snackbar,
} from 'react-native-paper';

//ACTIONS
import * as actions from '../Redux/Actions/actions';

//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//ICON
import Icon from 'react-native-vector-icons/Ionicons';

//COMPONENTS
import MyButton from '../Components/Button';
import MyTextInput from '../Components/TextInput';

//SCREEN WIDTH
const { width, height } = Dimensions.get('window');
const textInputWidth = width - 50;

const CampaignRequest = (props) => {

    let date = moment().format('DD-MM-YYYY');

    const [bgColor, setBgColor] = useState('transparent');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [serverResponse, setServerResponse] = useState('');

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);

    const [request, setRequest] = useState({
        subject: '',
        message: '',
        requesterName: userInfo.name,
        requesterID: userInfo._id,
        requestStatus: 'pending',
        date: date
    });

    const [errorMessage, setErrorMessage] = useState({
        subject: 'This Should Not Be Empty',
        message: 'This Should Not Be Empty',
    });

    const [showError, setShowError] = useState({
        subject: false,
        message: false,
    });

    const [button, setButton] = useState({
        label: 'request',
        icon: 'send',
        disable: false
    });

    const [loadingValues, setLoadingValues] = useState({
        isLoading: false,
        backgroundOpactiy: 1
    });

    // FUNCTION TO GET INPUT TEXT OF FIELD

    const getInputText = (text, field) => {
        switch (true) {
            case field === 'subject':
                setRequest((prevState) => { return { ...prevState, subject: text } });
                setShowError((prevState) => { return { ...prevState, subject: false } });
                break;
            case field === 'message':
                setRequest((prevState) => { return { ...prevState, message: text } });
                setShowError((prevState) => { return { ...prevState, message: false } });
                break;
        }
    }

    const onFocusSubject = () => {
        setShowError(prevState => { return { ...prevState, subject: false } });
        setButton(prevState => {
            return {
                label: 'Request',
                icon: 'send',
                disable: false
            }
        });
    }

    const handleRequestButton = async () => {
        console.log('data button')
        if (!request.subject) {
            setShowError(prevState => { return { ...prevState, subject: true } });
        }

        if (!request.message) {
            console.log('?')
            setShowError(prevState => { return { ...prevState, message: true } });
        }
        else {
            Keyboard.dismiss();
            setLoadingValues({ isLoading: true, backgroundOpactiy: 0.4 });
            await fetch(`http://10.0.2.2:3000/addRequest`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + userInfo.authToken
                },
                body: JSON.stringify({
                    'subject': request.subject,
                    'message': request.message,
                    'requesterName': request.requesterName,
                    'requesterID': request.requesterID,
                    'requestStatus': request.requestStatus,
                    'date': request.date,
                })
            })
                .then(res => res.json())
                .then((data) => {
                    if (data.error) {
                        console.log(data.error);
                        setServerResponse(data.error);
                    }
                    else if (data.message) {
                        console.log(data.message);
                        dispatch(actions.addNewRequest(request));
                        setServerResponse(data.message);

                        setButton({
                            label: 'Request Sent',
                            icon: 'check',
                            disable: true
                        });

                        setRequest({
                            ...request,
                            subject: '',
                            message: '',
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            setLoadingValues({ isLoading: false, backgroundOpactiy: 1 });
            setShowSnackbar(true);
        }
    }

    const handleMessageFocus = () => {
        setShowError({ ...showError, message: false, isFocused: false });
        setBgColor('#FFE7F5');
    }

    const handleMessageBlur = () => {
        setShowError({ ...showError, message: false, isFocused: false });
        setBgColor('#FFE7F5');
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#4169e1', padding: 5 }}>
                {loadingValues.isLoading && < Spinner style={{
                    position: 'absolute',
                    zIndex: 1,
                    left: '44%',
                    top: '50%'
                }} size={70} color="blue" type="Circle" />}
                <View style={styles.headerView}>
                    <TouchableOpacity
                        style={styles.iconView}
                        activeOpacity={0.5}
                        onLongPress={() => props.navigation.navigate('home')}
                        onPress={() => props.navigation.navigate('allRequests')}
                    >
                        <Icon name="arrow-back" size={30} color="#ffffff" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Campaign</Text>

                    <View style={styles.iconView}>
                    </View>
                </View>

                <View style={styles.contentView} >
                    <View style={{ ...StyleSheet.absoluteFill }} >
                        <ImageBackground
                            source={require('../Images/bg0.jpg')}
                            style={{
                                ...styles.imageBackground,
                                opacity: loadingValues.backgroundOpactiy
                            }}
                        >
                            <KeyboardAvoidingView>


                                {/**************************************/}
                                {/* REQUEST SUBJECT FIELD */}
                                {/**************************************/}


                                <MyTextInput
                                    textInputMode="contained"
                                    textInputLabel="Subject*"
                                    textInputWidth={textInputWidth}
                                    getText={request.subject}
                                    backgroundColor="transparent"
                                    autoFocus={true}
                                    textInputPlaceHolder="Enter Subject"
                                    setText={(text) => getInputText(text, 'subject')}
                                    textInputMarginBottom={0.1}
                                    isError={showError.subject}
                                    onFocus={onFocusSubject}
                                />


                                {/**************************************/}
                                {/* HELPER TEXT FOR REQUEST SUBJECT FIELD */}
                                {/**************************************/}


                                <View style={{ width: textInputWidth }}>
                                    <HelperText
                                        type="error"
                                        visible={showError.subject}
                                        style={styles.helperTextStyling}
                                    >
                                        {errorMessage.subject}
                                    </HelperText>
                                </View>


                                {/**************************************/}
                                {/* REQUEST MESSAGE TEXT INPUT */}
                                {/**************************************/}

                                <TextInput
                                    mode="outlined"
                                    label="Request Message*"
                                    multiline
                                    maxLength={250}
                                    numberOfLines={8}
                                    value={request.message}
                                    style={{
                                        width: textInputWidth,
                                        fontSize: 18,
                                        backgroundColor: bgColor,
                                        paddingHorizontal: 0
                                    }}

                                    theme={{ colors: { primary: commonStyles.primaryColor.backgroundColor, underlineColor: 'transparent', } }}
                                    onFocus={handleMessageFocus}
                                    placeholder="Enter Your Message Here...."
                                    placeholderTextColor={commonStyles.placeHolderColor.color}
                                    onChangeText={(text) => getInputText(text, 'message')}
                                    error={showError.message ? true : false}
                                    onBlur={handleMessageBlur}
                                />


                                {/*******************************************/}
                                {/* HELPER TEXT FOR REQUEST MESSAGE */}
                                {/*******************************************/}


                                <View style={styles.helperTextViewStyling}>
                                    <HelperText
                                        type="error"
                                        visible={showError.message}
                                        style={styles.helperTextStyling}
                                    >
                                        {errorMessage.message}
                                    </HelperText>

                                    <HelperText
                                        type="error"
                                        visible
                                        style={{ fontSize: 14, color: '#000000' }}
                                    >
                                        {request.message.length}/250
                                    </HelperText>
                                </View>

                            </KeyboardAvoidingView>

                            <View style={{ zIndex: 1 }}>
                                <MyButton
                                    buttonName={button.label}
                                    buttonMode="contained"
                                    buttonIcon={button.icon}
                                    buttonColor={commonStyles.primaryColor.backgroundColor}
                                    buttonWidth='100%'
                                    buttonDisabled={button.disable}
                                    onPress={handleRequestButton}
                                />
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </View >

            <Snackbar
                visible={showSnackbar}
                onDismiss={() => setShowSnackbar(false)}
                // action={{
                //     label: 'Undo',
                //     onPress: () => {
                //         // Do something
                //     },
                // }}
                duration={2000}

                style={{
                    backgroundColor: commonStyles.primaryColor.backgroundColor,
                    borderRadius: 10,
                    alignSelf: 'center',
                    marginBottom: 30,
                    fontSize: '10%',

                }}
            >
                {serverResponse}
            </Snackbar>
        </>
    );
}

export default CampaignRequest;

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
        paddingHorizontal: '7%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    helperTextViewStyling: {
        width: textInputWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    helperTextStyling: {
        fontSize: 11,
        color: "red",
        fontWeight: "bold",
        paddingHorizontal: 0,
    },
});