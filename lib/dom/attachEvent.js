
/**
 * @cat DOM
 * @name AttackAPI.dom.attachEvent
 * @desc attach event listener
 * @param {Function} callback the event handler
 * @param {String} event the event name
 * @param {Object} target the target. This parameter is optional.
 * @param {Boolean} capturing whether the event is capturing or not. This
 * parameter is optional.
 */
AttackAPI.dom.attachEvent = function (callback, event, target, capturing) {
	var target = (target == undefined)?window:target;
	var capturing = (capturing == undefined)?false:true;
	
	if (target.addEventListener) {
		target.addEventListener(event, callback, capturing);
	} else {
		target.attachEvent('on' + event, callback);
	}
};
