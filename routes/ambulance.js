const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  date: { type: Date, default: Date.now }
});



module.exports = mongoose.model('ambulance', ambulanceSchema);

