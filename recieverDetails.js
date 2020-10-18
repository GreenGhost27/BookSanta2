import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,Modal,ScrollView,KeyboardAvoidingView, FlatList } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import {card} from 'react-native-elements'

export default class RecieverDetails extends React.Component{
    constructor(props){
     super(props)
      this.state={
          userID: firebase.auth().currentUser.email,
          recieverID: this.props.navigation.getParam('details')['user_ID'],
          requestID: this.props.navigation.getParam('details')['request_ID'],
          bookName: this.props.navigation.getParam('details')['book_name'],
          book_for_request: this.props.navigation.getParam('details')['book_request'],
          recieverName: '',
          recieverContact:'',
          recieverAddress:'',
          recieverRequestDocID: ''
      }
    }

getRecieverDetails=()=>{
db.collection('User').where('email_ID','==',this.state.recieverID).get()
.then(snapshot=>{
    snapshot.forEach(doc=>{
        this.setState({
            recieverName: doc.data().firstName,
            recieverContact: doc.data().contact,
            recieverAddress: doc.data().address
        })
    })
})
}

updateBookStatus=()=>{
db.collection('all_donations').add({
    book_name: this.state.bookName,
    request_id: this.state.requestID,
    requested_by: this.state.recieverName,
    donor_id: this.state.userID,
    request_status: "Donor Interested"
})
}

componentDidMount(){
this.getRecieverDetails()
}

addNotification=()=>{
    var message = this.state.username+"has shown interest in donating the book"
    db.collection('all_notifications').add({
    target_user_id: this.state.recieverID,
    donor_id: this.state.userID,
    request_id: this.state.requestID,
    book_name: this.state.bookName,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    notification_status: "Unread",
    message: message
    })
}

    render(){
        return(
         <View style={{flex:0.3}}>
            <Card title={"Book Information"}
            titleStyle={{fontSize:20}}>
            <Card><Text>Book Name:{this.state.bookName}</Text></Card>
        <Card><Text>Reason:{this.state.reasonToRequest}</Text></Card>
        </Card>
        <View style={{flex:0.3}}>
            <Card title={"Reciever Information"}
            titleStyle={{fontSize:16}}>
                <Card><Text>Name:{this.state.recieverName}</Text></Card>
        <Card><Text>Contact:{this.state.recieverContact}</Text></Card>
        <Card><Text>Address:{this.state.recieverAddress}</Text></Card>
            </Card>
        </View>
        <TouchableOpacity style={{width:100, height:50, borderWidth:3,backgroundColor:"blue"}}
        onPress={()=>{
            this.updateBookStatus()
            this.addNotification()
            this.props.navigation.navigate("MyDonations")
        }}>
            <Text>I want to Donate</Text>
        </TouchableOpacity>
           <Text>Reciever Details Screen</Text>
         </View>
        )
    }
    
}