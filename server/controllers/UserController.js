const generatePasswordHash = global.require('./utils/generatePasswordHash');
const ControllerClass      = global.require('./utils/ControllerClass');
const dbCollections        = global.require('constants/dbCollections');
const dbCollectionKeys     = global.require('constants/dbCollectionKeys');
const { 
    getEntries,
    upsertData, 
    deleteData
} = global.require('utils/db/ops');

const { USERS : collectionNS } = dbCollections;
const keyField = dbCollectionKeys[collectionNS][0].key;

/**
 * 
 * Responsible for user related data
 * 
 */
class UserController extends ControllerClass {

    /**
     * retrieve a list of all users
     * @param {Object} param0
     * @param {Array<Number>|Number} param0.ids
     * @param {Object} param0.pagination
     * @param {Object} param0.query
     */
    getUsers ({ ids = undefined, pagination = undefined, query = undefined }) {
        const collection = this._app.get('db').collection(collectionNS);
        const keyValueSets = {};
        
        if(ids) {
            keyValueSets[keyField] = ids;
        }

        return getEntries({ 
            keyValueSets, 
            collection, 
            pagination,
            query
        });
    }

    /**
     * Create new users
     * 
     * NOTE: update functionality does not
     * work here; need to first get data,
     * then verify username hasn't exist and
     * verify/compare password hash.
     * 
     * (skipping just for demo)
     * 
     * @param {Object} param0 
     * @param {String} param0.username
     * @param {String} param0.password
     * @param {String} param0.email
     */
    addOrUpdateUsers ({ data }) {
        return new Promise((resolve, reject)=> {
            const collection = this._app.get('db').collection(collectionNS);
            
            data = (!Array.isArray(data) ? [data] : data); // normalize before map op

            // first create password hashes and replace original
            // data entries with this new data

            const userCreators = data.map( user => new Promise((resolve, reject) => {
                generatePasswordHash(user.password)
                    .then( passwordHash => { 

                        user.password = passwordHash; 

                        // if we add a verification system,
                        // this should be 'pending' or some variation
                        // of that; for security reasons we do not
                        // directly post status

                        user.status   = 'active';
                        resolve(user);
                    }).catch( reject );
            }));

            Promise.all(userCreators).then( userData => {
                upsertData({ collection, data : userData })
                    .then(resolve);
            }).catch( reject );
        });
    }

    /**
     * Deletes Users
     * 
     * Uses pseudo Mongo query syntax 
     * for determining which data to delete
     * 
     * @param {*} param0 
     * @param {Object|Array} param0.data object or array of entries with
     *                                     field values for what to delete
     */
    deleteUsers({ data }) {
        const collection = this._app.get('db').collection(collectionNS);
        return deleteData({ collection, data });
    }
};

const instance = new UserController();
module.exports = instance;