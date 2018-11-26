import { 
    makeAPIRequest, handleStdAPIError 
} from '../apiDependencies'

function login({ username, password }) {
    return new Promise((resolve, reject)=> {
        
        makeAPIRequest({ 
            method : 'post', 
            route  : 'login',
            params : { username, password }
        }).then( resolve )
        .catch( error => {
            handleStdAPIError({ error, reject });
        });
    });
}

export default login