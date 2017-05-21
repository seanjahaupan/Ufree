import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, Switch } from 'react-native';
import { connect } from 'react-redux';

import { updateAvailability} from '../actions';

class ListItem extends Component{
  onRowPress() {
    console.log(this.props)
  }

  render(){
    console.log(this.props)
    return(
      <TouchableHighlight onPress={this.onRowPress.bind(this)}>
      <View style = {styles.outsideListItemView}>
        <View style = {[styles.availableColorView, this.props.available ? styles.green: styles.red ]}/>
        <Image
          source = {{ uri: `https://graph.facebook.com/${this.props.profile.id}/picture?type=large`}}
          style = {{ height: 100, width: 100}}
        />
        <View style = {styles.textBoxView}>
          <Text style = {styles.nameTextStyle}>{this.props.profile.name}</Text>
          <Text style = {styles.availableTextStyle}>{this.props.available ? 'Available' : 'Busy'} </Text>
        </View>
        <View style = {styles.switchStyle}>
        <Switch 
            value = {this.props.available}
            onValueChange={(value) => this.props.updateAvailability(value)}
          />
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
  switchStyle: {
    justifyContent:'center',
    alignItems:'center',
    paddingRight: 10
  },
  nameTextStyle: {
    fontSize: 30
  },
  availableTextStyle: {
    fontSize: 20
  }
});

function mapStateToProps({auth}){
  return {profile:auth.profile, available: auth.available}
}

export default connect(mapStateToProps, {updateAvailability})(ListItem);