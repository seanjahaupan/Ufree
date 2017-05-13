import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

class ComingSoonScreen extends Component{

  render() {
    return(
        <View style = {styles.comingSoonStyle}>
          <Text style = {styles.comingSoonText}>
            Coming Soon!! fuck
          </Text>
          <Button 
          title = 'log out'
          onPress = {() => AsyncStorage.removeItem('fb_token')}/>
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
export default ComingSoonScreen;