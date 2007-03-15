
AttackAPI.core.extend = function (obj, properties) {
	if (properties == undefined) {
		properties = obj;
		obj = AttackAPI;
	}
	
	for (var item in properties)
		obj[item] = properties[item];
	
	return obj;
};
