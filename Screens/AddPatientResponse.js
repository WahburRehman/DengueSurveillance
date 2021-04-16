import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';

import {
    Title,
    Paragraph
} from 'react-native-paper';

//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//ICON
import Icon from 'react-native-vector-icons/Ionicons';

//COMPONENTS
import MyButton from '../Components/Button';

const AddPatientResponse = (props) => {

    const [data, setData] = useState([]);
    const { serverResponseMessage, caseID } = props.route.params;


    const handleUpdateProfile = () => {
        props.navigation.navigate('updateProfile', {
            userID: data._id,
            email: data.email,
            contactNo: data.contactNo,
            dp: data.dp
        })
    }
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#4169e1', padding: 5 }}>
                <View style={styles.headerView}>
                    <TouchableOpacity
                        style={styles.iconView}
                        activeOpacity={0.5}
                        onPress={() => props.navigation.navigate('home')}
                    >
                        <Icon name="arrow-back" size={30} color="#ffffff" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>RESPONSE</Text>

                    <View></View>
                </View>

                <View style={styles.contentView}>
                    <View style={{ ...StyleSheet.absoluteFill }}>
                        <ImageBackground source={require('../Images/bg0.jpg')}
                            style={styles.imageBackground}
                        >
                            <Text style={styles.serverResponseText}>{serverResponseMessage}</Text>
                            <Text style={styles.serverResponseText}>Case ID is: {caseID}</Text>

                            <View style={{ marginTop: 10, zIndex: 1 }}>
                                <MyButton
                                    buttonName="Add Another Patient"
                                    buttonMode="contained"
                                    buttonColor={commonStyles.primaryColor.backgroundColor}
                                    buttonWidth='100%'
                                    buttonDisabled={false}
                                    onPress={() => props.navigation.navigate('addPatient')}
                                />
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </SafeAreaView >
        </>
    );
}

export default AddPatientResponse;


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
    }
    ,
    profile: {
        width: 90,
        height: 90,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 45,
    },
    imageBackground: {
        flex: 1,
        height: null,
        width: null,
        paddingVertical: '2%',
        paddingHorizontal: '7%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    },
    detailsView: {
        marginVertical: 5
    },
    serverResponseText: {
        textTransform: 'capitalize',
        fontSize: 20,
        fontWeight: 'bold',
        color: commonStyles.primaryColor.backgroundColor
    },
    paragraph: {
        fontSize: 18,
        marginTop: 7,
        paddingLeft: 0
    }
})
