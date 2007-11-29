
/**
 * @cat Core
 * @name AttackAPI.core.export
 * @desc export functions and their AttackAPI dependencies
 * @param {Object} target the target to query
 */
AttackAPI.core.export = function (target) {
	var target = AttackAPI.core.clone(target);
	
	var o = {};
	var p = Array.prototype.slice.call(arguments, 1);
	
	var item = p.pop();
	
	while(item) {
		var prop = target[item];
		
		if (typeof(prop) == 'function') {
			var match = prop.toString().match(/(AttackAPI(?:\.\w+)*)/g);
			
			for (var i = 0; i < match.length; i++) {
				eval('var _t = ' + match[i]);
			}
		} else {
			o[item] = prop;
		}
		
		item = p.pop();
	}
	
	return o;
};