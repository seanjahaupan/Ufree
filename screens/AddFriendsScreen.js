import React, { Component } from 'react';
import { View, TouchableHighlight, Text, Image, TextInput, ListView, StyleSheet } from 'react-native';

class AddFriendsScreen extends Component{
  static route = {
    navigationBar: {
      title: 'Add Friends',
    },
  };

  onChangeText(value){
    console.log(value)
  }
  render(){
    return(
      <View>
        <View style={styles.containerStyle}>
          <TextInput 
            placeholder = 'search...'
            autoCorrect={false}
            style={styles.inputStyle}
            onChangeText={(value)=>this.onChangeText(value)}
          />
        </View>


        <Text> Friend  1</Text>
        <Text> Friend  2</Text>
        <Text> Friend  3</Text>
        <Text> Friend  ...</Text>
        <Text> Friend  1</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    containerStyle:{
      height: 40
    }
    
})
export default AddFriendsScreen;