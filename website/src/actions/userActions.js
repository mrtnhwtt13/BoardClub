import axios from 'axios';
import {
    GET_ERRORS,
    GET_USERS,
    GET_USER,
    LOADING_USERS,
    DELETE_USER,
    BAN_USER,
    FOLLOW,
    UNFOLLOW,
    REMOVE_FAVORITES,
    ADD_FAVORITES
} from '../constants';
import { getCurrentUser } from './authActions';


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


export const getFollowingUsers = () => dispatch => {
    dispatch(loadUsers)
    axios.get('http://localhost:5000/api/users/following')
        .then(res => dispatch({
            type: GET_USERS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}

export const followUser = (userId) => dispatch => {
	axios.post('http://localhost:5000/api/users/follow', { userId })
		.then(res => dispatch({
			type: FOLLOW,
			payload: res.data.userId
		}))
		.catch(err => console.log(err))
}

export const unfollowUser = (userId) => dispatch => {

	axios.post('http://localhost:5000/api/users/unfollow', { userId })
		.then(res => dispatch({
			type: UNFOLLOW,
			payload: res.data.userId
		}))
		.catch(err => console.log(err))
}

export const addBoardGameToFavorites = (userData) => dispatch => {
	axios.post('http://localhost:5000/api/users/addtofavorites', userData)
		.then(res => { 
            dispatch({
			type: ADD_FAVORITES,
			payload: userData.boardGameId
            })
            dispatch({
                type: GET_ERRORS,
                payload: { update: "Game added to favorites" }
            });
        })
		.catch(err => dispatch({
            type: GET_ERRORS,
            payload: { already: err.response.data }
        }))
}

export const removeBoardGameFromFavorites = (userData) => dispatch => {
	axios.post('http://localhost:5000/api/users/removefromfavorites', userData)
		.then(res => {
            dispatch({
			type: REMOVE_FAVORITES,
			payload: userData.boardGameId
            })
            dispatch({
                type: GET_ERRORS,
                payload: { update: "Game removed from favorites" }
            });
        })
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
            type: GET_USER,
            payload: res.data
        }))
        .catch(err => console.log(err))
}   


export const editUser = (currentUserId, userData, history) => dispatch => {
    axios.post('http://localhost:5000/api/users/edit', userData)
        .then(res => {
            if (currentUserId === userData._id) {
                dispatch(getCurrentUser())
            }
            history.push(`/admin`)
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}