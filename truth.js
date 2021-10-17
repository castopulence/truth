"use strict";
$.fn.extend({
  // "Shiny". A poor-man's shine effect to draw the eyes to the
  // bindings.
  "shimmer" : function (options) {
    const default_step = 250;
    if (typeof options.offset === "undefined") {
      options.offset = 0;
      options.limit = 0;
    } else {
      options.offset += (options.step || default_step);
      options.limit += 1;
    }
    const $self = $(this);
    $("body").addClass("shimmer");
    const thepromise = new Promise(function (resolve, reject) {
      delay(default_step + options.offset).then(function() {
        $self.addClass("shimmer");
        delay(default_step).then(function () {
          $self.removeClass("shimmer");
          options.limit--;
          if (options.limit <= 0) {
            $("body").removeClass("shimmer");
          }
        });
      });
    });
  },
  // A poor man's tooltip for mobile browsers.
  "tooltip" : function () {
    const $self = $(this);
    const $title = $self.find("span.title");
    if ($title.length) {
      $title.remove();
    } else {
      $self.append('<span class="title"> (' + title() + ')</span>');
    }
    function title() {
      return $self.attr("title");
    };
  }
});
$(function () {
  const everyminute = 1000 * 60;
  //const interval = setInterval(shimmer, everyminute);
  shimmer();
  jQuery("body").on("click", "bind[title]", toggletooltip);
  function shimmer () {
    jQuery("bind").shimmer({});
  }
  function toggletooltip() {
    $(this).tooltip();
  }
});
function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
