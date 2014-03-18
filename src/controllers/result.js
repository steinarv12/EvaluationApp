app.controller("ResultController", ["$http", "$scope", "UserFactory", "$routeParams", "$window", "$location",
	function($http, $scope, UserFactory, $routeParams, $window, $location) {

		$scope.admin = UserFactory.isAdmin();
		$scope.view = true;
		$scope.noResult = false;
		$scope.routeParm = $routeParams.resultID;
		if($window.sessionStorage.token !== undefined) {
			
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
				
				$scope.view = false;
				var answers = 0;
				$http.get('http://localhost:19358/api/v1/evaluations/' + $routeParams.resultID).then(function(respond) {
					$scope.evalAns = respond.data;
					console.log(respond.data);
					if($scope.evalAns.Questions !== undefined) {
						$scope.showTextQuestions = [];
						for(var i = 0; i < $scope.evalAns.Questions.length; i++) {
									$scope.showTextQuestions[i] = false;
								}
						/*$scope.evalAns.Questions.forEach(function(entry) {
							

							if(entry.Type !== "text"){
								answers = 0;
								for(var i =0; i < entry.Result.length; i++) {
									answers = answers + entry.Result[i].Count;
								}
								entry.totalAnswers = answers;
								for(var i =0; i < entry.Result.length; i++) {
									entry.Result[i].;
								}
							}
							else {
								entry.totalAnswers = 0;
							}
						})*/
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