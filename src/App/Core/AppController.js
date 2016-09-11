(function (angular) {
	'use strict';

	function AppController($scope, $rootScope) {
		$scope.CurrentYear = new Date().getFullYear();
	};

	angular
		.module('App')
		.controller('AppController', AppController);
})(angular);