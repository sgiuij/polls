(function () {
  'use strict'

  angular
    .module('myApp')
    .factory('pollsFactory', factory)

  function factory ($http) {
    var factory = {}

    factory.newPoll = function (pollInfo, callback) {
      console.log('newPoll factory')
      $http.post('/polls/new', pollInfo)
        .then(function (returnData) {
          console.log('new poll return data factory')
          callback(returnData)
          console.log(returnData)
        })
    }

    factory.allPolls = function (callback) {
      $http.get('/polls')
        .then(function (returnData) {
            callback(returnData)
        })
    }

    factory.getSession = function (callback) {
      $http.get('/session')
        .then(function (returnData) {
          console.log('session in factory')
          callback(returnData)
        })
    }

    factory.vote = function (pid,vid,callback) {
      console.log('%%%%%%%%%______vote factory_______%%%%%%')
      var pvid = {p:pid,v:vid}
      console.log(pvid)
      $http.post('/vote', pvid)
        .then(function (returnData) {
          console.log('pppppppp00000000010200102301023')
          console.log(returnData)
            callback(returnData)
        })
    }

    factory.thisPoll = function (id,callback) {
      $http.get('/polls/'+id)
        .then(function (returnData) {
          console.log(returnData)
            callback(returnData)
        })
    }

    factory.deletePoll = function (pollId, callback) {
      $http.post('/polls/'+pollId)
        .then(function (returnData) {
            callback(returnData)
        })
    }

    factory.newUser = function (userInfo, callback) {
      console.log('factory newuser')
      $http.post('/user/new', userInfo)
        .then(function (returnData) {
          console.log('this.newuser in factory success')
            callback(returnData)
        })
    }


    factory.back = function (callback) {
      $http.get('/cancel')
        .then(function (returnData) {
          callback(returnData)
        })
    }

    return factory
  
}})()