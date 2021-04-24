import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

//ACTIONS
import * as actions from '../Redux/Actions/actions';

//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//ICON
import Icon from 'react-native-vector-icons/Ionicons';
import AndDesginIcon from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const DrawerContent = (props) => {

    const dispatch = useDispatch();

    const handleSignOutButton = async () => {
        console.log('??')
        try {
            await AsyncStorage.removeItem('userInfoLocal');
            console.log("key Removed!!");
            dispatch(actions.changeLoginStatus(false));
        } catch (error) {
            console.log('remove Key Error: ', error);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View
                style={{
                    flex: 0.2,
                    backgroundColor: commonStyles.primaryColor.backgroundColor,
                    borderBottomRightRadius: 80,
                    borderTopRightRadius: 80,
                    marginRight: 5,
                    marginTop: 5,
                }}
            >
                <View style={{ marginLeft: 8, marginTop: 8 }}>
                    <Image source={{ uri: 'data:image/png;base64,' + props.userInfo.dp }} style={styles.profile} />
                    <Text style={styles.nameText}>{props.userInfo.name}</Text>
                </View>
            </View>

            <View style={{ flex: 0.8, backgroundColor: '#ffffff', zIndex: -1 }}>
                <View style={{ flex: 1, backgroundColor: commonStyles.primaryColor.backgroundColor }}>
                    <View
                        style={{
                            flex: 0.85,
                            backgroundColor: '#ffffff',
                            borderTopLeftRadius: 80,
                            borderBottomRightRadius: 80,
                            flexDirection: 'column',
                            paddingHorizontal: '15%',
                            paddingVertical: '15%'
                        }}
                    >
                        <View style={styles.DrawerItemView}>
                            <View style={styles.iconView}>
                                <Icon name="home" size={25} color="#606060" />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => props.navigation.navigate('home')}>
                                <Text style={styles.DrawerItemText}>home</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.DrawerItemView}>
                            <View style={styles.iconView}>
                                <Icon name="person" size={25} color="#606060" />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => props.navigation.navigate('profile')}>
                                <Text style={styles.DrawerItemText}>profile</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.DrawerItemView}>
                            <View style={styles.iconView}>
                                <AndDesginIcon name="logout" size={25} color="#606060" />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={handleSignOutButton}>
                                <Text style={styles.DrawerItemText}>Sign out</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ flex: 0.15, backgroundColor: '#ffffff' }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: commonStyles.primaryColor.backgroundColor,
                                borderTopLeftRadius: 80,
                                borderBottomLeftRadius: 80,
                                marginLeft: 5,
                                marginBottom: 5
                            }}
                        >
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default DrawerContent;

const styles = StyleSheet.create({
    DrawerItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    iconView: {
        width: '30%',
    },
    nameText: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ffffff',
        textTransform: 'uppercase',
        marginTop: 5
    },
    DrawerItemText: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginLeft: '5%',
        color: '#606060'
    },
    profile: {
        width: 80,
        height: 80,
        borderWidth: 3,
        borderColor: '#ffffff',
        borderRadius: 40,
    }
})
