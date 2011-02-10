
/**
 * @cat DOM
 * @name AttackAPI.dom.setClipboard
 * @desc set the clipboard data. This feature works on Internet Explorer only.
 * @param {String} value the value to set
 */
AttackAPI.dom.setClipboard = function (value) {
	if (window.clipboardData) {
		return window.clipboardData.getData('Text', value);
	}
	
	return null;
};
