app.controller("HomeController", ["$scope", "ApiFactory", "$http", "$window", "$location", "UserFactory",
	function($scope, ApiFactory, $http, $window, $location, UserFactory) {
		if($window.sessionStorage.token !== undefined) {
			$scope.admin = UserFactory.isAdmin();
			$scope.evaluations = [];
			$scope.templates = [];
			/*ApiFactory.getAllEvaluations().then(function(data) {
				console.log("Success, data: ", data);
				$scope.evaluations = data;
			}, function(errorMessage) {
				console.log("Error: " + errorMessage);
			}, function(updateMessage) {
				console.log("Update: " + updateMessage);
			});*/

			$scope.newEval = function() {
				$location.path("/evaluation");
			}

		}
		else{
			$location.path("/");
		}
	}
]);