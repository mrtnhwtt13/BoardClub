import axios from 'axios';
import {
    GET_USERS,
    LOADING_USERS
} from '../constants';


export const loadUsers = () => dispatch => {
    return {
        type: LOADING_USERS
    }
}


export const getAllUsers = () => dispatch => {
    dispatch(loadUsers)
    axios.get('http://localhost:5000/api/users/all')
        .then(res => dispatch({
            type: GET_USERS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}