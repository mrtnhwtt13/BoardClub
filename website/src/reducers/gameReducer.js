import {
    ADD_GAME,
    LOADING_GAMES,
    GET_GAMES,
    GET_GAMEBYID,
    DELETE_GAME,
    GET_GAME,
    JOIN_GAME,
    LEAVE_GAME
} from '../constants';


const initialState = {
    list: null,
    game: null,
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
        case GET_GAME:
            return {
                ...state,                
                loading: false,
                game: action.payload
            }
        case DELETE_GAME:
            return {
                ...state,
                loading: false,
                list: state.list.filter(item => item !== action.payload)
            }
            case JOIN_GAME:
            return {
                ...state,                
                loading: false,
                game: action.payload
            }
            case LEAVE_GAME:
            return {
                ...state,                
                loading: false,
                game: action.payload
            }
        default:
            return state
    }
}