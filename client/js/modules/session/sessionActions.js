import { createActions } from 'redux-wings'
import api from 'api'
import appHistory from 'utils/appHistory'

const { actions, asyncReducer } = createActions({
    sliceNamespace : 'session',
    actions : [{
        namespace : 'login',
        requestCaller (/*{ username, password }*/) {
            const username = 'robftw', password = 'testpass';
            return api.login({ username, password })
                .then( result => new Promise((resolve, reject) => {
                    // re-route user to landing page
                    appHistory.goTo('/feedback/share');
                    resolve(result);
                }));
        },
        stateVariable : 'loginState'
    }, {
        namespace : 'createAccount',
        requestCaller (params) {
            return api.createUser(params);
        },
        stateVariable : 'createAccountState'
    }
]});


actions.LOGOUT = 'session/LOGOUT';
actions.logout = ()=> ({
    type : actions.LOGOUT
});

const {
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

export default {
    ...actions,
    asyncReducer
}

export {
    asyncReducer,
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