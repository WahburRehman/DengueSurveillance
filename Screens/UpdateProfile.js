import React, { useState, useEffect } from 'react';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Image,
    KeyboardAvoidingView
} from 'react-native';

import {
    HelperText,
    TextInput,
    Snackbar
} from 'react-native-paper';


//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//ICON
import Icon from 'react-native-vector-icons/Ionicons';

//COMPONENTS
import MyButton from '../Components/Button';

const UpdateProfile = (props) => {

    const { userID, email, contactNo, dp } = props.route.params;

    const bs = React.createRef();
    const fall = new Animated.Value(1);

    // const passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$");
    const contactNoRegex = new RegExp("^0[0-9]{2}[0-9]{7}$|^03[0-9]{2}[0-9]{7}$");
    const emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&' * +/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [serverResponse, setServerResponse] = useState('');

    const [data, setData] = useState({
        dp: '',
        email: null,
        contactNo: null,
        password: null,
        confirmPassword: null,
    });

    const [errorMessage, setErrorMessage] = useState({
        email: 'Required',
        contactNo: 'Required',
        password: 'Required',
        confirmPassword: 'Required'
    });

    const [showError, setShowError] = useState({
        email: false,
        contactNo: false,
        password: false,
        confirmPassword: false
    });

    const [button, setButton] = useState({
        label: 'Save Changes',
        icon: 'content-save',
        disable: false
    })

    const getInputText = (text, field) => {
        switch (true) {
            case field === 'email':
                setData((prevState) => { return { ...prevState, email: text } });
                setShowError((prevState) => { return { ...prevState, email: false } });
                break;
            case field === 'contactNo':
                setData((prevState) => { return { ...prevState, contactNo: text } });
                setShowError((prevState) => { return { ...prevState, contactNo: false } });
                break;
            case field === 'password':
                setData((prevState) => { return { ...prevState, password: text } });
                setShowError((prevState) => { return { ...prevState, password: false } });
                break;
            case field === 'confirmPassword':
                setData((prevState) => { return { ...prevState, confirmPassword: text } });
                setShowError((prevState) => { return { ...prevState, confirmPassword: false } });
                break;
        }
    }

    const handleUpdateButton = () => {
        if (data.email && !emailRegex.test(data.email)) {
            setErrorMessage(prevState => { return { ...prevState, email: 'invalid Format' } })
            setShowError(prevState => { return { ...prevState, email: true } })
        }
        if (data.contactNo && !contactNoRegex.test(data.contactNo)) {
            setErrorMessage(prevState => { return { ...prevState, contactNo: 'invalid Format' } })
            setShowError(prevState => { return { ...prevState, contactNo: true } })
        }
        if (data.password && !data.password.length < 8) {
            setErrorMessage(prevState => { return { ...prevState, password: 'minimum 8 characters required' } })
            setShowError(prevState => { return { ...prevState, password: true } });
            if (data.confirmPassword !== data.password || data.confirmPassword.length < 8) {
                setErrorMessage(prevState => { return { ...prevState, confirmPassword: 'Should be same as above Field' } })
                setShowError(prevState => { return { ...prevState, confirmPassword: true } })
            }
        }
        else {
            if (data.password !== data.confirmPassword) {
                setErrorMessage(prevState => {
                    return {
                        ...prevState,
                        password: 'Both Passwords should be same',
                        confirmPassword: 'Both Passwords should be same',
                    }
                })
                setShowError(prevState => {
                    return {
                        ...prevState,
                        password: true,
                        confirmPassword: true,
                    }
                })
            }
            else {
                if (data.email === email) {
                    setErrorMessage(prevState => { return { ...prevState, email: 'Same As current email' } })
                    setShowError(prevState => { return { ...prevState, email: true } })
                }
                if (data.contactNo === contactNo) {
                    setErrorMessage(prevState => { return { ...prevState, contactNo: 'Same As current Number' } })
                    setShowError(prevState => { return { ...prevState, contactNo: true } })
                }
                else {
                    if (data.dp) {
                        console.log('data.dp is true');
                        const formData = new FormData();
                        formData.append("id", userID);
                        data.email ? formData.append("email", data.email) : null;
                        data.contactNo ? formData.append("contactNo", data.contactNo) : null;
                        data.password ? formData.append("password", data.password) : null;
                        formData.append("dp", {
                            uri: data.dp.path,
                            name: 'image.jpg',
                            type: 'image/jpeg',
                        });
                        fetch('http://10.0.2.2:3000/updateHealthWorkerProfile', {
                            method: 'PUT',
                            body: formData
                        }).then(result => result.json())
                            .then(data => {
                                if (data.error) {
                                    console.log('data error: ', data.error)
                                    setServerResponse(data.error);
                                    setShowSnackbar(true);
                                } else {
                                    console.log('data message: ', data.message)
                                    setServerResponse(data.message);
                                    setShowSnackbar(true);
                                    resetStates();
                                }
                            }).catch(error => {
                                console.log('catch error: ', error)
                            });
                    }
                    else {
                        fetch('http://10.0.2.2:3000/updateHealthWorkerProfile', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id: userID,
                                email: data.email ? data.email : null,
                                contactNo: data.contactNo !== '' ? data.contactNo : null,
                                password: data.password !== '' ? data.password : null,
                            })
                        }).then(result => result.json())
                            .then(data => {
                                if (data.error) {
                                    console.log(data.error);
                                    setServerResponse(data.error);
                                    setShowSnackbar(true);
                                } else {
                                    console.log(data.message);
                                    setServerResponse(data.message);
                                    setShowSnackbar(true);
                                    resetStates();
                                }
                            }).catch(error => {
                                console.log('catch error: ', error);
                            });
                    }
                }
            }
        }
    }

    const renderBottomSheetHeader = () => (
        <View style={styles.bottomSheetHeader}>
            <View style={styles.bottomSheetPanelHeader}>
                <View style={styles.bottomSheetPanelHandle}>
                </View>
            </View>
        </View>
    );

    const renderBottomSheetContent = () => (
        <View style={styles.bottomSheetView}>
            <View style={styles.bottomSheetTextView}>
                <Text style={styles.bottomSheetText}>Upload Photo</Text>
                <Text style={{ ...styles.bottomSheetText, fontSize: 18 }}>Choose Your Profile Picture</Text>
            </View>
            <View style={styles.bottomSheetButtonView}>
                <MyButton
                    buttonName="Take Photo"
                    buttonMode="contained"
                    buttonIcon="camera"
                    buttonColor={commonStyles.primaryColor.backgroundColor}
                    buttonWidth='100%'
                    buttonDisabled={false}
                    onPress={handleCameraPhoto}
                />
            </View>
            <View style={styles.bottomSheetButtonView}>
                <MyButton
                    buttonName="Choose from Gallery"
                    buttonMode="contained"
                    buttonIcon="file-image"
                    buttonColor={commonStyles.primaryColor.backgroundColor}
                    buttonWidth='100%'
                    buttonDisabled={false}
                    onPress={handleGalleryPhoto}
                />
            </View>
            <View style={styles.bottomSheetButtonView}>
                <MyButton
                    buttonName="Cancel"
                    buttonMode="contained"
                    buttonIcon="cancel"
                    buttonColor={commonStyles.primaryColor.backgroundColor}
                    buttonWidth='100%'
                    buttonDisabled={false}
                    onPress={() => bs.current.snapTo(1)}
                />
            </View>
        </View>
    );

    const handleCameraPhoto = () => {
        console.log('camera');
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            bs.current.snapTo(1);
            setData(prevState => {
                return {
                    ...prevState,
                    dp: image
                }
            });
        }).catch(error => {
            console.log(error);
        })
    }

    const handleGalleryPhoto = () => {
        console.log('gallery');
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            console.log(image);
            bs.current.snapTo(1);
            setData(prevState => {
                return {
                    ...prevState,
                    dp: image
                }
            });
        }).catch(error => {
            console.log(error);
        })
    }

    const resetStates = () => {
        setData(prevState => {
            return {
                ...prevState,
                email: null,
                contactNo: null,
                password: null,
                confirmPassword: null,
            }
        });

        setErrorMessage(prevState => {
            return {
                ...prevState,
                email: 'Required',
                contactNo: 'Required',
                password: 'Required',
                confirmPassword: 'Required'
            }
        });

        setShowError(prevState => {
            return {
                ...prevState,
                email: false,
                contactNo: false,
                password: false,
                confirmPassword: false
            }
        });
    }

    return (
        <>
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#4169e1', padding: 5 }}>
                <View style={styles.headerView}>
                    <TouchableOpacity
                        style={styles.iconView}
                        activeOpacity={0.5}
                        onPress={() => props.navigation.navigate('home')}
                    >
                        <Icon name="arrow-back" size={30} color="#ffffff" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Update profile</Text>

                    <View style={styles.iconView}>
                    </View>
                </View>

                <Animated.View
                    style={{
                        ...styles.contentView,
                        opacity: Animated.add(0.4, Animated.multiply(fall, 1.0))
                    }}
                >
                    <View style={{ ...StyleSheet.absoluteFill }} >
                        <ImageBackground source={require('../Images/bg0.jpg')}
                            style={styles.imageBackground}

                        >
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => bs.current.snapTo(0)}
                                        >

                                            <Image source={{ uri: data.dp.path }} style={styles.profile} />
                                        </TouchableOpacity>
                                    </View>

                                    <TextInput
                                        mode='contained'
                                        label="EMAIL"
                                        value={data.email}
                                        placeholder="abc@gmail.com"
                                        onChangeText={(text) => getInputText(text, 'email')}
                                        error={showError.email}
                                        style={styles.textInput}
                                        theme={{
                                            colors: {
                                                primary: commonStyles.primaryColor.backgroundColor
                                            }
                                        }}
                                    />


                                    <HelperText
                                        type="error"
                                        visible={showError.email}
                                        style={styles.helperTextStyling}
                                    >
                                        {errorMessage.email}
                                    </HelperText>

                                    <TextInput
                                        mode='contained'
                                        label="CONTACT NO"
                                        value={data.contactNo}
                                        placeholder="061-1234567 OR 0300-1234567"
                                        onChangeText={(text) => getInputText(text, 'contactNo')}
                                        error={showError.email}
                                        style={styles.textInput}
                                        theme={{
                                            colors: {
                                                primary: commonStyles.primaryColor.backgroundColor
                                            }
                                        }}
                                    />


                                    <HelperText
                                        type="error"
                                        visible={showError.contactNo}
                                        style={styles.helperTextStyling}
                                    >
                                        {errorMessage.contactNo}
                                    </HelperText>

                                    <TextInput
                                        mode='contained'
                                        label="PASSWORD"
                                        value={data.password}
                                        secureTextEntry
                                        placeholder="Minimum 8 Characters"
                                        onChangeText={(text) => getInputText(text, 'password')}
                                        error={showError.password}
                                        style={styles.textInput}
                                        theme={{
                                            colors: {
                                                primary: commonStyles.primaryColor.backgroundColor
                                            }
                                        }}
                                    />

                                    <HelperText
                                        type="error"
                                        visible={showError.password}
                                        style={styles.helperTextStyling}
                                    >
                                        {errorMessage.password}
                                    </HelperText>


                                    <TextInput
                                        mode='contained'
                                        label="CONFIRM PASSWORD"
                                        value={data.confirmPassword}
                                        secureTextEntry
                                        placeholder="Should be same as above password"
                                        onChangeText={(text) => getInputText(text, 'confirmPassword')}
                                        error={showError.confirmPassword}
                                        style={styles.textInput}
                                        theme={{
                                            colors: {
                                                primary: commonStyles.primaryColor.backgroundColor
                                            }
                                        }}
                                    />

                                    <HelperText
                                        type="error"
                                        visible={showError.confirmPassword}
                                        style={styles.helperTextStyling}
                                    >
                                        {errorMessage.confirmPassword}
                                    </HelperText>
                                </View>

                                <View style={{ zIndex: 1 }}>
                                    <MyButton
                                        buttonName={button.label}
                                        buttonMode="contained"
                                        buttonIcon={button.icon}
                                        buttonColor={commonStyles.primaryColor.backgroundColor}
                                        buttonWidth='100%'
                                        buttonDisabled={button.disable}
                                        onPress={handleUpdateButton}
                                    />
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </Animated.View>
            </KeyboardAvoidingView >

            <BottomSheet
                ref={bs}
                snapPoints={[280, 0]}
                renderContent={renderBottomSheetContent}
                renderHeader={renderBottomSheetHeader}
                initialSnap={1}
                callbackNode={fall}
                enableGestureInteraction={true}
            />

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

export default UpdateProfile;

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
    profile: {
        width: 90,
        height: 90,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 45,
        backgroundColor: 'lightgrey'
    },
    imageBackground: {
        flex: 1,
        height: null,
        width: null,
        paddingVertical: '4%',
        paddingHorizontal: '6%'
    },
    helperTextStyling: {
        fontSize: 12,
        color: "red",
        fontWeight: "bold",
        paddingHorizontal: 0,
    },
    textInput: {
        backgroundColor: 'transparent',
        fontSize: 20,
        paddingHorizontal: 0
    },
    bottomSheetHeader: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 1,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomSheetPanelHeader: {
        alignItems: 'center',
    },
    bottomSheetPanelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    bottomSheetView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#ffffff',
        paddingBottom: 5
    },
    bottomSheetTextView: {
        marginVertical: 10,
    },
    bottomSheetText: {
        fontSize: 24,
        color: "#606060",
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginVertical: 2
    },
    bottomSheetButtonView: {
        width: '80%',
        marginVertical: 5
    }
})
