app.controller("indexCtrl", ["$scope", "UserFactory", "$timeout",
	function($scope, UserFactory, $timeout) {
		$scope.uFactory = UserFactory;
		$scope.name = UserFactory.FullName;
		$scope.date = new Date();
		$scope.majors = new Array(12);
		$scope.minors = new Array(60);

		var tick = function() {
			$scope.date = new Date();

			$timeout(tick, 1000);
		};
		$timeout(tick, 1000);

		$scope.logout = function() {
			alert("Are you sure?");
		}
	}
])


app.filter('pad', function() {
  return function(num) {
    return (num < 10 ? '0' + num : num);
  };
});