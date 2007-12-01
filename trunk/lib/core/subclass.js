
/**
 * @cat Core
 * @name AttackAPI.subclass
 * @desc subclass object. The function simply subclasses another object.
 * @param {Object} o the object to subclass
 * @param {Object} s source object for subclassing
 * @return {Object} subclassed object
 */
AttackAPI.subclass = function (o, s) {
	function i() {}
	i.prototype = s.prototype;

	o.prototype = new i();
	o.prototype.constructor = o;

	return o;
};
