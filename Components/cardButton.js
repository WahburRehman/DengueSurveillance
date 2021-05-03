import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Title, Button, TextInput, HelperText } from 'react-native-paper';

//ICONS
import Icon from 'react-native-vector-icons/Ionicons';

//STYLESHEETS
import commonStyles from '../StyleSheets/StyleSheet';

//SCREEN WIDTH
const screenWidth = Math.round(Dimensions.get('window').width);

//CARD BUTTON WIDTH
const cardButtonWidth = Math.round((screenWidth / 2) - 40);

const CardButton = (props) => {

    const cardButtonIconSize = cardButtonWidth / 2;

    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={props.goTo}
            style={styles.cardButtonStyling}
        >
            <Icon name={props.iconName} size={60} color={props.iconColor} />
            <Text style={styles.cardButtonTextStyling}>{props.cardButtonName}</Text>
        </TouchableOpacity>
    );
}

export default CardButton;

const styles = StyleSheet.create({
    cardButtonStyling: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '40%',
        height: 170,
        backgroundColor: '#ffffff',
        borderRadius: 15
    },
    cardButtonTextStyling: {
        fontSize: 16,
        color: commonStyles.primaryColor.backgroundColor,
        marginTop: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});
