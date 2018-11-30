const bcrypt = require('bcrypt');
const ControllerClass = global.require('utils/ControllerClass');
const UserController = require('./UserController');
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
            UserController.getUsers({ username : username })
                .then(([ user ]) => {
                    if(user) {
                        bcrypt.compare(password, user.password)
                            .then( isValidPW => ( !isValidPW ? 
                                Promise.resolve(false) :
                                TokenController.signToken(user.username)
                            )).then( token => resolve({ user, token }))
                            .catch( reject );
                            
                    } else resolve(false);
                }).catch( reject );
        });
    }
}

// exporting singletons; only defined
// as class in case we'd like multiple
// instances/oop later

module.exports = new SessionController();