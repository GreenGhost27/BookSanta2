import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import BookDonate from '../screens/bookDonate'
import RecieverDetails from '../screens/recieverDetails'

export const AppStackNavigator = createStackNavigator({
bookDonateList: {
    screen: BookDonate
},

recieverDetails: {
    screen: RecieverDetails
},
},

{
    initialRouteName: 'bookDonateList'
})


