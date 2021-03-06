
!(function ($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 11;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;
        var scrolled = 12;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $('.venobox').venobox({
        'share': false
      });
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

})(jQuery);




function Home() {
  fetch('https://desolate-caverns-46192.herokuapp.com/home')
    .then(response => response.json())
    .then(json => {

      document.getElementById('cta-p').innerHTML = json[0].CalltoAction;

      document.getElementById('about-p').innerHTML = json[0].About;

      document.getElementById('counter-clients').innerHTML = json[0].NbOfClients;
      document.getElementById('counter-projects').innerHTML = json[0].NbOfProejcts;
      document.getElementById('counter-hours').innerHTML = json[0].NbOfHours;
      document.getElementById('counter-workers').innerHTML = json[0].NbOfWorkers;

    })
}




function Team() {
  fetch('https://desolate-caverns-46192.herokuapp.com/team')
    .then(response => response.json())
    .then(json => {

      var maindiv = document.getElementById('rowteam');

      for (let i = 0; i < json.length; i++) {
        var mydiv = document.createElement('div');
        mydiv.innerHTML = `<div class="member">
              <div class="member-img">
                <img src="assets/img/team/team-${i + 1}.jpg" class="img-fluid" alt="">
                <div class="social">
                  <a href=""><i class="icofont-twitter"></i></a>
                  <a href=""><i class="icofont-facebook"></i></a>
                  <a href=""><i class="icofont-instagram"></i></a>
                  <a href=""><i class="icofont-linkedin"></i></a>
                </div>
              </div>
              <div class="member-info">
                <h4>${json[i].Name}</h4>
                <span>${json[i].Position}</span>
              </div>
            </div>`

        mydiv.classList = "col-lg-6 col-md-6 align-items-stretch";
        maindiv.appendChild(mydiv);
      }

    })
}




function Contact() {
  fetch('https://desolate-caverns-46192.herokuapp.com/contact')
    .then(response => response.json())
    .then(json => {

      document.getElementById('Address').innerHTML = json[0].Address;
      document.getElementById('Email').innerHTML = json[0].Email;
      document.getElementById('Phone').innerHTML = json[0].PhoneNumber;


    })
}

function Services() {
  fetch('https://desolate-caverns-46192.herokuapp.com/services')
    .then(response => response.json())
    .then(json => {
      var maindiv = document.getElementById('services-row');

      for (let i = 0; i < json.length; i++) {
        var mydiv = document.createElement('div');
        mydiv.innerHTML = `<div class="icon-box iconbox-${json[i].ServiceColor}">
                           <div class="icon">
                               <i class="bx bxs-${json[i].ServiceIcon}"></i>
                           </div>
                           <div><h4>${json[i].Service}</h4>
                                <p>${json[i].ServiceDetails}
                           </div>
                           </div>`

        mydiv.classList = "col-lg-4 col-md-6 d-flex align-items-stretch";
        maindiv.appendChild(mydiv);
      }


    })
}

