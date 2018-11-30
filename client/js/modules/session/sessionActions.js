import { createActions } from 'redux-wings'
import api from 'api'
import appHistory from 'utils/appHistory'

/**
 * 
 * @property {String}  LOGIN_REQUEST
 * @property {String}  LOGOUT_REQUEST
 * @property {String}  LOGIN_ERROR
 * @property {String}  LOGOUT_REQUEST
 * @property {String}  LOGOUT_SUCCESS
 * @property {String}  LOGOUT_ERROR
 * 
 * @property {function} loginRequest
 * @property {function} logoutRequest
 * 
 */
const actions = {};

createAsyncActions({
    actions,
    sliceNamespace : 'session',
    actionParams : [{
        namespace : 'login',
        requestCaller (/*{ username, password }*/) {
            const username = 'robftw', password = 'testpass';
            return api.login({ username, password })
                .then( result => new Promise((resolve, reject) => {
                    // re-route user to landing page
                    appHistory.goTo('/feedback/share');
                    resolve(result);
                }));
        }
    }, {

        namespace : 'createAccount',
        requestCaller (params) {
            return api.createUser(params);
        }
    }
]});


actions.LOGOUT = 'session/LOGOUT';
actions.logout = ()=> ({
    type    : actions.LOGOUT
});

const  { 
    loginRequest,
    logout, 
    createAccountRequest,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_RESPONSE,
    CREATE_ACCOUNT_ERROR
} = actions;

export default actions

export {
    loginRequest,
    logout,
    createAccountRequest,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_RESPONSE,
    CREATE_ACCOUNT_ERROR
}