
const mongoose = require('mongoose');
// const plm = require('passport-local-mongoose');

const ambulanceSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  address:String
});


module.exports = mongoose.model('ambulance', ambulanceSchema);

