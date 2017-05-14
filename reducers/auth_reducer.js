import { 
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from '../actions/types';

import firebase from 'firebase';

export default function(state={}, action){
  switch(action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      //after logging in successfully, get the states from the action payload, load up firebase and do two things
      // 1) try to get data from firebase
      // 2) if firebase account doesnt exist then try creating an account
      // 3) if all fails, send a fail request
      console.log(action)
      userCreate(action.payload.profile, action.payload.token);


      return {...state, token: action.payload.token, profile: action.payload.profile};
    case FACEBOOK_LOGIN_FAIL:
    return {token: null};
    default:
      return state;
  }
}

const userCreate = (profile, token) => {
  //push stuff here
  const friends = {friends: {}};
  console.log(profile)

  // const provider = firebase.auth.FacebookAuthProvider
  // const credential = provider.credential(token)
  // let newUser = firebase.auth().signInWithCredential(credential)
  // console.log(newUser)


  //firebase.auth().createU
  console.log('trying to push shit')
  firebase.database().ref(`users/${profile.id}`).push({profile, friends}).catch()
  console.log('done puushing to firebase')
}