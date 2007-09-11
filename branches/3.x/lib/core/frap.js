
/**
 * @cat Core
 * @name AttackAPI.frap
 * @desc wrap function parameters to function call
 * @param {Object} f the function to wrap
 * @return {Function} wraped function
 */
AttackAPI.frap = function (f) {
	var a = [];
	
	for (var i = 1; i < arguments.length; i++) {
		a.push(arguments[i]);
	}
		
	return function () {
		f.apply(f, a);
	};
};
