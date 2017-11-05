const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//tell express app to use packages
app.use(bodyParser.json());
app.use(cors());


//start server and listen on port 3000
//using ES6
app.listen(process.env.PORT || 3000, ()=>{
  console.log('Started URL Shorten server...\nListening on port 3000!');
});
