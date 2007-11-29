
/**
 * @cat Core
 * @name AttackAPI.core.clone
 * @desc clone object
 * @param {Object} obj the object to clone
 * @return {Object} cloned object
 */
AttackAPI.core.clone = function (obj) {
	var _obj = arguments.callee;
	_obj.prototype = obj;
	
	return new _obj();
};