/* https://github.com/ifightcrime/bootstrap-growl */

(function($) {

  $.bootstrapGrowl = function(message, options) {

    var options = $.extend({}, $.bootstrapGrowl.default_options, options);

    var $alert = $('<div>');

    $alert.attr('class', 'bootstrap-growl alert');

    if (options.type) {
        $alert.addClass('alert-' + options.type);
    }

    if (options.allow_dismiss) {
      $alert.append('<a class="close" data-dismiss="alert" href="#">&times;</a>');
    }

    $alert.append(message);

    var top_offset = options.top_offset;
    var current = $('.bootstrap-growl', 'body');

    // calculate any 'stack-up'
    $.each(current, function() {
      top_offset = top_offset + $(this).outerHeight() + options.stackup_spacing;
    });

    $alert.css({
      'position': 'absolute',
      'top': top_offset + 'px',
      'border': '1px solid ' + $alert.css('color'),
      'margin': 0,
      'z-index': '9999',
      'display': 'none'
    });

    if (options.width !== 'auto') {
      $alert.css('width', options.width + 'px');
    }

    // have to append before we can use outerWidth()
    $('body').append($alert);

    switch(options.align) {
      case 'center':
        $alert.css({
          'left': '50%',
          'margin-left': '-' + ($alert.outerWidth() / 2) + 'px'
        });
        break;
      case 'left':
        $alert.css('left', '20px');
        break;
      default:
        $alert.css('right', '20px');
    }

    $alert.fadeIn().delay(options.delay).fadeOut('slow', function() {
      $(this).remove();
    });

  };

  $.bootstrapGrowl.default_options = {
    type: null,
    top_offset: 20,
    align: 'right', // (left, right, or center)
    width: 250,
    delay: 4000,
    allow_dismiss: true,
    stackup_spacing: 10
  };

})(jQuery);
