import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';

import {
    Title,
    Paragraph
} from 'react-native-paper';

//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//ICON
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Profile = (props) => {

    const userInfo = useSelector(state => state.userInfo);

    const handleUpdateProfile = () => {
        props.navigation.navigate('updateProfile', {
            userID: userInfo._id,
            email: userInfo.email,
            contactNo: userInfo.contactNo,
            dp: userInfo.dp
        })
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#4169e1', padding: 5 }}>
                <View style={styles.headerView}>
                    <TouchableOpacity
                        style={styles.iconView}
                        activeOpacity={0.5}
                        onPress={() => props.navigation.navigate('home')}
                    >
                        <Icon name="arrow-back" size={30} color="#ffffff" />
                    </TouchableOpacity>

                    <Text style={styles.headerText}>PROFILE</Text>

                    <TouchableOpacity
                        style={styles.iconView}
                        activeOpacity={0.5}
                        onPress={handleUpdateProfile}
                    >
                        <MaterialCommunityIcons name="account-edit" size={30} color="#ffffff" />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentView}>
                    <View style={{ ...StyleSheet.absoluteFill }}>
                        <ImageBackground source={require('../Images/bg0.jpg')}
                            style={styles.imageBackground}
                        >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Image source={{ uri: 'data:image/png;base64,' + userInfo.dp }} style={styles.profile} />
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>name</Title>
                                    <Paragraph style={styles.paragraph}>{userInfo.name}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>user name</Title>
                                    <Paragraph style={styles.paragraph}>{userInfo.userName}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>gender</Title>
                                    <Paragraph style={styles.paragraph}>{userInfo.gender}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>dob</Title>
                                    <Paragraph style={styles.paragraph}>{userInfo.dob}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>contact number</Title>
                                    <Paragraph style={styles.paragraph}>{userInfo.contactNo}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>e-mail</Title>
                                    <Paragraph style={styles.paragraph}>{userInfo.email}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>cnic</Title>
                                    <Paragraph style={styles.paragraph}>{userInfo.cnic}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>city</Title>
                                    <Paragraph style={styles.paragraph}>{userInfo.city}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>dispensary</Title>
                                    <Paragraph style={styles.paragraph}>{userInfo.dispensary}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>joining date</Title>
                                    <Paragraph style={styles.paragraph}>{userInfo.joiningDate}</Paragraph>
                                </View>

                                <View style={styles.detailsView}>
                                    <Title style={styles.title}>status</Title>
                                    <Paragraph style={styles.paragraph}>{userInfo.status}</Paragraph>
                                </View>
                            </ScrollView>
                        </ImageBackground>
                    </View>
                </View>
            </SafeAreaView >
        </>
    );
}

export default Profile;

const styles = StyleSheet.create({
    headerView: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#ffffff'
    },
    contentView: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 80,
        borderRadius: 20
    },
    profile: {
        width: 90,
        height: 90,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 45,
    },
    imageBackground: {
        flex: 1,
        height: null,
        width: null,
        paddingVertical: '2%',
        paddingHorizontal: '7%'
    },
    detailsView: {
        marginVertical: 5
    },
    title: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
        color: commonStyles.primaryColor.backgroundColor
    },
    paragraph: {
        fontSize: 18,
        marginTop: 7,
        paddingLeft: 0
    }
})
