// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var routes = require('./routes/routes');
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local"),Strategy;

var cookieParser = require("cookie-parser");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local"),Strategy;

// Require Schemas in 'models' folder
var Task = require("./models/Task");
var User = require("./models/User");

// Create Instance of Express
var app = express();
// Sets an initial port. 
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.configure
app.use(cookieParser());
app.use(session({secret: 'todoextreme', saveUninitialized: true, resave: true}));
app.use(flash());



app.use(express.static("./public"));



//NR Addons
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);


//NR Addon
//NR Addons
app.use(cookieParser());
app.use(session({secret: 'todoextreme', saveUninitialized: true, resave: true}))
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(flash());
app.use(function(req, res,next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
});

// -------------------------------------------------
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect("mongodb://localhost/nyt")
}


var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// "/" Route. This will redirect the user to our rendered React application

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});


