import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoConfigView } from '@expo/samples';
import {connect} from 'react-redux';
import { facebookLogout } from '../actions'
import { Button } from 'react-native-elements';

class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Settings',
    },
  };

  render() {
    return (
      <ScrollView
      //To Do, make this logoutscreen look prettier
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
          <Button 
            title = 'log out'
            backgroundColor = 'blue'
            onPress = {() => {
              console.log('loggingout')
              this.props.facebookLogout()
            }}/>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default connect(null, {facebookLogout})(SettingsScreen);