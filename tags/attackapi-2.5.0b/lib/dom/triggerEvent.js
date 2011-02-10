
AttackAPI.triggerEvent = function (event, data, target) {
	var target = (target == undefined)?window:target;
	
	if (typeof(target['on' + event]) == 'function')
		target['on' + event](data);
};