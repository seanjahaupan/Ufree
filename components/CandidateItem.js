import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

class CandidateItem extends Component{
  onRowPress() {
    console.log(this.props)
  }

  render(){
    console.log(this.props)
    return(
      <TouchableHighlight onPress={this.onRowPress.bind(this)}>
        <View style = {styles.outsideListItemView}>
          <Image
            source = {{ uri: `https://graph.facebook.com/${this.props.candidate.id}/picture?type=large`}}
            style = {{ height: 60, width: 60}}
          />
          <View style = {styles.textBoxView}>
            <Text style = {styles.nameTextStyle}>{this.props.candidate.name}</Text>
          </View>
          
        </View>
      </TouchableHighlight>
    );
  }




};

const styles = StyleSheet.create({
  outsideListItemView: {
    flexDirection: 'row',
    //hardcoded height
    height:61,
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
    fontSize: 25
  }
});



export default CandidateItem;