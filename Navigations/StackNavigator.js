import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useSelector, useDispatch } from 'react-redux'

//ACTIONS
import * as actions from '../Redux/Actions/actions';

//Navigations
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

//Screens
import Login from '../Screens/Login';
import SendSms from '../Screens/SendSms';
import Profile from '../Screens/Profile';
import AllRequests from '../Screens/AllRequests';
import ViewPatients from '../Screens/ViewPatients';
import SplashScreen from '../Screens/SplashScreen';
import NewComplaint from '../Screens/NewComplaint';
import AllComplaints from '../Screens/AllComplaints';
import UpdateProfile from '../Screens/UpdateProfile';
import RequestDetails from '../Screens/RequestDetails';
import ForgotPassword from '../Screens/ForgotPassword';
import PatientDetails from '../Screens/PatientDetails';
import CampaignRequest from '../Screens/CampaignRequest';
import AddPatientOnline from '../Screens/AddPatientOnline';
import AddPatientOffline from '../Screens/AddPatientOffline';
import SelectAddPatient from '../Screens/SelectAddPatient';
import ComplaintDetails from '../Screens/ComplaintDetails';



// import {
//     Login,
//     Profile,
//     AddPatient,
//     AllRequests,
//     ViewPatients,
//     SplashScreen,
//     NewComplaint,
//     AllComplaints,
//     UpdateProfile,
//     RequestDetails,
//     ForgotPassword,
//     CampaignRequest,
//     ComplaintDetails,
//     AddPatientResponse
// } from '../Screens';

//Navigators
import BottomTabNavigator from '../Navigations/BottomTabNavigator';

enableScreens();

const Stack = createNativeStackNavigator();


const StackNavigator = (props) => {


    const dispatch = useDispatch();
    const isUserLoggedIn = useSelector(state => state.authentication);

    useEffect(() => {
        dispatch(actions.changeLoginStatus(null));
        getToken();
    }, []);

    const getToken = async () => {
        try {
            const getItem = await AsyncStorage.getItem('userInfoLocal');
            if (getItem) {
                const parsedItem = await JSON.parse(getItem);
                // console.log('user Data: ', parsedItem);
                if (parsedItem.authToken) {
                    dispatch(actions.storeUserInfo(parsedItem));
                    dispatch(actions.changeLoginStatus(true));
                }
            } else {
                dispatch(actions.changeLoginStatus(false));
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isUserLoggedIn === null ?
                    (
                        <>
                            <Stack.Screen
                                name="splashScreen"
                                component={SplashScreen}
                                options={{
                                    headerShown: false
                                }}
                            />
                        </>
                    )
                    :
                    isUserLoggedIn ?
                        (
                            <>
                                <Stack.Screen
                                    name="home"
                                    children={BottomTabNavigator}
                                    options={{
                                        headerShown: false
                                    }}
                                />

                                <Stack.Screen
                                    name="selectAddPatient"
                                    component={SelectAddPatient}
                                    options={{
                                        headerShown: false
                                    }}
                                />

                                <Stack.Screen
                                    name="addPatientOnline"
                                    component={AddPatientOnline}
                                    options={{
                                        headerShown: false
                                    }}
                                />

                                <Stack.Screen
                                    name="addPatientOffline"
                                    component={AddPatientOffline}
                                    options={{
                                        headerShown: false
                                    }}
                                />

                                <Stack.Screen
                                    name="viewPatients"
                                    component={ViewPatients}
                                    options={{
                                        headerShown: false
                                    }}
                                />

                                <Stack.Screen
                                    name="patientDetails"
                                    component={PatientDetails}
                                    options={{
                                        headerShown: false
                                    }}
                                />

                                <Stack.Screen
                                    name="campaignRequest"
                                    component={CampaignRequest}
                                    options={{
                                        headerShown: false
                                    }}
                                />

                                <Stack.Screen
                                    name="allRequests"
                                    component={AllRequests}
                                    options={{
                                        headerShown: false
                                    }}
                                />

                                <Stack.Screen
                                    name="requestDetails"
                                    component={RequestDetails}
                                    options={{
                                        headerShown: false
                                    }}
                                />

                                <Stack.Screen
                                    name="sendSms"
                                    component={SendSms}
                                    options={{
                                        headerShown: false
                                    }}
                                />


                                <Stack.Screen
                                    name="allComplaints"
                                    component={AllComplaints}
                                    options={{
                                        headerShown: false
                                    }}
                                />


                                <Stack.Screen
                                    name="newComplaint"
                                    component={NewComplaint}
                                    options={{
                                        headerShown: false
                                    }}
                                />

                                <Stack.Screen
                                    name="complaintDetails"
                                    component={ComplaintDetails}
                                    options={{
                                        headerShown: false
                                    }}
                                />

                                <Stack.Screen
                                    name="profile"
                                    component={Profile}
                                    options={{
                                        headerShown: false
                                    }}
                                />

                                <Stack.Screen
                                    name="updateProfile"
                                    component={UpdateProfile}
                                    options={{
                                        headerShown: false
                                    }}
                                />
                            </>
                        )
                        :
                        (
                            <>
                                < Stack.Screen
                                    name="login"
                                    component={Login}
                                    options={{
                                        headerShown: false
                                    }}
                                />


                                <Stack.Screen
                                    name="forgotPassword"
                                    component={ForgotPassword}
                                    options={{
                                        headerShown: false
                                    }}
                                />
                            </>
                        )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;