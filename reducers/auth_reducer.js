import { 
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_FETCH_DATA,
  ADD_FRIEND
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
      //console.log(action)
      return {...state, friendList: action.payload}

    case ADD_FRIEND:
      //adds friend with firebase and returns the friend, firebase should update the friend list in props
      console.log('adding frined', action.payload)
      firebase.database().ref(`users/${state.profile.id}/friends`).push(action.payload).catch()
      return state
    default:
      return state;
  }
}

const userCreate = (profile, token) => {
  //creates a new account, will overwrite old account!!
  firebase.database().ref(`users/${profile.id}`).set({profile}).catch()

  //ADD DISPATCH HERE TO SET STATE AS DONE LOADING!!
}


