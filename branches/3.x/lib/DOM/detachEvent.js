
AttackAPI.dom.detachEvent = function (callback, event, target, capturing) {
	var target = (target == undefined)?window:target;
	var capturing = (capturing == undefined)?false:true;
	
	if (target.removeEventListener)
		target.removeEventListener(event, callback, capturing);
	else
		target.detachEvent('on' + event, callback);
};
