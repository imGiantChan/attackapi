$(document).ready(function () {
	$.ajax({
		method: 'GET',
		url: 'data/doc.json',

		success: function (data) {
			eval("window.data = " + data + ";");

			var cats = {};
			var last_cat = '';

			for (var i = 0; i < window.data.length; i++) {
				var item = window.data[i];

				if (last_cat != item.cat && !cats[item.cat]) {
					$('<div id="cat_' + item.cat + '" class="cat"><h3>' + item.cat + '</h3><ul class="items"></ul></div>').appendTo('#content').hide();
				}

				var params = [];

				for (var z = 0; z < item.params.length; z++) {
					var param = item.params[z];

					params.push('<span class="field-param-type">' + param.type + '</span> <span class="field-param-name">' + param.name + '</span>');
				}

				var params = params.join(', ');

				var returns = '';

				if (item.return) {
					returns = ' returns <span class="field-return-type">' + item.return.type + '</span> <span class="field-return-desc">' + item.return.desc + '</span>';
				}

				var markup = '';

				markup += '<li class="item">';
				markup += '<a href="#" class="field-name">' + item.name + '</a> ( ' + params + ' )' + returns + '<p class="field-short">' + item.short + '</p><p class="field-desc">' + item.desc + '</p>';
				markup += '<div class="item-content">';

				for (var z = 0; z < item.examples.length; z++) {
					var example = item.examples[z]
						.replace(/&lt;/g, '<')
						.replace(/&gt;/g, '>')
						.replace(/&amp;/g, '&');

					markup += '<h4>Example</h4><div class="field-example">' + example + '</div>';
				}

				markup += '</div>';
				markup += '</li>';

				var markup_item = $(markup).appendTo('#cat_' + item.cat + ' .items');

				markup_item.children('.field-desc').hide();
				markup_item.children('.item-content').hide();
				markup_item.children('a').toggle(
					function () {
						$(this).parent().children('.field-desc').show();
						$(this).parent().children('.field-short').hide();
						$(this).parent().children('.item-content').show();

						$(this).parent().css({'margin-bottom': '2.0em'});

						return false;
					},
					function () {
						$(this).parent().children('.field-desc').hide();
						$(this).parent().children('.field-short').show();
						$(this).parent().children('.item-content').hide();

						$(this).parent().css({'margin-bottom': ''});

						return false;
					}
				);

				cats[item.cat] = true;
				last_cat = item.cat;
			}

			$('.cat:first-child').show();

			// what a bug!!?!
			$('#navigation').hide();

			for (var cat in cats) {
				$('<li><a href="#cat_' + cat + '">category:<strong>' + cat + '</strong></a></li>').appendTo('#navigation ul').children('a').click(function () {
					$('.cat:visible').hide();
					$($(this).attr('href')).show();

					return false;
				});
			}

			// what a bug!!?!
			setTimeout(function () {
				$('#navigation').show();
			}, 1);
		}
	});
});
