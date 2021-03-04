import React, { useState } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

//COMPONENTS
import Header from '../Components/Header';
import CardButton from '../Components/cardButton';

//STYLESHEETS
import commonStyles from '../StyleSheets/StyleSheet';

//SCREEN WIDTH
const screenWidth = Dimensions.get('window').width;

const Home = ({ navigation }) => {


    const navigateTo = () => {
        console.log('called navigato to')
        navigation.navigate('addPatient');
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
                    cardButtonName="Add Patients"
                    iconName="person-add"
                    iconColor={commonStyles.cardButtonIconColor.color}
                    goTo={navigateTo}
                />
                <CardButton
                    cardButtonName="View Patients"
                    iconName="eye"
                    iconColor={commonStyles.cardButtonIconColor.color}
                    goTo={navigateTo}
                />
            </View>

            <View style={styles.cardButtonViewStyling}>
                <CardButton
                    cardButtonName="Campaign Req"
                    iconName="megaphone"
                    iconColor={commonStyles.cardButtonIconColor.color}
                />
                <CardButton
                    cardButtonName="Campaing Status"
                    iconName="search"
                    iconColor={commonStyles.cardButtonIconColor.color}
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
                />
            </View>



            {/**************************************/}
            {/*EMPTY VIEW*/}
            {/**************************************/}

            <View></View>
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