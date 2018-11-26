import { 
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from './sessionActions'
import SessionStates from 'constants/SessionStates'

const initialState = {
    sessionState : SessionStates.LOGGED_OUT,
    username     : undefined
};

const reducer = (state = { ...initialState }, { type, payload } ) => {
    switch(type) {
        
        // for now, we are just mocking a successful state

        case LOGIN_ERROR : 
        case LOGIN_SUCCESS : 
            return Object.assign({ ...state }, {
                username : payload.username,
                sessionState : SessionStates.LOGGED_IN
            });
        case LOGOUT : 
            return Object.assign({ ...state }, {
                username : undefined,
                sessionState : SessionStates.LOGGED_OUT
            });
        default:
            return state;
    }
};

export default reducer