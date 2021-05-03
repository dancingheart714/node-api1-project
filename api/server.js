// BUILD YOUR SERVER HERE

const express = require('express');
const data = require('./api/users/model');

//INSTANCE OF EXPRESS APP
const server = express();

//GLOBAL MIDDLEWARE
server.use(express.json());

//ENDPOINTS FOR MVP

//(Post):
server.post('/api/users', (req, res) => {
  data
    .insert({
      name: req.body.name,
      bio: req.body.bio,
    })
    .then((newUser) => {
      if (!req.body.name || !req.body.bio) {
        return res.status(400).json({
          message: 'Please provide name and bio for the user',
        });
      } else {
        res.status(201).json(newUser);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'There was an error while saving the user to the database',
      });
    });

  //(Get):
  server.get('/api/users', (req, res) => {
    data
      .find()
      .then((users) => {
        console.log(users);
        res.json(users);
      })
      .catch((err) => {
        res.status(500).json({
          message: 'The users information could not be retrieved',
        });
      });
  });

  //(Get):
  server.get('/api/users/:id', (req, res) => {
    data
      .findById(req.params.id)
      .then((users) => {
        if (users) {
          res.json(users);
        } else {
          res.status(404).json({
            message: 'The user with the specified ID does not exist',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: 'The user information could not be retrieved',
        });
      });
  });

  //(Delete):
  server.remove('/api/users/:id', (req, res) => {
    data
      .delete(req.params.id)
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({
            message: 'The user with the specified ID does not exist',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: 'The user could not be removed',
        });
      });
  });

  //(Put):
  server.put('/api/users/:id', (req, res) => {
    if (!req.body.name || req.body.bio) {
      return res.status(400).json({
        message: 'Please provide name and bio for the user',
      });
    }
    data
      .update(req.params.id, {
        name: req.body.name,
        bio: req.body.bio,
      })
      .then((updatedUser) => {
        console.log(updatedUser);
        if (updatedUser) {
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({
            message: 'The user with the specified ID does not exist',
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: 'The user information could not be modified',
        });
      });
  });
});
module.exports = server;
