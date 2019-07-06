
// Starting from the top whenever page is refreshed
// 20ms delay is used because browsers tend to go
// back to last scroll position after the page is loaded
// Not after the dom is ready
// Hiding/Removing CSS loader from DOM using
// callback after a long delay

$(document).ready(function() {
	$('html,body').animate({
		scrollTop: 0
	}, 'fast', function() {
		setTimeout(function() {
			$('.loader').fadeOut(600, function() {
				$('body').css('overflow', 'visible');
			});
		}, 2800);
	});
});

// Smooth transition to next page and header drop shadow
// when navigation link is clicked
$('#AboutLink').click(function() {
	$('header').css('box-shadow', '0px -8px 10px 3px #111111');

    $('html,body').animate({
        scrollTop: $("#About").offset().top
    }, 1000);
});