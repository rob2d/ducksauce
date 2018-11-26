import { 
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
    GET_USERS_REQUEST
} from './userActions'
import { actions as sessionActions } from 'session'
import LoadingStates from 'constants/LoadingStates'

const { LOGIN_SUCCESS } = sessionActions;

const initialState = {
    usersState : LoadingStates.IDLE,
    userMap    : new Map()
};

const reducer = (state = { ...initialState }, { type, payload }) => {
    let userMap;
    switch(type) {
        case LOGIN_SUCCESS : 
            userMap = new Map(userMap);
            userMap.set(payload.username, payload);
            return Object.assign({ ...state }, { 
                userMap 
            });
        case GET_USERS_REQUEST : 
            return Object.assign({ ...state }, {
                usersState : LoadingStates.LOADING
            });
        case GET_USERS_ERROR :
            return Object.assign({ ...state }, {
                usersState : LoadingStates.ERROR
            });
        case GET_USERS_SUCCESS : 
            userMap = state.userMap;

            payload.forEach( user => {
                userMap.set(user.username, user);
            });

            return Object.assign({ ...state }, {
                usersState : LoadingStates.SUCCESS,
                userMap    : new Map(userMap)
            });
        default:
            return state;
    }
};

export default reducer