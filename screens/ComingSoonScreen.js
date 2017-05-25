import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { facebookFetchData, addFriend, facebookLogout, deleteFriend, fetchFriends } from '../actions'
import Router from '../navigation/Router'

class ComingSoonScreen extends Component{

  onLogOut() {
    //console.log('onlogout')
    //this.props.navigator.replace(Router.getRoute('auth')) 
  }

  showState(){
    console.log(this.props)
  }
  render() {
    return(
        <View style = {styles.comingSoonStyle}>
          <Text style = {styles.comingSoonText}>
            Coming Soon!!
          </Text>
          <Text style = {styles.comingSoonText}>
            Hello {this.props.profile.name}
           
          </Text>
          <Image 
          //HARD CODED IMAGE!!
            source = {{ uri: `https://graph.facebook.com/${this.props.profile.id}/picture?type=large`}}
            style = {{ height: 100, width: 100}}
          />
          <Button 
            title = 'log out'
            onPress = {() => {
              console.log('loggingout')
              this.props.facebookLogout()
              this.onLogOut()
            }}/>

          <Button
            title = 'get profile data'
            onPress = {this.props.facebookFetchData} 
          />
         
          <Button
            title = 'add friend'
            onPress = {() => {
              this.props.addFriend('12341234') 
              //this.props.addFriend(78907890)
              }} 
          />

          {/*deletefriend*/}
          <Button
            title = 'delete friend'
            onPress = {() => this.props.deleteFriend(12341234)} 
          />

          <Button
            title = 'get state'
            onPress = {() => {this.showState()}} 
          />
          <Button
            title = 'fetch friends'
            onPress = {() => {this.props.fetchFriends()}}
          />
          <Button
            title = 'jump to home'
            onPress = {() => {
              //this.props.navigation.jumpToTab('home')
              console.log('props are ', this.props)
              //this.props.navigator.jumpToTab('home')
              this.props.navigation.performAction(({tabs, stacks}) => {
                
                tabs('main').jumpToTab('home');
                //console.log('tabs',tabs, 'stacks', stacks)
                //tabs('chat').jumpToTab('home')
            });
            }}
          />

        </View>
    );
  }
}

const styles = StyleSheet.create({
  
  comingSoonStyle:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  comingSoonText:{
    fontSize:40,
    color:'white'
  }
});

function mapStateToProps({ auth }){
  //console.log(auth)
  return { token: auth.token, profile: auth.profile };
}

export default connect(mapStateToProps, {facebookFetchData, addFriend, facebookLogout, deleteFriend, fetchFriends})(ComingSoonScreen);