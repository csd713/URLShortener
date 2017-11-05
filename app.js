const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//tell express app to use packages
app.use(bodyParser.json());
app.use(cors());
//allow node to access public directory
app.use(express.static(__dirname + '/public'));

//Create DB entry
app.get('/new/:urlToShorten(*)', (req, res, next) => {
  var {
    urlToShorten
  } = req.params; //deconstructor

  return res.json({urlToShorten});
  //console.log('Shortenning the URL: ' + urlToShorten);
});

//start server and listen on port 3000
//using ES6 here
app.listen(process.env.PORT || 3000, () => {
  console.log('Started URL Shorten server...\nListening on port 3000!');
});
