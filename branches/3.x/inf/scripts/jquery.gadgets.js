/**
 * @name jQuery Gadgets
 * @version 0.5
 * @author Petko D. Petkov; pdp (architect)
 * @homepage http://www.gnucitizen.org
 * @desc gadget management module
 */

/**
 * @name jQuery.constructGadgetMarkup
 * @desc constuct markup from gadget
 * @param {Object} gadget the gadget object to use
 * @return {String} gadget markup
 */
jQuery.constructGadgetMarkup = function (gadget) {
	return '<h2 class="gadgetHeader">' + gadget.name + '</h2><div class="gadgetActions"><a class="gadgetActionMinimize" href="#"><span>-</span></a> <a class="gadgetActionClose" href="#"><span>X</span></a></div><div class="gadgetContent">' + gadget.content + '</div>';
};

/**
 * @name jQuery.constructGadgetObject
 * @desc process the gadget markup
 * @param {Object} markup xml markup of the gadget
 * @param {String} src optional parameter that specifies that gadget URL
 * @return {Object} processed object
 */
jQuery.constructGadgetObject = function (markup, src) {
	var doc = jQuery(markup.firstChild);

	var name = doc.children('name').text();
	var description = doc.children('description').text();
	var content = doc.children('content').text()
		.replace(/__MODULE_ID__/g, (new Date).getTime().toString() + Math.round(1000000*Math.random()).toString())
		.replace(/__MODULE_BASE__/g, src.split('/').reverse().splice(1).reverse().join('/'));

	return {name: name, description: description, content: content, src: src};
};

/**
 * @name jQuery.loadGadget
 * @desc load gadget from URL
 * @param {String} url gadget resource URL
 * @param {String} container container for the gadget. This parameter is optional.
 * @param {Function} onready callback function for when the gadget is ready
 */
jQuery.loadGadget = function (url, container, onready) {
	if (typeof(container) == 'function') {
		var onready = container;
		var container = undefined;
	}

	if (!container) {
		var last_height = 0;

		jQuery('div.gadgetContainer').each(function (i, e) {
			var height = jQuery(e).height();

			if (!last_height || height < last_height) {
				last_height = height;
				container = e;
			}
		});
	}

	jQuery.get(url, function (data) {
		var _gadget = jQuery.constructGadgetObject(data, url);
		var gadget = document.createElement('div');

		jQuery(gadget).attr('class', 'gadget');
		jQuery(gadget).get(0)._gadget = _gadget;
		jQuery(gadget).append(jQuery.constructGadgetMarkup(_gadget));

		jQuery(container).append(gadget);

		jQuery.integrateGadgets();

		if (typeof(onready) == 'function') {
			onready.call(onready);
		}
	});
};

/**
 * @name jQuery.loadGadgetList
 * @desc load a list of gadgets and resolve relative paths
 * @param {String} url gadget list URL
 * @param {Function} onload callback function for when the list is loaded
 */
jQuery.loadGadgetList = function (url, onload) {
	jQuery.get(url, function (data) {
		var gadgets = [];
		var doc = jQuery(data.firstChild);

		doc.children('gadgets gadget').each(function () {
			var name = jQuery(this).attr('name');
			var src = jQuery(this).attr('src');
			var description = jQuery(this).attr('description');

			if (!src.match(/^\w+:\/\//)) {
				var tokens = url.split('/');

				src = (tokens.slice(0, tokens.length - 1).join('/') + '/' + src).replace(/\/+/, '/');
			}

			gadgets.push({name: name, src: src, description: description});
		});

		if (typeof(onload) == 'function') {
			onload.call(onload, gadgets);
		}
	});
};

/**
 * @name jQuery.integrateGadgets
 * @desc integrate all gadgets
 */
jQuery.integrateGadgets = function () {
	jQuery('.gadgetContainer').Sortable({
		accept: 'gadget',
		helperclass: 'gadgetSortHelper',
		handle: '.gadgetHeader',
		tolerance: 'pointer',

		onStart: function() {
			jQuery.iAutoscroller.start(this, document.getElementsByTagName('body'));
		},
		onStop: function() {
			jQuery.iAutoscroller.stop();
		}
	});

	jQuery('.gadgetContainer .gadget .gadgetActionMinimize').unbind('click');
	jQuery('.gadgetContainer .gadget .gadgetActionMinimize').toggle(function () {
		jQuery(this).parent().parent().children('.gadgetContent').hide();
		jQuery(document).focus();

		return false;
	}, function () {
		jQuery(this).parent().parent().children('.gadgetContent').show();
		jQuery(document).focus();

		return false;
	});

	jQuery('.gadgetContainer .gadget .gadgetActionClose').unbind('click');
	jQuery('.gadgetContainer .gadget .gadgetActionClose').click(function () {
		jQuery(this).parent().parent().remove();
		jQuery(document).focus();

		return false;
	});
};

/**
 * @name jQuery.fn.getGadgetPosition
 * @desc get gadget position
 * @return {Array} position of the gadget
 */
jQuery.fn.getGadgetPosition = function () {
	var index = 0;
	var positions = [];
	var lastContainer = '';

	jQuery(this).each(function (i, v) {
		var id = jQuery(v).parent().attr('id');

		if (lastContainer != id) {
			index = i;
			lastContainer = id;
		}

		positions.push(jQuery.extend({container: id, index: i - index}, v._gadget));
	});

	return positions;
};

// integrate gadgets when the document is ready
jQuery(document).ready(function () {
	jQuery.integrateGadgets();
});
