/**
 * Gabê Azevedo JS main file
 */

$(document).ready(function () {
  // Activate ghostHunter  search
  $("#search-field").ghostHunter({
    results: "#results",
    zeroResultsInfo: false,
    displaySearchInfo: false,
    onKeyUp: true,
    onPageLoad: true,
    includepages: true,
    result_template: "<a id='gh-{{ref}}' class='gh-search-item clamo-search-item' href='{{link}}'><h2>{{title}}</h2><h4>{{pubDate}}</h4></a>",
    info_template: "<p>Number of posts found: {{amount}}</p>",
    onComplete: function (results) {
      if ($('#search-field').prop('value')) {
        if (!$('#search-field').prop('value').replace(/\s/g, '').length) {
          $('#results').hide();
        } else {
          if (results == 0) {
            $('#results').hide();
          } else {
            $('#results').show();
          }
        }
      } else {
        $('#results').hide();
      }
    }
  });

  // Show/hide blog menu + animation
  $('#menu-toggle').click(function () {
    $('#menu').slideToggle(200);
  });

  // Scrolling to page top- desktop button, and first mobile scroll button
  $("#scrolltop,#scrolltopdekstop").click(function () {
    return $("html, body").animate({
      scrollTop: 0
    }, "slow"), !1
  });

  // Scroll page to end of post - only mobile (second scroll button )
  $("#scrolltopfooter").click(function () {
    return $("html, body").animate({
      scrollTop: $(".post-end").offset().top - 20
    }, "slow"), !1
  });

  // Hide Desktop Scroll button on page load, start when scroll down > 200 px
  $(".clamo-scrolltopdekstop").hide(), $(window).scroll(function () {
    $(document).scrollTop() > 200 ? $(".clamo-scrolltopdekstop").fadeIn("slow") : $(".clamo-scrolltopdekstop").fadeOut("slow")
  });

});

// Generate Table of contents
(function ($) {
  $.fn.golemiotoc = function () {
    //find toc wp
    if ($.find('#golemio-toc').length) {
      // add html list to toc wp
      $("#golemio-toc").append('<ul>');
      // append list elements to toc, only h2/h3 headers
      $("article h2,h3").each(function (i) {
        $(this).attr('id', 'gtoc-' + i);
        $("#golemio-toc").append('<li><a href="#gtoc-' + i + '" class="gtoc-' + $(this).prop("tagName") + '"> ' + this.innerHTML + '</a></li>');
      });
      $("#golemio-toc").append('</ul>');
    }
    return this;
  };
})(jQuery);

// Animation on Toc link click - animate to headline (h2,h3)
$(document).on("click", 'a[href^="#"]', function (i) {
  $("html, body").animate({
    scrollTop: $($.attr(this, "href")).offset().top - 20
  }, 500)
});

// Show/Hide search input
$(".clamo-btn-search, .clamo-btn-search-close").click(function () {
  $(".clamo-search-input-wp").animate({
    width: 'toggle',
    display: 'block',
  });
  // Activate search input
  $("#search-field").focus();
});

// Close search input animation
$('.clamo-btn-search-close').click(function () {
  $('#results').fadeOut(500, function () {
    // clear search input on close
    $("#search-field").val("");
  });
});