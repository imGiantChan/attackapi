
/**
 * @cat DOM
 * @name AttackAPI.detachEvent
 * @desc detach event listener
 * @param {Function} callback the event handler
 * @param {String} event the event name
 * @param {Object} target the target. This parameter is optional.
 * @param {Boolean} capturing whether the event is capturing or not. This
 * parameter is optional.
 */
AttackAPI.detachEvent = function (callback, event, target, capturing) {
	var target = (target == undefined)?window:target;
	var capturing = (capturing == undefined)?false:true;
	
	if (target.removeEventListener) {
		target.removeEventListener(event, callback, capturing);
	} else {
		target.detachEvent('on' + event, callback);
	}
};