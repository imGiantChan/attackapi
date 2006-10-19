MasterAPI.Console = {};
MasterAPI.Console.createInteractiveConsole = function (textarea) {
	var console = (textarea == undefined)?document.createElement('textarea'):textarea;
	console.lastCaretPosition = 0;
	
	console.history = [];
	console.history.reset = function () {
		this.position = (this.length == 0)?0:this.length;
	};
	console.history.up = function () {
		if (this.length == 0)
			return '';

		this.position = (this.position + 1 >= this.length)?this.length - 1:this.position + 1;
		return this[this.position];
	};
	console.history.down = function () {
		if (this.length == 0)
			return '';

		this.position = (this.position <= 0)?0:this.position - 1;
		return this[this.position];
	};
	console.history.reset();
	
	console.clear = function () {
		this.value = '';
		this.lastCaretPosition = 0;
		this.setCaretPosition(this.lastCaretPosition);
	};
	console.write = function (str) {
		this.value += str;
		this.lastCaretPosition = this.value.length;
		this.scrollTop = this.scrollHeight;
	};
	console.getCaretPosition = function () {
		if (document.selection) {
			this.focus();
			var sel = document.selection.createRange();
			sel.moveStart('character', -this.value.length);
			return sel.text.length;
		} else if (this.selectionStart || this.selectionStart == '0') {
			return this.selectionStart;
		}
		
		return 0;
	};
	console.setCaretPosition = function (pos) {
		if(this.setSelectionRange) {
			this.focus();
			this.setSelectionRange(pos,pos);
		} else if (this.createTextRange) {
			var range = this.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	};
	console.onfocus = function () {
		this.setCaretPosition(this.lastCaretPosition);
	};
	console.onkeydown = function (e) {
		if (!e) e = window.event;
		if ((e.keyCode == 8 || e.keyCode == 37) && this.getCaretPosition() <= this.lastCaretPosition) {
			return false;
		} else if (!e.shiftKey && e.keyCode == 13) {
			this.setCaretPosition(this.value.length);
			var command = this.value.substring(this.lastCaretPosition, this.value.length);
			console.oninput(command);
			this.history.push(command);
			this.history.reset();
			this.scrollTop = this.scrollHeight;
			return false;
		} else if (e.keyCode == 38) {
			this.value = this.value.substring(0, this.lastCaretPosition) + this.history.down();
			this.scrollTop = this.scrollHeight;
			return false;
		} else if (e.keyCode == 40) {
			this.value = this.value.substring(0, this.lastCaretPosition) + this.history.up();
			this.scrollTop = this.scrollHeight;
			return false;
		}
		
		return true;
	};
	console.oninput = function (input) {
	};

	return console;
};
