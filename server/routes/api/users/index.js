const router = require('express').Router();
const UserController = global.require('controllers/UserController');
const apiUtilPath = global.resolvePath('utils/api-requests/');
const getPaginationParams = global.require(apiUtilPath, 'getPaginationParams');
const handle500Error = global.require(apiUtilPath, 'handle500Error');
const handleResourceGetter = global.require(apiUtilPath, 'handleResourceGetter');
const verifyToken = global.require('middleware/verifyToken');

// block access to this part of API

router.all('*', verifyToken);

/**
 * @apiVersion 1.0.0
 * @api {get} /users Lists out available users
 * @apiName GetUsers
 * @apiGroup Users 
 */
router.get('/:ids?', (req, res) => {
    const pagination = getPaginationParams(req.query);
    const ids = req.params.id ? req.params.id : undefined; 

    UserController.getUsers({ ids, pagination, query : { status : 'active' } })
        .then( users => {
            
            // extract password hash before consumption 
            // so this is not available to client side
            // (+ status already filtered/unapplicable 
            // to API)
            
            const results = users.map( u => {
                const { password, status, ...user } = u;
                return user;
            });

            handleResourceGetter({ req, res, results });
        })
        .catch( error => handle500Error({ req, res, error }) );
});

router.post('/', (req, res) => {
    UserController.addOrUpdateUsers({ data : req.body })
        .then( results  => res.status(200).json(results) )
        .catch( error => handle500Error({ req, res, error }) );
});

router.delete('/', (req,res) => {
    UserController.deleteUsers({ data : req.body })
        .then( results => res.status(200).json(results) )
        .catch( error => handle500Error({ req, res, error }));
});

module.exports = router;