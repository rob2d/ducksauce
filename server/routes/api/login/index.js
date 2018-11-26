const router = require('express').Router();
const SessionController = global.require('./controllers/SessionController');
const handle500Error = global.require('./utils/api-requests/handle500Error');

/**
 * @apiVersion 1.0.0
 * @api {post} /login Log in as an existing user
 * @apiName Login
 * @apiGroup Session
 */
router.post('/', (req, res) => {
    const { username, password } = req.body;

    if(username && username.length && password && password.length) {
        SessionController.attemptLogin({ username, password })
            .then( results => {
                const output = results.map( u => {
                    const { password, status, email, ...user } = u;
                    return user;
                })[0];
                res.status(200).json(output);
            }).catch( error => {
                console.log('error ->', error);
                handle500Error({ req, res, error });
            })
    } else {
        res.status(500).json({ message: 'Unknown error occured' });
    }
});

module.exports = router;