// BUILD YOUR SERVER HERE
const express = require('express');
const { json } = require('express');
const Data = require('./users/model');

//INSTANCE OF EXPRESS APP
const server = express();

//GLOBAL MIDDLEWARE
server.use(express.json());

//ENDPOINTS FOR MVP
//GET ALL USERS
server.get('/api/users', (req, res) => {
  Data.find()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'The users information could not be retrieved',
      });
    });
});

//GET USER BY ID
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  Data.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: 'The user with the specified ID does not exist',
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'The user information could not be retrieved',
      });
    });
});

//DELETE
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  Data.remove(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: 'The user with the specified ID does not exist',
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'The user could not be removed',
      });
    });
});

//INSERT
server.post('/api/users', (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.bio) {
    res.status(400).json({
      message: 'Please provide name and bio for the user',
    });
  } else {
    Data.insert(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        res.status(500).json({
          message: 'There was an error while saving the user to the database',
        });
      });
  }
});

// UPDATE
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const updateUser = req.body;
  if (!updateUser.name || !updateUser.bio) {
    res.status(400).json({
      message: 'Please provide name and bio for the user',
    });
  } else {
    Data.update(id, updateUser)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(500).json({
          message: 'Please provide name and bio for the user',
        });
      });
  }
});

// NOTHING PAST HERE
server.use('/', (req, res) => {
  res.status(404).json({
    message: 'not found',
  });
});

module.exports = server;
