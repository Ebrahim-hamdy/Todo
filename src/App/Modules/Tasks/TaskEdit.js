(function (angular) {
	'use strict';

	angular.module('App').controller('TaskEdit', taskEdit);

	taskEdit.$inject = [
	'$scope', '$state',
	'$uibModalInstance',
	'task'
	];

	function taskEdit($scope, $state, $uibModalInstance, task) {

		$scope.Task = task;

		$scope.Close = function () {
			$uibModalInstance.dismiss('cancel');
		};

		$scope.Save = function () {
			$uibModalInstance.close($scope.Task);
		};

	};

})(angular);