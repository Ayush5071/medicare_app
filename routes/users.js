const mongoose = require('mongoose')
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb://localhost:27017/medicare")
const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  profileImage: String,
  gender:String,
  number: Number,
  dob:Date,
  appointment:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'aptModel'
}],
  bed:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'bedModel'
}],
  ambulance:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'ambulance'
}],
  test:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'pathalogy'
}],

});
userSchema.plugin(plm) //this is also required 
module.exports = mongoose.model("user",userSchema)