/**
 * @name AttackAPI
 * @desk the framework head
 */
var AttackAPI = {
	version: '3.0a',
	author: 'Petko Petkov | pdp (architect)',
	homePage: 'http://www.gnucitizen.org',
	projectHome: 'http://www.gnucitizen.org/projects/attackapi'};
	
/**
 * @name AttackAPI.Class
 * @desc base class, father of all AttackAPI classes
 */
AttackAPI.Class = function () {};

/**
 * @name AttackAPI.Class.prototype.initialize
 * @desc class constructor prototype
 */
AttackAPI.Class.prototype.initialize = function () {};

/**
 * @name AttackAPI.Class.extend
 * @desc This function is used to implement classical OO inheritance.
 * @param Object def the new class definition
 */
AttackAPI.Class.extend = function (def) {
	var classDef = function() {
		if (arguments[0] !== AttackAPI.Class)
			this.initialize.apply(this, arguments);
	};
	
	var proto = new this(AttackAPI.Class);
	var superClass = this.prototype;
	
	for (var n in def) {
		var item = def[n];
		
		if (item instanceof Function)
			item.$ = superClass;
			
		proto[n] = item;
	}
	
	classDef.prototype = proto;
	classDef.extend = this.extend;
	classDef.implement = this.implement;
	
	return classDef;
};

/**
 * @name AttackAPI.Class.implement
 * @desc This function is used to extend the class prototype.
 * @param Object def the prototype definition
 * @param Object map the prototype traslation table. This parameter is
 * optional.
 */
AttackAPI.Class.implement = function (def, map) {
	var def = def.prototype?def.prototype:def;
	var map = map?map:{};
	
	for (var i in def)
		if (map[i])
			this.prototype[map[i]] = def[i];
		else
			this.prototype[i] = def[i];
};
