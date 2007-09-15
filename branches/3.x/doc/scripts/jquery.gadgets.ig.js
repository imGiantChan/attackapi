/**
 * @name jQuery Gadgets iGoogle integration
 * @version 0.1a
 * @author Petko D. Petkov; pdp (architect)
 * @homepage http://www.gnucitizen.org
 * @desc gadget management module
 */

/**
 * @name jQuery._ig_constructGadgetObject
 * @desc process the gadget markup
 * @param {Object} markup xml markup of the gadget
 * @param {String} src optional parameter that specifies that gadget URL
 * @return {Object} processed object
 */
jQuery._ig_constructGadgetObject = jQuery.constructGadgetObject;

/**
 * @name jQuery.constructGadgetObject
 * @desc process the gadget markup
 * @param {Object} markup xml markup of the gadget
 * @param {String} src optional parameter that specifies that gadget URL
 * @return {Object} processed object
 */
jQuery.constructGadgetObject = function (markup, src) {
	var doc = jQuery(markup.firstChild);

	if (doc.children('ModulePrefs').length) {
		var name = doc.children('ModulePrefs').attr('title');
		var content = doc.children('content').text()
			.replace(/__MODULE_ID__/g, (new Date).getTime().toString() + Math.round(1000000*Math.random()).toString())
			.replace(/__MODULE_BASE__/g, src.split('/').reverse().splice(1).reverse().join('/'));

		return {name: name, description: '', content: content, src: src};
	} else {
		return jQuery._ig_constructGadgetObject.call(jQuery, markup, src);
	}
};
