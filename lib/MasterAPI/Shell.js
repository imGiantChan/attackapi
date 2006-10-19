MasterAPI.Shell = {};
MasterAPI.Shell.createJavaScriptShell = function (console) {
	var self = this;

	this.console = console;
	this.scope = {__builtins__: {
		dir: function (obj) {
			var obj = obj?obj:self.scope;
			var items = [];

			for (item in obj)
				items.push(item);

			return items;
		},
		hist: function () {
			return self.console.history;
		},
		print: function (obj) {
			var type = typeof(obj);

			if (type == 'object' && obj.constructor == Array) {
				self.console.write("\n[");
				for (index = 0; index < obj.length; index++) {
					var prefix = ' ';
					var suffix = ",\n";

					if (index == 0)
						prefix = '';

					if (index == obj.length - 1)
						suffix = '';

					self.console.write(prefix + "'" + obj[index] + "'" + suffix);
				}
				self.console.write("]");
			} else {
				self.console.write("\n" + obj);
			}
		},
		clear: function () {
			self.console.clear();
		},
		reset: function () {
			var builtins = self.scope.__builtins__;
			self.scope = {__builtins__: builtins, __globals__: window, _: ''};
		},
		load: function (url) {
			var script = document.createElement('script');
			script.src = url;
			script.type = 'text/javascript';
			script.defer = true;
			self.console.parentNode.insertBefore(script, console);
		}
	}, __globals__: window, _: ''};
	
	this.oninput = function (input) {
		try {
			with (self.scope) with (self.scope.__builtins__) {
				var obj = self.scope.eval(input + ';');
				if (obj)
					self.scope.__builtins__.print(obj);

				self.scope['_'] = obj;
			}
		} catch (e) {
			self.console.write("\n" + e);
		}

		self.console.write("\n>> ");
	};

	this.console.write(">> ");
	this.console.oninput = this.oninput;
};
