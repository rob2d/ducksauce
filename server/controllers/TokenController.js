const fs = require('fs');
const jwt = require('jsonwebtoken');
const ControllerClass = global.require('utils/ControllerClass');
const publicKey = process.env.JWT_SECRET;

const tokenOptions = {
    expiresIn:  '2h'
};

function handleCallback(resolve, reject) {
    return (err, result) => {
        if(err) { reject(err)  }  
        else    { resolve(result) }
    }
}

/**
 * Simple interface for dealing with JWT;
 * 
 * extracted into controller in case there
 * will be an associated database layer
 * 
 */
class TokenController extends ControllerClass {

    signToken ({ username, email }) {
        return new Promise((resolve, reject) => {
            jwt.sign({ username, email }, process.env.JWT_SECRET, tokenOptions, 
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

const instance = new TokenController();
module.exports = instance;