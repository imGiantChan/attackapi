
/**
 * @cat Core
 * @name AttackAPI.core.wrap
 * @desc wrap function parameters to function call
 * @param {Object} func
 * @return {Function} the wraped function
 */
AttackAPI.core.wrap = function (func) {
	var args = [];
	
	for (var i = 1; i < arguments.length; i++) {
		args.push(arguments[i]);
	}
		
	return function () {
		func.apply(null, args);
	};
};