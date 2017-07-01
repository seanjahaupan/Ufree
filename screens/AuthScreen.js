import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Router from '../navigation/Router'


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
        source = {require('../assets/images/introSplash.png')}
        style = {styles.splashPage}
      >
      {/*fix button position*/}
        <Button title='log in here' backgroundColor='blue' onPress={()=> this.logIn()}/>
      </Image>
    );
  }

  logIn() {
    this.props.facebookLogin();
    
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
  }
});


function mapStateToProps({ auth }){
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);