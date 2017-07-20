var express = require("express");
var path = require("path");
var passport = require("passport");
var LocalStrategy = require("passport-local"),Strategy;
var bcrypt = require("bcryptjs");
var User = require("../models/User");
var apiRoutes = require("./apiRoutes");

var router = new express.Router();

router.use("/api", apiRoutes);

router.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


//Passport
router.get('/signup/user', function(req,res){
  res.render('/signup/user');
});

router.get('/login/user', function(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }else {
    res.redirect('/login/user');
  }
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/login/user',
  passport.authenticate('local-signup', { successRedirect: '/',
                                   failureRedirect: '/login/user',
                                   failureFlash: true }),
  function(req,res){
  	res.redirect("/login/user" + req.user.username);
  });


//signup processing
router.post('/signup/user',

  passport.authenticate('local-signup', { successRedirect: '/',
                                   failureRedirect: '/sigunp/user',
                                   failureFlash: true }),
  function(req,res){
    res.redirect("/");
  });



passport.use('local-signup', new LocalStrategy({passReqToCallback : true},
  function(req, username, email, password, passwordc) {
    User.findOne({'username': username },function(err, username){
    	if(err) 
        console.log ("err");
    	if(!username){
        var createHash = function(password){
          bcrypt.genSaltSync(10, function(err, salt){
            bcrypt.hash(password, salt, function(err, hash) {
              return bcrypt.hash(password)
            });
          });
        };

        var newUser= new User();
    		newUser.username=username;
        newUser.email=email;
        newUser.password=createHash(password);
        newUser.passwordc=username;
        newUser.save(function(err) {
            if (err){
            console.log('Error in Saving user: '+ err);  
              throw err;  
            }
            console.log('User Registration succesful');    
        });
    	}
      if (username) {
          console.log ("User already exists");
     	}
    });
  }));


//password
passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
  function(username, password, done) {
    User.findOne({'username': username},function(err, username){
      if(err) 
        console.log ("Error");
      if (!username) {
         console.log ("No user exists");
      }
      
      if(username){
        bcrypt.compare(password, hash, function(err, isMatch) {
          if(err) throw err;
          callback(null, isMatch);
        });
      }
    })
  }
));



module.exports = router;
