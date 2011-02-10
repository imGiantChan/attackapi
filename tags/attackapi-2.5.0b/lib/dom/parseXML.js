
/**
 * @cat DOM
 * @name AttackAPI.dom.parseXML
 * @desc parse xml string into DOM structure
 * @param {String} xml the string to process
 */
AttackAPI.dom.parseXML = function (xml) {
	try {
		if (window.ActiveXObject) {
			var xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
			xmlDoc.async = false;
			xmlDoc.loadXML(xml);
			
			return xmlDoc;
		} else {
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(xml, 'text/xml');
			
			return xmlDoc;
		}
	} catch (e) {
		return null;
	}
};
