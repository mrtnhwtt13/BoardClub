import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import gameReducer from './gameReducer';
import userReducer from './userReducer';
import commentReducer from './commentReducer';
import playersReducer from './playersReducer';


export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    game: gameReducer,
    user: userReducer,
    comment: commentReducer,
    players: playersReducer,
})