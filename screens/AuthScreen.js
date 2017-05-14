import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Router from '../navigation/Router'

class AuthScreen extends Component{

  componentDidMount() {
    // this.props.facebookLogin();
    // this.onAuthComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigator.replace(Router.getRoute('rootNavigation')) 
    }
  }

  render(){
    return(
      <View style ={styles.AuthScreenStyle}>
        <Button title='log in here' onPress={()=> this.logIn()}/>
      </View>
    );
  }

  logIn() {
    //this.props.facebookLogin();
    //tryagain with firebase fb login
    this.props.firebaseFbLogin();
    
  }
}

const styles = StyleSheet.create({
  AuthScreenStyle: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


function mapStateToProps({ auth }){
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);