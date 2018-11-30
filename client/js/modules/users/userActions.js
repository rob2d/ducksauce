import { createActions } from 'redux-wings'
import api from 'api'

const { actions, asyncReducer } = createActions({
    actions,
    sliceNamespace : 'users',
    actions : [{
        namespace     : 'getUsers',
        stateVariable : 'userState',
        requestCaller : api.getUsers
    }
]});

const  { 
    getUsersRequest,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR
} = actions;

export default {
    ...actions,
    asyncReducer
}

export {
    asyncReducer,
    getUsersRequest,
    GET_USERS_REQUEST,
    GET_USERS_ERROR,
    GET_USERS_SUCCESS
}