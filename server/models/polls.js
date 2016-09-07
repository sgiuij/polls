var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs')


var UserSchema = new mongoose.Schema({
  name:{type:String, required:true},
  _polls:[{type: mongoose.Schema.Types.ObjectId, ref: 'Poll'}]
}, {timestamps: true})

var PollSchema = new mongoose.Schema({
  _creater:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  question:{type: String, required:true, minlength: 8},
  option:[{type:String, required:true, minlength: 3}],
  vote:[{type:Number}]
}, {timestamps: true})


mongoose.model('User', UserSchema)
mongoose.model('Poll',PollSchema)