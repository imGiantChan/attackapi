
/**
 * @cat Core
 * @name AttackAPI.clone
 * @desc clone object
 * @param {Object} o the object to clone
 * @return {Object} cloned object
 */
AttackAPI.clone = function (o) {
	var _o = arguments.callee;
	_o.prototype = o;
	
	return new _o();
};