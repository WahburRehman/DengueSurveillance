import React, { useState } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, Button } from 'react-native';
import { Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

//COMPONENTS
import Header from '../Components/Header';
import CardButton from '../Components/cardButton';

//STYLESHEETS
import commonStyles from '../StyleSheets/StyleSheet';

//SCREEN WIDTH
const screenWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {


    const navigateTo = (screen) => {
        console.log('called navigato to')
        navigation.navigate(screen);
    }

    const handleLogOutButton = async () => {
        console.log('??')
        try {
            await AsyncStorage.removeItem('userToken');
            console.log("key Removed!!");
        } catch (error) {
            console.log('remove Key Error: ', error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }} >


            {/**************************************/}
            {/* HEADER COMPONENT CALL*/}
            {/**************************************/}


            <Header headerTitle="Home" />


            {/**************************************/}
            {/* CARDBUTTON COMPONENT CALL & VIEWS*/}
            {/**************************************/}


            <View style={styles.cardButtonViewStyling} >
                <CardButton
                    cardButtonName="Add Patient"
                    iconName="person-add"
                    iconColor={commonStyles.cardButtonIconColor.color}
                    goTo={() => navigateTo('selectAddPatient')}
                />
                <CardButton
                    cardButtonName="View Patients"
                    iconName="eye"
                    iconColor={commonStyles.cardButtonIconColor.color}
                    goTo={() => navigateTo('viewPatients')}
                />
            </View>

            <View style={styles.cardButtonViewStyling}>
                <CardButton
                    cardButtonName="Campaign"
                    iconName="megaphone"
                    iconColor={commonStyles.cardButtonIconColor.color}
                    goTo={() => navigateTo('campaignRequest')}
                />
                <CardButton
                    cardButtonName="All Campaigns"
                    iconName="search"
                    iconColor={commonStyles.cardButtonIconColor.color}
                    goTo={() => navigateTo('allRequests')}
                    
                />
            </View>

            <View style={styles.cardButtonViewStyling}>
                <CardButton
                    cardButtonName="Campaign Msg"
                    iconName="chatbox-ellipses"
                    iconColor={commonStyles.cardButtonIconColor.color}
                />
                <CardButton
                    cardButtonName="Complaints"
                    iconName="sad-outline"
                    iconColor={commonStyles.cardButtonIconColor.color}
                    goTo={() => navigateTo('allComplaints')}
                    
                />
            </View>



            {/**************************************/}
            {/*EMPTY VIEW*/}
            {/**************************************/}

            <Button title="logout" onPress={() => handleLogOutButton()} />
        </SafeAreaView >
    );
}

export default Home;

const styles = StyleSheet.create({
    cardButtonViewStyling: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});