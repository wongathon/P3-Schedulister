var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var taskSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: "Please enter a task!"
  },

  active: {
    type: Boolean,
    default: true //set to false if date or recurs
  },
  
  date: Date, //set START DATE of recurrance, or if not recurring, set ONE TIME DATE
  recurs: String,  //will use checkboxes to set. If NULL, it is ONE TIME

  taskCreated: {
    type: Date,
    default: Date.now
  }
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;