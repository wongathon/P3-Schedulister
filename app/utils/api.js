import axios from "axios";

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
    return axios.get("/api/tasks", { query: query }
    );
  },
  //get active tasks
  //get weekly/daily recurring tasks
  //get 'date' tasks. >> Start date, task entered day, for x times

  saveTask: function(task) {
    console.log("saveTask saving:", task);
    return axios.post("/api/tasks", task);
  },

  //update task info in here. Callo on axios.patch ._id
  //taskUpdate:

  taskComplete: function(task) {
    task.active = false;
    const { _id, active } = task;
    return axios.patch(`/api/tasks/${_id}`, { active });
  },

  deleteTask: function(id) {
    return axios.delete(`/api/tasks/${id}`);
  },

  taskUpdate: function(task) {
    return axios.patch(`/api/tasks/${_id}`, task);
  },

};

export default API;