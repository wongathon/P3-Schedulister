//Calling user model and passport
var express = require('express');
var validator = require('validator');
var passport = require('passport');
//may need to move to another location
var router = new express.Router();


//////SIGN UP VALIDATION
function validateSignupForm(payload) {
  var errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your username.';
  }

//may need to add another feature
  if (!payload || typeof payload.email !== 'email' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
    isFormValid = false;
    errors.password = 'Password must have at least 6 characters.';
  }

  if (!payload || typeof payload.passwordc !== 'string' || payload.passwordc.trim().length < 6 || payload.password !==payload.passwor ) {
    isFormValid = false;
    errors.password = 'Passwords do not match.';
  }


  if (!isFormValid) {
    message = 'Check for errors and try again.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

///SIGN UP routes
router.post('/signup', (req, res, next) => {
  var validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

///SIGN UP auth
  return passport.authenticate('local-signup', (err) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Success! Welcome to Get it Done.'
    });
  })(req, res, next);
});




//////SIGN UP VALIDATION
function validateLoginForm(payload) {
  var errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please provide your username.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check for errors and try again.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

///Login routes
router.post('/login', (req, res, next) => {
  var validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }

///Login auth

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.json({
      success: true,
      message: 'Welcome back! Now, get it done!',
      token,
      user: userData
    });
  })(req, res, next);
});

module.exports = router;

//need to convert into ES5 not ES6 to make functions work