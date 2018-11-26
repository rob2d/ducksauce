import { 
    toUpperSnakeCase
} from 'common/nameConversions'

// (this is from a W.I.P. library 
// of mine that has not been exported
// to NPM yet)

let actionVariants = [
    'REQUEST',
    'SUCCESS',
    'ERROR'
];

/**
 * populates a set of redux actions with
 * action namespace XXX and provides constants for
 * 
 * 
 * @param {Object} param0
 * @param {String} param0.namespace
 * @param {String} param0.sliceNamespace
 * @param {function} param0.requestCaller 
 */
function createAsyncAction ({ 
    actions, namespace, 
    sliceNamespace, requestCaller
 }) {
    let actionNsUC = toUpperSnakeCase(namespace);

    actionVariants.forEach( variant => {
        let actionType = `${sliceNamespace}/${
            actionNsUC}_${variant}`;
        
        actions[`${actionNsUC}_${variant}`] = actionType;
    });

    let requestMethodNs = `${namespace}Request`;

    actions[requestMethodNs] = function(payload=undefined) {
        return (dispatch, getState) => {
            // signal that request was made

            dispatch({ 
                type : actions[`${actionNsUC}_REQUEST`], 
                payload 
            });
            
            requestCaller(payload, getState)
                .then((response=undefined) => {
                    dispatch({ 
                        type : actions[`${actionNsUC}_SUCCESS`],
                        payload : response
                    });
                })
                .catch( error => {
                    dispatch({
                        type    : actions[`${actionNsUC}_ERROR`],
                        payload : error
                    });
                });
        };
    }
}

export default createAsyncAction