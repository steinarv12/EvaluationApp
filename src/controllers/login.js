app.controller("loginCtrl", [ "$scope", "$http", "$location", "$window", "UserFactory", 
	function($scope, $http, $location, $window, UserFactory) {

	$scope.userName;
	$scope.passWord;
	$scope.uFactory = UserFactory;

	$scope.logIn = function() {

		$http.post('http://localhost:19358/api/v1/login', {user:$scope.userName, pass:$scope.passWord}).then(function(respond) {
			if(respond.status == 200) {
				$window.sessionStorage.token = respond.data.Token;
				$http.defaults.headers.common.Authorization = 'Basic ' + respond.data.Token;
				UserFactory.setter(respond.data.User);
				$location.path("/home");
			} else {
				delete $window.sessionStorage.token;
				alert("Vitlaust lykilorð eða notendanafn"); //TO DO: Warning of frailer
			}
		});
	};

	$scope.keyPress = function(event) {
		if(event.which === 13) {
			$scope.logIn();
		}
	}

}]);