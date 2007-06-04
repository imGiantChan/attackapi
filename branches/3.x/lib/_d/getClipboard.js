
/**
 * @cat DOM
 * @name AttackAPI.getClipboard
 * @desc get clipbaord data. This feature works on Internet Explorer only.
 * @return {String} current clipboard data
 */
AttackAPI.getClipboard = function () {
	if (window.clipboardData) {
		return window.clipboardData.getData('Text');
	}
		
	return null;
};