import { 
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_FETCH_DATA
} from '../actions/types';

import firebase from 'firebase';

export default function(state={}, action){
  switch(action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      userCreate(action.payload.profile, action.payload.token);
      return {...state, token: action.payload.token, profile: action.payload.profile};
      
    case FACEBOOK_LOGIN_FAIL:
    return {token: null};

    case FACEBOOK_FETCH_DATA:
      console.log('here is action.payload aka the on val from firebase')
      console.log(action)
      return {...state, friendList: action.payload}

    default:
      return state;
  }
}

const userCreate = (profile, token) => {
  //creates a new account, will overwrite old account!!
  firebase.database().ref(`users/${profile.id}`).set({profile}).catch()

  //push after setting
  firebase.database().ref(`users/${profile.id}/`).push({friends}).catch()
  //add a dispatch to say that we're done

  //ADD DISPATCH HERE TO SET STATE AS DONE LOADING!!
}
