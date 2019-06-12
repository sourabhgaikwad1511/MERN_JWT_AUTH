import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './UserReducer';
import errorReducer from './errorReducer';

export default combineReducers({
        auth: authReducer,
        user: userReducer,
        error: errorReducer
    })