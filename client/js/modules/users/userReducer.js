import { 
    GET_USERS_SUCCESS,
    GET_USERS_ERROR,
    GET_USERS_REQUEST
} from './userActions'
import { actions as sessionActions } from 'session'

const { LOGIN_SUCCESS } = sessionActions;

const initialState = {
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
        case GET_USERS_SUCCESS : 
            userMap = state.userMap;

            payload.forEach( user => {
                userMap.set(user.username, user);
            });

            return Object.assign({ ...state }, {
                userMap : new Map(userMap)
            });
        default:
            return state;
    }
};

export default reducer