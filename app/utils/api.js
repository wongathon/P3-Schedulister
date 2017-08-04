import axios from "axios";
import moment from "moment";
//api called by components. 
//CALLS ROUTES in api Routes via URL path. 
const API = {

  getTasks: function() {
    return axios.get("/api/tasks");
  },

  //getTasksCondition
  // .get("api/task", query??)
  //where is the best place to conditionalize searches? 
  getTasksType: function(query) {
    return axios.get("/api/tasks", {params: { query: query }});
  },
  //get active tasks
  //get weekly/daily recurring tasks
  //get 'date' tasks. >> Start date, task entered day, for x times

  saveTask: function(task) {
    return axios.post("/api/tasks", task);
  },

  //update task info in here. Callo on axios.patch ._id
  //taskUpdate:

  taskComplete: function(task) {
    task.active = false;  


    //Crisis case: nextDate is before today. "Needs resuming".
    //Do not decrement recurAmount. 
    if (task.recurAny === true && moment(task.nextDate).isBefore(moment(), 'day')) {
      task.taskDate = moment(); //will be 'resumed' and activated on home Panel.
      
    //More common case: taskDate is before today. Missed task, but needs to 
    //NOT decrement recurAmount and
    //recalculate nextDate. 
    } else if (task.recurAny === true && moment(task.taskDate).isBefore(moment(), 'day')) {
      task.taskDate = task.nextDate; //if nextDate is today, will be activated, else in future and will schedule. 
    
    //usual case, adds points and decrements.
    } else {
      task.taskDate = task.nextDate; //should handle one-offs. 

      //Decrement/Increment 
      if (task.recurAmount !== null && task.recurAmount > 0) {
        task.recurAmount--;
      }

      if (task.points === null){
        task.points = 0;
      }

      task.points++;
    }
    //if task = recurAny === true, for sure. 
    //Shift ahead and recalc nextDate logic. 
    if (task.recurAny === true && (task.recurAmount === null || task.recurAmount > 0)) {
      const recurBet = task.recurBetween === null ? 1 : task.recurBetween;  //handles if recurBetween increments was null in Task Obj. 
      task.nextDate = moment(task.taskDate).clone().add(recurBet, task.recurFrequency).format();//oh. Works forward off *new* taskDate. 
    } 

    if (task.recurAmount === 0) { //scheduled tasks in future. 
      task.taskDate = null;
    }

    if (task.recurAny === true) {
      const { _id, active, taskDate, nextDate, recurAmount, points } = task;
      return axios.patch(`/api/tasks/${_id}`, {active, taskDate, nextDate, recurAmount, points });
    } else {
      const { _id, active, taskDate } = task;
      return axios.patch(`/api/tasks/${_id}`, { active, taskDate });
    }

  },

  deleteTask: function(id) {
    return axios.delete(`/api/tasks/${id}`);
  },

  taskUpdate: function(task) {
    const { _id } = task;
    return axios.patch(`/api/tasks/${_id}`, task);
  },

};

export default API;