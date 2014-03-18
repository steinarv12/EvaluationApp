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
				console.log("utan techers");
				$http.get('http://localhost:19358/api/v1/courses/T-427-WEPO/20141/teachers').then(function(respond){
					$scope.evalTeachers = respond.data;
					console.log("==QUESTINS==");
					console.log($scope.questions);
					console.log("==TEACHERS==");
					console.log($scope.evalTeachers);
					
					for(var k = 0; k < $scope.evalTeachers.length; k++) {
						console.log("--Ytri lykkja--");
						console.log($scope.questions[$scope.questions.length-1]);
						for (var i = 0; i < $scope.evaluation.TeacherQuestions.length; i++) {
							$scope.evaluation.TeacherQuestions[i].qType = "Teacher";
							$scope.evaluation.TeacherQuestions[i].Name = $scope.evalTeachers[k].FullName;
							$scope.questions.push($scope.evaluation.TeacherQuestions[i]);
						
							console.log("<--SSN-->");
							console.log($scope.questions[$scope.questions.length-1].SSN);
							console.log("teacher-->");
							console.log($scope.evalTeachers[k].FullName);
						};
						console.log("--EFTIR ADD--");
						console.log($scope.questions[$scope.questions.length-1]);
						for (var i = 0; i < $scope.evaluation.TeacherQuestions.length; i++) {								
							$scope.TeacherAnswers[i+k*$scope.evaluation.TeacherQuestions.length] = {
								QuestionID: $scope.evaluation.TeacherQuestions[i].ID,
								TeacherSSN: $scope.evalTeachers[k].SSN,
								Value: []
							};
						}
						
					};
					console.log($scope.questions);

				});


			});
			
			$scope.TurnIn = function(){
				var answers = [];
				var temparr = [];
				for (var i = 0; i < $scope.CourseAnswers.length; i++) {
					if($scope.CourseAnswers[i].Value instanceof Array) {
							temparr = $scope.CourseAnswers[i].Value;
						$scope.CourseAnswers[i].Value.toString();
						$scope.CourseAnswers[i].Value = "";
						for(var j = 0; j < temparr.length; j++) {
							if(temparr[j]) {
								$scope.CourseAnswers[i].Value += j + ","
							}
						}

						if($scope.CourseAnswers[i].Value.length > 0)
						{
							$scope.CourseAnswers[i].Value = $scope.CourseAnswers[i].Value.substring(0, $scope.CourseAnswers[i].Value.length-1);
						}

					}
					answers.push($scope.CourseAnswers[i]);
				}
				for (var i = 0; i < $scope.TeacherAnswers.length; i++) {
					if($scope.TeacherAnswers[i].Value instanceof Array) {
						temparr = $scope.TeacherAnswers[i].Value;
						for(var j = 0; j < $scope.TeacherAnswers[i].Value.length; j++) {
							if(temparr[j]) {
								answers.push({
										QuestionID: $scope.TeacherAnswers[i].ID,
										TeacherSSN: $scope.TeacherAnswers[i].TeacherSSN,
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
