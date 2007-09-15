/*
 * by Petko D. Petkov; pdp (architect), based on Michael Geary JSON plugin (http://mg.to/2006/01/25/json-for-jquery).
 * http://www.gnucitizen.org
 * http://www.gnucitizen.org/projects/jquery-include/
 */

jQuery.extend({
	/*
	 * json callbacks
	 */
	jsonCallbacks: {},

	/*
	 * jsonLoad
	 */
	jsonLoad: function (url) {
		var script = document.createElement( 'script' );
		script.type = 'text/javascript';
		script.src = url;

		jQuery('head', document).append(script);
	},

	/*
	 * json
	 */
	json: function (url, callback) {
		var id = (new Date).getTime();
		var name = 'json_' + id;

		window[name] = jQuery.jsonCallbacks[id] = function() {
			var args = arguments;

			delete jQuery.jsonCallbacks[id];
			delete window[name];

			callback.apply(callback, args);
		};

		return jQuery.jsonLoad(url.replace(/{callback}/, name));
	}
});

jQuery.extend(jQuery.fn, {
	/*
	 * fn.json
	 */
	json: function (url, callback) {
		var _$_ = this;

		var id = (new Date).getTime();
		var name = 'json_' + id;

		window[name] = jQuery.jsonCallbacks[id] = function() {
			var args = arguments;

			delete jQuery.jsonCallbacks[id];
			delete window[name];

			_$_.each(function() {
				callback.apply(callback, args);
			});
		};

		return jQuery.jsonLoad(url.replace(/{callback}/, name));
	}
});
