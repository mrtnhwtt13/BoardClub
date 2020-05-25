import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from '../constants';
import setAuthHeader from '../utils/setAuthHeader';

/**
 * If user's data are sent returns the payload with the user's data, else is set to false to empty previous user's data.
 * @param {String Object} data contains the data from the json response of the server
 */
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

/**
 * Request the server for the user data of the currently logged in user using the token in the Header. Sends the response's data to setCurrentUser
 */
export const getCurrentUser = () => dispatch => {
    axios.get('http://localhost:5000/api/users')
        .then(res => dispatch(setCurrentUser(res.data)))
}

/**
 * Request the server to login the user. If OK : Creates a jwtoken and stores it in the local storage. The token is also set in the Header for later calls. Else returns an error message.
 *  * @param {String Object} userData  contains two keys, login and password, both holding the input provided by the user attempting to log in as a string.
 */
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

/**
 * Request the server to register a new user using the input provided by the user. If OK: redirects to the login page, else returns an appropiate error message.
 * @param {String Object} userData contains 4 keys, email, login, password, password2, with 1 string associated containing the data the user inputed. 
 * @param {*} history prop used by react to navigate the URLs
 */
export const registerUser = (userData, history) => dispatch => {
    axios.post('http://localhost:5000/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

/**
 * Logs out the user and removes the jwtoken stored in local storage and in the Header. Calls setCurrentUser to remove the user that was set when logged.
 */
export const logoutUser = () => dispatch => {
	localStorage.removeItem('jwtToken')
	setAuthHeader()
	dispatch(setCurrentUser())
}