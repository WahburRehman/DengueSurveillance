import React, { useState } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../Redux/Actions/actions';

//COMPONENTS
import Header from '../Components/Header';
import CardButton from '../Components/cardButton';

//STYLESHEETS
import commonStyles from '../StyleSheets/StyleSheet';

//SCREEN WIDTH
const screenWidth = Dimensions.get('window').width;

const Home = (props) => {

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    // console.log('state: ', state);

    const navigateTo = (screen) => {
        console.log('called navigato to')
        props.navigation.navigate(screen);
    }

    const handleLogOutButton = async () => {
        console.log('??')
        try {
            await AsyncStorage.removeItem('userInfoLocal');
            console.log("key Removed!!");
            dispatch(actions.changeLoginStatus(false));

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
                     goTo={() => navigateTo('sendSms')}
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

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginStatus: (login) => dispatch(actions.changeLoginStatus(login))
    }
}


export default Home;

const styles = StyleSheet.create({
    cardButtonViewStyling: {
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});