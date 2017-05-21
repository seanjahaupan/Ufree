import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

class ListItem extends Component{
  onRowPress() {
    console.log(this.props)
  }

  render(){
    console.log(this.props)
    console.log(this.props.friend.available)
    return(
      <TouchableHighlight onPress={this.onRowPress.bind(this)}>
        <View style = {styles.outsideListItemView}>
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

export default connect(mapStateToProps)(ListItem);