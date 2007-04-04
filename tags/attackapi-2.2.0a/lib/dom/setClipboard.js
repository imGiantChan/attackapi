
AttackAPI.dom.setClipboard = function (value) {
	if (window.clipboardData)
		return window.clipboardData.getData('Text', value);
		
	return null;
};
