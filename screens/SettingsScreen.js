import React from 'react';
import { ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
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
        <Button 
          title='log out' 
          backgroundColor='#87F2FA' 
          onPress = {() => {
              this.props.facebookLogout()
          }}
          style = {styles.buttonStyle}
        />
      </Image>
    );
    
  }
}

const styles = StyleSheet.create({
    buttonStyle: {
    position:'absolute',
    bottom:50,
    //justifyContent:'center',
    //alignItems:'center',
    width:SCREEN_WIDTH //edit this later to screen width

  },
  splashPage: {
    flex:1,
    height:null,
    width:null,
    resizeMode:'stretch'
  },
});


export default connect(null, {facebookLogout})(SettingsScreen);