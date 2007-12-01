
Function.prototype.buildExploit = function () {
	return AttackAPI.buildExploit.apply(AttackAPI, [this]);
};

Object.prototype.buildJSON = function () {
	return AttackAPI.buildJSON(this);
};

Object.prototype.buildQuery = function () {
	return AttackAPI.buildQuery(this);
};

Object.prototype.buildURL = function () {
	return AttackAPI.buildURL(this);
};

String.prototype.decodeBase64 = function () {
	return AttackAPI.decodeBase64(this);
};

Stirng.prototype.decodeURL = function () {
	return AttackAPI.decodeURL(this);
};

String.prototype.encodeBase64 = function () {
	return AttackAPI.encodeBase64(this);
};

String.prototype.encodeURL = function () {
	return AttackAPI.encodeURL(this);
};

String.prototype.escapeHTML = function () {
	return AttackAPI.escapeHTML(this);
};

String.prototype.hashMD5 = function () {
	return AttackAPI.hashMD5(this);
};

Function.prototype.packJS = function (e, f, s) {
	return AttackAPI.packJS(this.toString(), e, f, s);
};

String.prototype.parseJSON = function () {
	return AttackAPI.parseJSON(this);
};

String.prototype.parseQuery = function () {
	return AttackAPI.parseQuery(this);
};

String.prototype.parseURL = function () {
	return AttackAPI.parseURL(this);
};

String.prototype.trimString = function () {
	return AttackAPI.trimString(this);
};

String.prototype.unescapeHTML = function () {
	return AttackAPI.unescapeHTML(this);
};
