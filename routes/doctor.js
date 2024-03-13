
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const doctorSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

doctorSchema.plugin(plm);

module.exports = mongoose.model('Seller', doctorSchema);

