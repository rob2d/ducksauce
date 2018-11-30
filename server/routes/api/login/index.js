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
            .then( ([{ userEntry, token }]) => {
                if(userEntry && token) {
                    const { 
                        password, status, email, 
                        ...user 
                    } = userEntry;
                    
                    res.status(200).json({ user, token });
                } else {
                    res.status(401).send({ message : 'user not found' });
                }
            }).catch( error => {
                handle500Error({ req, res, error });
            })
    } else {
        res.status(500).json({ message: 'unknown error occured' });
    }
});

module.exports = router;