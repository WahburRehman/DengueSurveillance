import React, { useState, useEffect } from 'react';
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

//COMPONENTS
import SplashScreen from './SplashScreen';

const Profile = (props) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://10.0.2.2:3000/findOneHealthWorkersRecord', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': '605915ef97ab942584075529'
            })
        })
            .then(result => result.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setData(data);
                }
            }).catch(error => {
                console.log(error);
            })
        setIsLoading(false);
    }, []);


    const handleUpdateProfile = () => {
        props.navigation.navigate('updateProfile', {
            userID: data._id,
            email: data.email,
            contactNo: data.contactNo,
            dp: data.dp
        })
    }
    return (
        <>
            {isLoading ?
                <SplashScreen />
                :
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
                                <ScrollView>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                        <Image source={{ uri: 'data:image/png;base64,' + data.dp }} style={styles.profile} />
                                    </View>

                                    <View style={styles.detailsView}>
                                        <Title style={styles.title}>name</Title>
                                        <Paragraph style={styles.paragraph}>{data.name}</Paragraph>
                                    </View>

                                    <View style={styles.detailsView}>
                                        <Title style={styles.title}>user name</Title>
                                        <Paragraph style={styles.paragraph}>{data.userName}</Paragraph>
                                    </View>

                                    <View style={styles.detailsView}>
                                        <Title style={styles.title}>gender</Title>
                                        <Paragraph style={styles.paragraph}>{data.gender}</Paragraph>
                                    </View>

                                    <View style={styles.detailsView}>
                                        <Title style={styles.title}>dob</Title>
                                        <Paragraph style={styles.paragraph}>{data.dob}</Paragraph>
                                    </View>

                                    <View style={styles.detailsView}>
                                        <Title style={styles.title}>contact number</Title>
                                        <Paragraph style={styles.paragraph}>{data.contactNo}</Paragraph>
                                    </View>

                                    <View style={styles.detailsView}>
                                        <Title style={styles.title}>e-mail</Title>
                                        <Paragraph style={styles.paragraph}>{data.email}</Paragraph>
                                    </View>

                                    <View style={styles.detailsView}>
                                        <Title style={styles.title}>cnic</Title>
                                        <Paragraph style={styles.paragraph}>{data.cnic}</Paragraph>
                                    </View>

                                    <View style={styles.detailsView}>
                                        <Title style={styles.title}>city</Title>
                                        <Paragraph style={styles.paragraph}>{data.city}</Paragraph>
                                    </View>

                                    <View style={styles.detailsView}>
                                        <Title style={styles.title}>dispensary</Title>
                                        <Paragraph style={styles.paragraph}>{data.dispensary}</Paragraph>
                                    </View>

                                    <View style={styles.detailsView}>
                                        <Title style={styles.title}>joining date</Title>
                                        <Paragraph style={styles.paragraph}>{data.joiningDate}</Paragraph>
                                    </View>

                                    <View style={styles.detailsView}>
                                        <Title style={styles.title}>status</Title>
                                        <Paragraph style={styles.paragraph}>{data.status}</Paragraph>
                                    </View>
                                </ScrollView>
                            </ImageBackground>
                        </View>
                    </View>
                </SafeAreaView >
            }
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
    }
    ,
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
