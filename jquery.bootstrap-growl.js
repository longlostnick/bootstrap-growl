(function() {
  var $;

  $ = jQuery;

  $.bootstrapGrowl = function(message, options) {
    var $alert, closeAlert, css, offsetAmount, setTimeout;

    options = $.extend({}, $.bootstrapGrowl.default_options, options);
    setTimeout = function(t, f) {
      return window.setTimeout(f, t);
    };
    $alert = $("<div>");
    $alert.attr("class", "bootstrap-growl alert");
    if (options.type) {
      $alert.addClass("alert-" + options.type);
    }
    if (options.allow_dismiss) {
      $alert.append("<a class=\"close\" data-dismiss=\"alert\" href=\"#\">&times;</a>");
    }
    $alert.append(message);
    if (options.top_offset) {
      options.offset = {
        from: "top",
        amount: options.top_offset
      };
    }
    offsetAmount = options.offset.amount;
    $(".bootstrap-growl").each(function() {
      return offsetAmount = Math.max(offsetAmount, parseInt($(this).css(options.offset.from)) + $(this).outerHeight() + options.stackup_spacing);
    });
    css = {
      "position": (options.ele === "body" ? "fixed" : "absolute"),
      "margin": 0,
      "z-index": "9999",
      "display": "none"
    };
    css[options.offset.from] = offsetAmount + "px";
    $alert.css(css);
    if (options.width !== "auto") {
      $alert.css("width", options.width + "px");
    }
    $(options.ele).append($alert);
    switch (options.align) {
      case "center":
        $alert.css({
          "left": "50%",
          "margin-left": "-" + ($alert.outerWidth() / 2) + "px"
        });
        break;
      case "left":
        $alert.css("left", "20px");
        break;
      default:
        $alert.css("right", "20px");
    }
    $alert.fadeIn();
    if (options.delay > 0) {
      $(options.ele).on("mouseenter", ".bootstrap-growl.alert", function() {
        var to;

        to = $(this).data('bootstrap-growl-to');
        if (to) {
          $(this).data('bootstrap-growl-to', false);
          if (to) {
            return clearTimeout(to);
          }
        }
      });
      $(options.ele).on("mouseleave", ".bootstrap-growl.alert", function() {
        var to;

        to = $(this).data('bootstrap-growl-to');
        if (to != null) {
          if (!to) {
            return closeAlert.call(this);
          }
        }
      });
      closeAlert = function() {
        var _this = this;

        return $(this).data('bootstrap-growl-to', setTimeout(options.delay, function() {
          return $(_this).fadeOut(function() {
            return $(_this).alert("close");
          });
        }));
      };
      closeAlert.call($alert);
    }
    return $alert;
  };

  $.bootstrapGrowl.default_options = {
    ele: "body",
    type: null,
    offset: {
      from: "top",
      amount: 20
    },
    align: "right",
    width: 250,
    delay: 4000,
    allow_dismiss: true,
    stackup_spacing: 10
  };

}).call(this);
