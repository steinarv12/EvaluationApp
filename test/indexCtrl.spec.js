describe("indexCtrl tests", function() {
    var $scope, $timeout, $rootScope, $window;



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
                },
                FullName: "Gunnar"
            };
            $provide.value("UserFactory", mock);
        });

        inject(function($injector, $controller) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $timeout = $injector.get('$timeout');
            $window = $injector.get('$window');

            controller = $controller("indexCtrl", {
                "$scope": $scope
            });
        });
    });

    it("should have saved the name", function(){
        expect($scope.name).toBe("Gunnar");
    });

    it("Should be able to update the clock", function(){
        var tock = $scope.date;
        $scope.tick();
        expect(tock).toBeDefined();

        waitsFor(function() {
            return $scope.date != tock;
        }, "Time should have passed", 5000);
        runs(function(){
            expect(tock).not.toEqual($scope.date);
        });
        
    })

}); 