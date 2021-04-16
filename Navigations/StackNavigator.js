import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Navigations
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

//Screens
import Login from '../Screens/Login';
import Profile from '../Screens/Profile';
import AddPatient from '../Screens/AddPatientOnline';
import AllRequests from '../Screens/AllRequests';
import ViewPatients from '../Screens/ViewPatients';
import SplashScreen from '../Screens/SplashScreen';
import NewComplaint from '../Screens/NewComplaint';
import AllComplaints from '../Screens/AllComplaints';
import UpdateProfile from '../Screens/UpdateProfile';
import RequestDetails from '../Screens/RequestDetails';
import ForgotPassword from '../Screens/ForgotPassword';
import CampaignRequest from '../Screens/CampaignRequest';
import AddPatientOnline from '../Screens/AddPatientOnline';
import AddPatientOffline from '../Screens/AddPatientOffline';
import SelectAddPatient from '../Screens/SelectAddPatient';
import ComplaintDetails from '../Screens/ComplaintDetails';
import AddPatientResponse from '../Screens/AddPatientResponse';



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





import LoginScreen from '../Screens/LoginScreen';

//Navigators
import BottomTabNavigator from '../Navigations/BottomTabNavigator';

enableScreens();

const Stack = createNativeStackNavigator();


const StackNavigator = () => {
    const [foundUserToken, setFoundUserToken] = useState(null);

    useEffect(() => {
        try {
            const userToken = AsyncStorage.getItem('userToken');
            userToken ? setFoundUserToken(false) : setFoundUserToken(false);
            console.log("user Token is: ", userToken);
        } catch (error) {
            console.log("asyncStorage value get Error: ", error);
        }
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {foundUserToken === null ?
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
                    !foundUserToken ?
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
                                    component={LoginScreen}
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