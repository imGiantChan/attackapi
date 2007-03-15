var Firetest = {
	success: function (test) {
		console.log(test + '...succeded');
	},
	
	failure: function (test) {
		console.error(test + '...failed');
	},
	
	log: function () {
		console.log.apply(console, arguments);
	},
	
	assert: function (test, expr) {
		if (expr)
			Firetest.success(test);
		else {
			Firetest.failure(test);
			
			var args = [];
			
			for (var i = 2; i < arguments.length; i++)
				args.push(arguments[i]);
				
			Firetest.log.apply(Firetest, args);
		}
	},
	
	start: function () {
		for (var test in window)
			if (test.substring(0, 4) == 'test' && typeof(window[test]) == 'function')
				window[test]();
	}
};

for (var item in Firetest)
	if (typeof(Firetest[item]) == 'function' && !window[item])
		window[item] = Firetest[item];