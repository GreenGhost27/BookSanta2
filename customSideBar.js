import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase'
import {DrawerItems} from 'react-navigation-drawer'


export default class SideBar extends React.Component{
render(){
    return(
       <View style={{flex:1}}>
        <View style={styles.drawerItemsContainer}>
           <DrawerItems {...this.props}/>
           <View style={styles.logOutContainer}>
           <TouchableOpacity style={{width:200,height:30,borderWidth:2,backgroundColor:'orange'}}
           onPress={()=>{
               this.props.navigation.navigate('WelcomeScreen')
               firebase.auth().signOut()
           }}>
               <Text>Logout</Text>
           </TouchableOpacity>
           </View>
        </View>
       </View>

    )
}
}

var styles= StyleSheet.create({
    container:{
        flex:1
    },

    drawerItemsContainer:{
        flex:0.8
    },

    logOutContainer:{
        flex:0.2,
        justifyContent:'flex-end',
        paddingBottom:30
    }

})






