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
      userCreate(action.payload.profile);


      return {...state, token: action.payload.token, profile: action.payload.profile};
    case FACEBOOK_LOGIN_FAIL:
    return {token: null};
    default:
      return state;
  }
}

const userCreate = (profile) => {
  //push stuff here
  const friends = {};
  console.log(profile)

  //firebase.auth().createU
  //firebase.database().ref(`users/${profile.id}`).push({profile, friends}).catch()
  console.log('done puushing to firebase')
}