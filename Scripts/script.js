
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

// Smooth transition to next page
// when navigation link is clicked
$('header nav a').on('click', function(e) {
	var targetHref = $(this).attr('href');

	$('html, body').animate({
		scrollTop: $(targetHref).offset().top
	}, 1000);

	e.preventDefault();
});

$('.experiences nav a').on('click', function(e) {
	var targetHref = $(this).attr('href');

	$('.experiences > div').animate({
		scrollLeft: $(targetHref).offset().left
	}, 1000);

	e.preventDefault();
});

// $('#AboutLink').click(function() {
//     $('html,body').animate({
//         scrollTop: $("#About").offset().top
//     }, 1000);
// });

// Responsive navigation
$('#navIcon').on('click', function() {
	$('.navLinks').css('right', 0);

	$('.navLinks a').on('click', function(){
		$('.navLinks').css('right', '-200px');
	});

	$(window).resize(function() {
  		$('.navLinks').css('right', '-200px');
	});

	$(document).mouseup(function(e){
		var menu = $('.navLinks');
	    if (!menu.is(e.target) && menu.has(e.target).length === 0) {
     		menu.css('right', '-200px');
   		}
	});
});