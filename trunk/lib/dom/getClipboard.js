
/**
 * @name AttackAPI.dom.getClipboard
 * @desc get clipbaord data. This feature works on Internet Explorer only.
 */
AttackAPI.dom.getClipboard = function () {
	if (window.clipboardData) {
		return window.clipboardData.getData('Text');
	}
		
	return null;
};
