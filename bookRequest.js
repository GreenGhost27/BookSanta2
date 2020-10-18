import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,Modal,ScrollView,KeyboardAvoidingView, TouchableHighlight, FlatList } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/myHeader'
import {BookSearch} from 'react-native-google-books'

export default class BookRequest extends React.Component{
    constructor(){
        super()
        this.state={
            bookName: '',
            reason: '',
            user_ID: firebase.auth().currentUser.email,
            isBookRequestActive: '',
            book_status: "",
            docID: "",
            requestID: "",
            userDocID: "",
            image_link: "",
            date: "",
            dataSource: "",
            showFlatlist: false
        }
    }

    createUniqueID(){
        return Math.random().toString(36).substring(7)
    }

    addRequest=async(bookName,bookReason)=>{
        var userID = this.state.userID
        var randomRequestID = this.createUniqueID()
        var books = await BookSearch.searchbook(bookName,'AIzaSyA7UwvnXN2sx1iVhTFHAzS779Ew8-9Lhz8')
        db.collection("Book_Requests").add({
            "user_ID": userID,
             "book_name": bookName,
             "reason": bookReason,
             "request_ID": randomRequestID,
             book_status: "Requested",
             
             image_link: books.data[0].volumeInfo.imageLinks.smallThumbnail
            })
        this.getIsBookRequestActive()
        db.collection("User").where("email_id","==",userID).get()
        .then()
        .then((snapshot)=>{
           snapshot.forEach((doc)=>{
               db.collection("User").doc(doc.id).update({
                   isBookRequestActive: true
               })
           })
        })

        this.setState({
            book_name: '',
            reason: ''
        })
    }

getIsBookRequestActive=()=>{
    db.collection("User").where("email_id","==",this.state.userID).onSnapshot((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            this.setState({
              isBookRequestActive: doc.data().isBookRequestActive,
              userDocID: doc.id
            })
        })
    })
}

getBooksFromApi = async(bookName)=>{
this.setState({
    book_name: bookName
})
if(bookName.length>2){
    var books = await BookSearch.searchbook(bookName,'AIzaSyA7UwvnXN2sx1iVhTFHAzS779Ew8-9Lhz8')
    this.setState({
        dataSource: books.data,
        showFlatlist: true
    })
}
}
renderItem = ({item,i})=>{
    return(
        <TouchableHighlight style={{alignItems:"center", backgroundColor:"blue",
        padding:10,width:'90%'}}
        activeOpacity={0.6}
        underlayColor="white"
        onPress={()=>{
            this.setState({
                showFlatlist: false,
                bookName: item.volumeInfo.title
            })
        }}
        bottomDivider>
        <Text>{item.volumeInfo.title}</Text>
        </TouchableHighlight>
    )
}
render(){
    if(this.state.isBookRequestActive===true){
        return(
            <View>
                <Text>{this.state.bookName}</Text>
        <Text>{this.state.book_status}</Text>
            </View>
        )
    }
    else{
    return(
        <View>
<MyHeader title="Request Book"/>
<FlatList data={this.state.dataSource}
renderItem={this.renderItem}
enableEmptySections={true}
style={{marginTop:10}}
keyExtractor={(item,index)=>{
    index.toString()
}}>
</FlatList> 
<TextInput  style={{width:200,height:30,borderWidth:3}}
placeholder="Enter Book Name"
onChangeText={(text)=>{
   this.setState({
       bookName: text
   }) 
}}
value={this.state.bookName}/>

<TextInput style={{width:200,height:30,borderWidth:3}}
placeholder="Enter reason for book"
onChangeText={(text)=>{
    this.setState({
        reason: text
    })
}}
value={this.state.reason}/>

<TouchableOpacity style={{width:100,height:50,borderWidth:3,backgroundColor:"green"}}
onPress={this.addRequest(this.state.bookName,this.state.reason)}>
    <Text>Send Request</Text>
</TouchableOpacity>

        </View>
    )
}
}
}








