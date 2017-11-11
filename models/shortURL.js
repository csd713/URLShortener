//Model for short URL

const mongoose = require('mongoose');
//schema - (structure)
const Schema = mongoose.Schema;

//this is how our JSON have to be formated
const urlSchema = new Schema({
  originalURL: String,
  shortURL: String
}, {
  timestamps: true //adds TimeStamp
});

const ModelClass = mongoose.model('shortURL', urlSchema);

module.exports = ModelClass;
