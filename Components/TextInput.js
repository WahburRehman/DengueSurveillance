import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Title, Button, TextInput } from 'react-native-paper';

//StyleSheet
import commonStyles from '../StyleSheets/StyleSheet';

const MyTextInput = (props) => {

    return (
        <TextInput
            mode={props.textInputMode}
            label={props.textInputLabel}
            value={props.getText}
            placeholder={props.textInputPlaceHolder}
            placeholderTextColor={commonStyles.placeHolderColor.color}
            onChangeText={(text) => props.setText(text)}
            secureTextEntry={props.isPasswordField === true ? true : false}
            error={props.isError === true ? true : false}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            keyboardType={props.keyboardType}
            editable={props.editable}
            autoFocus={props.autoFocus}
            style={{
                width: props.textInputWidth ? props.textInputWidth : 290,
                marginBottom: props.textInputMarginBottom ? props.textInputMarginBottom : 15,
                fontSize: 18,
                backgroundColor: "#ffffff",
                borderBottomColor: props.isError ? 'red' : "#4169e1",
                borderBottomWidth: props.textInputMode === 'contained' ? 1 : 0,
                position: 'relative',
                zIndex: -1,
                backgroundColor: props.backgroundColor,
                paddingHorizontal: 0
            }}
            theme={{
                colors: {
                    primary: commonStyles.primaryColor.backgroundColor
                }
            }}
        />
    );
}

export default MyTextInput;

const styles = StyleSheet.create({
    textInputStyling: {
        borderColor: commonStyles.primaryColor.backgroundColor
    }
});
