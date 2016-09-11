(function (angular) {
	'use strict';

	angular.module('App').controller('Tasks', tasks);

	tasks.$inject = [
	'$scope', '$state',
	'$uibModal', '$localStorage'
	];

	function tasks($scope, $state, $uibModal, $localStorage) {

		$scope.sortingLog = [];
		//$localStorage.Tasks = [];

		$scope.sortableOptions = {
			connectWith: ".connectList",
			stop: function (e, ui) {
				$scope.LogTasks();
			}
		};

		var myTasks = [
			[{
				taskId: 1,
				title: 'Open task',
				type: 'Research'
			}, {
				taskId: 2,
				title: 'init',
				type: 'meeting'
			}, {
				taskId: 3,
				title: 'revise',
				type: 'Research'
			}],
			[{
				taskId: 4,
				title: 'test task',
				type: 'testing'

			}, {
				taskId: 5,
				title: 'Case New Task',
				type: 'Meeting'
			}],
			[{
				taskId: 6,
				title: 'implementation',
				type: 'testing'
			}, {
				taskId: 7,
				title: 'assign',
				type: 'Meeting'
			}, {
				taskId: 8,
				title: 'standup',
				type: 'Research'
			}]
		];

		
		$localStorage.Tasks = $localStorage.Tasks ? $localStorage.Tasks : myTasks;
		$scope.Tasks = $localStorage.Tasks;

		$scope.Open = $scope.Tasks[0];

		$scope.InProgress = $scope.Tasks[1];

		$scope.Done = $scope.Tasks[2];

		$scope.AddNewTask = function () {
			var taskIds = _.pluck($scope.Open, 'taskId');
			var taskId = _.max(taskIds) + 1;

			$scope.Open.unshift({ taskId: taskId, title: $scope.TaskTitle, type: 'New' });
			$localStorage.Tasks[0] = $scope.Open;
			$scope.TaskTitle = '';
		};

		$scope.EditTask = function (task, status) {
			var taskEdit = angular.extend({}, task);

			var modal = $uibModal.open({
				templateUrl: 'TaskAddEditPopup.html',
				controller: 'TaskEdit',
				size: 'lg',
				resolve: {
					task: function () {
						console.log(task);
						return taskEdit;
					}
				}
			});

			modal.result.then(function (savedTask) {

				if (status === 'Open') {
					var openTaskIds = _.pluck($scope.Open, 'taskId');
					var openTasksIndex = _.indexOf(openTaskIds, savedTask.taskId);
					$scope.Open[openTasksIndex] = savedTask;
					$localStorage.Tasks[0] = $scope.Open;

				} else if (status === 'InProgress') {
					var inProgressTaskIds = _.pluck($scope.InProgress, 'taskId');
					var inProgressTsIndex = _.indexOf(inProgressTaskIds, savedTask.taskId);
					$scope.InProgress[inProgressTsIndex] = savedTask;
					$localStorage.Tasks[1] = $scope.InProgress;

				} else {
					var doneTaskIds = _.pluck($scope.Done, 'taskId');
					var doneTasksIndex = _.indexOf(doneTaskIds, savedTask.taskId);
					$scope.Done[doneTasksIndex] = savedTask;
					$localStorage.Tasks[2] = $scope.Done;
				}
			});
		};

		$scope.RemoveTask = function (task, status) {
			if (status === 'Open') {
				$scope.Open.splice(task, 1);
				$localStorage.Tasks[0] = $scope.Open;

			} else if (status === 'InProgress') {
				$scope.InProgress.splice(task, 1);
				$localStorage.Tasks[1] = $scope.InProgress;

			} else {
				$scope.Done.splice(task, 1);
				$localStorage.Tasks[2] = $scope.Done;
			}
		};

		$scope.LogTasks = function () {
			$scope.sortingLog = [];
			for (var i = 0; i < $scope.Tasks.length; i++) {
				var logTask = $scope.Tasks[i].map(function (item) {
					return item;
				});
				$scope.sortingLog.push(logTask);
			}

			$localStorage.Tasks = $scope.sortingLog;
		};
	};

})(angular);