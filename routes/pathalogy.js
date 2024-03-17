
const mongoose = require('mongoose');
// const plm = require('passport-local-mongoose');

const pathSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  date: { type: Date, default: Date.now() },
  test:String
});


module.exports = mongoose.model('pathalogy', pathSchema);

