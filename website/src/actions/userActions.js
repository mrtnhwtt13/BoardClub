import axios from 'axios';
import {
    GET_USERS,
    LOADING_USERS,
    DELETE_USER,
    BAN_USER
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


export const deleteUser = userData => dispatch => {
    axios.post('http://localhost:5000/api/users/delete', userData)
        .then(res => dispatch({
            type: DELETE_USER,
            payload: res.data
        }))
        .catch(err => console.log(err))
}


export const banUser = userData => dispatch => {
    axios.post('http://localhost:5000/api/users/ban', userData)
        .then(res => dispatch({
            type: BAN_USER,
            payload: res.data
        }))
        .catch(err => console.log(err))
}
export const getUserById = (userId) => dispatch => {
    dispatch(loadUsers)
    axios.get(`http://localhost:5000/api/users/find/${userId}`)
        .then(res => dispatch({
            type: GET_USERS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}