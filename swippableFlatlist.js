import  React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import {SwipeListView} from 'react-native-swipe-list-view'
import { Dimensions } from 'react-native';

export default class SwippableFlatlist extends React.Component{
    constructor(props){
        super(props)
        this.state={
            allNotifications: this.props.allNotifications
        }
    }
render(){
    return(
        <View>
<SwipeListView 
disableRightSwipe
data={this.state.allNotifications}
renderItem={this.renderItem}
renderHiddenItem={this.renderHiddenItem}
rightOpenValue={Dimensions.get('window').width}
previewRowKey={'0'}
onSwipeValueChange={this.onSwipeValueChange}>
</SwipeListView>
        </View>
    )
}
}

updateMarkAsRead=()=>{
    db.collection("all_notifications").doc(notification.doc_id).update({
        notification_status: "Read"
    })
}

onSwipeValueChange=(swipeData)=>{
var allNotifications =  this.state.allNotifications
const {key,value} = swipeData
if(value<Dimensions.get('window').width){
    const newData = [...allNotifications]
    const prevIndex = allNotifications.findIndex(item=>item.key===key)
    this.updateMarkAsRead(allNotifications[prevIndex])
    newData.splice(prevIndex,1)
    this.setState({
        allNotifications: newData
    })
}
}





















