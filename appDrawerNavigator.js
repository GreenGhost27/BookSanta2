// To tell the computer which screens we want in our side bar menu

import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase'
import {createDrawerNavigator} from 'react-navigation-drawer'
import SideBar from './customSideBar'
import { AppTabNavigator } from './appTabNavigator';
import Settings from '../screens/settingScreen'
import Notifications from '../screens/notificationScreen'

export const AppDrawerNavigator= createDrawerNavigator({
    Home: {screen:AppTabNavigator},
    Setting:{
        screen:Settings
    },
    Notifications:{
        screen:Notifications
    }
},
    {
        contentCompenent: SideBar
    },
    {
        initialRouteName: 'Home'
    }
)




