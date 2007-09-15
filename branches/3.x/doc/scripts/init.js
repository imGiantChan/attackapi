// when the document is ready!
$(document).ready(function () {
	// define some basics
	$.extend($.blockUI.defaults.overlayCSS, {backgroundColor: '#000000', opacity: '0.5', cursor: 'auto'});
	$.extend($.blockUI.defaults.pageMessageCSS, {backgroundColor: '#000000', color: '#999999', cursor: 'auto', border: 'none', textAlign: 'left'});

	// hide the gadget list
	$('#gadgetList').hide();

	// query the environment
	var index = $(document).getUrlParam('index');
	var columns = $(document).getUrlParam('columns');

	if (!index) {
		index = 'gadgets/index.xml';
	}

	switch (columns) {
		case '1':
			$('#gc2, #gc3').remove();
			$('#gc1').css({width: '98%'});
			break;
		case '2':
			$('#gc3').remove();
			$('#gc1').css({width: '65%'});
			break;
	}

	// hook on click event for btn_add_gadget
	$('#btnAddGadgets').toggle(function () {
		$('#gadgetList').fadeIn();
	}, function ()  {
		$('#gadgetList').fadeOut();
	});

	// block the UI after 500ms
	var tmr = window.setTimeout(function () {
		$.blockUI('<div class="box" style="text-align: center">Loading...</div>');
	}, 500);

	// load gadget list
	$.loadGadgetList(index, function (gadgets) {
		$(gadgets).each(function (i, v) {
			var item = document.createElement('li');
			$(item).append('<a href="#">' + v.name + '</a> - ' + v.description);
			$(item).click(function () {
				// enable the loading screen after 500ms
				var tmr = window.setTimeout(function () {
					$.blockUI('<div class="box" style="text-align: center">Loading...</div>');
				}, 500);

				$.loadGadget(v.src, function () {
					// kill the timer
					window.clearTimeout(tmr);

					// unblock the UI
					$.unblockUI();
				});

				$(document).focus();

				return false;
			});

			$('#gadgetList ul').append(item);
		});

		// kill the timer
		window.clearTimeout(tmr);

		// unblock the UI
		$.unblockUI();
	});
});
