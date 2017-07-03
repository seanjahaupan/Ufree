import React from 'react';
import { ScrollView, StyleSheet, Dimensions, Image, View } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import {connect} from 'react-redux';
import { facebookLogout } from '../actions'
import { Button } from 'react-native-elements';


const SCREEN_WIDTH = Dimensions.get('window').width
class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      //title: 'Settings',
      visible:false
    },
  };

  render() {
    return(
      <Image 
        source = {require('../assets/images/splashScreen.png')}
        style = {styles.splashPage}
      >
       <View
        style = {styles.flexStyle}>
          <Button 
            title='log out' 
            backgroundColor='#87F2FA' 
            onPress = {() => {
                this.props.facebookLogout()
            }}
            style = {styles.buttonStyle}
          />
        </View>
      </Image>
    );
    
  }
}

const styles = StyleSheet.create({
  splashPage: {
    flex:1,
    height:null,
    width:null,
    resizeMode:'stretch'
  },
   buttonStyle: {
  
     height:null,
     width:SCREEN_WIDTH

  },
  flexStyle: {
    flex:1,
    justifyContent:'flex-end',
    paddingBottom:40
  }
});


export default connect(null, {facebookLogout})(SettingsScreen);