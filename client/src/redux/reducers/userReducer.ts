export interface UserState { 
  firstName: string , 
  lastName: string,
  sub?: string | null,
  height: number,
  weight: number,
}

const defaultUser: UserState = {
  firstName: '',
  lastName: '',
  sub: '',
  height: 0,
  weight: 0,
}

import { GET_USER, REMOVE_CURRENT_USER, SET_CURRENT_USER, UPDATE_USER } from '../actionTypes'
import { setCurrentUser } from '../actions';

export default function userReducer (user: UserState = defaultUser, action: any) {
  let userAction = action.user;
  switch (action.type) {

    case GET_USER:
      return userAction;

    case SET_CURRENT_USER:
      return userAction;

    case REMOVE_CURRENT_USER:
      return {};

    case UPDATE_USER:
      return { ...user, userAction }

    default:
      return user;
  }
}

/* ------------      HELPER FUNCTIONS     ------------------ */

function setUserAndRedirect (user: any, navigation: { navigate: (arg0: string) => void; }, dispatch: (arg0: any) => void) {
  dispatch(setCurrentUser(user));
  navigation.navigate('SignedIn');
}