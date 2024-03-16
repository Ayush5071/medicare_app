
const mongoose = require('mongoose');
// const plm = require('passport-local-mongoose');

const aptSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('aptModel', aptSchema);

