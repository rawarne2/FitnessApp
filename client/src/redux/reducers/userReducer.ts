export interface UserState { 
  firstName: string , 
  lastName: string,
  sub: string | null,
  id?: number,
  height: number,
  weight: number,
  fitnessLevel: number,
}

const defaultUser: UserState = {
  firstName: '',
  lastName: '',
  sub: '',
  id: -1,
  height: 0,
  weight: 0,
  fitnessLevel: 0
}

import { GET_USER, REMOVE_CURRENT_USER, SET_CURRENT_USER } from '../actionTypes'
import { setCurrentUser } from '../actions';

export default function userReducer (user: UserState = defaultUser, action: any) {
  switch (action.type) {

    case GET_USER:
      return action.user;

    case SET_CURRENT_USER:
      return action.user;

    case REMOVE_CURRENT_USER:
      return {};

    default:
      return user;
  }
}

/* ------------      HELPER FUNCTIONS     ------------------ */

function setUserAndRedirect (user: any, navigation: { navigate: (arg0: string) => void; }, dispatch: (arg0: any) => void) {
  dispatch(setCurrentUser(user));
  navigation.navigate('SignedIn');
}