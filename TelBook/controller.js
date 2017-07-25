function Controller(model, view) {
	this.model = model;
	this.view = view;
	this.view.on('addUser', this.addUser);
	this.view.on('deleteUser', this.deleteUser);
	this.view.on('updateUser', this.updateUser);
}
Controller.prototype.addUser = function(user) {
	for (var key in user[0]) {
		if (user[0][key] === '') {
			alert('Поля не должны быть пустыми');
			return;
		}
	}
	if ( this.model.addUser(user[0]) ) this.view.renderList(user[0]);
	else alert('Такой номер уже существует');
}
Controller.prototype.deleteUser = function(indexChild) {
	var deleteTel = this.view.telBookList.children[indexChild[0]].children[2].innerHTML;
	this.model.deleteUser(deleteTel);
	this.view.deleteUser(indexChild[0]);
}
Controller.prototype.updateUser = function(args) {
	var that = this;
	var parent = args[0];
	var indexChild = args[1];
	var indexUser = args[2];
	var editUserInput = this.view.updateUser(parent, indexChild);
	editUserInput.addEventListener('blur', function() {
		parent.children[indexChild].innerHTML = editUserInput.value;
		parent.removeChild(editUserInput);
		parent.children[indexChild].style.display = '';
		var newValue = parent.children[indexChild].innerHTML;
		that.model.updateUser(indexUser, indexChild, newValue);
	});
}
