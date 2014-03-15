app.factory("UserFactory", function() {

	var obj = {};
	obj.setter = function(user) {
		console.log("user er:");
		console.log(user);
		obj.FullName = user.FullName;
		obj.Role = user.Role;
		obj.ImageURL = user.ImageURL;
		obj.Email = user.Email;
		obj.SSN = user.SSN;
		obj.Username = user.Username;
		console.log("Obj er:");
		console.log(obj);
	};
	obj.isAdmin = function(){
		return obj.Role == "admin";
	}
	return obj;
});