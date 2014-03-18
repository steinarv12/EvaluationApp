app.controller("indexCtrl", ["$scope", "UserFactory", "$timeout", "$window", "$location",
	function($scope, UserFactory, $timeout, $window, $location) {
		console.log(UserFactory.FullName);
		$scope.uFactory = UserFactory;
		$scope.name = UserFactory.FullName;
		$scope.date = new Date();
		$scope.majors = new Array(12);
		$scope.minors = new Array(60);

		$scope.tick = function() {
			$scope.date = new Date();

			$timeout($scope.tick, 1000);
		};
		$timeout($scope.tick(), 1000);
	}
])

app.filter('pad', function() {
  return function(num) {
    return (num < 10 ? '0' + num : num);
  };
});