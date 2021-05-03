import React, { useState } from 'react';
import moment from 'moment';
import {
    View,
    ScrollView,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

//COMPONENTS
import CardButton from '../Components/cardButton';

//ICONS
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//STYLESHEETS
import commonStyles from '../StyleSheets/StyleSheet';

const Home = (props) => {

    const dispatch = useDispatch();
    const date = moment().format('DD-MM-YYYY')
    const state = useSelector(state => state.userInfo);
    // console.log('state: ', state);

    const navigateTo = (screen) => {
        console.log('called navigato to')
        props.navigation.navigate(screen, { from: 'home' });
    }

    return (
        <SafeAreaView style={{ ...styles.containerView, ...StyleSheet.absoluteFill }}>
            <ImageBackground
                source={require('../Images/dashboard.jpg')}
                style={{ flex: 1, height: null, width: null }}
            >
                <View style={{ paddingHorizontal: 20, paddingTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => props.navigation.openDrawer()}
                    >
                        <MaterialCommunityIcons name="menu-open" size={45} color="#ffffff" />
                    </TouchableOpacity>

                    <Image
                        style={styles.dp}
                        source={{ uri: 'data:image/png;base64,' + state.dp }}
                    />
                </View>

                <View style={styles.greetingTextView}>
                    <Text style={styles.greetingText}>Welcome,</Text>
                    <Text style={styles.greetingText}>{state.name}</Text>
                    <Text style={styles.date}>Date: {date}</Text>
                </View>

                <View style={styles.imageBackgroundView} >
                    <ImageBackground
                        source={require('../Images/bg0.jpg')}
                        style={{ ...styles.imageBackground }}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.cardButtonView}>
                                <CardButton
                                    cardButtonName="Add Patient"
                                    iconName="person-add"
                                    iconColor={commonStyles.cardButtonIconColor.color}
                                    goTo={() => navigateTo('selectAddPatient')}
                                />

                                <CardButton
                                    cardButtonName="View Patients"
                                    iconName="eye"
                                    iconColor={commonStyles.cardButtonIconColor.color}
                                    goTo={() => navigateTo('viewPatients')}
                                />
                            </View>

                            <View style={styles.cardButtonView}>
                                <CardButton
                                    cardButtonName="Campaigns"
                                    iconName="search"
                                    iconColor={commonStyles.cardButtonIconColor.color}
                                    goTo={() => navigateTo('allRequests')}

                                />

                                <CardButton
                                    cardButtonName="Campaign Msg"
                                    iconName="chatbox-ellipses"
                                    iconColor={commonStyles.cardButtonIconColor.color}
                                    goTo={() => navigateTo('sendSms')}
                                />
                            </View>

                            <View style={styles.cardButtonView}>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => navigateTo('allComplaints')}
                                    style={styles.cardButtonStyling}
                                >
                                    <Icon name="sad-outline" size={60} color={commonStyles.cardButtonIconColor.color} />
                                    <Text style={styles.cardButtonTextStyling}>Complaints</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            </ImageBackground>
        </SafeAreaView >
    );
}
export default Home;

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: '#4169e1',
        // flexDirection: 'column-reverse'
    },
    dp: {
        width: 60,
        height: 60,
        // borderWidth: 1,
        // borderColor: '#ffffff',
        borderRadius: 20,
    },
    greetingTextView: {
        paddingHorizontal: 20,
        marginBottom: 20
    },
    greetingText: {
        fontSize: 22,
        color: '#ffffff',
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginBottom: 2
    },
    date: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    imageBackgroundView: {
        flex: 1,
        overflow: 'hidden',
        borderTopStartRadius: 50,
        borderTopEndRadius: 50
    },
    imageBackground: {
        flex: 1,
        height: null,
        width: null,
        paddingVertical: '2%',
        paddingHorizontal: '5%',
    },
    cardButtonView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    cardButtonStyling: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60%',
        height: 110,
        backgroundColor: '#ffffff',
        borderRadius: 15
    },
    cardButtonTextStyling: {
        fontSize: 16,
        color: commonStyles.primaryColor.backgroundColor,
        marginTop: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});