import React, { Component } from 'react';
import { View, TouchableHighlight, Text, Image, TextInput, ListView, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import CandidateItem from '../components/CandidateItem'
class AddFriendsScreen extends Component{
  static route = {
    navigationBar: {
      title: 'Add Friends',
    },
  };

  state = {dataArray: {}}

  async onChangeText(value){
    console.log(value)
    let searchList = await fetch(
    ////////HARDCODED AUTH IMPORTANT, TAKE OUT!!
    `https://graph.facebook.com/search?q='${value}'&type=user`,{method: 'GET', headers: {authorization: `OAuth ${this.props.token}`}}
    //////////////////
    );
    searchList = await searchList.json()
    const dataArray = searchList.data

    if (dataArray){
      this.setState({...this.state, dataArray });
    } else {
      this.setState({...this.state, dataArray: {}})
    }
    
    console.log('data array', dataArray)
    console.log('state is now',this.state)
  }

  componentWillMount() {
    this.createDataSource(this.state)
  }
  componentWillUpdate(nextProps,nextState) {
    this.createDataSource(nextState)
  }

 

  createDataSource({ dataArray }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(dataArray);
  }

  renderRow(candidate) {
    
    return <CandidateItem candidate={candidate} />;
  }



  render(){
    return(
      <View style = {styles.outerContainerStyle}>
        <View style={styles.searchContainerStyle}>
          <TextInput 
            placeholder = 'search...'
            autoCorrect={false}
            style={styles.inputStyle}
            onChangeText={(value)=>this.onChangeText(value)}
          />
        </View>
        <ListView
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
          style = {styles.listViewStyle}
        />

        
      </View>
    )
  }
}

const styles = StyleSheet.create({
    outerContainerStyle: {
      flex: 1,
      backgroundColor: 'lightgrey'
    },
    inputStyle: {
        color: '#000',
        paddingRight: 10,
        paddingLeft: 10,
        fontSize: 25,
        lineHeight: 50,
        flex: 1
    },
    searchContainerStyle:{
      height: 70,
      borderBottomWidth: 1,
      backgroundColor:'whitesmoke',
    },
    listViewStyle: {
      flex:1
    }
    
});

function mapStateToProps({auth}){
  return {token: auth.token}
}
export default connect(mapStateToProps)(AddFriendsScreen);