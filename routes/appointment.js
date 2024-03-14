
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const aptSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

aptSchema.plugin(plm);

module.exports = mongoose.model('aptModel', aptSchema);

