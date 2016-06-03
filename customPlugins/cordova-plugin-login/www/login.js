var loginPlugin = {
	login : function (success, error, parameter) {
		cordova.exec(success, error, "LoginPlugin", "login", [parameter])
	}
}
module.exports = loginPlugin;