app.controller("EvaluationController", ["$scope", "UserFactory", "$routeParams", "$window", "$location",
	function($scope, UserFactory, $routeParams, $window, $location) {
		if($window.sessionStorage.token !== undefined) {
			$scope.admin = UserFactory.isAdmin();
			$scope.evaluation = {
				TitleIS: "",
				TitleEN: "",
				IntroTextIS: "",
				IntroTextEN: "",
				CourseQuestions: [],
				TeacherQuestions: []
			};

			$scope.addAnswer = function(question) {
				question.Answers.push("New answer");
				console.log(question);
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
		}
		else{
			$location.path("/");
		}
	}
])