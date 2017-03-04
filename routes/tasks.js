  var express = require('express');
  var router = express.Router();
  var Task = require('../models/task');

  router.get('/', function(req, res) {
    Task.find( function(err, tasks, count ) {
      res.send(tasks);
    });
  });

  router.post('/task_template', function(req, res) {
  var task = req.body;
   res.render('task', { id: task.id, title: task.title, complete: task.complete });
});

  router.put('/:id', function(req, res) {
    Task.findByIdAndUpdate(
      req.params.id,
      { $set: { complete: req.body.complete }},
      function (err, task) {
        res.send(task);
      });
    });
  module.exports = router;
