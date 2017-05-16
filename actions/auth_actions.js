import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_FETCH_DATA,
  ADD_FRIEND,
  FACEBOOK_LOGOUT
} from './types';

import firebase from 'firebase';


//AsyncStorage.setItem('fb_token', token);
//AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  let profile = await AsyncStorage.getItem('fb_profile')
  
  // ///REMOVE THIS!!
  // token = null
  // profile = null
  if (token && profile) {
    // dispatch an action to say FB login is done
    dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: {token, profile}});
  } else {
    // start up fb login process
    doFacebookLogin(dispatch);
  }

}; 

const doFacebookLogin = async dispatch => {
  let {type, token} = await Facebook.logInWithReadPermissionsAsync('864048573736511', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  //grabbing token
  await AsyncStorage.setItem('fb_token', token);
  const result = await fetch(
    `https://graph.facebook.com/me/?access_token=${token}`
  );
  const profile = await result.json();

  await AsyncStorage.setItem('fb_profile', profile.toString());
  //put this shit in firebase

  authenticate(token)

  
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: {token,profile} });


  
};
const authenticate = (token) => {
  const provider = firebase.auth.FacebookAuthProvider
  const credential = provider.credential(token)

  firebase.auth().signInWithCredential(credential)

}

export const facebookFetchData = () => {
//uses redux thunk, passes in dispatch and store to get the redux store
  return (dispatch, store) => {
    const id = store().auth.profile.id //grabs users id from the Redux store
    let ref = firebase.database().ref(`/users/${id}`).on("value", function(snapshot) { //grabs data in firebase
    console.log('this is snapshot val',snapshot.val())

    dispatch( { type: FACEBOOK_FETCH_DATA, payload: snapshot.val() });
  
  });
 }
};

export const addFriend = (newFriend) => {
  return (dispatch) => {
    dispatch( {type: ADD_FRIEND, payload: newFriend })
  }
}

export const facebookLogout = async dispatch => {
  await AsyncStorage.removeItem('fb_token', token);
  await AsyncStorage.removeItem('fb_profile', profile.toString());
  return (dispatch) => {
    dispatch({ type: FACEBOOK_LOGOUT, payload: false})
  }
}