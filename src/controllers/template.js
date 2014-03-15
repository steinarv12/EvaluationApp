app.controller("TemplateController", ["$http", "$scope", "UserFactory", "$routeParams", "$window", "$location",
	function($http, $scope, UserFactory, $routeParams, $window, $location) {
		$scope.admin = UserFactory.isAdmin();
		if($window.sessionStorage.token !== undefined) {
			if($routeParams.templateID === undefined) {
				$http.get('http://localhost:19358/api/v1/evaluationtemplates').then(function(respond) {
					console.log(respond.data);
					$scope.templates = respond.data;
				});
			}
			else if($routeParams.templateID === "new"){
				alert("todo: new template");
			}

			$scope.navToTemplate = function(identify) {
				alert(identify);
			}

			$scope.newTemplate = function() {
				$location.path("/templates/new");
			}
		}
		else{
			$location.path("/");
		}

	}]);