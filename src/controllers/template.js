app.controller("TemplateController", ["$http", "$scope", "UserFactory", "$routeParams", "$window", "$location",
	function($http, $scope, UserFactory, $routeParams, $window, $location) {
		$scope.admin = UserFactory.isAdmin();
		$scope.view = true;
		$scope.new = false;
		$scope.templShow = [];
		$scope.evaluations = [];
		$scope.dates = [];
		$scope.hideBool = false;
		if($window.sessionStorage.token !== undefined) {
			
			if($routeParams.templateID === undefined) {
				var config = {headers:  {
				        'Authorization': $http.defaults.headers.common.Authorization,
				        'Accept': 'application/json'
				    }
				};
				$http.get('http://localhost:19358/api/v1/evaluationtemplates', config).then(function(respond) {
					$scope.view = true;
					$scope.templates = respond.data;
					for (var i = $scope.templates.length - 1; i >= 0; i--) {
						$scope.templShow[i] = true;
						$scope.dates[i] = {
							startDate: "",
							startTime: "",
							endDate: "",
							endTime: ""
						}

					};
				});
			}
			else if($routeParams.templateID === "new"){
				$scope.view = false;
				$scope.new = true;
				$scope.evaluation = {
					TitleIS: "",
					TitleEN: "",
					IntroTextIS: "",
					IntroTextEN: "",
					CourseQuestions: [],
					TeacherQuestions: []
				};
			}
			else {
				$scope.view = false;
				$http.get('http://localhost:19358/api/v1/evaluationtemplates/' + $routeParams.templateID).then(function(respond) {
					console.log("the template viewing: ");
					console.log(respond.data);
					$scope.evaluation = respond.data;
				});
			}

			$scope.addAnswer = function(question) {
				var answerObj = {
							ID: 1,
							TextIS: "Svar",
							TextEN: "Answer",
							ImageURL: "",
							Weight: 0
						}
				question.Answers.push(answerObj);

			}

			$scope.addCourseQuestion = function() {
				$scope.evaluation.CourseQuestions.push({
					ID: $scope.evaluation.CourseQuestions.length,
					TextIS: "",
					TextEN: "",
					ImageURL: "",
					Type: "single",
					Answers: []
				});
			}

			$scope.submitTemplate = function() {
				console.log("the template submitted:");
				console.log($scope.evaluation);
				$http.post('http://localhost:19358/api/v1/evaluationtemplates', $scope.evaluation).then(function(respond) {
					if(respond.status === 204)
					{
						console.log("Template was Created TODO:message");
						console.log(respond);
						$location.path("/templates");
					}
					else {
						alert("ERROR: " + respond.status);
					}
				});
			}

			$scope.submitForm = function(id, index) {
				console.log(id + " " + index);
				var start = $scope.dates[index].startDate + " " + $scope.dates[index].startTime;
				var end = $scope.dates[index].endDate + " " + $scope.dates[index].endTime;
				var eval = {
					TemplateID: id,
					StartDate: start,
					EndDate: end
				}
				console.log(eval);
				$http.post('http://localhost:19358/api/v1/evaluations', eval).then(function(respond) {
					if(respond.status === 204)
					{
						console.log("Evaluation was Created");
						console.log(respond);
						$scope.hideBool = false;
					}
					else {
						alert("ERROR: " + respond.status);
					}
				});
			}

			$scope.addTeacherQuestion = function() {
				$scope.evaluation.TeacherQuestions.push({
					ID: $scope.evaluation.TeacherQuestions.length,
					TextIS: "",
					TextEN: "",
					ImageURL: "",
					Type: "single",
					Answers: []
				});
			}

			$scope.newTemplate = function() {
				$location.path("/templates/new");
			}
		}
		else{
			$location.path("/");
		}

	}]);