import { 
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_FETCH_DATA,
  ADD_FRIEND,
  FACEBOOK_LOGOUT,
  DEL_FRIEND,
  UPDATE_AVAIL
} from '../actions/types';

import firebase from 'firebase';

export default function(state={token:null}, action){
  switch(action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      userCreate(action.payload.profile, action.payload.token);
      return {...state, token: action.payload.token, profile: action.payload.profile};

    case FACEBOOK_LOGIN_FAIL:
      return {token: null};

    case FACEBOOK_FETCH_DATA:
      //console.log(action)
      return {...state, friendList: action.payload}

    case ADD_FRIEND:
      //adds friend with firebase and returns the friend, firebase should update the friend list in props

      //check if friend already exists in database, if so, console log it
      // firebase.database().ref(`/users/${state.profile.id}/friends`).once("value", function(snapshot){
      //   console.log('here at least')
      //   //console.log(snapshot)
      //   if (!snapshot.hasChild(action.payload.toString())) {
      //     firebase.database().ref(`users/${state.profile.id}/friends`).push(action.payload).catch()
      //   } else {
      //     console.log('friend is already here!')
      //   }
      // });

      //do it legit


      return state

    case DEL_FRIEND:
      //try the employee way where i can get the uid
      //firebase.database().ref(`users/${state.profile.id}/friends`).orderByChild('id').equalTo(action.payload).remove
      return state

    case FACEBOOK_LOGOUT:
      return {...state, token: action.payload, profile: action.payload}

    case UPDATE_AVAIL:
    //change state in firebase and in props
      firebase.database().ref(`users/${state.profile.id}`).update({'available':action.payload}).catch()
      return {...state, available : action.payload }
    default:
      return state;
  }
}

const userCreate = (profile, token) => {
  //creates a new account, will overwrite old account!!
  firebase.database().ref(`users/${profile.id}`).update({profile}).catch()

  //ADD DISPATCH HERE TO SET STATE AS DONE LOADING!!
}


