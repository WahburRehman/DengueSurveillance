import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

//Navigation
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

//Screens
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';

import DrawerContent from '../Components/DrawerContent';

//COMPONENTS
import SplashScreen from '../Screens/SplashScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    const userInfo = useSelector(state => state.userInfo);

    const [data, setData] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     fetch('http://10.0.2.2:3000/findOneHealthWorkersRecord', {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             'id': '605915ef97ab942584075529'
    //         })
    //     })
    //         .then(result => result.json())
    //         .then(data => {
    //             if (data.error) {
    //                 console.log(data.error)
    //                 setIsLoading(false);
    //             } else {
    //                 console.log(data.message)
    //                 setData(data);
    //                 setIsLoading(false);
    //             }
    //         }).catch(error => {
    //             console.log(error);
    //         })
    // }, []);
    return (
        <>
            {/* {isLoading ?
                <SplashScreen />
                : */}
            <Drawer.Navigator
                drawerType="slide"
                drawerContent={props => <DrawerContent {...props} />}
                drawerContentOptions={{ userInfo }}
            >
                <Drawer.Screen name="home" component={Home} />
                <Drawer.Screen name="profile" component={Profile} />
            </Drawer.Navigator >
            {/* } */}
        </>
    );
}

export default DrawerNavigator;
