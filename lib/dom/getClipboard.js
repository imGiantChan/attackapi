
AttackAPI.dom.getClipboard = function () {
	if (window.clipboardData)
		return window.clipboardData.getData('Text');
		
	return null;
};
