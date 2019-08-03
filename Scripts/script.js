// Starting from the top whenever page is refreshed
// 20ms delay is used because browsers tend to go
// back to last scroll position after the page is loaded
// Not after the dom is ready
// Hiding/Removing CSS loader from DOM using
// callback after a long delay

$(document).ready(function() {
  $("html,body").animate(
    {
      scrollTop: 0
    },
    "fast",
    function() {
      setTimeout(function() {
        $(".loader").fadeOut(600, function() {
          $("body").css("overflow", "visible");
        });
      }, 1400);
    }
  );

  var lastScroll = 0;

  $(window).scroll(function() {
    if ($(window).scrollTop() > 220) {
      $("header").addClass("shadowHeader");

      if ($(window).scrollTop() < lastScroll) {
        $("header").removeClass("hideHeader");
      } else {
        $("header").addClass("hideHeader");
      }
    } else {
      $("header").removeClass("shadowHeader");
      $("header").removeClass("hideHeader");
    }

    lastScroll = $(window).scrollTop();
  });
});

// Smooth transition to next page
// when navigation link is clicked
$("header nav a").on("click", function(e) {
  var targetHref = $(this).attr("href");
  var offset = 0;

  offset = targetHref == "#Projects" ? -40 : 0;

  $("html, body").animate(
    {
      scrollTop: $(targetHref).offset().top + offset
    },
    1000
  );

  e.preventDefault();
});

// Current active experience
var expTargetID = $("a[href='#Publicis']");

// Experiences carousel
$(".experiences nav a").on("click", function(e) {
  e.preventDefault();

  $(expTargetID).removeClass("activeExperience");

  expTargetID = $(this);

  $(expTargetID).addClass("activeExperience");

  $(".experiences > div").animate(
    {
      scrollLeft:
        $(".experiences > div").scrollLeft() +
        $(expTargetID.attr("href")).position().left
    },
    600
  );
});

$(window).resize(function() {
  var container = $(".experiences > div");

  container.scrollLeft(
    container.scrollLeft() + $(expTargetID.attr("href")).position().left
  );
});

// $('#AboutLink').click(function() {
//     $('html,body').animate({
//         scrollTop: $("#About").offset().top
//     }, 1000);
// });

// Responsive navigation
$("#navIcon").on("click", function() {
  $(".navLinks").css("right", 0);

  $(".navLinks a").on("click", function() {
    $(".navLinks").css("right", "-200px");
  });

  $(window).resize(function() {
    $(".navLinks").css("right", "-200px");
  });

  $(document).mouseup(function(e) {
    var menu = $(".navLinks");
    if (!menu.is(e.target) && menu.has(e.target).length === 0) {
      menu.css("right", "-200px");
    }
  });
});
