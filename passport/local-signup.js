//Calling user model and passport
var User = require('mongoose').model('User');
var PassportLocalStrategy = require('passport-local').Strategy;


module.exports = new PassportLocalStrategy({
  username: 'username',
  email: 'email',
  password: 'password',
  passwordc: 'passwordc',
  session: false,
  passReqToCallback: true
}, (req, username, email, password, done) => {
      var userData = {
        username: username.trim(),
        email: email.trim(),
        password: password.trim()
      };

      var newUser = new User(userData);
      newUser.save((err) => {
        if (err) { return done(err); }
        return done(null);
      });
    });
});
//need to convert into ES5 not ES6 to make functions work