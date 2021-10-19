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
  if (false) {
    const interval = setInterval(shimmer, everyminute);
  } else {
    shimmer();
  }
  $("body").on("click", "bind[title]", toggletooltip);
  $("body").on("click", "a:has(img.downloadable-image)", downloadimage);
});
function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}
function downloadimage() {
  const $self = $(this),
        $images = $self.find("img.downloadable-image");

  for (let i=0, l=$images.length; i<l; i++) {
    const $image = $($images[i]),
          origsrc = $image.prop("data-orig-src");
    if (origsrc) {
      $image.attr("src", origsrc);
      $image.removeAttribute("data-orig-src");
    } else {
      const url = $image.data("full-size-url");

      if (url) {
        const width = $image.data("full-width"),
              height = $image.data("full-height"),
              old_url = $image.prop("src"),
              old_width = $image.prop("width"),
              old_height = $image.prop("height");

        $image.attr("data-orig-src", old_url);
        $image.attr("data-orig-width", old_width);
        $image.attr("data-orig-height", old_height);
        $image.attr("src", url);
        $image.attr("height", height);
        $image.attr("width", width);
      }
    }
  }
}
function shimmer () {
  $("bind").shimmer({});
}
function toggletooltip() {
  $(this).tooltip();
}
