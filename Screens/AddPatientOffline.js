import React, { useState, useEffect, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    ImageBackground,
    Image,
} from 'react-native';

import {
    HelperText,
    TextInput,
    FAB,
    Snackbar
} from 'react-native-paper';

import moment from 'moment';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';


//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//DATA
import { ageArray } from '../DATA/ageArray'
import { Districts } from '../DATA/Districts'


//ICONS
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

//COMPONENTS
import MyButton from '../Components/Button';
import MyTextInput from '../Components/TextInput';
import SplashScreen from './SplashScreen';
import DropDownList from '../Components/DropDownList';

//SCREEN WIDTH
const screenWidth = Dimensions.get('window').width;
const textInputWidth = screenWidth - 50;


const AddPatientOffline = (props) => {

    let date = moment().format('DD-MM-YYYY');

    const bs = React.createRef();
    const fall = new Animated.Value(1);


    const [showSnackbar, setShowSnackbar] = useState(false);
    const [serverResponse, setServerResponse] = useState('');
    const [districtIndex, setDistrictIndex] = useState(0);
    const [isPatientAdded, setIsPatientAdded] = useState(false);

    const nameRegex = new RegExp("^[a-zA-Z]{3,}$");
    const numberRegex = new RegExp('^03[0-9]{9}$');

    const [patientData, setPatientData] = useState({
        name: '',
        gender: '',
        age: '',
        phNo: '',
        district: '',
        homeTown: '',
        dengueStatus: 'suspected',
        hospital: '',
        recommendedBy: '605915ef97ab942584075529',
        symptoms: '',
        image: '',
        dispensary: 'multan',
        date: date
    });

    const [errorMessage, setErrorMessage] = useState({
        name: 'This Should Not Be Empty',
        gender: 'Required',
        age: 'Required',
        phNo: 'This Should Not Be Empty',
        city: 'Required',
        symptoms: 'This Should Not Be Empty',
        district: 'Required',
        homeTown: 'Required',
        hospital: 'This Should Not Be Empty',
    });

    const [showError, setShowError] = useState({
        name: false,
        gender: false,
        age: false,
        phNo: false,
        district: false,
        homeTown: false,
        symptoms: false,
        hospital: false
    });


    // FUNCTION TO GET INPUT TEXT OF FIELD

    const getInputText = (text, field) => {
        switch (true) {
            case field === 'name':
                setPatientData((prevState) => { return { ...prevState, name: text } });
                setShowError((prevState) => { return { ...prevState, name: false } });
                break;
            case field === 'phNo':
                setPatientData((prevState) => { return { ...prevState, phNo: text } });
                setShowError((prevState) => { return { ...prevState, phNo: false } });
                break;
            case field === 'symptoms':
                setPatientData((prevState) => { return { ...prevState, symptoms: text } });
                setShowError((prevState) => { return { ...prevState, symptoms: false } });
                break;
            case field === 'hospital':
                setPatientData((prevState) => { return { ...prevState, hospital: text } });
                setShowError((prevState) => { return { ...prevState, hospital: false } });
                break;
        }
        console.log('feild: ', field);
    }

    const handleOnFocusField = field => {
        switch (true) {
            case field === 'name': setShowError((prevState) => { return { ...prevState, name: false } }); break;
            case field === 'phNo': setShowError((prevState) => { return { ...prevState, phNo: false } }); break;
            case field === 'symptoms': setShowError((prevState) => { return { ...prevState, symptoms: false } }); break;
            case field === 'hospital': setShowError((prevState) => { return { ...prevState, hospital: false } }); break;
        }
    }

    const handleOnOpenDropDown = field => {
        switch (true) {
            case field === 'gender': setShowError((prevState) => { return { ...prevState, gender: false } }); break;
            case field === 'age': setShowError((prevState) => { return { ...prevState, age: false } }); break;
            case field === 'district': setShowError((prevState) => { return { ...prevState, district: false } }); break;
            case field === 'hometown': setShowError((prevState) => { return { ...prevState, homeTown: false } }); break;
        }
    }

    const handleDiscardButton = () => {
        setPatientData(prevState => {
            return {
                ...prevState,
                name: '',
                gender: '',
                age: '',
                phNo: '',
                symptoms: '',
                district: '',
                homeTown: '',
                hospital: '',
            }
        });

        setShowError(prevState => {
            return {
                ...prevState,
                name: false,
                gender: false,
                age: false,
                phNo: false,
                symptoms: false,
                district: false,
                homeTown: false,
                hospital: false
            }
        })
        console.log(patientData);
    }

    const storeData = async (object) => {
        let dataArray = [];
        try {
            let storedData = await AsyncStorage.getItem('patients');
            if (storedData !== null) {
                dataArray = JSON.parse(storedData); // you could do some additional checks to make sure it is an array
            }
            console.log('dataArray: ', dataArray);
            dataArray.push(object)
            await AsyncStorage.setItem('patients', JSON.stringify(dataArray));

            const currentUser = await AsyncStorage.getItem('patients')

            console.log('current users: ', currentUser);
        } catch (error) {
            // Error saving data
        }
    };


    const handleSendPatientDataButton = () => {
        console.log('data button')
        if (!patientData.name) {
            setShowError(prevState => { return { ...prevState, name: 'This Should Not Be Empty' } });
            setShowError(prevState => { return { ...prevState, name: true } });
        }
        else if (!patientData.gender) {
            setShowError(prevState => { return { ...prevState, gender: 'Required' } });
            setShowError(prevState => { return { ...prevState, gender: true } });
        }
        else if (!patientData.age) {
            setShowError(prevState => { return { ...prevState, age: 'Required' } });
            setShowError(prevState => { return { ...prevState, age: true } });
        }
        else if (!patientData.phNo) {
            setShowError(prevState => { return { ...prevState, phNo: 'This Should Not Be Empty' } });
            setShowError(prevState => { return { ...prevState, phNo: true } });
        }
        else if (!patientData.district) {
            setShowError(prevState => { return { ...prevState, district: 'Required' } });
            setShowError(prevState => { return { ...prevState, district: true } });
        }
        else if (!patientData.homeTown) {
            setShowError(prevState => { return { ...prevState, homeTown: 'Required' } });
            setShowError(prevState => { return { ...prevState, homeTown: true } });
        }
        else if (!patientData.hospital) {
            setShowError(prevState => { return { ...prevState, hospital: 'Required' } });
            setShowError(prevState => { return { ...prevState, hospital: true } });
        }
        else if (!patientData.symptoms) {
            setShowError(prevState => { return { ...prevState, symptoms: 'This Should Not Be Empty' } });
            setShowError(prevState => { return { ...prevState, symptoms: true } });
        }
        else {
            if (!nameRegex.test(patientData.name)) {
                setErrorMessage(prevState => { return { ...prevState, name: "Not A valid Name" } });
                setShowError(prevState => { return { ...prevState, name: true } });
            }
            else if (!numberRegex.test(patientData.phNo)) {
                setErrorMessage(prevState => { return { ...prevState, phNo: "Invalid Format" } });
                setShowError(prevState => { return { ...prevState, phNo: true } });
            }
            else if (patientData.symptoms.length < 6) {
                setErrorMessage(prevState => { return { ...prevState, symptoms: "Write valid Symptoms" } });
                setShowError(prevState => { return { ...prevState, symptoms: true } });
            }
            else if (patientData.symptoms.length > 250) {
                setErrorMessage(prevState => { return { ...prevState, symptoms: "Limit Exceed" } });
                setShowError(prevState => { return { ...prevState, symptoms: true } });
            }
            else {
                storeData(patientData);
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

    const resetStates = () => {
        setPatientData(prevState => {
            return {
                ...prevState,
                name: '',
                gender: '',
                age: '',
                phNo: '',
                district: '',
                homeTown: '',
                dengueStatus: 'suspected',
                hospital: '',
                recommendedBy: '605915ef97ab942584075529',
                symptoms: '',
                image: '',
                dispensary: 'multan',
                date: date
            }
        });

        setShowError(prevState => {
            return {
                ...prevState,
                name: false,
                gender: false,
                age: false,
                phNo: false,
                symptoms: false,
                district: false,
                homeTown: false,
                hospital: false
            }
        })
    }

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
            setPatientData(prevState => {
                return {
                    ...prevState,
                    image: image
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
            setPatientData(prevState => {
                return {
                    ...prevState,
                    image: image
                }
            });
        }).catch(error => {
            console.log(error);
        })
    }

    const handleDistrictDropDownChange = (value, index) => {
        console.log('value: ', value);
        console.log('index: ', index);
        setDistrictIndex(index);
        setPatientData(prevState => { return { ...prevState, district: value, homeTown: '' } });

    }

    return (
        <>
            {/* {isLoading ?
                <SplashScreen />
                : */}
            <>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#4169e1', padding: 5, paddingBottom: '2.5%' }}>
                    <View style={styles.headerView}>
                        <TouchableOpacity
                            style={styles.iconView}
                            activeOpacity={0.5}
                            onPress={() => props.navigation.navigate('selectAddPatient')}
                        >
                            <Icon name="arrow-back" size={30} color="#ffffff" />
                        </TouchableOpacity>

                        <Text style={styles.headerText}>Add Patient</Text>

                        <View></View>
                    </View>

                    <Animated.View style={{
                        ...styles.contentView,
                        opacity: Animated.add(0.4, Animated.multiply(fall, 1.0))
                    }}>
                        <View style={{ ...StyleSheet.absoluteFill }}>
                            <ImageBackground source={require('../Images/bg0.jpg')}
                                style={styles.imageBackground}
                            >
                                {!isPatientAdded ?
                                    <ScrollView>


                                        {/**************************************/}
                                        {/* Patient Name Field */}
                                        {/**************************************/}


                                        <MyTextInput
                                            textInputMode="contained"
                                            textInputLabel="Patient Name*"
                                            textInputWidth={textInputWidth}
                                            getText={patientData.name}
                                            autoFocus={true}
                                            textInputPlaceHolder="Enter Full Name"
                                            setText={(text) => getInputText(text, 'name')}
                                            textInputMarginBottom={0.1}
                                            isError={showError.name}
                                            onFocus={() => handleOnFocusField('name')}
                                        // onBlur={() => handleOnFocusField}
                                        />


                                        {/**************************************/}
                                        {/* Helper Text For Patient Name Field */}
                                        {/**************************************/}


                                        <View style={{ width: textInputWidth }}>
                                            <HelperText
                                                type="error"
                                                visible={showError.name}
                                                style={styles.helperTextStyling}
                                            >
                                                {errorMessage.name}
                                            </HelperText>
                                        </View>



                                        {/**************************************/}
                                        {/* DROP DOWN LISTS VIEW */}
                                        {/**************************************/}



                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: textInputWidth }}>


                                            {/**************************************/}
                                            {/* GENDER DROP DOWN LIST */}
                                            {/**************************************/}


                                            <View>
                                                <DropDownList
                                                    dropDownItems={[
                                                        { label: 'male', value: 'male' },
                                                        { label: 'female', value: 'female' },
                                                        { label: 'other', value: 'other' },
                                                    ]}
                                                    // dropDownDefaultValue={patientData.gender}
                                                    dropDownPlaceHolder="Gender"
                                                    dropDownWidth={150}
                                                    dropDownBackgroundColor={commonStyles.textInputColor.color}
                                                    dropDownOnChangeItem={item => setPatientData((prevState) => { return { ...prevState, gender: item.value } })}
                                                    isError={showError.gender}
                                                    onDropDownOpen={() => handleOnOpenDropDown('gender')}
                                                />

                                                {/**************************************/}
                                                {/* Helper Text For GENDER */}
                                                {/**************************************/}


                                                <View style={{ width: 115 }}>
                                                    <HelperText
                                                        type="error"
                                                        visible={showError.gender}
                                                        style={styles.helperTextStyling}
                                                    >
                                                        {errorMessage.gender}
                                                    </HelperText>
                                                </View>
                                            </View>




                                            {/**************************************/}
                                            {/* AGE DROP DOWN LIST */}
                                            {/**************************************/}

                                            {console.log(ageArray.length)}
                                            <View>
                                                <DropDownList
                                                    dropDownItems={ageArray.map(item => {
                                                        return item
                                                    })}
                                                    // dropDownDefaultValue={patientData.age}
                                                    dropDownWidth={150}
                                                    dropDownPlaceHolder="Age"
                                                    searchable={true}
                                                    dropDownBackgroundColor={commonStyles.textInputColor.color}
                                                    dropDownOnChangeItem={item => setPatientData((prevState) => { return { ...prevState, age: item.value } })}
                                                    isError={showError.age}
                                                    onDropDownOpen={() => handleOnOpenDropDown('age')}
                                                />



                                                {/**************************************/}
                                                {/* Helper Text For AGE */}
                                                {/**************************************/}



                                                <View style={{ width: 80 }}>
                                                    <HelperText
                                                        type="error"
                                                        visible={showError.age}
                                                        style={styles.helperTextStyling}
                                                    >
                                                        {errorMessage.age}
                                                    </HelperText>
                                                </View>
                                            </View>



                                            {/**************************************/}
                                            {/* MONTH OR YEAR DROP DOWN LIST */}
                                            {/**************************************/}
                                        </View>

                                        {/**************************************/}
                                        {/* PHONE NUMBER TEXT INPUT */}
                                        {/**************************************/}


                                        <MyTextInput
                                            textInputMode="contained"
                                            textInputLabel="Contact Number*"
                                            textInputWidth={textInputWidth}
                                            getText={patientData.phNo}
                                            textInputPlaceHolder="03001234567"
                                            setText={(text) => getInputText(text, 'phNo')}
                                            textInputMarginBottom={0.1}
                                            isError={showError.phNo}
                                            keyboardType="phone-pad"
                                            onFocus={() => handleOnFocusField('phNo')}
                                        />


                                        {/**************************************/}
                                        {/* HELPER TEXT FOR PHONE NUMBER TEXT INPUT */}
                                        {/**************************************/}


                                        <View style={{ width: textInputWidth }}>
                                            <HelperText
                                                type="error"
                                                visible={showError.phNo}
                                                style={styles.helperTextStyling}
                                            >
                                                {errorMessage.phNo}
                                            </HelperText>
                                        </View>




                                        <View style={{
                                            flexDirection: 'row',
                                            // borderWidth: 5,
                                            // borderColor: 'blue',
                                            justifyContent: 'space-between'
                                        }}
                                        >


                                            {/**************************************/}
                                            {/* DISTRICT SELCTION DROP DOWN LIST */}
                                            {/**************************************/}

                                            <View>
                                                <DropDownList
                                                    dropDownItems={Districts.map((item, index) => ({
                                                        value: index,
                                                        label: item.name,
                                                    }))}
                                                    // dropDownDefaultValue={patientData.district}
                                                    dropDownWidth={160}
                                                    dropDownPlaceHolder="District"
                                                    searchable={true}
                                                    dropDownBackgroundColor={commonStyles.textInputColor.color}
                                                    dropDownOnChangeItem={item => handleDistrictDropDownChange(item.label, item.value)}
                                                    isError={showError.district}
                                                    onDropDownOpen={() => handleOnOpenDropDown('district')}
                                                />


                                                {/**************************************/}
                                                {/* Helper Text For DISTRICT DROPDOWN LIST */}
                                                {/**************************************/}



                                                <View style={{ width: 80 }}>
                                                    <HelperText
                                                        type="error"
                                                        visible={showError.district}
                                                        style={styles.helperTextStyling}
                                                    >
                                                        {errorMessage.district}
                                                    </HelperText>
                                                </View>
                                            </View>

                                            {/**************************************/}
                                            {/* HOME TOWN DROP DOWN LIST */}
                                            {/**************************************/}

                                            {console.log(districtIndex)}
                                            <View>
                                                <DropDownList
                                                    dropDownItems={Districts[districtIndex].villages.map(item => ({
                                                        value: item,
                                                        label: item
                                                    }))}
                                                    // dropDownDefaultValue={patientData.homeTown}
                                                    dropDownWidth={160}
                                                    dropDownPlaceHolder="Hometown"
                                                    searchable={true}
                                                    dropDownBackgroundColor={commonStyles.textInputColor.color}
                                                    dropDownOnChangeItem={item => setPatientData((prevState) => { return { ...prevState, homeTown: item.value } })}
                                                    isError={showError.homeTown}
                                                    onDropDownOpen={() => handleOnOpenDropDown('hometown')}
                                                />



                                                {/**************************************/}
                                                {/* Helper Text For HOME TOWN DROPDOWN LIST */}
                                                {/**************************************/}



                                                <View style={{ width: 80 }}>
                                                    <HelperText
                                                        type="error"
                                                        visible={showError.homeTown}
                                                        style={styles.helperTextStyling}
                                                    >
                                                        {errorMessage.homeTown}
                                                    </HelperText>
                                                </View>
                                            </View>
                                        </View>



                                        {/**************************************/}
                                        {/* Hosptal Name Field */}
                                        {/**************************************/}


                                        <MyTextInput
                                            textInputMode="contained"
                                            textInputLabel="Hospital*"
                                            textInputWidth={textInputWidth}
                                            getText={patientData.hospital}
                                            textInputPlaceHolder="Enter Hospital Name"
                                            setText={(text) => getInputText(text, 'hospital')}
                                            textInputMarginBottom={0.1}
                                            isError={showError.hospital}
                                            onFocus={() => handleOnFocusField('hospital')}
                                        />


                                        {/**************************************/}
                                        {/* Helper Text For Patient Name Field */}
                                        {/**************************************/}


                                        <View style={{ width: textInputWidth }}>
                                            <HelperText
                                                type="error"
                                                visible={showError.hospital}
                                                style={styles.helperTextStyling}
                                            >
                                                {errorMessage.hospital}
                                            </HelperText>
                                        </View>


                                        {/**************************************/}
                                        {/* SYMPTOMS TEXT INPUT */}
                                        {/**************************************/}


                                        <TextInput
                                            mode="flat"
                                            label="Add Symptoms*"
                                            multiline
                                            maxLength={250}
                                            numberOfLines={8}
                                            value={patientData.symptoms}
                                            style={{
                                                width: textInputWidth,
                                                fontSize: 18,
                                                backgroundColor: 'transparent',
                                                borderBottomColor: commonStyles.primaryColor.backgroundColor,
                                                borderBottomWidth: 1
                                            }}
                                            theme={{ colors: { primary: commonStyles.primaryColor.backgroundColor, underlineColor: 'transparent', } }}
                                            onFocus={() => handleOnFocusField('symptoms')}
                                            placeholder="Enter Symptoms Here...."
                                            placeholderTextColor={commonStyles.placeHolderColor.color}
                                            onChangeText={(text) => getInputText(text, 'symptoms')}
                                            error={showError.symptoms ? true : false}
                                        />


                                        {/*******************************************/}
                                        {/* HELPER TEXT FOR Symptoms */}
                                        {/*******************************************/}


                                        <View style={styles.symptomsHelperTextView}>
                                            <HelperText
                                                type="error"
                                                visible={showError.symptoms}
                                                style={styles.helperTextStyling}
                                            >
                                                {errorMessage.symptoms}
                                            </HelperText>

                                            <HelperText
                                                type="error"
                                                visible
                                                style={{ fontSize: 14, color: '#000000' }}
                                            >
                                                {patientData.symptoms ? patientData.symptoms.length : 0}/250
                                        </HelperText>
                                        </View>

                                        {patientData.image ?
                                            <View>
                                                <Text style={styles.symptomsImageText}>symptoms Image</Text>
                                                <Entypo
                                                    name="cross"
                                                    size={30}
                                                    color="#000000"
                                                    style={styles.symptomsImageIcon}
                                                    onPress={() => setPatientData(prevState => { return { ...prevState, image: '' } })}
                                                />
                                                <Image
                                                    source={{ uri: patientData.image.path }}
                                                    style={styles.symptomsImage}
                                                />
                                            </View>
                                            :
                                            null
                                        }

                                        <MyTextInput
                                            textInputMode="contained"
                                            textInputLabel="Dispensary*"
                                            textInputWidth={textInputWidth}
                                            getText={patientData.dispensary}
                                            textInputMarginBottom={5}
                                            editable={false}
                                        />

                                        <MyTextInput
                                            textInputMode="contained"
                                            textInputLabel="DATE*"
                                            textInputWidth={textInputWidth}
                                            getText={patientData.date}
                                            textInputMarginBottom={30}
                                            editable={false}
                                        />

                                        <FAB
                                            style={styles.fab}
                                            icon="camera"
                                            onPress={() => bs.current.snapTo(0)}
                                        />

                                        <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>

                                            <MyButton
                                                buttonName="Discard"
                                                buttonMode="contained"
                                                buttonIcon="cancel"
                                                buttonColor="red"
                                                buttonWidth={150}
                                                iconPosition="row"
                                                onPress={handleDiscardButton}
                                            />

                                            <MyButton
                                                buttonName="Send Data"
                                                buttonMode="contained"
                                                buttonIcon="arrow-right"
                                                buttonColor={commonStyles.primaryColor.backgroundColor}
                                                buttonWidth={150}
                                                onPress={handleSendPatientDataButton}
                                            />

                                        </View>
                                    </ScrollView>
                                    :
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    >
                                        <Text style={styles.serverResponseText}>{serverResponse}</Text>
                                        <Text style={styles.serverResponseText}>Case ID is: 1604202101</Text>

                                        <View style={{
                                            marginTop: 20,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '60%'
                                        }}
                                        >
                                            <TouchableOpacity
                                                style={styles.iconView}
                                                activeOpacity={0.5}
                                                onPress={() => props.navigation.navigate('home')}
                                            >
                                                <Icon name="home" size={30} color={commonStyles.primaryColor.backgroundColor} />
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={styles.iconView}
                                                activeOpacity={0.5}
                                                onPress={() => props.navigation.navigate('selectAddPatient')}
                                            >
                                                <AntDesign name="select1" size={30} color={commonStyles.primaryColor.backgroundColor} />
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={styles.iconView}
                                                activeOpacity={0.5}
                                                onPress={() => setIsPatientAdded(false)}
                                            >
                                                <Icon name="person-add" size={30} color={commonStyles.primaryColor.backgroundColor} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                }
                            </ImageBackground>
                        </View>
                    </Animated.View>
                </SafeAreaView >

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
            {/* } */}
        </>

    );
}

export default AddPatientOffline;
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
        paddingVertical: '5%',
        paddingHorizontal: '7%'
    },
    helperTextStyling: {
        fontSize: 11,
        color: "red",
        fontWeight: "bold",
        paddingHorizontal: 0,
    },
    symptomsHelperTextView: {
        width: textInputWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    symptomsImage: {
        height: 135,
        width: 110,
        borderWidth: 4,
        borderColor: '#ffffff'
    },
    symptomsImageIcon: {
        position: 'absolute',
        top: 17,
        left: 90,
        zIndex: 1
    },
    symptomsImageText: {
        fontSize: 16,
        color: '#4169e1',
        textTransform: 'capitalize',
        fontWeight: 'bold',
        marginBottom: 6
    },
    fab: {
        position: 'absolute',
        marginBottom: 50,
        right: 0,
        bottom: 0,
        backgroundColor: commonStyles.primaryColor.backgroundColor
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
    },
    serverResponseText: {
        textTransform: 'capitalize',
        fontSize: 20,
        fontWeight: 'bold',
        color: commonStyles.primaryColor.backgroundColor
    }
});