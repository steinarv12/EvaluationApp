app.controller("EvaluationController", ["$scope", "UserFactory", "$routeParams", "$window", "$location",
	function($scope, UserFactory, $routeParams, $window, $location) {
		if($window.sessionStorage.token !== undefined) {
			$scope.admin = UserFactory.isAdmin();
			


		}
		else
			$location.path("/");
	}]);
