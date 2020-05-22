import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import gameReducer from './gameReducer';
import userReducer from './userReducer';


export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    game: gameReducer,
    user: userReducer
})