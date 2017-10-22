$(document).ready(function() {

  // Use screen width to determine margin tops for animated logo and popup
  var animatedLogo = document.getElementById('animated-logo');
  var aboutBox = document.getElementById('about-box');
  var width = $(window).width();
  var height = $(window).height();
  var bigMarginL = (height - 250) / 2;
  var littleMarginL = (height - (width * 0.75)) / 2;

  //logo
  if (width * 0.75 > 250) {
    animatedLogo.style.marginTop = bigMarginL + 'px';
  } else {
    animatedLogo.style.marginTop = littleMarginL + 'px';
  }
  //popup
  $('.title').click(
    function() {
      var boxHeight = $('#about-box').height();
      var popupMargin = (height - boxHeight) / 2;
      aboutBox.style.marginTop = popupMargin + 'px';
    });
  
  // Animate Logo
  $('#animated-logo').addClass('logo-opacity-in');
  setTimeout(function() {
    animatedLogo.style.opacity = 1;
    setTimeout(function() {
      $('#animated-logo').removeClass('logo-opacity-in');
    },1000);
  },3000);
  
  setTimeout(function() {
    $('#animated-logo').addClass('logo-opacity-out');
    setTimeout(function() {
      animatedLogo.style.opacity = 0;
      setTimeout(function() {
        $('#animated-logo').removeClass('logo-opacity-out');
      },1000);
    },2000);
  },9000);
  

  // After Logo animation, make contents visible
  var startScreen = document.getElementById('start-screen'),
      invisibleWrapper = document.getElementById('invisible-wrapper');

  setTimeout(function() {
    if (startScreen.style.display == 'block') {
      startScreen.style.display = 'none';
      invisibleWrapper.style.display = 'block';
      $('div.invisible-wrapper').addClass('fade-in');
      setTimeout(function() {
        invisibleWrapper.style.opacity = '1';
      },300);

      // Remove Clear Button's start class since its animation is delayed
      setTimeout(function() {
        if (invisibleWrapper.style.display == 'block') {
         $('button.clear').removeClass('start');
        }
      },150);
      setTimeout(function() {
        $('div.invisible-wrapper').removeClass('fade-in');
      },350);
    }
  },11000);

  // Animate action buttons on hover and focus on
    // hover
  $('button').hover(
      function() {
        $(this).removeClass('action-mouseout');
        $(this).addClass('action-mouseover');
        this.style.transform = 'scale(1.1)';
      }, function() {
        $(this).removeClass('action-mouseover');
        $(this).addClass('action-mouseout');
        this.style.transform = 'scale(1)';
      }
    )

  // Animate hamburger icon to X on click
  $('.title').click(function() {
    $(this).toggleClass('open');
  });
  $('.overlay').click(function() {
    var aboutBox = document.getElementById('about-box');
    if (aboutBox.style.display == 'block') {
      $('.title').toggleClass('open');
    }
  });

});

  // Close logo animation on click
  function closeLogo() {
    var startScreen = document.getElementById('start-screen'),
        invisibleWrapper = document.getElementById('invisible-wrapper');

    if (startScreen.style.display == 'block') {
      startScreen.style.display = 'none';
      invisibleWrapper.style.display = 'block';
      $('div.invisible-wrapper').addClass('fade-in');
      setTimeout(function() {
        invisibleWrapper.style.opacity = '1';
        $('button.shuffle').addClass('open-grow1');
      },200);

      // Remove Clear Button's start class since its animation is delayed
      setTimeout(function() {
        if (invisibleWrapper.style.display == 'block') {
         $('button.clear').removeClass('start');
         $('button.clear').addClass('open-grow2');
        }
      },150);

      setTimeout(function() {
        $('div.invisible-wrapper').removeClass('fade-in');
      },350);
    }
  }

  // OVERLAY TOGGLE
  function aboutInfo() {
      var overlay = document.getElementById('overlay'),
          aboutBox = document.getElementById('about-box'),
          aboutText = document.getElementById('about-text'),
          noInputError = document.getElementById('no-input'),
          noInputErrorText = document.getElementById('no-input-text'),
          shuffleError = document.getElementById('shuffle-error'),
          shuffleErrorText = document.getElementById('shuffle-error-text'),
          dupeError = document.getElementById('dupe-item'),
          dupeErrorText = document.getElementById('dupe-item-text');
      if (overlay.style.display == 'block') {

          $('div.overlay').addClass('fade-out');
          setTimeout(function() {
            $('div.overlay').removeClass('fade-out');
            $('div.overlay').removeClass('oldark');
            overlay.style.display = 'none';
            aboutBox.style.display = 'none';
            aboutText.style.display = 'none';
            noInputError.style.display = 'none';
            noInputErrorText.style.display = 'none';
            shuffleError.style.display = 'none';
            shuffleErrorText.style.display = 'none';
            dupeError.style.display = 'none';
            dupeErrorText.style.display = 'none';
          },400);
      }
      else {
        $('div.overlay').addClass('oldark');
        overlay.style.display = 'block';
        aboutBox.style.display = 'block';
        aboutText.style.display = 'block';
        $('div.overlay').addClass('fade-in');
        setTimeout(function() {
          $('div.overlay').removeClass('fade-in');
        },300);
      }
  }