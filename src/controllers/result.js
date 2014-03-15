app.controller("ResultController", ["$http", "$scope", "UserFactory", "$routeParams", "$window", "$location",
	function($http, $scope, UserFactory, $routeParams, $window, $location) {
		alert("in dat ctrl");

		$scope.admin = UserFactory.isAdmin();
		$scope.view = true;
		if($window.sessionStorage.token !== undefined) {
			if($routeParams.templateID === undefined) {
				
				$scope.say = function(mella){
					alert(mella);
				}
			}
			else{
				$scope.view = false;

			}
		}
		else {
			alert("rdrctg u!");
			$location.path("/");
		}
	}]);