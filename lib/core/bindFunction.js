
AttackAPI.core.bindFunction = function (func) {
	var args = [];
	
	for (var i = 1; i < arguments.length; i++)
		args.push(arguments[i]);
		
	return function () {
		func.apply(null, args);
	};
};
