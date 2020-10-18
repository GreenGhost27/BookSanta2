import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase'
import db from '../config'
 
export default class Settings extends React.Component{
    constructor(){
        super()
        this.state={
            emailID = '',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            docID: ''
        }
    }

    updateUserDetails=()=>{
      db.collection("User").doc(this.state.docID).update({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          conatct: this.state.contact
      })
    }

    getUserDetail=()=>{
        var email = firebase.auth().currentUser.email
        db.collection("User").where("emailID","==",email).get()
        .then(snapshot=>{
            snapshot.forEach((doc)=>{
                var data= doc.data()
                this.setState({
                    emailID: data.emailID,
                    firstName: data.firstName,
                    lastName: data.lastName, 
                    address: data.address,
                    contact: data.contact,
                    docID: doc.id
                })
            })
        })
    }

componentDidMount(){
this.getUserDetail()
}

    render(){
        return(
            <View>
            <TextInput style={{width:200,height:30,borderWidth:3}}
            placeholder="Enter First Name"
            onChangeText={(text)=>{
                this.setState({
                   firstName: text
                })
            }}
            value={this.state.firstName}/>

            <TextInput style={{width:200,height:30,borderWidth:3}}
            placeholder="Enter Last Name"
            onChangeText={(text)=>{
                this.setState({
                    lastName: text
                })
            }}
            value={this.state.lastName}/>

            <TextInput style={{width:200,width:30,borderWidth:3}}
            placeholder="Enter Address"
            multiline={true}
            onChangeText={(text)=>{
                this.setState({
                    address: text
                })
            }}/>

            <TextInput style={{width:200,height:30,borderWidth:3}}
            placeholder="Enter Contact Number"
            maxLength={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
                this.setState({
                    contact: text
                })
            }}
            value={this.state.contact}/>

            <TouchableOpacity style={{width:100,height:50,backgroundColor:"green",borderWidth:3}}
            onPress={()=>{
                this.updateUserDetails()
            }}>
                <Text>Save Changes</Text>
            </TouchableOpacity>

        </View>
        )
    }
}


















