
AttackAPI.core.extend = function (obj, properties) {
	for (var item in properties)
		obj[item] = properties[item];
	
	return obj;
};
