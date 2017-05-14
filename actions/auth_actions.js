import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';


//AsyncStorage.setItem('fb_token', token);
//AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  let profile = await AsyncStorage.getItem('fb_profile')
  
  ///REMOVE THIS!!
  token = null
  profile = null
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

  await AsyncStorage.setItem('fb_token', token);

console.log('got token')
console.log(token)
  const result = await fetch(
    `https://graph.facebook.com/me/?access_token=${token}`
  );
  const profile = await result.json();

  // console.log('got profile');

  // console.log(profile);

  await AsyncStorage.setItem('fb_profile', profile.toString());
  //put this shit in firebase
  console.log('got this far')
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: {token,profile} });


  
};