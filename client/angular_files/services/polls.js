(function () {
  'use strict'

  angular
    .module('myApp')
    .factory('pollsFactory', factory)

  function factory ($http) {
    var factory = {}

    factory.newPoll = function (pollInfo, callback) {
      $http.post('/polls/new', pollInfo)
        .then(function (returnData) {
          callback(returnData)
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
          callback(returnData)
        })
    }

    factory.vote = function (pid,vid,callback) {
      var pvid = {p:pid,v:vid}
      console.log(pvid)
      $http.post('/vote', pvid)
        .then(function (returnData) {
            callback(returnData)
        })
    }

    factory.thisPoll = function (id,callback) {
      $http.get('/polls/'+id)
        .then(function (returnData) {
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
      $http.post('/user/new', userInfo)
        .then(function (returnData) {
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