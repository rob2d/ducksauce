import { 
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from './sessionActions'
import SessionStates from 'constants/SessionStates'

const initialState = {
    sessionState : SessionStates.LOGGED_OUT,
    username     : undefined,
    token        : undefined
};

const reducer = (state = { ...initialState }, { type, payload } ) => {
    switch(type) {
        case LOGIN_ERROR : 
            return Object.assign({ ...state }, {
                username : payload.username,
                token : undefined,
                sessionState : SessionStates.LOGGED_OUT
            });
        case LOGIN_SUCCESS : 
            return Object.assign({ ...state }, {
                username : payload.username,
                token : payload.token,
                sessionState : SessionStates.LOGGED_IN
            });
        case LOGOUT : 
            return Object.assign({ ...state }, {
                username : undefined,
                token : undefined,
                sessionState : SessionStates.LOGGED_OUT
            });
        default:
            return state;
    }
};

export default reducer