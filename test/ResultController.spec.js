describe("ResultController tests", function() {
  var $scope, $httpBackend, $http, $location, $rootScope, $window, controller, $routeParams;

    //beforeEach(module("EvaluationApp"));
  beforeEach(function() {
        module("EvaluationApp", function($provide) {
            var mock = {
                setter: function(){
                    FullName = "Gunnar";
                    Role = "student";
                    ImageURL = "";
                    Email = "";
                    SSN = "";
                    Username = "gunnar12";
                },
                isAdmin: function(){
                    return false;
                }
            };
            $provide.value("UserFactory", mock);
        });

        inject(function($injector, $controller) {
            $httpBackend = $injector.get('$httpBackend');
            $location = $injector.get('$location');
            $window = $injector.get('$window');
            $rootScope = $injector.get('$rootScope');
            $routeParams = $injector.get('$routeParams');
            $http = $injector.get('$http');
            $scope = $rootScope.$new();
            // Intercept HTTP requests and do the following:

            controller = $controller("ResultController", {
                "$scope": $scope,
            });
        });
    });

    it("Should be able to get evaluations", function() {
      $routeParams.resultID = undefined;
      var evaluations = [
        {
            ID: 1,
            TemplateTitleIS: "sample string 1",
            TemplateTitleEN: "sample string 2",
            StartDate: "2014-03-18T21:11:05.2753906+00:00",
            EndDate: "2014-03-18T21:11:05.2753906+00:00",
            Status: "open"
        },
        {
            ID: 2,
            TemplateTitleIS: "sample string 1",
            TemplateTitleEN: "sample string 2",
            StartDate: "2014-03-18T21:11:05.2753906+00:00",
            EndDate: "2014-03-18T21:11:05.2753906+00:00",
            Status: "closed"
        }
      ];

        $httpBackend.when('GET', 'http://localhost:19358/api/v1/evaluations').respond(evaluations);
        
        $httpBackend.expectGET('http://localhost:19358/api/v1/evaluations');
        $httpBackend.flush();
    });
})