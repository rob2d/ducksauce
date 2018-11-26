const ControllerClass = global.require('utils/ControllerClass');
const UserController  = require('./UserController');

class SessionController extends ControllerClass {
    
    attemptLogin ({ username, password }) {
        return UserController.getUsers({ ids : username });
    }
}

// exporting singletons; only defined
// as class in case we'd like multiple
// instances/oop later

module.exports = new SessionController();