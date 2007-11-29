
/**
 * @cat Core
 * @name AttackAPI.core.Module
 * @desc AttackAPI module
 */
AttackAPI.core.Module = function () {};

/**
 * @cat Core
 * @name AttackAPI.core.Module.prototype.initialize
 * @desc module constructor prototype
 */
AttackAPI.core.Module.prototype.initialize = function () {};

/**
 * @cat Core
 * @name AttackAPI.core.Module.extend
 * @desc This function is used to implement classical OO inheritance.
 * @param Object def the new class definition
 * @return {Function} extended module
 */
AttackAPI.core.Module.extend = function (def) {
	var classDef = function() {
		if (arguments[0] !== AttackAPI.core.Module) {
			this.initialize.apply(this, arguments);
		}
	};
	
	var proto = new this(AttackAPI.core.Module);
	var superClass = this.prototype;
	
	for (var n in def) {
		var item = def[n];
		
		if (item instanceof Function) {
			item.$ = superClass;
		}
			
		proto[n] = item;
	}
	
	classDef.prototype = proto;
	classDef.extend = this.extend;
	classDef.implement = this.implement;
	
	return classDef;
};

/**
 * @cat Core
 * @name AttackAPI.More.module.implement
 * @desc This function is used to extend the module prototype.
 * @param Object def the prototype definition
 * @param Object map the prototype traslation table. This parameter is
 * optional.
 */
AttackAPI.core.Module.implement = function (def, map) {
	var def = def.prototype?def.prototype:def;
	var map = ((map != undefined)?map:{});
	
	for (var i in def) {
		if (map[i]) {
			this.prototype[map[i]] = def[i];
		} else {
			this.prototype[i] = def[i];
		}
	}
};