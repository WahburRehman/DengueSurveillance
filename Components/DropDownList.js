import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';


const DropDownList = (props) => {

    const [item, setItem] = useState('')

    const handleSelect = (item) => {
        console.log('??')
        console.log(item);
        setItem(item);
    }
    return (
        <DropDownPicker
            items={props.dropDownItems}
            defaultValue={props.dropDownDefaultValue}
            placeholder={props.dropDownPlaceHolder}
            containerStyle={{
                height: 50,
                width: props.dropDownWidth,
            }}
            style={{
                backgroundColor: props.dropDownBackgroundColor,
                fontSize: 18
            }}
            itemStyle={{
                justifyContent: 'flex-start',
            }}
            labelStyle={{
                color: '#5a5a5a',
                fontSize: props.dropDownFontSize ? props.dropDownFontSize : 16,
                textTransform: "uppercase",
                fontWeight: 'bold',
            }}
            dropDownStyle={{
                backgroundColor: '#ffffff',
                // position: 'absolute',
                // zIndex: 1

            }}
            onChangeItem={(item) => props.dropDownOnChangeItem(item)}
            onOpen={props.onDropDownOpen}
        />
    );
}

export default DropDownList;
