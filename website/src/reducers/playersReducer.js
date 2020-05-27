import {
    JOIN_GAME,
    LEAVE_GAME
} from '../constants';


const initialState = {
    players: null,
}


export default function (state = initialState, action) {
    switch (action.type) {
            case JOIN_GAME:
            return {
                ...state,                
                players: action.payload
            }
            case LEAVE_GAME:
            return {
                ...state,                
                players: action.payload
            }
        default:
            return state
    }
}