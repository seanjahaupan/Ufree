import { 
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_FETCH_DATA
} from '../actions/types';

import firebase from 'firebase';

export default function(state={}, action){
  switch(action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      //after logging in successfully, get the states from the action payload, load up firebase and do two things
      // 1) try to get data from firebase
      // 2) if firebase account doesnt exist then try creating an account
      // 3) if all fails, send a fail request
      //console.log(action)
      userCreate(action.payload.profile, action.payload.token);


      return {...state, token: action.payload.token, profile: action.payload.profile};
    case FACEBOOK_LOGIN_FAIL:
    return {token: null};

    case FACEBOOK_FETCH_DATA:
      console.log('here is action.payload aka the on val from firebase')
      console.log(action)
      return {...state, friendProfile: action.payload}

    default:
      return state;
  }
}

const userCreate = (profile, token) => {
  //push stuff here
  let friends = false;
  console.log(profile)
  console.log(friends)

  // const provider = firebase.auth.FacebookAuthProvider
  // const credential = provider.credential(token)
  // let newUser = firebase.auth().signInWithCredential(credential)
  // console.log(newUser)


  //firebase.auth().createU
  console.log('trying to push shit')
  firebase.database().ref(`users/${profile.id}`).set({profile, friends}).catch()
  friends = true;

  //push after setting
  firebase.database().ref(`users/${profile.id}`).push({friends}).catch()
  console.log('done puushing to firebase')
}
