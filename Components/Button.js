import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

//StyleSheet
import commonStyles from '../StyleSheets/StyleSheet';

const MyButton = (props) => (
    <Button
        icon={props.buttonIcon}
        mode={props.buttonMode}
        onPress={props.onPress}
        color={props.buttonColor}
        contentStyle={{
            flexDirection: 'row-reverse',
        }}
        style={{ width: props.buttonWidth ? props.buttonWidth : 250 }}
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