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

const INITIAL_STATE = {token:null}


export default function(state=INITIAL_STATE, action){

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

      firebase.database().ref(`users/${state.profile.id}/friends/${action.payload}`).update({'isFriend':true});


      return state

    case DEL_FRIEND:
      //try the employee way where i can get the uid
      //firebase.database().ref(`users/${state.profile.id}/friends`).orderByChild('id').equalTo(action.payload).remove
      firebase.database().ref(`users/${state.profile.id}/friends/${action.payload}`).update({'isFriend':null});
      return state

    case FACEBOOK_LOGOUT:
      return INITIAL_STATE

    case UPDATE_AVAIL:
    //change state in firebase and in props
      console.log('inside update avail, state is ',state.profile)
      firebase.database().ref(`users/${state.profile.id}`).update({'available':action.payload}).catch()
      return {...state, available : action.payload }

    case FETCH_FRIENDS:
      //takes the array from actions.payload (aka my friends array) then grabs the data from the keys in my overall object
      console.log('fetching friends in reducer',action.payload)
      return {...state, friends: {...state.friends,
                                  [action.payload.profile.id]:{  'name': action.payload.profile.name,
                                        'available': action.payload.available
                                      }
                                  } 
            }
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


