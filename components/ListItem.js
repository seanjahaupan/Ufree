import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

class ListItem extends Component{

  render(){
    return(
      <View style = {styles.outsideListItemView}>
        <Image
          source = {{ uri: `https://graph.facebook.com/${this.props.profile.id}/picture?type=large`}}
          style = {{ height: 100, width: 100}}
        />
        <View style = {styles.textBoxView}>
          <Text style = {styles.nameTextStyle}>{this.props.profile.name}</Text>
          <Text>im available</Text>
        </View>
        
      </View>
    );
  }




};

const styles = StyleSheet.create({
  outsideListItemView: {
    flexDirection: 'row',
    //hardcoded height
    height:100,
    backgroundColor:'aliceblue'
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