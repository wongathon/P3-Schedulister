var Task = require ("../models/Task");

//uses api routes
//interacts with DB. 
module.exports = {
  //index
  index: (req, res) => {
    var query;

    if (req.query.query) {
      query = req.query.query;
      query = JSON.parse(query);
    } else {
      query = (req.params.id ? {_id: req.params.id} : {})
    };
    console.log("The query is", query);

    Task.find(query).sort('taskDate')
      .then( doc => { res.json(doc) 
      }).catch( err => { res.json(err)
      });
  },
  
  create: (req, res) => {
    Task.create(req.body)
      .then( doc => {res.json(doc)
      }).catch( err => {res.json(err)
      });
  },
  update: (req, res) => {
    Task.update({_id:req.params.id}, req.body)
      .then( doc => {res.json(doc)
      }).catch( err => {res.json(err)
      });
  },
  //use in task Admin.js
  destroy: (req, res) => {
    Task.remove({_id:req.params.id})
      .then( doc => {res.json(doc)
      }).catch( err => {res.json(err)
      });
  }
};