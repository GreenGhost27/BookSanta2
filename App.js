import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/welcomeScreen'
import {AppTabNavigator} from './components/appTabNavigator'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'

export default class App extends React.Component {
  render(){
  return (
    <AppContainer />
  )
}
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen: {screen: WelcomeScreen},
  DonateBook: {screen: AppTabNavigator}
})

const AppContainer = createAppContainer(switchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
