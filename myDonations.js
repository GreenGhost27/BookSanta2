import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,Modal,ScrollView,KeyboardAvoidingView, FlatList } from 'react-native';
import {ListItem} from 'react-native-elements'
import MyHeader from '../components/myHeader'
import firebase from 'firebase'
import db from '../config'

export default class MyDonations extends React.Component{
constructor(){
    super()
    this.state={
        donorId: firebase.auth().currentUser.email,
        donorName: "",
        allDonations: []
    }
    this.requestRef= null 
}

getDonorDetails=(donorId)=>{
db.collection("User").where("email_id","==",donorId).get()
.then((snapshot)=>{
snapshot.forEach((doc)=>{
    this.setState({
        donorName: doc.data().firstName+" "+doc.data().lastName
    })
})                       
})
}

getAllDonations=()=>{
    this.requestRef=db.collection("")
}

sendNotification=(bookDetails,requestStatus)=>{
var requestId = bookDetails.request_id
var donorId =  bookDetails.donor_id
db.collection("all_notifications").where("request_id","==",requestId)
.where("donor_id","==",donorId)
.get()
.then((snapshot)=>{
snapshot.forEach((doc)=>{
var message = ""
if(requestStatus==="Book Sent"){
message = this.state.donorName + "Sent you a book"
}
else{
   message = this.state.donorName + "Has Shown interest in donating the book" 
}
db.collection("all_notifications").doc(doc.id).update({
    message: message,
    notification_status: "Unread",
    date: firebase.firestore.FieldValue.serverTimestamp()
})
})
})
}

sendBook=(bookDetails)=>{
if(bookDetails.request_status==="Book Sent"){
    var requestStatus = "Donor Interested"
    db.collection("all_donations").doc(bookDetails.doc_id).update({
        request_status: "Donor Interested"
    })
    this.sendNotification(bookDetails,requestStatus)
}
else{
    var requestStatus = "Book Sent"
    db.collection("all_donations").doc(bookDetails.doc_id).update({
        request_status: "Book Sent"
    })
    this.sendNotification(bookDetails,requestStatus)
}
}

renderItem=({item,i})=>{
    <ListItem key={i}
    title={item.book_name}
    subtitle={"Requested by:"+item.requested_by+"Status:"+item.request_status}
    leftElement={<Icon name="Book" type="font-awesome" color="orange"/>}
    titleStyle={{color:'black', fontWeight:'bold'}}
    rightElement={<TouchableOpacity style={{width:100,height:50,borderWidth:3,borderColor:'blue'}}
    onPress={()=>{
        this.sendBook(item)
    }}>
        <Text>item.request_status==="Book Sent" ? "Book Sent" : "Send Book"</Text>
    </TouchableOpacity>}></ListItem>
}

keyExtractor=({item,index})=>index.toString()

    render(){
        return(
            <View>
                <FlatList keyExtractor={this.keyExtractor}
                data={this.state.allDonations}
                renderItem={this.renderItem}></FlatList>
               <Text>List of all donations made</Text>
            </View>
        )
    }
}



