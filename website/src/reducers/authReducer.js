import { SET_CURRENT_USER, FOLLOW, UNFOLLOW, ADD_FAVORITES, REMOVE_FAVORITES } from '../constants';


const initialState = {
    isAuthenticated: false,
    user: null
}


export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: Object.keys(action.payload).length !== 0,
                user: action.payload
            }
        case FOLLOW:
            return {
                ...state,
                user: {
                    ...state.user,
                    following: [...state.user.following, action.payload]
                }
            }
        case UNFOLLOW:
            return {
                ...state,
                user: {
                    ...state.user,
                    following: state.user.following.filter(item => item !== action.payload)
                }
            }
        case ADD_FAVORITES:
            return {
                ...state,
                user: {
                    ...state.user,
                    topGames: [...state.user.topGames, action.payload]
                }
            }
        case REMOVE_FAVORITES:
            return {
                ...state,
                user: {
                    ...state.user,
                    topGames: state.user.topGames.filter(item => item !== action.payload)
                }
            }
        default:
            return state;
    }
}