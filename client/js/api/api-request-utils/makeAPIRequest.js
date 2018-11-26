import request from 'axios'
const apiServerURL = 'http://localhost:3002/api';

function makeAPIRequest ({ route, method, params }) {
    return new Promise((resolve, reject)=> {
        const config = { url : `${apiServerURL}/${route}`, method };
        
        if(params) {
            config.data = params;     
        }

        request(config)
            .then( res => resolve(res.data) )
            .catch( error => {
                
                let errorPassed = (
                    error && error.response && error.response.data
                ) || error;
                
                reject(errorPassed)
            });
    });
}

export default makeAPIRequest