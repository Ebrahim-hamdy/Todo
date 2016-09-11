(function (angular) {
	'use strict';

	angular.module('App').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/Tasks");

		$stateProvider
			.state('Page', {
				url: '/Page',
				abstract: true,
				views: {
					'': {
						templateUrl: 'App/Shared/Layout/Page.html'
					},
					'Header@Page': {
						templateUrl: 'App/Shared/Layout/Header.html'
					}
				}
			})
			.state('Page.Tasks', {
				url: "^/Tasks",
				templateUrl: "App/Modules/Tasks/Tasks.html",
				controller: 'Tasks',
				data: { PageTitle: 'Tasks' }
			})
		;
	}]);

})(angular);