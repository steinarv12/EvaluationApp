app.controller("EvaluationController", ["$scope", "UserFactory", "$routeParams", "$window", "$location",
	function($scope, UserFactory, $routeParams, $window, $location) {
		if($window.sessionStorage.token !== undefined) {
			$scope.admin = UserFactory.isAdmin();
			var evaluationID = $routeParams.evaluationID;
			var admin = false;

			if(evaluationID !== undefined) {

			}
			else {
				$scope.evaluation = {
					TitleIS: "",
					TitleEN: "",
					IntroTextIS: "",
					IntroTextEN: "",
					CourseQuestions: [],
					TeacherQuestions: []
				};
			}

			$scope.addAnswer = function(question) {
				question.Answers.push("New answer");
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

			$scope.submitEvaluation = function() {
				$http.post('http://localhost:19358/api/v1/evaluationtemplates', $scope.evaluation).then(function(respond) {
					if(respond.status === 200)
					{
						alert("Template-ið er tilbúið");
						$location.path("/");
					}
				});
			}
			

		}
		else
			$location.path("/");
	}]);