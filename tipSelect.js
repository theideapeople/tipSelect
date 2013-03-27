(function($) {
	$.fn.ipSelect = function() {
		// Variables
		var selectBox = $(this),
			option = $('option', this);

		// Add the necessary HTML for the Bootstrap Action box.
		var html = '<div id="' + $(this).attr('id') + '_new" class="btn-group">';
			html += '<button id="' + $(this).attr('id') + '_selected" class="btn action" disabled></button>';
			html += '<button id="' + $(this).attr('id') + '_toggle" class="btn select-toggle dropdown-toggle" data-toggle=\"dropdown\">';
			html += '<span class="caret"></span>';
			html += '</button>';
			html += '<ul id="' + $(this).attr('id') + '_options" class="dropdown-menu">';
			html += '</ul>';
			html += '</div>';

		// Insert the dropdown menu before the select box
		$(this).before(html);

		// Define the options list
		var optionsList = $('#' + selectBox.attr('id') + '_options');

		// Populate the new drop down
		option.each(function() {
			var value = $(this).attr('value'),
				next = $(this).attr('data-next'),
				label = $(this).text(),
				thisOption = '<li data-value="' + value + '"data-next="' + next + '">' + label + '</li>';

			optionsList.append(thisOption);

			if ( $(this).is(':selected') ) {
				$('#' + selectBox.attr('id') + '_selected').text($(this).text());
			}
		});

		// Set the first option value to default if nothing previously selected
		if ( $('#' + selectBox.attr('id') + '_selected').text().length == 0 ) {
			$('#' + selectBox.attr('id') + '_selected').text(selectBox.children('option').first().text());
		}
		// Add a hidden field that will replace the select box
		var previousValue = $(this).attr('value');
		$(this).after('<input type="hidden" id="' + $(this).attr('id') + '" name="' + $(this).attr('name') + '" value="' + previousValue + '" />');

		// Remove the select box
		$(this).remove();

		// Drop down click and value changes
		var option = $('[id$="_new"] > [id$="_options"] li');

		// Options list height adjustment
		$('button.select-toggle').click(function() {
			if ( $(this).siblings('ul').height() > 300 ) {
				$(this).siblings('ul').css({
					'height' : '300px',
					'overflow' : 'auto'
				});
			}
		});

		option.click(function() {
			var input = $(this).parents(2).next('input[type="hidden"]'),
				value = $(this).attr('data-value'),
				label = $(this).parent().siblings('button.action');
			// Change label text
			label.text($(this).text());
			// Change input value
			input.val(value);//.trigger('change');

			//Triggers a 'change' for the input element. This is a helper for other js.
			//$('input[type=hidden]').trigger('change');
		});
	};

	/*
	 * Do not delete. Future custom scroll bar.
	 */
	// var optionsList = $('[id$="_new"] > [id$="_options"]');

	// optionsList.bind('mousewheel', function(e) {
	// 	var theTop = $(this).children('li').first(),
	// 		theBottom = $(this).children('li').last(),
	// 		topPosition = parseInt(theTop.css('margin-top')),
	// 		bottomPosition = theBottom.position().top - $(this).height();

	// 	console.log('Bottom: ' + bottomPosition + ' Top: ' + topPosition + ' Mousewheel: ' + e.originalEvent.wheelDelta);

	// 	// Scroll the thing.
	// 	if ( e.originalEvent.wheelDelta < 0 && bottomPosition >= -11 ) {
	// 		theTop.css({
	// 			'position' : 'relative',
	// 			'margin-top' : (parseInt( theTop.css('margin-top') ) - 5 )+ 'px'
	// 		});
	// 	} else if ( topPosition <= 0 ) {
	// 		theTop.css({
	// 			'position' : 'relative',
	// 			'margin-top' : ( parseInt( theTop.css('margin-top') ) + 5 ) + 'px'
	// 		});
	// 	}
	// });

	//Prevent hover while scrolling the list
	// optionsList.hover(function() {
	// 	// Stop the window from scrolling
	// 	$(window).bind('mousewheel', function() {
	// 		return false;
	// 	});
	// }, function() {
	// 	// Stop the window from scrolling
	// 	$(window).unbind('mousewheel');
	// });
})(jQuery);
