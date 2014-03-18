describe("TemplateController tests", function() {
    var $scope, $location, $rootScope, $window, controller, $httpBackend, $http, $routeParams;

    beforeEach(module("EvaluationApp"));
    beforeEach(inject(function($injector, $controller) {

        $httpBackend = $injector.get('$httpBackend');
        $location = $injector.get('$location');
        $http = $injector.get('$http');
        $rootScope = $injector.get('$rootScope');
        $window = $injector.get('$window');
        $scope = $rootScope.$new();
        $window.sessionStorage.token = "xxx"
        $routeParams = $injector.get('$routeParams');
        
        controller = $controller("TemplateController", {
            "$scope": $scope
        });
    }));

    it("Should be able to get evaluations for course", function(){

        var evaluationTemplates = [
          {
            "ID": 1,
            "TitleIS": "sample string 2",
            "TitleEN": "sample string 3"
          },
          {
            "ID": 1,
            "TitleIS": "sample string 2",
            "TitleEN": "sample string 3"
          }
        ];

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
        
        $httpBackend.when('GET', 'http://localhost:19358/api/v1/evaluationtemplates').respond(evaluationTemplates);
        $httpBackend.expectGET('http://localhost:19358/api/v1/evaluationtemplates');


        $httpBackend.flush();
    })

});