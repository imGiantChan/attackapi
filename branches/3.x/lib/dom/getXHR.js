
/**
 * @cat DOM
 * @name AttackAPI.dom.getXHR
 * @desc return XMLHttpRequest object in a cross-browser manner
 */
AttackAPI.dom.getXHR = function () {
	var xhr = null;
	
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.createRequest) {
		xhr = window.createRequest();
	} else if (window.ActiveXObject) {
		try {
			xhr = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e) {
			try {
				xhr = new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e) {}
		}
	}
	
	return xhr;
};
