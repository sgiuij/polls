(function () {
  'use strict'
//question 1: why "_this" inseated of this
//repeat from two tables

  angular
    .module('myApp')
    .controller('pollsController', pollsController)

  function pollsController (pollsFactory, $routeParams, $location) {
    var _this = this
    _this.errors = []

    // $scope.products = [{name:'ray', price:'2.00', quantity: 1}]

    function getsession () {
      pollsFactory.getSession(function (factoryData) {
        console.log('***************')
        console.log(factoryData.data)
        _this.user = factoryData.data.userInfo
        if (!_this.user) {
          $location.url('/')
        }
      })
    }
    getsession()

    _this.allPolls = function () {
      _this.errors = []
      pollsFactory.allPolls(function (factoryData) {
        if (factoryData.data.errors) {
           _this.errors = factoryData.data.errors
        } else {

          _this.polls = factoryData.data.polls
        }
      })
    }
    _this.allPolls()
    

    _this.thisPoll = function (id) {
      _this.errors = []
    
      pollsFactory.thisPoll(id,function (factoryData) {
        if (factoryData.data.errors) {
          console.log(factoryData.data)
          console.log("@@@@@@@_____errr in thisPoll controller_____@@@@@@@")
           _this.errors = factoryData.data.errors
        } else {

          _this.poll = factoryData.data.polls[0]
         
          // $location.url('polls/'+id)
          
        }

      })
    }
    if($routeParams.id){
      _this.thisPoll($routeParams.id)
    }
    

    _this.deletePoll = function(id){
      _this.errors = []
      pollsFactory.deletePoll(id, function (factoryData) {
        if (factoryData.data.errors) {
          _this.errors = factoryData.data.errors
        } else {
          _this.allPolls(id)
        }
      })
    }

    _this.vote = function (pid,vid) {
      console.log('%%%%%^^^^^^&&&&&&&&&&&')
      _this.errors = []
      pollsFactory.vote(pid,vid, function (factoryData) {
        if (factoryData.data.errors) {
          _this.errors = factoryData.data.errors

        } else {
          console.log('BBBBBBBBBBBB___________AAAAAAAAAAAAAAA')
          _this.thisPoll(pid)
        }
      })
    }

    _this.newPoll = function () {
      _this.errors = []
      console.log('************new pool controlers********')
      if(_this.pollInfo.question)
      pollsFactory.newPoll(_this.pollInfo, function (factoryData) {
        if (factoryData.data.errors) {
          console.log('new poll error controller')
          console.log(factoryData.data)
          _this.polls = factoryData.data.errors
        } else {
          console.log('new poll success controller')
          _this.allPolls()
        }
      })
    }


    _this.newUser = function () {
      _this.errors = []
      console.log('_this.userInfo')
      console.log(_this.userInfo)
      // if (_this.pollcontent) {
      //   form.field1.$error.validationError = true
      // }else {
      //   form.field1.$error.validationError = false
      // }
      pollsFactory.newUser(_this.userInfo, function (factoryData) {
        if (factoryData.data.errors) {
          console.log('this.user in controller error')
          _this.errors = factoryData.data.errors
        } else {
          _this.user = factoryData.data.userInfo
          console.log('_this.user')
          console.log(_this.user)
          $location.url('/polls')
        }
      })
    }


    _this.back = function () {
      _this.errors = []
      pollsFactory.back( function (factoryData) {
        if (factoryData.data.errors) {
           _this.errors = factoryData.data.errors
        } else {
        }
      })
    }

 
}})()