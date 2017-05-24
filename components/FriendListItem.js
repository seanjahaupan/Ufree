import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Alert } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { deleteFriend } from '../actions';

class ListItem extends Component{
  onRowPress() {
    console.log(this.props)
  }

  onLongRowPress() {
    console.log(this.props)
    Alert.alert(
      "Delete Friend",
      `Are you sure you want to delete ${this.props.friend.name} as a friend?`,
      [
        {text: 'Yes', onPress: () => {
          console.log('bye felicia')
          this.deleteFriend(this.props.friend)
        }},
        {text: 'No', onPress: () => console.log('Good')}
      ]
    
    )
  }

  deleteFriend(badFriend) {
    //takes in an object 'bad friend'
    firebase.database().ref(`users/${this.props.profile.id}/friends/${badFriend.id}`).update({'isFriend':null});
    this.props.deleteFriend(badFriend);
    //call update to list here
  }

  render(){
    return(
      <TouchableHighlight 
        onPress={this.onRowPress.bind(this)}
        onLongPress={() => this.onLongRowPress()}
        >
        
        <View style = {styles.outsideListItemView}>
          <View style = {[styles.availableColorView, this.props.friend.available ? styles.green: styles.red ]}/>
          <Image
            source = {{ uri: `https://graph.facebook.com/${this.props.friend.id}/picture?type=large`}}
            style = {{ height: 100, width: 100}}
          />
          <View style = {styles.textBoxView}>
            <Text style = {styles.nameTextStyle}>{this.props.friend.name}</Text>
            <Text>{this.props.friend.available ? 'Available' : 'Busy'}</Text>
          </View>
          
        </View>
      </TouchableHighlight>
    );
  }




};

const styles = StyleSheet.create({
  availableColorView:{
    height:100,
    width:10,
    backgroundColor:'grey'
  },
  green: {
    backgroundColor:'lawngreen'
  },
  red: {
    backgroundColor:'red'
  },
  outsideListItemView: {
    flexDirection: 'row',
    //hardcoded height
    height:101,
    backgroundColor:'whitesmoke',
    borderBottomWidth:1
  },
  textBoxView: {
    flexDirection:'column',
    justifyContent: 'space-around',
    alignItems:'center',
    flex:1
  },
  nameTextStyle: {
    fontSize: 30
  }
});

function mapStateToProps({auth}){
  return {profile:auth.profile}
}

export default connect(mapStateToProps, {deleteFriend})(ListItem);