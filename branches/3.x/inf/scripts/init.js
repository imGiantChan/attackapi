$.extend($.blockUI.defaults.overlayCSS, {backgroundColor: '#000000', opacity: '0.5', cursor: 'auto'});
$.extend($.blockUI.defaults.pageMessageCSS, {backgroundColor: '#000000', color: '#999999', cursor: 'auto', border: 'none', textAlign: 'left'});

$(document).ready(function () {
	$.blockUI('<div class="box" style="text-align: center">Loading...</div>');

	$.ajax({
		url: 'data/doc.xml',
		type: 'GET',
		dataType: 'xml',
		timeout: 1000,

		error: function(){
			$.blockUI('<div class="box" style="text-align: center">Error loading XML document!</div>');
		},
		success: function(xml){
			$.unblockUI();

			var cats = {};
			var last_cat = '';

			$(xml).find('entry').each(function () {
				var cat = $(this).attr('cat');
				var name = $(this).attr('name');
				var short = $(this).attr('short');

				cats[cat] = true;

				if (last_cat != cat) {
					$('<div id="cat_' + cat + '" class="cat"><h3>' + cat + '</h3></div>').appendTo('#content').hide();
					$('#content .cat:first-child').show();
				}

				$('<div class="scaffold"><h4>' + name + '</h4><p>' + short + '</p></div>').appendTo('#content .cat:last-child');

				last_cat = cat;
			});

			for (var cat in cats) {
				$('<li><a href="#cat_' + cat + '">' + cat + '</a></li>').appendTo('#navigation ul').children('a').click(function () {
					$('#content .cat').hide();
					$('#content ' + $(this).attr('href')).show();

					return false;
				});
			}

			// fixing jquery/firefox bugs
			$('#navigation').hide();
			setTimeout(function () {
				$('#navigation').show();
			}, 1);
		}
	});
});
