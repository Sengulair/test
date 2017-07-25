function View() {
	this.events = [];
	this.telBookForm = document.getElementById('telBookForm');
	this.telBookInputName = document.getElementById('telBookInputName');
	this.telBookInputSurname = document.getElementById('telBookInputSurname');
	this.telBookInputTel = document.getElementById('telBookInputTel');
	this.telBookList = document.getElementById('telBookList');

	telBookForm.addEventListener('submit', this.handleAddUser.bind(this));
}
View.prototype.handleAddUser = function(event) {
	event.preventDefault();
	var name = this.telBookInputName.value;
	var surname = this.telBookInputSurname.value;
	var tel = this.telBookInputTel.value;
	this.emit('addUser', {name, surname, tel});
	this.telBookInputName.value = '';
	this.telBookInputSurname.value = '';
	this.telBookInputTel.value = '';
}
View.prototype.on = function(event, handler) {
	this.events[event] = this.events[event] || [];
	this.events[event].push(handler);
}
View.prototype.emit = function(event, ...args) {
	this.events[event].forEach(function(handler) {
		handler(args);
	});
}
View.prototype.renderList = function(user) {
	var createdLi = document.createElement('li');
	createdLi.className = 'list-group-item';
	var spanName = document.createElement('span');
	var spanSurname = document.createElement('span');
	var spanTel = document.createElement('span');
	spanName.innerHTML = user.name;
	spanSurname.innerHTML = user.surname;
	spanTel.innerHTML = user.tel;
	var deleteButton = document.createElement('button');
	deleteButton.innerHTML = 'Удалить';
	deleteButton.className = 'btn btn-default';
	createdLi.appendChild(spanName);
	createdLi.appendChild(spanSurname);
	createdLi.appendChild(spanTel);
	createdLi.appendChild(deleteButton);
	this.telBookList.appendChild(createdLi);
	for (var i = 0; i < this.telBookList.children.length; i++) {//индекс li
		if (this.telBookList.children[i] === createdLi) break; 
	}
	deleteButton.addEventListener('click', this.emit.bind(this, 'deleteUser', i));
	for (var j = 0; j < createdLi.children.length - 1; j++) {//индекс span'a в li
		createdLi.children[j].addEventListener('click', this.emit.bind(this, 'updateUser', createdLi, j, i));
	}
}
View.prototype.deleteUser = function(index) {
	this.telBookList.removeChild(this.telBookList.children[index]);
}
View.prototype.updateUser = function(parent, indexChild) {
	parent.children[indexChild].style.display = 'none';
	var editUserInput = document.createElement('input');
	editUserInput.value = parent.children[indexChild].innerHTML;
	parent.insertBefore(editUserInput, parent.children[indexChild + 1]);
	editUserInput.focus();
	return editUserInput;
}
