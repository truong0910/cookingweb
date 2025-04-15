// models/Food.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  title: String,
  time: String,
  image: String,
  type: String,
  rating: Number,
});

module.exports = mongoose.model('AllFood', foodSchema);