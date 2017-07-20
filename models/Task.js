var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var taskSchema = new Schema({
  text: {
    type: String,
    trim: true,
    required: true
  },

  active: {
    type: Boolean,
    default: true //set to false if date or recurs
  },

  taskCreated: {
    type: Date,
    default: Date.now
  },

  //set START DATE of recurrance, or if not recurring, set ONE TIME DATE
  taskDate: Date, 

  //indicate is if recurrs
  recurAny: {
    type: Boolean,
    default: false
  },

  //saves next date for recurrence, otherwise no. 
  //auto-calculating, or should be. 
  nextDate: {
    type: Date
  }, 

 // values daily, monthly, weekly. will use checkboxes to set. If NULL, it is ONE TIME
  recurFrequency: String, 

  //amount of times the event recurs. 3 days in a row/ 4 weeks, etc. 
  recurAmount: Number,
  
  //amount of time betwen recurs?
  recurBetween: Number
    
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;