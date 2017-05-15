import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { facebookFetchData, addFriend } from '../actions'

class ComingSoonScreen extends Component{

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
            source = {{ uri: `https://graph.facebook.com/10156176922324972/picture?type=large`}}
            style = {{ height: 100, width: 100}}
          />
          <Button 
          title = 'log out'
          onPress = {() => AsyncStorage.removeItem('fb_token')}/>

          <Button
          title = 'get profile data'
          onPress = {this.props.facebookFetchData} />

          <Button
          title = 'add friend'
          onPress = {() => this.props.addFriend(12341234)} />

          <Button
          title = 'get state'
          onPress = {() => {this.showState()}} />
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
  console.log(auth)
  return { token: auth.token, profile: auth.profile };
}

// function mapDispatchToProps(dispatch) {
//   return { facebookFetchData: ()=> dispatch(facebookFetchData())}
// }
export default connect(mapStateToProps, {facebookFetchData, addFriend})(ComingSoonScreen);