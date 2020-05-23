import {
    ADD_GAME,
    LOADING_GAMES,
    GET_GAMES,
    GET_GAMEBYID,
    DELETE_GAME
} from '../constants';


const initialState = {
    list: null,
    loading: false,
    single: null
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
            case GET_GAMEBYID:
            return {
                ...state,
                loading: false,
                single: action.payload
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