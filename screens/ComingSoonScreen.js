import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ComingSoonScreen extends Component{

  render() {
    return(
      <View style = {styles.comingSoonStyle}>
        <Text style = {styles.comingSoonText}>
          Coming Soon!!
        </Text>
      </View>
    );
  }
}

styles = StyleSheet.create({
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