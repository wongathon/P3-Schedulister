//Calling user model and passport
var User = require('mongoose').model('User');
var jwt = require('jsonwebtoken');

//Need to see what is in config folder
//const config = require('../../config')


module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get token information and decode
  var token = req.headers.authorization.split(' ')[1];
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
   // unauthorized status
    if (err) { return res.status(401).end(); }
  //from payload
    var userId = decoded.sub;
  // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
};

//need to convert into ES5 not ES6 to make functions work