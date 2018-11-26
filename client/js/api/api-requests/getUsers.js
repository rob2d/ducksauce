import { 
    makeAPIRequest, handleStdAPIError 
} from '../apiDependencies'

function getUsers() {
    return new Promise((resolve, reject)=> {
        makeAPIRequest({ method : 'get', route : 'users'})
            .then( resolve )
            .catch( error => {
                handleStdAPIError({ error, reject });
            });
    });
}

export default getUsers