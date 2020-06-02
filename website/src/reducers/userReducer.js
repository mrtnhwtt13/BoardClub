import {
    LOADING_USERS,
    GET_USERS,
    GET_USER,
    DELETE_USER,
    BAN_USER,
    
} from '../constants';

const initialState = {
    list: null,
    user: null,
    status: "",
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_USERS:
            return {
                ...state,
                loading: true
            }
        case GET_USERS:
            return {
                ...state,
                loading: false,
                list: action.payload
            }
        case GET_USER:
            return {
                ...state,
                loading: false,
                user: action.payload,
                status: action.status
            }
        case BAN_USER:
            return {
                ...state,
                loading: false,
                list: state.list
            }
        case DELETE_USER:
            return {
                ...state,
                loading: false,
                list: state.list.filter(item => item !== action.payload)
            }
        default:
            return state
    }
}