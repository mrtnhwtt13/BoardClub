import axios from 'axios';
import {
    ADD_GAME,
    GET_GAMES,
    GET_GAMEBYID,
    LOADING_GAMES,
    DELETE_GAME,
    GET_ERRORS
} from '../constants';


// loading action
export const loadGames = () => dispatch => {
    return {
        type: LOADING_GAMES
    }
}


// get game details by game Id
export const getGameById = (gameId) => dispatch => {
    dispatch(loadGames())
    axios.get(`http://localhost:5000/api/games/find/${gameId}`)
        .then(res => dispatch({
            type: GET_GAMEBYID,
            payload: res.data
        }))
        .catch(err => console.log(err))
}


// create a new game
export const createGame = gameData => dispatch => {
    axios.post('http://localhost:5000/api/games/create', gameData)
        .then(res => dispatch({
            type: ADD_GAME,
            payload: res.data
        }))
        .catch(err => console.log(err))
}


// delete a game
export const deleteGame = gameData => dispatch => {
    axios.post('http://localhost:5000/api/games/delete', gameData)
        .then(res => dispatch({
            type: DELETE_GAME,
            payload: res.data
        }))
        .catch(err => console.log(err))
}


// edit a game
export const editGame = (gameData, history) => dispatch => {
    axios.post('http://localhost:5000/api/games/edit', gameData)
        .then(res => history.push(`/`))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}


// get all games
export const getGames = () => dispatch => {
    dispatch(loadGames)
    axios.get('http://localhost:5000/api/games')
        .then(res => dispatch({
            type: GET_GAMES,
            payload: res.data
        }))
        .catch(err => console.log(err))
}