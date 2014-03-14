app.controller("indexCtrl", ["$scope", "UserFactory", "$timeout",
	function($scope, UserFactory, $timeout) {
		$scope.uFactory = UserFactory;
		$scope.name = UserFactory.FullName;
		console.log("index.js");
		console.log($scope.uFactory);
		console.log("Nafn: " + $scope.name);
		$scope.date = new Date();
		$scope.majors = new Array(12);
		$scope.minors = new Array(60);

		var tick = function() {
			$scope.date = new Date();

			$timeout(tick, 1000);
		};
		$timeout(tick, 1000);

		$scope.logout = function() {
			alert("sure?");
		}
	}
])


app.filter('pad', function() {
  return function(num) {
    return (num < 10 ? '0' + num : num);
  };
});