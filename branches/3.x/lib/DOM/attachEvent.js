
AttackAPI.dom.attachEvent = function (callback, event, target, capturing) {
	var target = (target == undefined)?window:target;
	var capturing = (capturing == undefined)?false:true;
	
	if (target.addEventListener)
		target.addEventListener(event, callback, capturing);
	else
		target.attachEvent('on' + event, callback);
};
