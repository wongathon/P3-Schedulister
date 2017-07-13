// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

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

app.use(express.static("./public"));

app.use("/", routes);

// Mongo Setup--------------------------------------
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