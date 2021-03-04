import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

//STYLESHEET
import commonStyles from '../StyleSheets/StyleSheet';

//Navigations
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Screens
import Communication from '../Screens/Communication';

//Navigators
import DrawerNavigator from '../Navigations/DrawerNavigator';



const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => {
                    let iconName;
                    route.name === 'home' ? iconName = 'home' : iconName = 'people';
                    return <Icon name={iconName} size={20} color={color} />
                }
            })}

            tabBarOptions={{
                activeTintColor: commonStyles.textColor.color,
                inactiveTintColor: "#2F4F4F",
                activeBackgroundColor: commonStyles.bottomTabColor.color,
                inactiveBackgroundColor: commonStyles.bottomTabColor.color,
                labelStyle: {
                    fontSize: 15,
                    textTransform: 'uppercase'
                }
            }}
        >
            <BottomTab.Screen
                name="home"
                component={DrawerNavigator}
                options={{
                    tabBarLabel: "Home",
                }}

            />
            <BottomTab.Screen
                name="communication"
                component={Communication}
                options={{
                    tabBarLabel: "Communication",
                }}
            />
        </BottomTab.Navigator>
    );
}

export default BottomTabNavigator;