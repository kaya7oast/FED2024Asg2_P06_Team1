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

// like function / wishlist
document.addEventListener("click", async function (event) {
  if (event.target.classList.contains("product-like")) {
      event.preventDefault();
      const likeButton = event.target;
      likeButton.classList.toggle("active");

      // Get the product details
      const productElement = likeButton.closest(".product");
      const productName = productElement.querySelector(".product-title a").textContent;
      const productImage = productElement.querySelector("img").src;
      const productPrice = productElement.querySelector(".product-price span").textContent;

      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
          alert("Please log in to add to wishlist.");
          return;
      }

      // Fetch user details from database
      const userUrl = `https://feddatabases-957b.restdb.io/rest/userz?q={"email":"${userEmail}"}`;
      const response = await fetch(userUrl, {
          headers: {
              "x-apikey": apiKey,
              "Accept": "application/json"
          }
      });

      const users = await response.json();
      if (users.length === 0) {
          alert("User not found.");
          return;
      }

      const user = users[0];
      const userId = user._id;
      const wishlist = user.wishlist || [];

      // Check if product is already in wishlist
      const productExists = wishlist.some(item => item.name === productName);
      if (!productExists) {
          wishlist.push({
              name: productName,
              image: productImage,
              price: productPrice
          });

          // Update wishlist in database
          const updateUrl = `https://feddatabases-957b.restdb.io/rest/userz/${userId}`;
          await fetch(updateUrl, {
              method: "PATCH",
              headers: {
                  "x-apikey": apiKey,
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ wishlist })
          });

          console.log("Wishlist updated:", wishlist);
      }
  }
});

//wishlist display
async function displayWishlist() {
  const userEmail = localStorage.getItem("userEmail");
  if (!userEmail) return;

  // Fetch user details
  const userUrl = `https://feddatabases-957b.restdb.io/rest/userz?q={"email":"${userEmail}"}`;
  const response = await fetch(userUrl, {
      headers: {
          "x-apikey": apiKey,
          "Accept": "application/json"
      }
  });

  const users = await response.json();
  if (users.length === 0) return;

  const user = users[0];
  const wishlist = user.wishlist || [];

  const wishlistContainer = document.getElementById("wishlist-container");
  wishlistContainer.innerHTML = ""; // Clear previous items

  wishlist.forEach((product, index) => {
      const productHTML = `
          <div class="col-md-6 col-lg-4" data-index="${index}">
              <div class="product">
                  <figure class="product-image">
                      <a href="#!" class="btn btn-ico btn-rounded btn-white remove-wishlist"><i class="icon-x"></i></a>
                      <a href="${product.name}.html">
                          <img src="${product.image}" alt="Product Image">
                      </a>
                  </figure>
                  <div class="product-meta">
                      <h3 class="product-title"><a href="${product.name}.html">${product.name}</a></h3>
                      <div class="product-price">
                          <span>${product.price}</span>
                      </div>
                  </div>
              </div>
          </div>
      `;
      wishlistContainer.innerHTML += productHTML;
  });
}

//Wishlist delete
document.addEventListener("click", async function (event) {
  if (event.target.closest(".remove-wishlist")) {
      const productElement = event.target.closest(".col-md-6");
      const index = productElement.dataset.index;

      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) return;

      // Fetch user data
      const userUrl = `https://feddatabases-957b.restdb.io/rest/userz?q={"email":"${userEmail}"}`;
      const response = await fetch(userUrl, {
          headers: {
              "x-apikey": apiKey,
              "Accept": "application/json"
          }
      });

      const users = await response.json();
      if (users.length === 0) return;

      const user = users[0];
      const userId = user._id;
      const wishlist = user.wishlist || [];

      // Remove the product from wishlist
      wishlist.splice(index, 1);

      // Update the wishlist in database
      const updateUrl = `https://feddatabases-957b.restdb.io/rest/userz/${userId}`;
      await fetch(updateUrl, {
          method: "PATCH",
          headers: {
              "x-apikey": apiKey,
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ wishlist })
      });

      // Refresh the wishlist display
      displayWishlist();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("profile.html")) {
      displayWishlist();
  }
});



// login stuff
function registerUser(userData) {
  const url = `https://feddatabases-957b.restdb.io/rest/userz?q={"email": "${userData.email}"}`;
  const apiKey = "67a8a28199fb602ac4e983ce"; // Your API Key

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
      alert("An error has occurred. Please try again.");
    });
}

// Step 2: Function to create a new user if email is unique
function createNewUser(userData) {
  const url = "https://feddatabases-957b.restdb.io/rest/userz";
  const apiKey = "67a8a28199fb602ac4e983ce"; // Your API Key

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
        sessionStorageStorage.setItem("isLoggedIn", "true");
        window.location.href = "profile.html"; // Redirect after success
      } else {
        alert("Registration failed. Please try again!");
      }
    })
    .catch(error => {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again!");
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
  const url = `https://feddatabases-957b.restdb.io/rest/userz?q={"email": "${email}"}`;
  const apiKey = "67a8a28199fb602ac4e983ce"; // Your RestDB API Key

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
        sessionStorage.setItem("isLoggedIn", "true");
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
  const loginForm = document.getElementById("LoginForm");
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

//Eden attempt to make it look nice duplicated your original code below down freak out
const apiKey = "67a8a28199fb602ac4e983ce";  // Replace with your actual API key
const databaseUrl = "https://feddatabases-957b.restdb.io/rest/products";  // Correct URL

async function fetchProducts() {
    try {
        const response = await fetch(databaseUrl, {
            headers: {
                "x-apikey": apiKey,
                "Accept": "application/json"
            }
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const products = await response.json();
        
        // Log the products to verify their structure
        console.log(products);

        // Loop through all products and display them
        products.forEach(product => {
            displayProduct(product);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayProduct(product) {
    // Create the HTML structure for each product
    const productHTML = `
        <div class="col-6 col-lg-4">
            <div class="product">
                <figure class="product-image">
                    <a href="${product.name}.html">
                        <img src="${product.image2 || 'https://via.placeholder.com/200'}" alt="Image 1">
                        <img src="${product.image1 || 'https://via.placeholder.com/200'}" alt="Image 2">
                    </a>
                </figure>
                <div class="product-meta">
                    <h3 class="product-title">
                        <a href="${product.name}.html">${product.name}</a>
                    </h3>
                    <div class="product-price">
                        <span>$${product.price}</span>
                        <span class="product-action">
                            <a href="#!">Add to cart</a>
                        </span>
                    </div>
                    <a href="#!" class="product-like"></a>
                </div>
            </div>
        </div>
    `;

    // Append the product to the product container in the HTML
    document.getElementById("products-container").innerHTML += productHTML;
}

// Fetch and display products when the page loads
fetchProducts();

// more login stuff
document.addEventListener("DOMContentLoaded", function () {
  const userDisplay = document.getElementById("userDisplay");
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const userEmail = localStorage.getItem("userEmail"); // Retrieve logged-in user's email
  if (userEmail && isLoggedIn)
    {userDisplay.innerHTML = `<a class="nav-link" href="profile.html">Michael</a>`;}
});

//add to cart stuff
document.addEventListener("click", function (event) {
  const addToCartButton = event.target.closest("span.product-action a");
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  
  if (addToCartButton && !isLoggedIn) {
    alert("Log in First.");
    return;
  }

  if (addToCartButton && isLoggedIn) {
      event.preventDefault();
      console.log("✅ Add to Cart button clicked!");

      const productElement = addToCartButton.closest(".product"); // Get product container
      if (!productElement) return;

      const product = {
          id: productElement.dataset.id || "unknown",
          name: productElement.querySelector(".product-title a").innerText.trim(),
          image: productElement.querySelector("img").src,
          price: productElement.querySelector(".product-price span").innerText.replace("$", "").trim(),
          quantity: 1
      };

      console.log("🛒 Product Added:", product); // Debugging message
      addToCart(product);
  }
});

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingProduct = cart.find(item => item.id === product.id);
  if (existingProduct) {
      existingProduct.quantity += 1;
  } else {
      cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("🛒 Cart Updated:", cart);

  updateCartUI();
}

function updateCartUI() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-sidebar");
  if (!cartContainer) return; // Prevent errors if cart sidebar is not on page

  cartContainer.innerHTML = "";

  cart.forEach(item => {
      cartContainer.innerHTML += `
          <div class="col-12">
              <div class="cart-item cart-item-sm">
                  <div class="row align-items-center">
                      <div class="col-lg-9">
                          <div class="media media-product">
                              <a href="#!"><img src="${item.image}" alt="Image"></a>
                              <div class="media-body">
                                  <h5 class="media-title">${item.name}</h5>
                                  <span class="media-subtitle">Price: $${item.price}</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;
  });
}

// Call on page load
if (isLoggedIn){
document.addEventListener("DOMContentLoaded", updateCartUI);}


//cart.html page
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("cart.html"))
  {if (displayCartItems()) { 
    displayCartItems();
    console.log("displayCartItems function is running!");
   }
  else {
    console.log("Error");
  }
  }
});

function displayCartItems() {
  const cartContainer = document.getElementById("cart-item-list"); // Make sure this ID matches your cart container in HTML
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // If there are no items in the cart
  if (cartItems.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
  }

  // Clear the cart container before adding new items
  cartContainer.innerHTML = ""; 

  // Loop through the cart items and generate HTML
  cartItems.forEach(item => {
      const cartItemHTML = `
          <div class="cart-item">
              <div class="row align-items-center">
                <div class="col-12 col-lg-6">
                  <div class="media media-product">
                    <a href="#!"><img src="assets/images/demo/product-24.jpg" alt="Image"></a>
                    <div class="media-body">
                      <h5 class="media-title">Closca helmet</h5>
                      <span class="small">Black</span>
                    </div>
                  </div>
                </div>
                <div class="col-4 col-lg-2 text-center">
                  <span class="cart-item-price">$132</span>
                </div>
                <div class="col-4 col-lg-2 text-center">
                  <div class="counter">
                    <span class="counter-minus icon-minus" field='qty-2'></span>
                    <input type='text' name='qty-2' class="counter-value" value="1" min="1" max="10">
                    <span class="counter-plus icon-plus" field='qty-2'></span>
                  </div>
                </div>
                <div class="col-4 col-lg-2 text-center">
                  <span class="cart-item-price">$132</span>
                </div>
                <a href="#!" class="cart-item-close"><i class="icon-x"></i></a>
              </div>
            </div>
      `;

      // Append each product's HTML to the cart container
      cartContainer.innerHTML += cartItemHTML;
  });

  // Event listener for the close buttons
  const closeButtons = document.querySelectorAll(".cart-item-close");
  closeButtons.forEach(button => {
      button.addEventListener("click", function (event) {
          const itemId = event.target.closest("a").dataset.id;
          removeCartItem(itemId);
      });
  });
}

function removeCartItem(itemId) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Filter out the item to be removed
  const updatedCart = cartItems.filter(item => item.id !== itemId);
  
  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // Re-render the cart items
  displayCartItems();
}