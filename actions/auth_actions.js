import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_FETCH_DATA,
  ADD_FRIEND,
  FACEBOOK_LOGOUT,
  DEL_FRIEND, 
  UPDATE_AVAIL
} from './types';

import firebase from 'firebase';
import _ from 'lodash';


//AsyncStorage.setItem('fb_token', token);
//AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  console.log(AsyncStorage)
  let token = await AsyncStorage.getItem('fb_token');
  let profile = JSON.parse(await AsyncStorage.getItem('fb_profile')) 

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
  await AsyncStorage.setItem('fb_profile', JSON.stringify(profile));
  authenticate(token)

  
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: {token,profile} });


  
};
const authenticate = (token) => {
  const provider = firebase.auth.FacebookAuthProvider
  const credential = provider.credential(token)
  //check to see how i can signin without deleting my user!!!
  firebase.auth().signInWithCredential(credential)

}

export const facebookFetchData = () => {
//uses redux thunk, passes in dispatch and store to get the redux store
  return (dispatch, store) => {
    const id = store().auth.profile.id //grabs users id from the Redux store
    let ref = firebase.database().ref(`/users/${id}`).on("value", function(snapshot) { //grabs data in firebase

    dispatch( { type: FACEBOOK_FETCH_DATA, payload: snapshot.val() });
  
  });
 }
};

export const addFriend = (newFriend) => {
  return (dispatch) => {
    dispatch( {type: ADD_FRIEND, payload: newFriend })
  }
}

export const deleteFriend = (badFriend) => {
  return (dispatch) => {
    dispatch( {type: DEL_FRIEND, payload: badFriend })
  }
}

export const facebookLogout = () => async (dispatch) => {
  
  await AsyncStorage.removeItem('fb_token').catch();
  await AsyncStorage.removeItem('fb_profile').catch();

  dispatch ({ type: FACEBOOK_LOGOUT, payload: null});
  
}

export const updateAvailability = (availability) => {
  return (dispatch) => {
    dispatch( {type: UPDATE_AVAIL, payload: availability})
  }
}

export const fetchFriends = () => {
  return(dispatch, store) => {
    const id = store().auth.profile.id
    let friendsArray = [];
    firebase.database().ref(`/users/${id}/friends`).on('value', function(snapshot){
      //console.log('fetch friends array',snapshot.val())
      //dispatch({type: FETCH_FRIENDS, payload:snapshot.val() });
       _.forEach(snapshot.val(),(val, key)=>{
        //console.log('inside map', key)
        //key is the friends id

          friendsArray.push(new Promise((resolve) => {
            firebase.database().ref(`/users/${key}`).on('value', function(snapshot){
              //console.log('inside the friend array', snapshot.val())
                resolve(snapshot.val());
                console.log(snapshot.val());
            });
          }));
        //create object here and use key to accessf irebase, return array of objects
      });

      Promise.all(friendsArray).then((data) => {
        console.log(data);
        friendsArray = [];
      });
    });
  }
};