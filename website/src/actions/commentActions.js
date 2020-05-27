import axios from 'axios';
import {
    ADD_COMMENT,
    GET_COMMENTS,
    LOADING_COMMENTS,
    GET_ERRORS
} from '../constants';


export const loadComments = () => dispatch => {
    return {
        type: LOADING_COMMENTS
    }
}


export const addComment = commentData => dispatch => {
    axios.post('http://localhost:5000/api/comments/add', commentData)
        .then(res => dispatch({
            type: ADD_COMMENT,
            payload: res.data
        }))
        .catch(err => console.log(err))
}


export const getCommentsByGameId = (gameId) => dispatch => {
    dispatch(loadComments)
    axios.get(`http://localhost:5000/api/comments/game/${gameId}`)
        .then(res => dispatch({
            type: GET_COMMENTS,
            payload: res.data
        }))
        .catch(err => console.log(err))
}