const mongoose = require('mongoose')
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb://localhost:27017/medicare")
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: String,
  number: Number,
  purchases: {
    type:Array,
    default:[]
  }
});
userSchema.plugin(plm) //this is also required 
module.exports = mongoose.model("user",userSchema)