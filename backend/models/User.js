const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String },
  googleId: { type: String, unique: true },
  facebookId: { type: String, unique: true },
  avatar: { type: String } // Thêm trường này để lưu URL avatar
});

module.exports = mongoose.model('User', userSchema);