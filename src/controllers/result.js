app.controller("ResultController", ["$http", "$scope", "UserFactory", "$routeParams", "$window", "$location",
	function($http, $scope, UserFactory, $routeParams, $window, $location) {

		$scope.admin = UserFactory.isAdmin();
		$scope.view = true;
		$scope.noResult = false;
		$scope.routeParm = $routeParams.resultID;
		if($window.sessionStorage.token !== undefined) {
				var config = {headers:  {
			        'Authorization': $http.defaults.headers.common.Authorization,
			        'Accept': 'application/json'
			    }
			};
			console.log($routeParams.resultID);
			if($routeParams.resultID === undefined) {
				$http.get('http://localhost:19358/api/v1/evaluations').then(function(respond) {
					$scope.evalClosed = [];
					$scope.evalOpen = [];
					$scope.evalNew = [];
					console.log(respond.data);
					if(respond.data !== undefined) {
						respond.data.forEach(function(entry) {
							if(entry.Status === "closed") {
								$scope.evalClosed.push(entry);
							} 
							else if(entry.Status === "open") {
								$scope.evalOpen.push(entry)
							}
							else {
								$scope.evalNew.push(entry)
							}
						})
					}
				});
			}
			else{	
				console.log($routeParams.resultID);
				$http.get('http://localhost:19358/api/v1/courses/T-427-WEPO/20141/teachers').then(function(respond){
					$scope.evalTeachers = respond.data;
				});
				
				$scope.view = false;
				var answers = 0;
				$http.get('http://localhost:19358/api/v1/evaluations/' + $routeParams.resultID, config).then(function(respond) {
					$scope.evalAns = respond.data.Courses[0];
					$scope.evalTemp = respond.data;

					if($scope.evalAns.Questions !== undefined) {
						$scope.noResult = false;
						$scope.showTextQuestions = [];
						for(var i = 0; i < $scope.evalAns.Questions.length; i++) {
							$scope.showTextQuestions[i] = false;
						}

						console.log($scope.evalAns);
						console.log($scope.evalAns.Questions);
						console.log($scope.evalTemp);
					}
					else{
						$scope.noResult = true;
					}
					
				});
			}
		}
		else {
			
			alert("rdrctg u!");
			$location.path("/");
		}

	}]);