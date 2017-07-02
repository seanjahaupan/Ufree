import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Router from '../navigation/Router'


const SCREEN_WIDTH = Dimensions.get('window').width
class AuthScreen extends Component{

  componentDidMount() {
     this.props.facebookLogin();
     this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      //this.props.navigator.replace(Router.getRoute('rootNavigation')) 
    }
  }

  render(){
    /*return(
      <View style ={styles.AuthScreenStyle}>
        <Button title='log in here' onPress={()=> this.logIn()}/>
      </View>
    );*/
    return(
      <Image 
        source = {require('../assets/images/splashScreen.png')}
        style = {styles.splashPage}
      >
      {/*fix button position*/}
        <Button 
          title='log in here' 
          backgroundColor='#87F2FA' 
          onPress={()=> this.logIn()}
          style = {styles.buttonStyle}
        />
      </Image>
    );
  }

  logIn() {
    this.props.doFacebookLogin();
    
  }
}

const styles = StyleSheet.create({
  AuthScreenStyle: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  splashPage: {
    flex:1,
    height:null,
    width:null,
    resizeMode:'stretch'
  },
  buttonStyle: {
    //flex:1,
    position:'absolute',
    bottom:50,
    //justifyContent:'center',
    //alignItems:'center',
    height:null,
    width:SCREEN_WIDTH //edit this later to screen width

  }
});


function mapStateToProps({ auth }){
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);