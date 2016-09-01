console.log('loaded models')
var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs')

// var UserSchema = new mongoose.Schema({
//   first_name: {type: String, required: true, minlength: 2, maxlength: 256},
//   last_name: {type: String, required: true, minlength: 2, maxlength: 256},
//   email: {type: String, required: true, minlength: 6, maxlength: 256, unique: true},
//   password: {type: String, required: true, minlength: 8, maxlength: 256}
// }, {timestamps: true})

// UserSchema.methods.validPassword = function (enterdPassword) {
//   return bcrypt.compareSync(enterdPassword, this.password)
// }

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


// UserSchema.pre('save', function (next) {
//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) console.log(err)
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) console.log(err)
//       user.password = hash
//       next()
//     })
//   })
// })

mongoose.model('User', UserSchema)
mongoose.model('Poll',PollSchema)