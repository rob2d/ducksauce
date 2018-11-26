const fs  = require('fs');
const jwt = require('jsonwebtoken');
const ControllerClass = global.require('utils/ControllerClass');

const tokenOptions = {
    expiresIn:  '2h'
};

function handleCallback(resolve, reject) {
    return (err, result) => {
        if(err) { reject(err)       } 
        else    { resolve(result) }
    }
}

class TokenController extends ControllerClass {

    signToken (userId) {
        return new Promise((resolve, reject)=> {
            jwt.sign({ userId }, process.env.JWT_SECRET, tokenOptions, 
                handleCallback(resolve, reject)
            );
        });
    }

    /**
     * 
     * @param {Object} param0 
     * @param {String} param0.token
     * @param {Object} param0.options
     * @param {String} param0.options.issuer
     * @param {String} param0.options.subject
     * @param {String} param0.options.audience
     * 
     * @returns {Promise} resolves boolean
     */
    verifyToken (token) {
        return new Promise((resolve, reject)=> {
            try {
                jwt.verify(token, publicKey, tokenOptions, 
                    handleCallback(resolve, reject)
                );
            }catch (err){
                resolve(false);
            }
        });
    }
}

// exporting singletons; only defined
// as class in case we'd like multiple
// instances/oop later

module.exports = new TokenController();