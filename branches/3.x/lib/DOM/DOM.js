
/**
 * @name AttackAPI.Exploit['::DOM']
 * @desc DOM based util class, father of all DOM utils
 * @extend AttackAPI.Util
 */
AttackAPI.Util['::DOM'] = AttackAPI.Util.extend({
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.getXHR
	 * @desc get XMlHttpRequest instance in a cross browser manner
	 */
	getXHR: function () {
		if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		} else if (window.createRequest) {
			return window.createRequest();
		} else if (window.ActiveXObject) {
			try {
				return new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e) {
				try {
					return new ActiveXObject('Microsoft.XMLHTTP');
				} catch (e) {}
			}
		}
		
		throw 'XMLHttpRequest implementation not found';
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.getDoc
	 * @desc get the document object in a cross browser manner
	 * @param Object target the target from where the document object will be extracted
	 */
	getDoc: function (target) {
		if (target == undefined) {
			return document;
		} else if (target.contentDocument) {
			return target.contentDocument;
		} else if (target.contentWindow) {
			return target.contentWindow.document;
		} else if (target.document) {
			return target.document;
		}
		
		throw 'document object not found';
	},
	/**
	 * @name AttackAPI.Util['::DOM'].prototype.log
	 * @desc log a message into Firebug console
	 */
	log: function () {
		if (window.console.log) {
			window.console.log.apply(window.console.log, arguments);
		}
	}
});

/**
 * @name AttackAPI.Exploit['::DOM']
 * @desc DOM  based exploit class, father of all DOM exploits
 * @extend AttackAPI.Exploit
 */
AttackAPI.Exploit['::DOM'] = AttackAPI.Exploit.extend({
	/* empty */
});