import createAsyncActions from 'utils/redux-wings/createAsyncActions'
import api from 'api'

/**
 * 
 * @property {String} GET_USERS_REQUEST
 * @property {String} GET_USERS_SUCCESS
 * @property {String} GET_USERS_ERROR
 * 
 * @property {function} getUsersRequest
 */
const actions = {};

createAsyncActions({
    actions,
    sliceNamespace : 'users',
    actionParams : [{
        namespace : 'getUsers',
        requestCaller () { return api.getUsers() }
    }
]});

const  { 
    getUsersRequest,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_ERROR
} = actions;

export default actions

export {
    getUsersRequest,
    GET_USERS_REQUEST,
    GET_USERS_ERROR,
    GET_USERS_SUCCESS
}