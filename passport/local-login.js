//Calling user model and passport
var User = require('mongoose').model('User');
var PassportLocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');

//Need to see what is in config folder
//const config = require('../../config')

module.exports = new PassportLocalStrategy({
  username: 'username',
  password: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, email, password, done) => {
  var userData = {
    username: username.trim(),
    password: password.trim()
  };

  var newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }
    return done(null);
  });
});

//search by username
  return User.findOne({ username: userData.username }, (err, user) => {
      if (err) { return done(err); }

      if (!user) {
        var error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

 // bcrypt verification
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err); }

      if (!isMatch) {
        var error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      var payload = {
        sub: user._id
      };

      // create a token string
      var token = jwt.sign(payload, config.jwtSecret);
      var data = {
        username: user.username
      };

      return done(null, token, data);
    });

  });

});

//need to convert into ES5 not ES6 to make functions work