describe("loginCtrl tests", function() {
	var $scope, $httpBackend, $http, $location, $rootScope, $window, controller;

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
            $http = $injector.get('$http');
            $scope = $rootScope.$new();
            // Intercept HTTP requests and do the following:

            controller = $controller("loginCtrl", {
                "$scope": $scope,
                //api: mock
            });
        });
    });

    it("Should be able to to login and be redirected home", function() {
    	expect($scope.foo).toBe("Hello");
        $scope.logIn();
        $httpBackend.when('POST', 'http://localhost:19358/api/v1/login').respond({token: "xxx", Data: {Status: 200}});
        //expect($location.path).toBe("/home");
        $httpBackend.expectPOST('http://localhost:19358/api/v1/login');
        $httpBackend.flush();
    });
})