import {
    LOADING_USERS,
    GET_USERS
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
        default:
            return state
    }
}