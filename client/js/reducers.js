import { combineReducers, compose } from 'redux'
import viewport from './modules/viewport'
import session from './modules/session'
import users from './modules/users'

const sessionReducer = compose(
    session.actions.asyncReducer, 
    session.reducer
);

const userReducer = compose(
    users.actions.asyncReducer, 
    users.reducer
);

export default combineReducers({ 
    viewport : viewport.reducer,
    session  : sessionReducer,
    users    : userReducer
});