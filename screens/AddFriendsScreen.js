import React, { Component } from 'react';
import { View, TouchableHighlight, Text, Image, TextInput, ListView, StyleSheet } from 'react-native';

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
    `https://graph.facebook.com/search?q=${value}&type=user`,{method: 'GET', headers: {authorization: 'OAuth EAAMR2PxOZAj8BAKyPhoFYJ4i2eVnCaRB0x0M3DZCg6GOdwaUho8ZBbbMEje6hYl3mmtrXJdLTI73IJT3lFFQ2ILHuE7cIkrgTsJLOGFTZCnaPu0yyEYRXJtHHBLN0Km0Kpslvg9AIUOt2OLoF7KPjR75D0vJMia0GzKmIp5DTtjjdcujc3ddtvWW7PZC7jayBZB5KP1idcRAZDZD'}}
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
      <View style = {{flex:1}}>
        <View style={styles.containerStyle}>
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
    inputStyle: {
        color: '#000',
        paddingRight: 10,
        paddingLeft: 10,
        fontSize: 25,
        lineHeight: 50,
        flex: 1
    },
    containerStyle:{
      height: 70
    },
    listViewStyle: {
      flex:1
    }
    
})
export default AddFriendsScreen;