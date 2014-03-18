app.controller("EvaluationController", ["$scope", "UserFactory", "$routeParams", "$window", "$location", "$http",
	function($scope, UserFactory, $routeParams, $window, $location, $http) {
		if($window.sessionStorage.token !== undefined) {
			$scope.evaluation;
			$scope.CourseAnswers = [];
			$scope.TeacherAnswers = [];
			$scope.questions = [];
			var config = {headers:  {
			        'Authorization': $http.defaults.headers.common.Authorization,
			        'Accept': 'application/json'
			    }
			};
			$http.get('http://localhost:19358/api/v1/courses/T-427-WEPO/20141/evaluations/' + $routeParams.evaluationID, config).then(function(respond) {
				$scope.evaluation = respond.data;
				for (var i = 0; i < $scope.evaluation.CourseQuestions.length; i++) {
					$scope.questions.push($scope.evaluation.CourseQuestions[i]);
					$scope.questions[i].qType = "Course";
				};
				for (var i = 0; i < $scope.evaluation.TeacherQuestions.length; i++) {
					$scope.questions.push($scope.evaluation.TeacherQuestions[i]);
					$scope.questions[$scope.questions.length-1].qType = "Teacher";
				};
				for (var i = 0; i < $scope.evaluation.CourseQuestions.length; i++) {
					$scope.CourseAnswers[i] = {
						QuestionID: $scope.evaluation.CourseQuestions[i].ID,
						TeacherSSN: "",
						Value: []
					};
				};
				for (var i = 0; i < $scope.evaluation.TeacherQuestions.length; i++) {
					$scope.TeacherAnswers[i] = {
						QuestionID: $scope.evaluation.TeacherQuestions[i].ID,
						TeacherSSN: "",
						Value: []
					};
				};
			});
			
			$scope.TurnIn = function(){
				var answers = [];
				for (var i = $scope.CourseAnswers.length - 1; i >= 0; i--) {
					answers.push($scope.CourseAnswers[i]);
				};
				for (var i = $scope.TeacherAnswers.length - 1; i >= 0; i--) {
					answers.push($scope.TeacherAnswers[i]);
				};
					$http.post('http://localhost:19358/api/v1/courses/T-427-WEPO/20141/evaluations/' + $routeParams.evaluationID, answers).then(function(respond) {
						if(respond.status === 204) {
							$location.path("/home")
						}
						else {
							alert("ERROR: " + respond.status);
						}
					});
			}

			$scope.SaveTAns = function(ans, id){
				console.log(ans + " " + id);
				$scope.TeacherAnswers[ans].ID = id;
			}

			$scope.SaveCAns = function(ans, id){
				console.log(ans + " " + id);
				$scope.CourseAnswers[ans].ID = id;
			}

		}
		else
			$location.path("/");
	}]);
