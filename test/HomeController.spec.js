describe("HomeController tests", function() {
    var $scope, $location, $rootScope, $window, controller;

    beforeEach(module("EvaluationApp"));
    beforeEach(inject(function($injector, $controller) {
        $rootScope = $injector.get('$rootScope');
        $window = $injector.get('$window');
        $scope = $rootScope.$new();
        $window.sessionStorage.token = "xxx"
        controller = $controller("HomeController", {
            "$scope": $scope
        });
    }));


    it('should have something with test', function() {
        expect($scope.tests).toBe("tests");
    });
});