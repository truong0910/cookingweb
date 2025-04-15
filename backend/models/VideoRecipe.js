const mongoose = require('mongoose');

const videoRecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  time: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('VideoRecipe', videoRecipeSchema);