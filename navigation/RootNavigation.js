import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Notifications } from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';

import Router from './Router';
import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';

class RootNavigation extends React.Component {
  componentDidMount() {
    // this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    // this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {

    //if not signed in show auth, else show the tabs
    if(!this.props.token){
      return (
        <StackNavigation
            id="auth"
            initialRoute={Router.getRoute('auth')}
        />
      );
    } else {
      return (
        <TabNavigation tabBarHeight={56} initialTab="home">
          <TabNavigationItem
            id="home"
            renderIcon={isSelected => this._renderIcon('home', isSelected)}>
            <StackNavigation initialRoute="home" />
          </TabNavigationItem>

          <TabNavigationItem
            id="addFriends"
            renderIcon={isSelected => this._renderIcon('plus-square', isSelected)}>
            <StackNavigation initialRoute="addFriends" />
          </TabNavigationItem>

          <TabNavigationItem
            id="chat"
            renderIcon={isSelected => this._renderIcon('wechat', isSelected)}>
            <StackNavigation initialRoute="chat" />
          </TabNavigationItem>
     
        </TabNavigation>
      );
    }

  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }



  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});

function mapStateToProps({auth}){
  return { token: auth.token};
}

export default connect(mapStateToProps)(RootNavigation);