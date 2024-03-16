
const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
});


module.exports = mongoose.model('bedModel', bedSchema);

