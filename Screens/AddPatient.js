import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Dimensions, pick } from 'react-native';
import { Title, Button, TextInput, HelperText } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//COMPONENTS
import Header from '../Components/Header';
import MyButton from '../Components/Button';
import MyTextInput from '../Components/TextInput';
import DropDownList from '../Components/DropDownList';

//SCREEN WIDTH
const screenWidth = Dimensions.get('window').width;

const AddPatient = (props) => {

    const textInputWidth = screenWidth - 50;

    const [userData, setUserData] = useState({
        name: '',
        gender: 'gender',
        age: 'age',
        mOrY: 'year',
        phNo: '',
        city: 'city',
        address: '',
        hospital: 'hospital',
    });

    const [errorMessage, setErrorMessage] = useState({
        name: 'This Should Not Be Empty',
        gender: 'Required',
        age: 'Required',
        mOrY: 'Required',
        phNo: 'This Should Not Be Empty',
        city: 'Required',
        address: 'This Should Not Be Empty',
        hospital: 'Required',
    });

    const [showError, setShowError] = useState({
        name: false,
        gender: false,
        age: false,
        mOrY: false,
        phNo: false,
        city: false,
        address: false,
        hospital: false
    });

    // FUNCTION TO GET INPUT TEXT OF FIELD

    const getInputText = (text, field) => {
        switch (true) {
            case field === 'name':
                setUserData((prevState) => { return { ...prevState, name: text } });
                setShowError((prevState) => { return { ...prevState, name: false } });
                break;
            case field === 'phNo':
                setUserData((prevState) => { return { ...prevState, phNo: text } });
                setShowError((prevState) => { return { ...prevState, phNo: false } });
                break;
            case field === 'address':
                setUserData((prevState) => { return { ...prevState, address: text } });
                setShowError((prevState) => { return { ...prevState, address: false } });
                break;
        }


        console.log(text);
    }

    const handleOnFocusField = field => {
        switch (true) {
            case field === 'name': setShowError((prevState) => { return { ...prevState, name: false } }); break;
            case field === 'phNo': setShowError((prevState) => { return { ...prevState, phNo: false } }); break;
            case field === 'address': setShowError((prevState) => { return { ...prevState, address: false } }); break;
        }
    }

    const handleOnOpenDropDown = field => {
        switch (true) {
            case field === 'gender': setShowError((prevState) => { return { ...prevState, gender: false } }); break;
            case field === 'age': setShowError((prevState) => { return { ...prevState, age: false } }); break;
            case field === 'mOrY': setShowError((prevState) => { return { ...prevState, mOrY: false } }); break;
            case field === 'city': setShowError((prevState) => { return { ...prevState, city: false } }); break;
            case field === 'hospital': setShowError((prevState) => { return { ...prevState, hospital: false } }); break;
        }
    }


    const handleSendPatientDataButton = () => {
        console.log('data button')
    }

    const handleBackTo = () => {
        navigation.navigate('home');
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <Header headerTitle="add patient" showLeftIcon={true} backTo={handleBackTo}/>

            {/**************************************/}
            {/* TITLE VIEW*/}
            {/**************************************/}


            <View style={{
                top: 80,
                left: 85,
                backgroundColor: "#ffffff",
                marginBottom: 40,
                borderColor: "#d82fff",
                borderWidth: 2,
                borderRadius: 20,
                padding: 10,
                position: 'absolute',
                zIndex: 1
            }}

            >
                <Title style={styles.titleStyling}>patient info</Title>
            </View>

            {/* <View style={{backgroundColor: "#ffffff", marginTop: 60, alignItems: 'center', marginBottom: 20}}> */}



            {/**************************************/}
            {/* USER INFO FORM VIEW*/}
            {/**************************************/}



            <View style={styles.formViewStyling}>


                {/**************************************/}
                {/* Patient Name Field */}
                {/**************************************/}


                <MyTextInput
                    textInputMode="contained"
                    textInputLabel="Patient Name*"
                    textInputWidth={textInputWidth}
                    getText={userData.name}
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
                                { label: 'gender', value: 'gender', hidden: true },
                                { label: 'male', value: 'male' },
                                { label: 'female', value: 'female' },
                                { label: 'other', value: 'other' },
                            ]}
                            dropDownDefaultValue={userData.gender}
                            dropDownWidth={115}
                            dropDownBackgroundColor={commonStyles.textInputColor.color}
                            dropDownOnChangeItem={item => setUserData((prevState) => { return { ...prevState, gender: item.value } })}
                            isError={showError.gender}
                            onDropDownOpen={() => handleOnOpenDropDown('gender')}
                        />

                        {/* <DropDownPicker
                                items={[
                                    { label: 'gender', value: 'gender', },
                                    { label: 'male', value: 'male' },
                                    { label: 'female', value: 'female' },
                                ]}
                                defaultValue={userData.gender}
                                containerStyle={{
                                    height: 50,
                                    width: 115,
                                    borderBottomWidth: showError.gender ? 2 : 1,
                                    borderBottomColor: showError.gender ? 'red' : "#8d2fff",
                                }}
                                style={{
                                    backgroundColor: "#ffffff",
                                    fontSize: 18
                                }}
                                itemStyle={{
                                    justifyContent: 'flex-start'
                                }}
                                labelStyle={{
                                    color: '#5a5a5a',
                                    fontSize: 16,
                                    textTransform: "uppercase",
                                    fontWeight: 'bold',
                                }}
                                dropDownStyle={{ backgroundColor: '#ffffff' }}
                                onChangeItem={item => setUserData((prevState) => { return { ...prevState, gender: item.value } })}
                                onOpen={() => handleOnOpenDropDown('gender')}
                            /> */}

                        {/* <View style={{
                                padding: 0,
                                borderBottomWidth: showError.gender ? 2 : 1,
                                borderBottomColor: showError.gender ? 'red' : "#8d2fff",
                                backgroundColor: 'blue',
                                borderTopWidth: 1,
                                borderTopColor: 'red'
                            }}>
                                <DropDownPicker
                                    items={[
                                        { label: 'male', value: 'male' },
                                        { label: 'female', value: 'female' },
                                    ]}
                                    placeholder="gender"
                                    defaultValue={userData.male}
                                    containerStyle={{
                                        height: 50,
                                        width: 115,
                                    }}
                                    style={{ backgroundColor: '#fafafa' }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    labelStyle={{
                                        color: 'red',
                                        fontSize: 16,
                                        textTransform: "uppercase",
                                        fontWeight: 'bold',
                                    }}
                                    dropDownStyle={{ backgroundColor: '#ffffff' }}
                                    onChangeItem={item => setUserData((prevState) => { return { ...prevState, gender: item.value } })}
                                    onOpen={() => handleOnOpenDropDown('gender')}
                                />
                            </View> */}


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


                    <View>
                        <DropDownList
                            dropDownItems={[
                                { label: 'age', value: 'age', hidden: true },
                                { label: '01', value: '1' },
                                { label: '02', value: '2' },
                            ]}
                            dropDownDefaultValue={userData.age}
                            dropDownWidth={80}
                            dropDownPlaceHolder="age"
                            dropDownBackgroundColor={commonStyles.textInputColor.color}
                            dropDownOnChangeItem={item => setUserData((prevState) => { return { ...prevState, age: item.value } })}
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


                    <View>
                        <DropDownList
                            dropDownItems={[
                                { label: 'month', value: 'month' },
                                { label: 'year', value: 'year' },
                            ]}
                            dropDownDefaultValue={userData.mOrY}
                            dropDownWidth={100}
                            dropDownPlaceHolder="M or Y"
                            dropDownBackgroundColor={commonStyles.textInputColor.color}
                            dropDownOnChangeItem={item => setUserData((prevState) => { return { ...prevState, mOrY: item.value } })}
                            isError={showError.mOrY}
                            onDropDownOpen={() => handleOnOpenDropDown('mOrY')}
                        />


                        {/**************************************/}
                        {/* Helper Text For MONTH OR YEAR */}
                        {/**************************************/}


                        <View style={{ width: 100 }}>
                            <HelperText
                                type="error"
                                visible={showError.mOrY}
                                style={styles.helperTextStyling}
                            >
                                {errorMessage.mOrY}
                            </HelperText>
                        </View>
                    </View>
                </View>

                {/**************************************/}
                {/* PHONE NUMBER TEXT INPUT */}
                {/**************************************/}


                <MyTextInput
                    textInputMode="contained"
                    textInputLabel="Phone Number*"
                    textInputWidth={textInputWidth}
                    getText={userData.phNo}
                    textInputPlaceHolder="0300-1234567"
                    setText={(text) => getInputText(text, 'phNo')}
                    textInputMarginBottom={0.1}
                    isError={showError.phNo}
                    onFocus={() => handleOnFocusField('phNo')}
                // onBlur={() => handleOnFocusField}
                />

                {console.log(userData.phNo)}


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


                {/**************************************/}
                {/* CITY DROP DOWN LIST */}
                {/**************************************/}


                <View>
                    <DropDownList
                        dropDownItems={[
                            { label: 'city', value: 'city', hidden: true },
                            { label: 'Multan', value: 'multan' },
                            { label: 'islamabad', value: 'islamabad' },
                        ]}
                        dropDownDefaultValue={userData.city}
                        dropDownWidth={180}
                        dropDownPlaceHolder="city"
                        dropDownBackgroundColor={commonStyles.textInputColor.color}
                        dropDownOnChangeItem={item => setUserData((prevState) => { return { ...prevState, city: item.value } })}
                        isError={showError.city}
                        onDropDownOpen={() => handleOnOpenDropDown('city')}
                    />



                    {/**************************************/}
                    {/* Helper Text For CITY DROPDOWN LIST */}
                    {/**************************************/}



                    <View style={{ width: 80 }}>
                        <HelperText
                            type="error"
                            visible={showError.city}
                            style={styles.helperTextStyling}
                        >
                            {errorMessage.city}
                        </HelperText>
                    </View>
                </View>

                {/**************************************/}
                {/* PHONE NUMBER TEXT INPUT */}
                {/**************************************/}


                <MyTextInput
                    textInputMode="contained"
                    textInputLabel="Address*"
                    textInputWidth={textInputWidth}
                    getText={userData.address}
                    textInputPlaceHolder="e.g Wapda Town Phase II Multan, Pakistan"
                    setText={(text) => getInputText(text, 'address')}
                    textInputMarginBottom={0.1}
                    isError={showError.address}
                    onFocus={() => handleOnFocusField('address')}
                    onBlur={() => handleOnFocusField('address')}
                />

                {console.log(userData.address)}


                {/**************************************/}
                {/* HELPER TEXT FOR PHONE NUMBER TEXT INPUT */}
                {/**************************************/}


                <View style={{ width: textInputWidth }}>
                    <HelperText
                        type="error"
                        visible={showError.address}
                        style={styles.helperTextStyling}
                    >
                        {errorMessage.address}
                    </HelperText>
                </View>

                {/**************************************/}
                {/* HOSPITAL SELCTION DROP DOWN LIST */}
                {/**************************************/}


                <View>
                    <DropDownList
                        dropDownItems={[
                            { label: 'hospital', value: 'hospital', hidden: true },
                            { label: 'Multan', value: 'multan' },
                            { label: 'islamabad', value: 'islamabad' },
                        ]}
                        dropDownDefaultValue={userData.hospital}
                        dropDownWidth={180}
                        dropDownPlaceHolder="hospital"
                        dropDownBackgroundColor={commonStyles.textInputColor.color}
                        dropDownOnChangeItem={item => setUserData((prevState) => { return { ...prevState, hospital: item.value } })}
                        isError={showError.hospital}
                        onDropDownOpen={() => handleOnOpenDropDown('hospital')}
                    />



                    {/**************************************/}
                    {/* Helper Text For HOSPITAL DROPDOWN LIST */}
                    {/**************************************/}



                    <View style={{ width: 80 }}>
                        <HelperText
                            type="error"
                            visible={showError.hospital}
                            style={styles.helperTextStyling}
                        >
                            {errorMessage.hospital}
                        </HelperText>
                    </View>
                </View>

                <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>

                    <MyButton
                        buttonName="Discard"
                        buttonMode="contained"
                        buttonIcon="arrow-right"
                        buttonColor="red"
                        buttonWidth={150}
                        onPress={handleSendPatientDataButton}
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
            </View>
            {/* </View> */}
        </ScrollView >
    );
}

export default AddPatient;
const styles = StyleSheet.create({
    titleStyling: {
        fontSize: 30,
        fontWeight: 'bold',
        color: commonStyles.primaryColor.backgroundColor,
        marginVertical: 10,
        fontFamily: "Roboto",
        textTransform: 'uppercase'
    },
    formViewStyling: {
        borderWidth: 2,
        backgroundColor: '#ffffff',
        borderColor: "#8d2fff",
        borderRadius: 20,
        paddingTop: 35,
        padding: 15,
        marginTop: 60,
        marginLeft: 10,
        marginRight: 10
    },
    helperTextStyling: {
        fontSize: 11,
        color: "red",
        fontWeight: "bold",
    }
});