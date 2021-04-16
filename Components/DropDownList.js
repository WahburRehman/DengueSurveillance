import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';


const DropDownList = (props) => {

    return (
        <DropDownPicker
            items={props.dropDownItems}
            defaultValue={props.dropDownDefaultValue}
            placeholder={props.dropDownPlaceHolder}
            containerStyle={{
                height: 50,
                width: props.dropDownWidth,
                // backgroundColor: 'transparent',
                // borderBottomWidth: 1,
                // borderBottomColor: '#4169e1'
            }}
            style={{
                // backgroundColor: props.dropDownBackgroundColor,
                fontSize: 18,
                position: 'relative',
                // zIndex: 99999,
                backgroundColor: 'transparent'
            }}
            itemStyle={{
                justifyContent: 'flex-start',
            }}
            labelStyle={{
                color: '#5a5a5a',
                fontSize: props.dropDownFontSize ? props.dropDownFontSize : 18,
                textTransform: "uppercase",
                fontWeight: 'bold',
            }}
            dropDownStyle={{
                backgroundColor: '#ffffff',


            }}
            dropDownMaxHeight={300}
            onChangeItem={(item) => props.dropDownOnChangeItem(item)}
            onOpen={props.onDropDownOpen}
            searchable={props.searchable}
            children
        />
    );
}

export default DropDownList;
