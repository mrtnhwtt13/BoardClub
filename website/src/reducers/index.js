import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import gameReducer from './gameReducer';


export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    game: gameReducer
})