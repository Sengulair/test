function Model() {
	this.users = [];
}
Model.prototype.addUser = function(user) {
	for (var i = 0; i < this.users.length; i++) {
		if (user.tel === this.users[i].tel) {
			return false;
		}
	}
	this.users.push(user);
	return true;
}
Model.prototype.deleteUser = function(telToDelete) {
	for (var i = 0; i < this.users.length; i++) {
		if (this.users[i].tel === telToDelete) {
			this.users.splice(i,1);
			return;
		}
	}
}
Model.prototype.updateUser = function(indexUser, indexKey, newValue) {
	var currentKey = 0;
	for (var key in this.users[indexUser]) {
		if (currentKey !== indexKey) currentKey++;
		else break;
	}
	this.users[indexUser][key] = newValue;
}