import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from '../constants';
import setAuthHeader from '../utils/setAuthHeader';


export const setCurrentUser = (data) => {
    if ( data !== undefined ){
        return {
            type: SET_CURRENT_USER,
            payload: data
        }
    } else {
        return {
            type: SET_CURRENT_USER,
            payload: false
        }
    }
}


export const getCurrentUser = () => dispatch => {
    axios.get('http://localhost:5000/api/users')
        .then(res => dispatch(setCurrentUser(res.data)))
}


export const loginUser = (userData) => dispatch => {
    axios.post('http://localhost:5000/api/users/login', userData)
        .then(res => {
            const { token } = res.data
            localStorage.setItem('jwtToken', token)
            setAuthHeader(token);
            dispatch(getCurrentUser());
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}


export const registerUser = (userData, history) => dispatch => {
    axios.post('http://localhost:5000/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}


export const logoutUser = () => dispatch => {
	localStorage.removeItem('jwtToken')
	setAuthHeader()
	dispatch(setCurrentUser())
}