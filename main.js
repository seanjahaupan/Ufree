import Expo from 'expo';
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationProvider, StackNavigation } from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';

import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import store from './store';


import Router from './navigation/Router';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

class AppContainer extends React.Component {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    this._loadAssetsAsync();
    // const config = {
    //   apiKey: "AIzaSyAd5hMEa3j5TTgxbcaszv4g4Jxj356A_Vg",
    //   authDomain: "ufree-82308.firebaseapp.com",
    //   databaseURL: "https://ufree-82308.firebaseio.com",
    //   projectId: "ufree-82308",
    //   storageBucket: "ufree-82308.appspot.com",
    //   messagingSenderId: "975253816135"
    // };
    // firebase.initializeApp(config);
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [require('./assets/images/expo-wordmark.png')],
        fonts: [
          FontAwesome.font,
          { 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf') },
        ],
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    if (this.state.appIsReady) {
      return (
        <Provider store = {store}>
          <View style={styles.container}>
            <NavigationProvider router={Router}>
              {/*<StackNavigation
                id="root"
                initialRoute={Router.getRoute('rootNavigation')}
              />*/}

              <StackNavigation
                id="auth"
                initialRoute={Router.getRoute('auth')}
              />
            </NavigationProvider>

            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' &&
              <View style={styles.statusBarUnderlay} />}
          </View>
        </Provider>
      );
    } else {
      return <Expo.AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

Expo.registerRootComponent(AppContainer);
