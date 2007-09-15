
/**
 * @cat DOM
 * @name AttackAPI.dom.getDocument
 * @desc get the document from target in cross-browser manner
 * @param {Object} target the target. This parameter is optional.
 * @return {Object} object document
 */
AttackAPI.dom.getDocument = function (target) {
	var doc = null;
		
	if (target == undefined) {
		doc = document;
	} else if (target.contentDocument) {
		doc  = target.contentDocument;
	} else if (target.contentWindow) {
		doc = target.contentWindow.document;
	} else if (target.document) {
		doc = target.document;
	}
	
	return doc;
};
