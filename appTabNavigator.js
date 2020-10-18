import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import BookDonate from '../screens/bookDonate'
import BookRequest from '../screens/bookRequest'
import {createBottomTabNavigator} from 'react-navigation-tabs'

export const AppTabNavigator = createBottomTabNavigator({
    DonateBook: {screen: BookDonate},
    RequestBooks: {screen: BookRequest}
})

