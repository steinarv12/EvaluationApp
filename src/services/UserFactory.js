app.factory("UserFactory", function() {

	var obj = {};
	obj.setter = function(user) {
		obj = user;
	};
	obj.getter = function(){
		return obj;
	};
	obj.isAdmin = function(){
		return obj.Role == "admin";
	}
	return obj;
});