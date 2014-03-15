app.controller("TemplateController", ["$http", "$scope", "UserFactory", "$routeParams", "$window", "$location",
	function($http, $scope, UserFactory, $routeParams, $window, $location) {
		$scope.admin = UserFactory.isAdmin();
		$scope.view = true;
		$scope.new = false;
		if($window.sessionStorage.token !== undefined) {
			
			if($routeParams.templateID === undefined) {
				$http.get('http://localhost:19358/api/v1/evaluationtemplates').then(function(respond) {
					$scope.view = true;
					$scope.templates = respond.data;
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
				question.Answers.push("New answer");
				$scope.$apply;
				//todo: BINDA VId ANSWER!
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
				console.log("the template submitting: ");
				console.log($scope.evaluation);
				$http.post('http://localhost:19358/api/v1/evaluationtemplates', $scope.evaluation).then(function(respond) {
					if(respond.status === 204)
					{
						console.log("Template was Created TODO:message");
						$location.path("/templates");
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