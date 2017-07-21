var express = require("express");
var path = require("path");
var passport = require("passport");
var LocalStrategy = require("passport-local"),Strategy;
var User = require("../models/User");
var apiRoutes = require("./apiRoutes");

var router = new express.Router();

router.use("/api", apiRoutes);
router.use(function(err, req, res, next) {
    console.log(err);
});

router.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


//Passport
router.get('/signup/user', function(req,res){
  res.render('signup', { message: req.flash('message') });
});

router.get('/login/user', function(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }else {
    res.render('login', { message: req.flash('message') });;
  }
});

//Main landing page for home to be edited */
  router.get('/admin', function(req, res){
    res.render('signup', { message: req.flash('message') });
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login/user');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


router.post('/login/user', passport.authenticate('local-login', { 
    successRedirect: '../',
    failureRedirect: '../login/user',
    failureFlash: true }),
  function(req,res){
   	res.redirect("../login/user" + req.user.username);
  });


//signup processing
router.post('/signup/user', passport.authenticate('local-signup', { 
    failureRedirect: '../#/addtask',
    failureFlash: true }),
  function(req,res){
    res.redirect("../../#/admin");
  });



passport.use('local-signup', new LocalStrategy({passReqToCallback : true},
function(req, username, password, done) {
    findOrCreateUser = function(){
      User.findOne({'username':req.body.username},function(err, username) {
        if (err){
          console.log('Error in SignUp: '+ err);
          return done(err);
        }
        if (username) {
          console.log('User already exists');
          return done(null, false, 
             req.flash('message','User Already Exists'));
        } 
        if (password!==req.body.passwordc) {
          console.log('Passwords do not match');
          return done(null, false, 
             req.flash('message','Passwords do not match'));
        } 
        else {
          var newUser= new User();
          newUser.username=req.body.username;
          newUser.email=req.body.email;
          newUser.password=newUser.generateHash(req.body.password);
          newUser.passwordc=req.body.password;
          newUser.save(function(err) {
            if (err){
              console.log('Error in Completing Signup: '+err);  
              throw err;  
            }
            console.log('User Signup successful');    
            return done(null, newUser);
          });
        }
      });
    };
    process.nextTick(findOrCreateUser);
 }
 ));
       


//password
passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
  function(req, username, password) {
    User.findOne({'username': req.body.username },function(err, username){
      console.log(req.body);
      console.log("login");
      if(err) 
        console.log ("Error");
      if (!username) {
         console.log ("No user exists");
      }
      
      if(username){
        console.log(username);
        console.log(req.body);
        console.log(username.password)
        if (!username.validPassword(password)) {
          console.log("password bad");
        }
        else{
          console.log("password good");
        }
      }
    });
  }

));



module.exports = router;
