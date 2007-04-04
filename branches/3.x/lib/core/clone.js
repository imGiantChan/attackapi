
AttackAPI.core.clone = function (obj) {
	if (arguments.length == 1) {
		var _obj = arguments.callee;
		_obj.prototype = obj;
		
		return new _obj();
	}
};
