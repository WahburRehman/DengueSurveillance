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
            <Icon name={props.iconName} size={cardButtonIconSize} color={props.iconColor} />
            <Text style={styles.cardButtonTextStyling}>{props.cardButtonName}</Text>
        </TouchableOpacity>
    );
}

export default CardButton;

const styles = StyleSheet.create({
    cardButtonStyling: {
        // marginTop: 20,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: cardButtonWidth,
        height: cardButtonWidth,
        borderWidth: 4,
        borderColor: '#00aaff'
    },
    cardButtonTextStyling: {
        fontSize: 16,
        color: commonStyles.primaryColor.backgroundColor,
        marginTop: 5,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});
