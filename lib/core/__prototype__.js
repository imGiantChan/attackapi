
Object.prototype.clone = function () {
	return AttackAPI.clone(this);
};

Object.prototype.extend = function (s) {
	return AttackAPI.extend(this, s);
};

Function.prototype.frap = function () {
	return AttackAPI.frap.apply(this, arguments);
};

Array.prototype.iterate = function () {
	return AttackAPI.iterate(this);
};

Function.prototype.subclass = function (s) {
	return AttackAPI.subclass(this, s);
};
