
// make sure that we eventually create an array
AttackAPI.dom.hijackArray = function (hijack) {
	window.Array = function () {
		var obj = this;
		var ind = 0;
		var getNext;
		
		getNext = function(x) {
			obj[ind++] setter = getNext;
			
			if(typeof(hijack.onset) == 'function')
				hijack.onset(x);
		};
		
		this[ind++] setter = getNext;
	};
};