import {
    ADD_COMMENT,
    LOADING_COMMENTS,
    GET_COMMENTS
} from '../constants';


const initialState = {
    list: null,
    loading: false
}


export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                list: [action.payload, ...state.list]
            }
        case LOADING_COMMENTS:
            return {
                ...state,
                loading: true
            }
        case GET_COMMENTS:
            return {
                ...state,
                loading: false,
                list: action.payload
            }
        default:
            return state
    }
}