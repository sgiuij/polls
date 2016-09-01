var polls = require('../controllers/polls.js')

module.exports = function (app) {
  app.post('/user/new',polls.newUser)
  app.post('/polls/new', polls.newPoll)
  app.get('/session', polls.session)
  app.get('/polls', polls.allPolls)
  app.get('/polls/:id', polls.thisPoll)
  app.post('/polls/:id',polls.deletePoll)
  app.post('/vote',polls.vote)
  app.get('/cancel',polls.back)
}