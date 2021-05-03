const express = require('express');

const server = express();

//UserData endpoint
server.get('*', (req, res) => {
  res.status(200).json({
    message: 'Hello World',
  });
});

// START YOUR SERVER HERE
server.listen(5000, () => {
  console.log('running on port 5000');
});
