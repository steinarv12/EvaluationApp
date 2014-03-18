describe("EvaluationController tests", function() {
    var $scope, $location, $rootScope, $window, controller, $httpBackend, $http, $routeParams;

    beforeEach(module("EvaluationApp"));
    beforeEach(inject(function($injector, $controller) {

        $httpBackend = $injector.get('$httpBackend');
        $location = $injector.get('$location');
        $http = $injector.get('$http');
        $rootScope = $injector.get('$rootScope');
        $window = $injector.get('$window');
        $routeParams = $injector.get('$routeParams');
        $scope = $rootScope.$new();
        $window.sessionStorage.token = "xxx"
        $routeParams.evaluationID = 1;
        
        controller = $controller("EvaluationController", {
            "$scope": $scope
        });
    }));

    it("Should be able to get evaluations for course", function(){

        var evaluation = {
          ID: 1,
          TemplateID: 2,
          TitleIS: "sample string 3",
          IntoTextIS: "sample string 5",
          CourseQuestions: [
            {
              ID: 1,
              TextIS: "sample string 2",
              Type: "sample string 5",
              Answers: [
                {
                  ID: 1,
                  TextIS: "sample string 2",
                  Weight: 5
                }
              ]
            }
          ],
          TeacherQuestions: [
            {
              ID: 1,
              TextIS: "sample string 2",
              Type: "sample string 5",
              Answers: [
                {
                  ID: 1,
                  TextIS: "sample string 2",
                  Weight: 5
                }
              ]
            }
          ]
        }

        var teacher =  [
            {
                Username: "gunnar12",
                FullName: "Gunnar Jonsson",
                SSN: "1005009888",
                Email: "gunnar12@ru.is",
                Role: "teacher",
                ImageURL: ""
            }
        ];

        $scope.CourseAnswers = [
            {
                Value: [1, 2]
            }
        ];
        $scope.TeacherAnswers = [
            {
                Value: [1, 2]
            }
        ];
        
        $httpBackend.when('GET', 'http://localhost:19358/api/v1/courses/T-427-WEPO/20141/evaluations/' + $routeParams.evaluationID).respond(evaluation);
        $httpBackend.when('GET', 'http://localhost:19358/api/v1/courses/T-427-WEPO/20141/teachers').respond(teacher);
        $scope.TurnIn();
        $httpBackend.when('POST', 'http://localhost:19358/api/v1/courses/T-427-WEPO/20141/evaluations/' + $routeParams.evaluationID).respond({Status: 200});
        
        $httpBackend.expectPOST('http://localhost:19358/api/v1/courses/T-427-WEPO/20141/evaluations/' + $routeParams.evaluationID);


        $httpBackend.flush();
    })

});