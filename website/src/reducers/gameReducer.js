import {
    ADD_GAME,
    LOADING_GAMES,
    GET_GAMES,
    DELETE_GAME
} from '../constants';


const initialState = {
    list: null,
    loading: false
}


export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_GAME:
            return {
                ...state,
                list: [action.payload, ...state.list]
            }
        case LOADING_GAMES:
            return {
                ...state,
                loading: true
            }
        case GET_GAMES:
            return {
                ...state,
                loading: false,
                list: action.payload
            }
        case DELETE_GAME:
            return {
                ...state,
                loading: false,
                list: state.list.filter(item => item !== action.payload)
            }
        default:
            return state
    }
}