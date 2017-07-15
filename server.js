// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var mongojs = require("mongojs");
var passport = require("passport");

// Require Schemas in 'models' folder
var Task = require("./models/Task");
var User = require("./models/User");

// Create Instance of Express
var app = express();

// Sets an initial port
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

//Passport: initializing 
app.use(passport.initialize());
var localSignupStrategy = require('./passport/local-signup');
var localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

//Passport middleware
var authCheckMiddleware = require('./passport/auth-check');
app.use('/api', authCheckMiddleware);

//Passport routes
var authRoutes = require('./passport/auth');
app.use('/auth', authRoutes);
var apiRoutes = require('./passport/api');
app.use('/api', apiRoutes);

// -------------------------------------------------

// "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});