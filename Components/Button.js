import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import 'react-native-vector-icons/AntDesign';

//StyleSheet
import commonStyles from '../StyleSheets/StyleSheet';

const MyButton = (props) => (
    <Button
        icon={props.buttonIcon}
        mode={props.buttonMode}
        onPress={props.onPress}
        color={props.buttonColor}
        disabled={props.buttonDisabled}
        contentStyle={{
            flexDirection: props.iconPosition ? props.iconPosition : 'row-reverse',
        }}
        style={{
            width: props.buttonWidth ? props.buttonWidth : 250,
            // position: '',
            zIndex: -1,
            backgroundColor: '#4169e1',
            marginBottom: props.marginBottom

        }}
        labelStyle={styles.buttonLabelStyling}
        
    >
        {props.buttonName}
    </Button>
);

export default MyButton;

const styles = StyleSheet.create({
    buttonLabelStyling: {
        color: commonStyles.textColor.color,
        textTransform: "uppercase",
        fontWeight: "bold",
        fontSize: 17
    }
});