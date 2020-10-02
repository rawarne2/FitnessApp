import { GET_USER, REMOVE_CURRENT_USER, SET_CURRENT_USER } from './actionTypes'
import { UserState } from './reducers/userReducer';
export const getUser = (user: UserState) => ({type: GET_USER, user})
export const setCurrentUser = (user: UserState) => ({ type: SET_CURRENT_USER, user });
export const removeCurrentUser = () => ({ type: REMOVE_CURRENT_USER });

