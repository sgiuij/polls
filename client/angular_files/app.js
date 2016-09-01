(function(){
	'use strict';

	angular
		.module('myApp',['ngRoute'])
		.config(config)
	function config($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl:'angular_files/partials/login.html'
		})
		.when('/polls/:id',{
			templateUrl:'angular_files/partials/votes.html'
		})
		.when('/polls',{
			templateUrl:'angular_files/partials/polls.html'
		})
		.when('/newpoll',{
			templateUrl:'/angular_files/partials/newpoll.html'
		})
		.otherwise({
			redirectTo:'/'
		})
	}

})()