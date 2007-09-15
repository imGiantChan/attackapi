
/**
 * @cat DOM
 * @name AttackAPI.dom.parseHTML
 * @desc parse xml string into DOM structure
 * @param {String} html the string to process
 */
AttackAPI.dom.parseHTML = function (html) {
	var ifr = document.createElement('iframe');
	ifr.style.visibility = 'hidden';
	ifr.style.width = ifr.style.height = 0;
	
	document.body.appendChild(ifr);
	
	var doc = this.getDocument(ifr);
	
	doc.open();
	doc.write(html);
	doc.close();
	
	return doc;
};
