// Starting from the top whenever page is refreshed
// 20ms delay is used because browsers tend to go
// back to last scroll position after the page is loaded
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

  $("html, body").animate(
    {
      scrollTop: $(targetHref).offset().top - 25,
    },
    1000
  );

  e.preventDefault();
});

// Current active experience
var expTargetID = $("a[href='#Google']");

// Experiences carousel
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
  // var siblings = expTargetID.prevAll("a");
  // console.log(siblings);

  // if (siblings.length >= 1) {
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
  // var siblings = expTargetID.nextAll("a");

  // if (siblings.length >= 1) {
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
