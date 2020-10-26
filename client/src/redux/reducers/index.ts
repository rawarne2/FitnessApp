import { combineReducers } from "redux";
import userReducer, { UserState } from './userReducer';

export default combineReducers({ user: userReducer });

export interface RootState {
  user: UserState
}