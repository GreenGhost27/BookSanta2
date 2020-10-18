import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import SantaAnimation from '../components/santaClause'


export default class WelcomeScreen extends React.Component{
    constructor(){
        super()
        this.state={
            emailID: '',
            password: '',
            isModalVisible: 'false',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: ''
        }
    }

showModal=()=>{
return(
    <Modal 
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}>
<View>
<ScrollView style={{width:'100%'}}>
<KeyboardAvoidingView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
<TextInput style={{width:200,height:30,borderWidth:3}}
placeholder= "First name"
onChangeText={(text)=>{
    this.setState({
        firstName: text
    })
}}
value={this.state.firstName}/>

<TextInput style={{width:200,height:30,borderWidth:3}}
placeholder= "Last Name"
onChangeText={(text)=>{
    this.setState({
        lastName: text
    })
}}
value={this.state.lastName}/>

<TextInput style={{width:200,height:30,borderTopWidth:3}}
placeholder="Enter Address"
onChangeText={(text)=>{
    this.setState({
        address: text
    })
}}
multiline={true}
value={this.state.address}/>

<TextInput style={{width:200,height:30,borderWidth:3}}
placeholder="Enter Contact"
onChangeText={(text)=>{
    this.setState({
        contact: text
    })
}}
maxLength={10}
keyboardType={'numeric'}
value={this.state.contact}/>

<TextInput style={{width:200,height:30,borderWidth:3}}
placeholder="Enter E-Mail"
onChangeText={(text)=>{
    this.setState({
    emailID: text
})
}}
keyboardType={"email-address"}
value={this.state.emailID}/>

<TextInput style={{width:200,height:30,borderWidth:3}}
placeholder="Enter Password"
secureTextEntry={true}
onChangeText={(text)=>{
    this.setState({
        password: text
    })
}}
value={this.state.password}/>

<TextInput style={{width:200,height:30,borderWidth:3}}
placeholder="Confirm Password"
secureTextEntry={true}
onChangeText={(text)=>{
this.setState({
    confirmPassword: text
})
}}
value={this.state.confirmPassword}/>

<TouchableOpacity style={{width:100,height:40,backgroundColor:"green",borderWidth:3,}}
onPress={()=>{
    this.userSignUp(this.state.emailID,this.state.password,this.state.confirmPassword)
}}>
<Text>Register</Text>
</TouchableOpacity>

<TouchableOpacity style={{width:100,height:40,backgroundColor:"green",borderWidth:3,}}
onPress={()=>{
    this.setState({
        isModalVisible: false
    })
}}>
<Text>Cancel</Text>
</TouchableOpacity>

</KeyboardAvoidingView>
</ScrollView>
</View>
</Modal>
)

}

userLogin=()=>{
firebase.auth().signInWithEmailAndPassword(this.state.emailID,this.state.password).then(()=>{
    this.props.navigation.navigate('DonateBook')
}).catch((error)=>{
var errorCode=error.code
var errorMessage=error.message
return alert(errorMessage)
})
}

userSignUp=(emailID,password,confirmPassword)=>{
    if(password!==confirmPassword){
        alert("Password Does Not Match")
    }
    else{
    firebase.auth().createUserWithEmailAndPassword(this.state.emailID,this.state.password).then(()=>{
        return alert("User added Successfuly")
        db.collection("User").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            contact: this.state.contact,
            emailID: this.state.emailID,
            address: this.state.address,
            isBookRequestActive: false
        })
    }).catch((error)=>{
    var errorCode=error.code
    var errorMessage=error.message
    return alert(errorMessage)
    })
    }
    }

render(){
    return(
<View>
   
    
<TextInput style={{width:200,height:30,borderWidth:3}}
placeholder="Enter E-Mail" 
keyboardType='email-address'
onChangeText={(text)=>{
    this.setState({
        emailID: text
    })
}}
value={this.state.emailID}/>

<TextInput style={{width:200,height:30,borderWidth:3}}
placeholder="Enter Password"
secureTextEntry={true}
onChangeText={(text)=>{
    this.setState({
        password: text
    })
}}
value={this.state.password}/>

<TouchableOpacity style={{width:100,height:40,backgroundColor:"green",borderWidth:3,}}
onPress={()=>{
    this.userLogin()
}}>
<Text>Login</Text>
</TouchableOpacity>



</View>

    )
}



}







