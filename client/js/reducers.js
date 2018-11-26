import { combineReducers } from 'redux'
import viewport            from './modules/viewport'
import session             from './modules/session'

export default combineReducers({ 
    viewport : viewport.reducer,
    session  : session.reducer,
});