import React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Image,Modal,ScrollView,KeyboardAvoidingView, FlatList } from 'react-native';
import {ListItem} from 'react-native-elements'
import MyHeader from '../components/myHeader'
import firebase from 'firebase'
import db from '../config'


export default class BookDonate extends React.Component{
    constructor(){
        super()
        this.state={
            requestedBooksList: []
        }
         this.requestref= null
    }
     
    getRequestedBooksList=()=>{
      this.requestref= db.collection("Book_Requests").onSnapshot((snapshot)=>{
        var requestedBooksList = snapshot.docs.map(document=>document.data())
        this.setState({
            requestedBooksList: requestedBooksList
        })
      })
    }
    componentDidMount(){
         this.getRequestedBooksList()
    }

    componentWillUnmount(){
        this.requestref()
    }

    keyExtractor=({item,index})=>index.toString()

    renderItem=({item,i})=>{
        return(
            <ListItem
            key={i}
            title={item.bookName}
            subtitle={item.bookReason}
            titleStyle={{color:'black',fontWeight:'Bold'}}
            leftElement={
                <Image 
                style={{height:50,width:50}}
                source={{
                    uri: item.image_link
                }}/>
            }
            rightElement={
                <TouchableOpacity style={{width:100, height:50,borderWidth:3,backgroundColor:"green"}}
                onPress={()=>{
                    this.props.navigation.navigate('RecieverDetails',{'details':item})
                }}
                >
                    <Text>View</Text>
                </TouchableOpacity>
            }
            bottomDivider>

            </ListItem>
        )
    }

    render(){
        return(
            <View>
                <MyHeader title= "Donate Books"/>
                {
                    this.state.requestedBooksList.length===0
                    ? (
                        <View>
                            <Text>List of All Requested Books</Text>
                        </View>
                    )
                    :(
                        <FlatList 
                        keyExtractor={this.keyExtractor}
                        data={this.state.requestedBooksList}
                        renderItem={this.renderItem}/>
                    )
                }
            </View>
        )
    }
}











