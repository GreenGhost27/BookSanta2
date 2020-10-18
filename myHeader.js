import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import {Header,Icon,Badge} from 'react-native-elements'

const bellIconWithBadge=(props)=>{
return(
    <View>
        <Icon name="bell" type="font-awesome" color='white' size={25} onPress={()=>{props.navigation.navigate('notificationScreen')}}></Icon>
        <Badge value="1" containerStyle={{position:'absolute',top:-4,right:-4}}></Badge>
    </View>
)
}

const MyHeader = props=>{
    return(
        <Header 
        centerComponent={{text:props.title,style:{color:'blue',fontSize:20,fontWeight:"bold"}}}
        backgroundColor="green"
        leftComponent={<Icon name="bars" type="font-awesome" color='white'  onPress={()=>{this.props.navigation.toggleDrawer()}}></Icon>}
        rightComponent={<bellIconWithBadge {...props}></bellIconWithBadge> }/>
    )
}

export default MyHeader