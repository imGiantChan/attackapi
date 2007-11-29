
AttackAPI.dom.hijackEval = function (hijack) {
	window.__eval = window.eval;
	window.eval = function (expr) {
		if (typeof(hijack.oneval) == 'function')
			hijack.oneval(expr);
			
		window.__eval(expr);
	};
};