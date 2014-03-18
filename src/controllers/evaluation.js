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
					
				for (var i = 0; i < $scope.evaluation.CourseQuestions.length; i++) {
					$scope.CourseAnswers[i] = {
						QuestionID: $scope.evaluation.CourseQuestions[i].ID,
						TeacherSSN: null,
						TeacherName: null,
						Value: []
					};
				};
				
				$http.get('http://localhost:19358/api/v1/courses/T-427-WEPO/20141/teachers').then(function(respond){
					$scope.evalTeachers = respond.data;
	
					$scope.tempQuest = [];
					for(var k = 0; k < $scope.evalTeachers.length; k++) {

						for (var i = 0; i < $scope.evaluation.TeacherQuestions.length; i++) {
							$scope.tempQuest.push({
								Answers: $scope.evaluation.TeacherQuestions[i].Answers,
								ID: $scope.evaluation.TeacherQuestions[i].ID,
								ImageURL: $scope.evaluation.TeacherQuestions[i].ImageURL,
								TextEN: $scope.evaluation.TeacherQuestions[i].TextEN,
								TextIS: $scope.evaluation.TeacherQuestions[i].TextIS,
								Type: $scope.evaluation.TeacherQuestions[i].Type,
								qType: "Teacher",
								Name: $scope.evalTeachers[k].FullName
							});
							
						};
					
						for (var i = $scope.evaluation.CourseQuestions.length; i < $scope.evaluation.TeacherQuestions.length + $scope.evaluation.CourseQuestions.length; i++) {								
							$scope.TeacherAnswers[i+k*$scope.evaluation.TeacherQuestions.length] = {
								QuestionID: $scope.evaluation.TeacherQuestions[i-$scope.evaluation.CourseQuestions.length].ID,
								TeacherSSN: $scope.evalTeachers[k].SSN,
								Value: []
							};
						}
						
					};

					for(var i = 0; i < $scope.tempQuest.length; i++){
						$scope.questions.push($scope.tempQuest[i]);
					}
					
				});
			});

			$scope.back = function() {
				if($routeParams.evaluationID === undefined){
					$location.path("/template");
				}
				else{
					$location.path("/home");
				}
			
			}
			
			$scope.TurnIn = function(){
				var answers = [];
				var temparr = [];

				for (var i = 0; i < $scope.CourseAnswers.length; i++) {
					if($scope.CourseAnswers[i].Value instanceof Array) {
						temparr = $scope.CourseAnswers[i];
						for(var j = 0; j < temparr.Value.length; j++) {
							if(temparr.Value[j]) {
								answers.push({
										QuestionID: temparr.QuestionID,
										TeacherSSN: null,
										Value: j
								});
							}
						}
					}
					else {
						answers.push($scope.CourseAnswers[i]);
					}
				}

				for (var i = $scope.CourseAnswers.length; i < $scope.TeacherAnswers.length; i++) {
				
					if($scope.TeacherAnswers[i].Value instanceof Array) {
						temparr = $scope.TeacherAnswers[i];
						for(var j = 0; j < $scope.TeacherAnswers[i].Value.length; j++) {
							if(temparr.Value[j]) {
								answers.push({
										QuestionID: temparr.QuestionID,
										TeacherSSN: temparr.TeacherSSN,
										Value: j
								});

							}
						}
					}
					else {
						answers.push($scope.TeacherAnswers[i]);
					}
				}
				
						
				$http.post('http://localhost:19358/api/v1/courses/T-427-WEPO/20141/evaluations/' + $routeParams.evaluationID, answers).then(function(respond) {
					if(respond.status === 204) {
						alert("Svör þín hafa verið vistuð");
						$location.path("/home")
					}
					else {
						alert("ERROR: " + respond.status);
					}
				});
				
			}
			

		}
		else
			$location.path("/");
	}]);
