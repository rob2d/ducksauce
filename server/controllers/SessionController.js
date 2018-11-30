const ControllerClass = global.require('utils/ControllerClass');
const UserController  = require('./UserController');
const TokenController = require('./TokenController');

class SessionController extends ControllerClass {
    
    /**
     * attemps to log a user into a session
     * 
     * @param {*} param0
     * 
     * @returns Promise whcih contains false if invalid, but otherwise 
     */
    attemptLogin ({ username, password }) {
        return new Promise((resolve, reject) => {
            UserController.getUsers({ ids : username })
                .then( ([userEntry]) => {
                    if(userEntry) {
                        bcrypt.compare(password, userEntry.password)
                            .then( isValidPW => {
                                if(!isValidPW) { 
                                    resolve(false); 
                                }
                                else {
                                    TokenController.signToken(username)
                                        .then( token => resolve({ user, token }) )
                                        .catch( reject );
                                }
                            }).catch( reject );

                    } else return(false);
                }).catch( reject );
        });
    }
}

// exporting singletons; only defined
// as class in case we'd like multiple
// instances/oop later

module.exports = new SessionController();