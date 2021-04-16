
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Appbar, Title } from 'react-native-paper';

// const {width} = Dimensions.get('Window');

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
            style={{ justifyContent: "space-between", alignItems: 'center' }}
        >
            <View style={{ marginLeft: 5 }}>
                {props.showLeftIcon ?
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={props.backTo}

                    >
                        <Icon name="arrow-back-outline" size={30} color={commonStyles.headerIconColor.color} />
                    </TouchableOpacity>
                    :
                    null
                }
            </View>

            <Title style={styles.headerTitleStyling}>{props.headerTitle}</Title>


            <View style={{ marginRight: 5 }}>
                {props.showRightIcon ?
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={props.rightIconPress}

                    >
                        <Icon name={props.rightIcon} size={30} color={commonStyles.headerIconColor.color} />
                    </TouchableOpacity>
                    :
                    null
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
        // width: 208,
        textAlign: 'center',
    }
})