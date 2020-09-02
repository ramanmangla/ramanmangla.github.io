// Starting from the top whenever page is refreshed
// because browser goes back to last scroll position
// after the page is loaded
// Not after the dom is ready
// Hiding/Removing CSS loader from DOM using
// callback after a long delay

$(document).ready(function () {
  var loadPercent = 0;

  $("html").animate(
    {
      scrollTop: 0,
    },
    "fast",
    function () {
      var interval = setInterval(function () {
        $("#loader-percent").html(loadPercent + "%");
        loadPercent = loadPercent + 1;
        if (loadPercent >= 101) {
          clearInterval(interval);

          setTimeout(function () {
            $("#loader-percent").fadeOut(400, function () {
              $(".loader").fadeOut(200, function () {
                $("body").css("overflow", "visible");
              });
            });
          }, 600);
        }
      }, 22);
    }
  );

  var lastScroll = 0;

  $(window).scroll(function () {
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
$("header nav a").on("click", function (e) {
  var targetHref = $(this).attr("href");
  // var offset = 0;
  // offset = targetHref == '#Projects' ? -40 : 0;
  var scrollReqd = $(targetHref).offset().top - 25;

  if (targetHref == "#Contact") {
    scrollReqd = scrollReqd + 100;
  }

  $("html, body").animate(
    {
      scrollTop: scrollReqd,
    },
    1000
  );

  e.preventDefault();
});

// Current active experience
var expTargetID = $("a[href='#Google']");

// Experiences carousel navigation
$(".experiences nav a").on("click", function (e) {
  e.preventDefault();

  $(expTargetID).removeClass("activeExperience");

  expTargetID = $(this);

  $(expTargetID).addClass("activeExperience");

  // Ensure job link is within nav and not on edge
  $(".experiences nav").animate(
    {
      scrollLeft:
        $(".experiences nav").scrollLeft() + expTargetID.position().left,
    },
    600
  );

  $(".experience").animate(
    {
      scrollLeft:
        $(".experience").scrollLeft() +
        $(expTargetID.attr("href")).position().left,
    },
    600
  );
});

// Ensure the same experience/nav link is in view on resize
$(window).resize(function () {
  var container = $(".experience");

  container.scrollLeft(
    container.scrollLeft() + $(expTargetID.attr("href")).position().left
  );

  var expNav = $(".experiences nav");

  expNav.scrollLeft(expNav.scrollLeft() + expTargetID.position().left);
});

// Scroll Buttons for Experiences Nav
$("#expNavLeftButton").on("click", function (e) {
  var expNav = $(".expMenu nav");

  expNav.animate(
    {
      scrollLeft: expNav.scrollLeft() - (3 * expNav.width()) / 5,
    },
    450
  );
  // }
});

$("#expNavRightButton").on("click", function (e) {
  var expNav = $(".expMenu nav");

  expNav.animate(
    {
      scrollLeft: expNav.scrollLeft() + (3 * expNav.width()) / 5,
    },
    450
  );
  // }
});

// Responsive navigation
$("#navIcon").on("click", function () {
  $(".navLinks").css("right", 0);

  $(".navLinks a").on("click", function () {
    $(".navLinks").css("right", "-200px");
  });

  $(window).resize(function () {
    $(".navLinks").css("right", "-200px");
  });

  $(document).mouseup(function (e) {
    var menu = $(".navLinks");
    if (!menu.is(e.target) && menu.has(e.target).length === 0) {
      menu.css("right", "-200px");
    }
  });
});

$("#closeNav").on("click", function () {
  $(".navLinks").css("right", "-200px");
});
