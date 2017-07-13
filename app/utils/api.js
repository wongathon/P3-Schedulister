import axios from "axios";

//api called by components. 
//CALLS ROUTES in api Routes
const API = {

  getTasks: function() {
    return axios.get("/api/task");
  },

  //where is the best place to conditionalize searches? 

  //get active tasks
  //get weekly/daily recurring tasks
  //get 'date' tasks. >> Start date, task entered day, for x times

  saveTask: function(task) {
    return axios.post("/api/task", task);
  },

  taskComplete: function(task) {
    task.active = false;
    const { _id, active } = task;
    return axios.patch(`/api/task/${_id}`, { active });
  },

  deleteTask: function(id) {
    return axios.delete(`/api/task/${id}`);
  }

};

export default API;