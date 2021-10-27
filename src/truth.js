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
  $("body").on("click", "bind[title]", scrambleelement);
  $("body").on("click", "a:has(img.downloadable-image)", downloadimage);
  $("body").on("click", "button.puzzle-button", scrambledocument);
  $("body").on("click", "button.unpuzzle-button", resetdocument);
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
          orig_src = $image.attr("data-orig-src"),
          orig_height = $image.attr("data-orig-height"),
          orig_width = $image.attr("data-orig-width");
    if (orig_src) {
      $image.attr("src", orig_src);
      $image.attr("width", orig_width);
      $image.attr("height", orig_height);
      $image.removeAttr("data-orig-src");
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
function resetdocument() {
  const href = window.location.href,
        index = href.indexOf("#");
  if (index < 0) {
    window.location.reload();
  } else {
    window.location.href = href.replace(/#.*/, "");
  }
}
const SpacesRegExp = new RegExp("\\s+");
function scrambledocument() {
  const $bindings = $("bind[class]");

  for (let i=0, l=$bindings.length; i<l; i++) {
    const $binding = $($bindings[i]);

    scrambleelement.apply($binding, null);
  }
}
function scrambleelement() {
  const $binding = $(this),
        classes = $binding.prop("class").split(SpacesRegExp),
        text = $binding.text();
  let random_index = Math.floor(Math.random() * classes.length),
      chosen = classes[random_index];
  if (classes.length <= 1) {
    return;
  }
  let count = 1;
  while (chosen == text) {
    if (classes.length <= ++count) {
      return;
    }
    random_index = Math.floor(Math.random() * classes.length);
    chosen = classes[random_index];
  }
  if (chosen) {
    $binding.attr("data-orig-text", text);
    $binding.text(chosen);
  }
}
function shimmer () {
  $("bind").shimmer({});
}
function toggletooltip() {
  $(this).tooltip();
}
