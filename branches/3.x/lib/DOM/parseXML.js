
AttackAPI.dom.parseXML = function (xml, type) {
	if (window.ActiveXObject) {
		var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
		xmlDoc.async = false;
		xmlDoc.loadXML(xml);
		
		return xmlDoc;
	} else {
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(xml, type?type:'text/xml');
		
		return xmlDoc;
	}
};