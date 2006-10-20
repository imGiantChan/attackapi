MasterAPI.Shell = {};
MasterAPI.Shell.createJavaScriptShell = function (console) {
	var shell = {
		console: console};
		
	shell.scope = {
		__builtins__: new Array(),
		__globals__: window,
		__console__: shell.console,
		__shell__: shell,
		_: ''};
		
	shell.scope.__builtins__.dir = function (obj) {
		var obj = obj?obj:shell.scope;
		var items = new Array();
		
		for (var item in obj)
			items.push(item);
			
		return items;
	};
	shell.scope.__builtins__.hist =  function (line) {
		if (line != undefined && line < shell.console.history.length)
			return shell.console.history[line];
			
		return shell.console.history;
	};
	shell.scope.__builtins__.print = function (obj) {
		var type = typeof(obj);
		
		if (type == 'object' && obj.constructor == Array) {
			shell.console.write("\n[");
			
			for (var index = 0; index < obj.length; index++) {
				var prefix = ' ';
				var suffix = ",\n";

				if (index == 0)
					prefix = '';

				if (index == obj.length - 1)
					suffix = '';

				shell.console.write(prefix + "'" + obj[index] + "'" + suffix);
			}
			
			shell.console.write("]");
		} else {
			shell.console.write("\n" + obj);
		}
	};
	shell.scope.__builtins__.clear = function () {
		shell.console.clear();
	};
	shell.scope.__builtins__.reset = function () {
			var builtins = shell.scope.__builtins__;
			shell.scope = {__builtins__: builtins, __globals__: window, __shell__: shell, _: ''};
	};
	shell.scope.__builtins__.load = function (url) {
		if (!url)
			throw 'cannot load external resource';
		
		var script = document.createElement('script');
		script.src = url;
		script.type = 'text/javascript';
		script.defer = true;
		shell.console.parentNode.insertBefore(script, console);
	};
	
	shell.inputHandler = function (__) {
		var __shell__ = shell;
		
		try {
			with (__shell__.scope) with (__shell__.scope.__builtins__) {
				
				// the following statement gives problems to IE and Opera
				__shell__.scope._ = eval.call(__shell__.scope, __ + ';');
				
				if (__shell__.scope._)
					__shell__.scope.__builtins__.print(__shell__.scope._);
			}
		} catch (e) {
			__shell__.console.write("\n" + e.message);
		}

		__shell__.console.write("\n>> ");
	};

	shell.console.write(">> ");
	shell.console.oninput = shell.inputHandler;
	
	return shell;
};
