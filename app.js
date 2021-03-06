const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const shortURL = require('./models/shortURL');

//tell express app to use packages
app.use(bodyParser.json());
app.use(cors());

//connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortURLs');

//allow node to access public directory
app.use(express.static(__dirname + '/public'));

//Create DB entry
app.get('/new/:urlToShorten(*)', (req, res, next) => {
  var {
    urlToShorten
  } = req.params; //deconstructor

  //Regex to identify URL
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = expression;

  if (regex.test(urlToShorten) === true) {
    //return 'Works';
    var short = Math.floor(Math.random() * 1000000).toString();
    var data = new shortURL({
      originalURL: urlToShorten,
      shortURL: short
    });

    data.save(err => {
      if (err) {
        return res.send('Error saving to database!!');
      }
    });

    return res.json(data);
  }

  var data = new shortURL({
    originalURL: urlToShorten,
    shortURL: 'InvalidURL'
  });

  return res.json(data);
});

//Query database and forward it to original URL if present
app.get('/:urlToForward', (req, res, next) => {

  var shorterUrl = req.params.urlToForward;

  shortURL.findOne({
    'shortURL': shorterUrl
  }, (err, data) => {
    if (err) {
      return res.send('Error reading DB');
    }
    var isHttp = new RegExp("^(http|https)://", "i");

    var strToCheck = data.originalURL;

    if (isHttp.test(strToCheck)) {
      res.redirect(301, data.originalURL);
    } else {
      res.redirect(301, 'http://' + data.originalURL)
    }
  });
});

//start server and listen on port 3000
//using ES6 here
app.listen(process.env.PORT || 3000, () => {
  console.log('Started URL Shorten server...\nListening on port 3000!');
});
