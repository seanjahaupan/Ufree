import { 
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  FACEBOOK_FETCH_DATA,
  ADD_FRIEND,
  FACEBOOK_LOGOUT,
  DEL_FRIEND,
  UPDATE_AVAIL,
  FETCH_FRIENDS
} from '../actions/types';

import firebase from 'firebase';
import _ from 'lodash';

const INITIAL_STATE = {token:null}


export default function(state=INITIAL_STATE, action){
  console.log('inside reducer, this is what im doing', action.type)
  switch(action.type) {
    case FACEBOOK_LOGIN_SUCCESS:

      //check if user was created before, if not, then run userCreate
      console.log(action.payload.token)
      userCreate(action.payload.profile, action.payload.token);

      //sets up the token, profile, and makes you available when you first sign on!
      return {...state, token: action.payload.token, profile: action.payload.profile, available: true};

    case FACEBOOK_LOGIN_FAIL:
      return {token: null};

    case FACEBOOK_FETCH_DATA:
      //console.log(action)
      return {...state, friendList: action.payload}

    case ADD_FRIEND:
    
      //expects action.payload to be an object of a friend candidate with properties 'name' and 'id'
      


      return state

    case DEL_FRIEND:
      //takes the array from actions.payload (aka my friends array) then grabs the data from the keys in my overall object
      console.log('deleting friend in reducer',action.payload)
      let filteredObject = _.omit(state, action.payload.id);
      return { filteredObject };

    case FACEBOOK_LOGOUT:
      return INITIAL_STATE

    case UPDATE_AVAIL:
    //change state in firebase and in props
      console.log('inside update avail, state is ',state.profile)
      //firebase.database().ref(`users/${state.profile.id}`).update({'available':action.payload}).catch()

      return {...state, available : action.payload }

    case FETCH_FRIENDS:
      let stateClone = _.cloneDeep(state);
      //takes the array from actions.payload (aka my friends array) then grabs the data from the keys in my overall object
      console.log('fetching friends in reducer',action.payload)
      return {
        ...stateClone,
        friends: {
          ...stateClone.friends,
          [action.payload.profile.id]: { 
            'name': action.payload.profile.name,
            'available': action.payload.available
          }
        },
      };
    default:
      return state;
  }
}

const userCreate = (profile, token) => {
  //creates a new account, makes you available when you first log in
  firebase.database().ref(`users/${profile.id}`).update({profile}).catch()
  firebase.database().ref(`users/${profile.id}`).update({'available':true}).catch()

  //ADD DISPATCH HERE TO SET STATE AS DONE LOADING!!
}


