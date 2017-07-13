express = require("express");

var taskControl = require("../controllers/taskControl");

//calls ORM methods in task control. 
var router = new express.Router();
//get all tasks or specific for edit page info
router.get("/tasks/:id?", taskControl.index);

router.post("/tasks", taskControl.create);

//required for updating one task
router.patch("/tasks/:id", taskControl.update);

router.delete("/tasks/:id", taskControl.destroy);

module.exports = router;