var mongoose = require('mongoose')
var User = mongoose.model('User')
var Poll = mongoose.model('Poll')

module.exports = {
  newPoll: function (req, res) {

    var poll = new Poll({
      _creater:req.session.userInfo.id,
      question:req.body.question,
      option:[req.body.op1,req.body.op2,req.body.op3,req.body.op4],
      vote:[0,0,0,0]
    })
    poll.save(function (err,polls) {
      if (err){
          res.json({errors: err })
      }else{
        res.json({polls:polls})
      }
    })
  },

  newUser: function (req, res) {

    if (!req.body.name) return res.send({ error : 'no_name_in_body'});
    User.findOne({name:req.body.name},function(err,isuser){

      if(isuser==null){
        var user = new User(req.body)
        user.save(function (err,users) {
          if (err){
              res.json({errors: err})
          }else{
            req.session['userInfo'] = {
            id: users._id,
            name: users.name
            }
            res.json({status: true, userInfo: req.session['userInfo']})
          }
        })
      }else{
        req.session['userInfo'] = {
          id: isuser._id,
          name: isuser.name
        }
        res.json({status: true, userInfo: req.session['userInfo']})
      }
    })
  },

  allPolls: function(req,res){
    Poll.find({})
    .populate('_creater')
    .exec(function(err, polls){
      if (err){
        res.json({errors: err })
      }else{
        res.json({polls})
      }
    })  
  },

  thisPoll: function(req,res){
    Poll.find({_id:req.params.id}, function(err, polls){
      if (err){
        res.json({errors: err })
      }else{
        res.json({polls})
      }
    })  
  },

  deletePoll: function(req,res){
    Poll.remove({_id:req.params.id},function(err,polls){
      if (err){
        res.json({errors: err })
      }else{
        res.json({polls})
      }
    })
  },

  vote: function (req, res) {

    var obj = {$inc:{}}
    obj.$inc["vote." + req.body.v]=1;
    
    Poll.update({_id:req.body.p},obj,function(err,polls){
      if (err){
        res.json({errors: err })
      }else if(polls==null){

      }else{
        res.json({polls})
      }
    })
  },

  back: function (req, res) {
    req.session.destroy(function(err){
      if (err){
        res.json({errors: err })
      }else{
        res.json({status:true})
      }
    })
  },

  session: function(req, res){
    if (req.session['userInfo']) return res.json({userInfo: req.session['userInfo']})
    res.json({userInfo: null })
  }

}
