import React from 'react'
import LottieView from 'lottie-react-native'

export default class SantaAnimation extends React.Component{
    render(){
        return(
            <LottieView 
            source={require('../assets/12568-santa-claus-is-coming-to-town.json')}
            style={{width:"60%"}}
            autoPlay loop
            />
                
            
        )
    }
}








