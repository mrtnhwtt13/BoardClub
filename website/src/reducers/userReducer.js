import {
    LOADING_USERS,
    GET_USERS,
    DELETE_USER,
    BAN_USER
} from '../constants';

const initialState = {
    list: null,
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