describe("HomeController tests", function() {
    var $scope, $location, $rootScope, $window, controller, $httpBackend, $http;

    beforeEach(module("EvaluationApp"));
    beforeEach(inject(function($injector, $controller) {

        $httpBackend = $injector.get('$httpBackend');
        $location = $injector.get('$location');
        $http = $injector.get('$http');
        $rootScope = $injector.get('$rootScope');
        $window = $injector.get('$window');
        $scope = $rootScope.$new();
        $window.sessionStorage.token = "xxx"
        controller = $controller("HomeController", {
            "$scope": $scope
        });
    }));


    it("Should be able to to load evaluations", function() {
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

        expect($scope.evaluations[0].ID).toBe(1);
    });

    it("Should not be able to get here with no token", function() {
        $window.sessionStorage.token = undefined;
        expect($location.path()).toBe("")
    });
});