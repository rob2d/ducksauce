const uuidv1 = require('uuid/v1');
const uuidv5 = require('uuid/v5');
const ControllerClass = global.require('utils/ControllerClass');

// TODO : rewrite for MongoDB Interface

/**
 * 
 * Controller/domain responsible for handling
 * verification-related hashes that users
 * would need a hash to visit URL for
 * 
 */
class VerificationController extends ControllerClass {

   /**
    * Retrieve a list of hashes for a given 
    * type of object to verify
    * 
    */
    getHashEntries ({ type }) {
        return Promise.resolve(true);
        /*
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM `verification_hashes` WHERE type = ?', 
                [type]
            ).then( resolve )
            .catch( reject );
        });
        */
    }

    /**
     * Given a hashing value and type of verification, 
     * generates a UUID hash and conveniently returns
     * a verification link to access that (based on type
     * provided)
     *  
     * @param {*} param0 
     */
    createHashURL ({ value, type }) {
        return Promise.resolve(true);
        /*
        return new Promise((resolve, reject) => {
            let v1NS = uuidv1();
            let hash = uuidv5(value, v1NS).replace(/-/g, '');

            db.query(
                'INSERT INTO `verification_hashes` (type, hash, value) ' + 
                `VALUES (?, ?, ?)`, 
                [type, hash, value]
            ).then( result => resolve(hash) )
            .catch( reject );
        });
        */
    }
}

// exporting singletons; only defined
// as class in case we'd like multiple
// instances/oop later

module.exports = new VerificationController();