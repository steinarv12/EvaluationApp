app.controller("HomeController", ["$scope", "ApiFactory", "$http", "$window", "$location", "UserFactory",
	function($scope, ApiFactory, $http, $window, $location, UserFactory) {
		
		if($window.sessionStorage.token !== undefined) {
			$scope.admin = UserFactory.isAdmin();
			$scope.tests = "tests";
			$scope.evaluations = [];
			$scope.areOpen = [];
			$scope.templates = [];
			$scope.config = {headers:  {
		        'Authorization': $http.defaults.headers.common.Authorization,
		        'Accept': 'application/json'
			    }
			};
			$http.get('http://localhost:19358/api/v1/evaluations', $scope.config).then(function(respond) {
				$scope.evaluations = respond.data;
				for (var i = $scope.evaluations.length - 1; i >= 0; i--) {
					$scope.evaluations[i].Status === "open" ? $scope.areOpen[i] = true : $scope.areOpen[i] = false;
				};
			});



		}
		else{
			$location.path("/");
		}
	}
]);