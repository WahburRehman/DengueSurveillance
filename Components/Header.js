
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Appbar, Title } from 'react-native-paper';

//StyleSheet
import commonStyles from '../StyleSheets/StyleSheet';

//ICON
import Icon from 'react-native-vector-icons/Ionicons';

const Header = (props) => {

    return (
        <Appbar.Header
            theme={{
                colors: {
                    primary: commonStyles.primaryColor.backgroundColor
                }
            }}
            style={{ justifyContent: "space-around", alignItems: 'center' }}
        >
            <View style={{ width: 30, height: 30 }}>
                {props.showLeftIcon ?
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={props.backTo}

                    >
                        <Icon name="arrow-back" size={25} color={commonStyles.headerIconColor.color} />
                    </TouchableOpacity>
                    : null
                }
            </View>

            <Title style={styles.headerTitleStyling}>{props.headerTitle}</Title>


            <View style={{ width: 30, height: 30 }}>
                {props.showRightIcon ?
                    <Icon name="arrow-back" size={25} color={commonStyles.headerIconColor.color} />
                    : null
                }
            </View>
        </Appbar.Header>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerTitleStyling: {
        color: commonStyles.headerTitleColor.color,
        fontSize: 22,
        textTransform: 'uppercase',
        width: 208,
        textAlign: 'center',
    }
})