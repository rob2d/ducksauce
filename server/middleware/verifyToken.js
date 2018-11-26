// WIP

module.exports = function(req, res, next) {
  const { body, query, headers } = req;
  
  const token = (body && body.access_token) || 
                (query && query.access_token) || 
                headers['x-access-token'];    

  TokenController.verifyToken(token)
    .then( result => {

    }).catch( error => {

    });
};