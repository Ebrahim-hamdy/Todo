(function (angular) {
	'use strict';

	angular.module('Data', []);

	angular.module('App', [
		'Data'
		, 'ngAnimate'
		, 'ui.router'
		, 'ui.bootstrap'
		, 'ui.sortable'
		, 'ngStorage'
	]);

	angular.module('App').run(["$rootScope", "$state", function ($rootScope, $state) {
		$rootScope.$state = $state;

	}]);
})(angular);