import React, { useState, useEffect, } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';


//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';


//ICONS
import Icon from 'react-native-vector-icons/Ionicons';

//COMPONENTS
import MyButton from '../Components/Button';



const SelectAddPatient = (props) => {
    const { from } = props.route.params;
    console.log(from);
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#4169e1', padding: 5, paddingBottom: '2.5%' }}>
                <View style={styles.headerView}>
                    <TouchableOpacity
                        style={styles.iconView}
                        activeOpacity={0.5}
                        onPress={() => props.navigation.navigate(from)}
                        onLongPress={() => props.navigation.navigate('home')}
                    >
                        <Icon name="arrow-back" size={30} color="#ffffff" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>Add Patient</Text>

                    <View></View>
                </View>

                <View style={styles.contentView}>
                    <View style={{ ...StyleSheet.absoluteFill }}>
                        <ImageBackground
                            source={require('../Images/bg0.jpg')}
                            style={styles.imageBackground}
                        >
                            <View style={{ zIndex: 1, width: '95%' }}>
                                <MyButton
                                    buttonName="Add Patient Online"
                                    buttonMode="contained"
                                    buttonIcon="wifi"
                                    buttonColor={commonStyles.primaryColor.backgroundColor}
                                    buttonWidth='100%'
                                    marginBottom={20}
                                    onPress={() => props.navigation.navigate('addPatientOnline')}
                                />



                                <MyButton
                                    buttonName="Add Patient Offline"
                                    buttonMode="contained"
                                    buttonIcon="wifi-off"
                                    buttonColor={commonStyles.primaryColor.backgroundColor}
                                    buttonWidth='100%'
                                    onPress={() => props.navigation.navigate('addPatientOffline')}
                                />
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </SafeAreaView >
        </>

    );
}

export default SelectAddPatient;
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
        borderRadius: 20,
    },
    imageBackground: {
        flex: 1,
        height: null,
        width: null,
        paddingVertical: '5%',
        paddingHorizontal: '7%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});