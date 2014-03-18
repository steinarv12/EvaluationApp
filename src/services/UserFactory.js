app.factory("UserFactory", function() {

	var obj = {};
	obj.setter = function(user) {
		obj.FullName = user.FullName;
		obj.Role = user.Role;
		obj.ImageURL = user.ImageURL;
		obj.Email = user.Email;
		obj.SSN = user.SSN;
		obj.Username = user.Username;
	};
	obj.isAdmin = function(){
		return obj.Role == "admin";
	}
	return obj;
});	