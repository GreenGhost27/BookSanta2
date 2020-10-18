import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,Modal,ScrollView,KeyboardAvoidingView, FlatList } from 'react-native';
import {ListItem,Icon} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'

export default class Notifications extends React.Component{

    constructor(){
        super()
        this.state={
          allNotifications: "",
          userId: firebase.auth().currentUser.email
        }
    }

    getNotifications=()=>{
        db.collection("all_notifications").where("notification_status","==","Unread")
        .where("targeted_user_Id","==",this.state.userId)
        .onSnapshot((snapshot)=>{
           var allNotifications = []
           snapshot.docs.map((doc)=>{
               var notifications = doc.data()
               notifications["doc_id"]=  doc.id
               allNotifications.push(notifications)
           })
           this.setState({
               allNotifications: allNotifications
           })
        })
    }

componentDidMount(){
    this.getNotifications()
}

    keyExtractor=({item,index})=>index.toString()

    renderItem=({item,index})=>{
        return(
          <ListItem 
          key={index}
          leftElement={<Icon name="book" type="font-awesome" color='#696969'></Icon>}
          title={item.book_name}
          titleStyle={{color:'black',fontWeight:'bold'}}
          subtitle={item.message}
          bottomDivider></ListItem>
        )
    }

    render(){
        return(
            <View>
<FlatList keyExtractor={this.keyExtractor}
                data={this.state.allNotifications}
                renderItem={this.renderItem}></FlatList>
               <Text>All Notifications</Text>
            </View>
        )
    }
}

















