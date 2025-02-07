(function ($) {
  "use strict";

  var fn = {

    // Launch Functions
    Launch: function () {
      fn.Header();
      fn.OwlCarousel();
      fn.ImageView();
      fn.Swiper();
      fn.Masonry();
      fn.Apps();
    },


    // header
    Header: function (){
      $(document.body).headroom({
        tolerance : 10
      });
    },

    // owlcarousel
    OwlCarousel: function() {

      $('.owl-carousel').each(function() {
        var a = $(this),
          items = a.data('items') || [1,1,1,1],
          margin = a.data('margin'),
          loop = a.data('loop'),
          nav = a.data('nav'),
          dots = a.data('dots'),
          center = a.data('center'),
          speed = a.data('speed'),
          autoplay = a.data('autoplay'),
          autoplayTimeout = a.data('autoplaytimeout'),
          autoplaySpeed = a.data('autoplayspeed'),
          rtl = a.data('rtl'),
          autoheight = a.data('autoheight'),
          thumbs = a.data('thumbs');

        var options = {
          nav: nav || false,
          loop: loop || false,
          dots: dots || false,
          center: center || false,
          autoplay: autoplay || false,
          autoHeight: autoheight || false,
          rtl: rtl || false,
          margin: margin || 0,
          navSpeed: speed || 400,
          dotsSpeed: speed || 400,
          autoplayTimeout: autoplayTimeout || 3000,
          autoplaySpeed: autoplaySpeed || 400,
          autoplayHoverPause: true,
          thumbs: thumbs || false,
          thumbsPrerendered: thumbs || false,
          responsive: {
            0: { items: items[3] || 1 },
            992: { items: items[2] || 1 },
            1200: { items: items[1] || 1 },
            1600: { items: items[0] || 1}
          }
        };

        a.owlCarousel(options);
      });
    },


    // image view
    ImageView: function() {
      $('.lightbox').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
          verticalFit: true
        }
      });

      $('.gallery').each(function() { // the containers for all your galleries
          $(this).magnificPopup({
              delegate: 'figure > a', // the selector for gallery item
              type: 'image',
              mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
              gallery: {
                enabled:true
              }
          });
      });
    },


    // swiper
    Swiper: function() {

      $('.swiper-container').each(function(index, element){
        var $this = $(this)

        $this.find(".swiper-pagination").addClass("swiper-pagination-" + index);
        $this.find(".swiper-button-next").addClass("swiper-button-next-" + index);
        $this.find(".swiper-button-prev").addClass("swiper-button-prev-" + index);

        var options = {
          parallax: true,
          speed: 1500,
          loop: true,
          simulateTouch: false,
          effect: 'fade',

          //pagination
          pagination: {
            el: '.swiper-pagination-' + index,
            clickable: true
          },

          // navigation
          navigation: {
            nextEl: '.swiper-button-next-' + index,
            prevEl: '.swiper-button-prev-' + index,
          }

        };

        var slider = $(this);

        if ($(this).hasClass('swiper-container-carousel')) {
          options.spaceBetween = 10;
          options.effect = 'slide';
          options.simulateTouch = true;
          options.slideToClickedSlide = true;
        }

        new Swiper ( slider, options );
      });



      if ( $( ".gallery-container" ).length ) {
        var galleryTop = new Swiper('.gallery-container', {
          effect: 'fade',
          speed: 1500,
          simulateTouch: false
        });
        var galleryThumbs = new Swiper('.gallery-thumbs', {
          centeredSlides: true,
          slidesPerView: 6,
          speed: 1500,
          breakpoints: {
            1600: { slidesPerView: 5 },
            1200: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            576: { slidesPerView: 2 }
          },
          slideToClickedSlide: true
        });
        galleryTop.controller.control = galleryThumbs;
        galleryThumbs.controller.control = galleryTop;
      }

    },


    // masonry
    Masonry: function() {
      var $grid = $('.masonry').masonry({
        itemSelector: '.masonry > *',
      });

      $grid.imagesLoaded().progress( function() {
        $grid.masonry('layout');
      });
    },


    // sidebar
    Sidebar: function() {
      var sidebar_open = $(".sidebar-open");
      var sidebar = $(".sidebar")
      var sidebar_close = $(".sidebar-close");
      sidebar_open.click( function () {
          if( $(this).hasClass("open") ) {
             $(this).removeClass("open");
          } 
          else {
              speaker.removeClass("open");
              $(this).addClass("open");
          }
      });
    },


    // apps
    Apps: function () {
      
      // lavalamp
      $('.lavalamp').lavalamp({
        setOnClick: true,
        enableHover: false,
        margins: false,
        autoUpdate: true,
        duration: 200
      });


      // steps
      $('.next-step').click(function(){
        $('.nav-steps > .active').next('.nav-link').trigger('click');
      });

      $('.prev-step').click(function(){
        $('.nav-steps > .active').prev('.nav-link').trigger('click');
      });


      // range slider
      $('.rangeslider').each(function() {
        var a = $(this),
          min = a.data('min'),
          max = a.data('max'),
          from = a.data('from'),
          to = a.data('to')

        var options = {
          type: "double",
          min: min || 0,
          max: max || 1000,
          from: from || 200,
          to: to || 800,
          prefix: "$"
        };

        a.ionRangeSlider(options);
      });

      // counter
      $(document).ready(function(){

          $('.counter-plus').click(function(){

              var fieldID = $(this).attr('field'),
                  fieldVal = parseInt($('input[name='+fieldID+']').val());

              if (!isNaN(fieldVal)) {
                  $('input[name='+fieldID+']').val(fieldVal + 1);
              } else {
                  $('input[name='+fieldID+']').val(0);
              }
          });

          $(".counter-minus").click(function() {

              var fieldID = $(this).attr('field'),
                  fieldVal = parseInt($('input[name='+fieldID+']').val());

              if (!isNaN(fieldVal) && fieldVal > 0) {
                  $('input[name='+fieldID+']').val(fieldVal - 1);
              } else {
                  $('input[name='+fieldID+']').val(0);
              }
          });
      });




      //  accordion with radio buttons
      $(".accordion-radio").on('click', function(){
          $(this).next('input').prop("checked", true);
      });

      // accordion active class
      $('.collapse').on('show.bs.collapse', function () {
        $(this).parent().addClass('active');
      });

      $('.collapse').on('hide.bs.collapse', function () {
        $(this).parent().removeClass('active');
      });


      // skrollr
      skrollr.init({
          forceHeight: false,        
          mobileCheck: function() {
              //hack - forces mobile version to be off
              return false;
          }
      });



      // tooltips
      $('[data-toggle="tooltip"]').tooltip();


      // timer
      $('#timer').countdown('2020/01/01', function(event) {
          var $this = $(this).html(event.strftime(''
              + '<div>%D <span>days</span></div> '
              + '<div>%H <span>hours</span></div> '
              + '<div>%M <span>min</span></div> '
              + '<div>%S <span>sec</span></div>'));
      });


      // smooth scroll
      $(function () {
        var scroll = new SmoothScroll('[data-scroll]');
      });


      // mobile menu open state
      $(document).ready(function(){
        $('.navbar-toggler').click(function(){
          $('body').toggleClass('overlay-active');
        });
      });


      // zoom
      $('.zoom').zoom();
      // $('.zoom-click').zoom({ on:'click' }); 


      // sub menu
      $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
          $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');


        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
          $('.dropdown-submenu .show').removeClass("show");
        });


        return false;
      });

    }
  };

  $(document).ready(function () {
    fn.Launch();
  });

})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".product-like").forEach(function (likeButton) {
    likeButton.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent any default link behavior
      this.classList.toggle("active"); // Toggle the 'active' class
    });
  });
});

function registerUser(userData) {
  const url = `https://feddatabase-954b.restdb.io/rest/userz?q={"email": "${userData.email}"}`;
  const apiKey = "67a5be5f9c979725831b2a7d"; // Your API Key

  // Step 1: Check if email already exists
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        // Email already exists, block registration
        alert("Email already registered. Please log in.");
      } else {
        // Email is unique, proceed with registration
        createNewUser(userData);
      }
    })
    .catch(error => {
      console.error("Error checking email:", error);
      alert("An error occurred. Please try again.");
    });
}

// Step 2: Function to create a new user if email is unique
function createNewUser(userData) {
  const url = "https://feddatabase-954b.restdb.io/rest/userz";
  const apiKey = "67a5be5f9c979725831b2a7d"; // Your API Key

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then(data => {
      if (data._id) {
        alert("Registration successful!");
        window.location.href = "profile.html"; // Redirect after success
      } else {
        alert("Registration failed. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    });
}


document.addEventListener("DOMContentLoaded", function() {
  // Select the register form and button
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent form submission

    // Capture form data
    const emailInput = document.getElementById("exampleInputEmail2");
    const passwordInput = document.getElementById("exampleInputPassword3");
    const repeatPasswordInput = document.getElementById("exampleInputPassword4");

    const emails = emailInput.value.trim();
    const passwords = passwordInput.value.trim();
    const repeatPasswords = repeatPasswordInput.value.trim();

    // Validate the form fields
    if (emails === "" || passwords === "" || repeatPasswords === "") {
      alert("Please fill in all fields.");
      return; // Stop execution if fields are empty
    }

    if (passwords !== repeatPasswords) {
      alert("Passwords do not match.");
      return; // Stop execution if passwords don't match
    }

    // Prepare data for sending to RestDB
    const userData = {
      email: emails,
      password: passwords, // Ideally, hash this password before saving it
    };

    // Send data to RestDB
    registerUser(userData);
  });
});

function loginUser(email, password) {
  const url = `https://feddatabase-954b.restdb.io/rest/userz?q={"email": "${email}"}`;
  const apiKey = "67a5be5f9c979725831b2a7d"; // Your RestDB API Key

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log("Database response:", data); // Debugging

      if (data.length === 0) {
        alert("No account found with this email.");
        return;
      }

      const user = data[0]; // Get the first matching user
      if (user.password === password) {
        alert("Login successful!");
        localStorage.setItem("userEmail", email); // Save login info
        window.location.href = "profile.html"; // Redirect to profile
      } else {
        alert("Incorrect password. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("registerForm");
  const submitBtn = document.getElementById("submitBtn"); // New submit button

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission

    const emailsInput = document.getElementById("exampleInputEmail1").value.trim();
    const passwordsInput = document.getElementById("exampleInputPassword1").value.trim();

    // Debugging: Check if the fields are populated correctly
    console.log("Email:", emailsInput);
    console.log("Password:", passwordsInput);

    if (!emailsInput || !passwordsInput) {
      alert("Please fill in all fields.");
      return;
    }

    loginUser(emailsInput, passwordsInput);
  });
});
