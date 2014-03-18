describe("Login tests", function() {
	var $scope, $httpBackend, $location, $rootScope, $window, controller;

	beforeEach(module("EvaluationApp"));
	beforeEach(inject(function($injector, $controller) {
        $httpBackend = $injector.get('$httpBackend');
        $location = $injector.get('$location');
        $window = $injector.get('$window');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        // Intercept HTTP requests and do the following:
        $httpBackend.when('POST', 'http://localhost:19358/api/v1/login').respond({role: "student", token: "xxx"});

        controller = $controller("HomeController", {
            "$scope": $scope
        });
    }));

    it("Should be able to to login and be redirected home", function() {
    	expect($scope.foo).toBe("Hello");
    });
})