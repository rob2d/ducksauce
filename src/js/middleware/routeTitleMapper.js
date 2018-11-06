import { LOCATION_CHANGE } from 'connected-react-router/lib/actions'

/**
 * Based on a given path name,
 * determine what the title should be;
 * 
 * Use this function to dictate app's
 * title behavior 
 * 
 * @param {*} pathname 
 */
function getWindowTitle (pathname) {
    switch(pathname) {
        default : 
            return pathname;
    }
}

const routeTitleMapper = store => next => action => {   

    // if we detect an action of route changing,
    // label section appropriately

    if(action.type == LOCATION_CHANGE) {
        const { pathname } = action.payload.location;
        
        window.document.title = getWindowTitle(pathname);
    }
    return next(action);
};

export default routeTitleMapper