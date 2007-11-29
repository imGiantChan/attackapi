
/**
 * @cat DOM
 * @name AttackAPI.dom.getAgent
 * @desc retrieve browser agent string
 * @return {String} current browser agent
 */
AttackAPI.dom.getAgent = function () {
	var agent = '';
	
	if (navigator.userAgent) {
		agent = navigator.userAgent;
	} else if (navigator.vendor) {
		agent = navigator.vendor;
	} else if (window.opera) {
		agent = 'opera';
	}
		
	agent = agent.toLowerCase();
	
	if (/webkit/.test(agent)) {
		return 'safari';
	} else if (/opera/.test(agent)) {
		return 'opera';
	} else if (/msie/.test(agent) && !/opera/.test(agent)) {
		return 'msie';
	} else if (/mozilla/.test(agent) && !/(compatible|webkit)/.test(agent)) {
		return 'mozilla';
	} else {
		return null;
	}
};
