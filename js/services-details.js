
// Use an IIFE or wait for DOMContentLoaded to avoid global namespace pollution
document.addEventListener("DOMContentLoaded", () => {
  console.log("Service page loaded");

  // ==========================================
  // State Management
  // ==========================================
  let cart = [];
  let currentSelection = {
    name: document.getElementById('selected-service-title')?.innerText || "",
    price: parseInt(document.getElementById('selected-service-price')?.innerText.replace(/[^\d]/g, '')) || 0,
    image: document.getElementById('selected-service-img')?.getAttribute('src') || "",
    desc: document.getElementById('selected-service-desc')?.innerText || ""
  };

  // ==========================================
  // Selectors
  // ==========================================
  const serviceItems = document.querySelectorAll('.service-item');
  const centerTitle = document.getElementById('selected-service-title');
  const centerPrice = document.getElementById('selected-service-price');
  const centerImage = document.getElementById('selected-service-img');
  const centerDesc = document.getElementById('selected-service-desc'); // Some pages might not have this populated specifically
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  const cartContainer = document.getElementById('cart-items-container');
  const cartTotalPrice = document.getElementById('cart-total-price');

  // ==========================================
  // Service Selection Logic
  // ==========================================
  serviceItems.forEach(item => {
    item.addEventListener('click', () => {
      const name = item.getAttribute('data-name');
      const price = parseInt(item.getAttribute('data-price'));
      const image = item.getAttribute('data-image');
      const desc = item.getAttribute('data-desc');

      // Update State
      currentSelection = { name, price, image, desc };

      // Update UI
      if (centerTitle) centerTitle.innerText = name;
      if (centerPrice) centerPrice.innerText = `₹${price} · 30 mins`; // Assuming 30 mins for all for now
      if (centerImage) centerImage.src = image;
      if (centerDesc) centerDesc.innerText = desc;

      // Optional: Highlight selected item
      serviceItems.forEach(i => i.style.border = "1px solid #e0e0e0"); // Reset
      item.style.border = "2px solid #000"; // Highlight
    });
  });

  // ==========================================
  // Cart Logic
  // ==========================================
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      addToCart(currentSelection);
    });
  }

  function addToCart(service) {
    if (!service.name) return;

    const existingItem = cart.find(item => item.name === service.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...service, quantity: 1 });
    }
    renderCart();
  }

  function renderCart() {
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML = '<div class="empty-cart-msg" style="text-align: center; padding: 20px; color: #777;">No items in cart</div>';
    } else {
      cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        // HTML Template for Cart Item
        cartItem.innerHTML = `
                    <p class="item-name">${item.name}</p>
                    <div class="item-controls">
                        <div class="qty-control">
                            <button class="decrease" data-index="${index}">-</button>
                            <span class="qty">${item.quantity}</span>
                            <button class="increase" data-index="${index}">+</button>
                        </div>
                        <span class="item-price">₹${item.price * item.quantity}</span>
                    </div>
                `;
        cartContainer.appendChild(cartItem);
      });
    }

    // Update Total
    if (cartTotalPrice) {
      cartTotalPrice.innerText = `₹${total}`;
    }

    // Attach Event Listeners to New Buttons
    attachCartListeners();
  }

  function attachCartListeners() {
    const decreaseBtns = document.querySelectorAll('.decrease');
    const increaseBtns = document.querySelectorAll('.increase');

    decreaseBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
        renderCart();
      });
    });

    increaseBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        cart[index].quantity += 1;
        renderCart();
      });
    });
  }

  // ==========================================
  // Bottom Sheet Logic
  // ==========================================
  const detailsSheet = document.getElementById('detailsSheet');
  const sheetOverlay = document.querySelector('.bottom-sheet-overlay');
  const closeSheetBtn = document.querySelector('.close-sheet');
  const viewDetailsBtns = document.querySelectorAll('.view-details-btn, a[href="#"]'); // Targeting 'View Details' link

  // Open Sheet (Event Delegation)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('a, .view-details-btn');
    if (btn) {
      const text = btn.innerText || "";
      if (text.includes('View Details') || btn.classList.contains('view-details-btn')) {
        e.preventDefault();
        openBottomSheet();
      }
    }
  });

  // Sheet Add Button Logic
  const sheetAddBtn = document.getElementById('sheet-bs-add-btn');
  if (sheetAddBtn) {
    sheetAddBtn.addEventListener('click', () => {
      addToCart(currentSelection);
      closeBottomSheet();
    });
  }

  function openBottomSheet() {
    if (!detailsSheet || !sheetOverlay) return;

    // Update Sheet Content
    const sheetTitle = document.getElementById('sheet-bs-title');
    const sheetPrice = document.getElementById('sheet-bs-price');
    const sheetImg = document.getElementById('sheet-bs-img');

    if (sheetTitle) sheetTitle.innerText = currentSelection.name;
    if (sheetPrice) sheetPrice.innerText = `₹${currentSelection.price} \u2022 30 mins`;
    if (sheetImg) sheetImg.src = currentSelection.image;

    detailsSheet.classList.add('active');
    sheetOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  // Close Sheet
  function closeBottomSheet() {
    if (!detailsSheet || !sheetOverlay) return;
    detailsSheet.classList.remove('active');
    sheetOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeSheetBtn) closeSheetBtn.addEventListener('click', closeBottomSheet);
  if (sheetOverlay) sheetOverlay.addEventListener('click', closeBottomSheet);


  // ==========================================
  // FAQ Accordion Logic
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    }
  });

});

// ========= FOOTER NEWSLETTER ========
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
  });
}

// ==========================================
// MERGED GLOBAL LOGIC (Swipers, Modals, Sticky Header)
// ==========================================

// Swiper Initializations
document.addEventListener("DOMContentLoaded", () => {
  if (typeof Swiper !== 'undefined') {
    new Swiper(".myswiper", { loop: true, pagination: { el: ".swiper-pagination" }, autoplay: { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }, speed: 800 });
    new Swiper(".trustslider", { speed: 10000, direction: "horizontal", spaceBetween: 50, loop: true, slidesPerView: "auto", freeMode: { enabled: true, momentum: false }, autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }, allowTouchMove: false, pagination: false, navigation: false });
    new Swiper(".equipment-swiper", { loop: true, spaceBetween: 30, autoplay: { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }, speed: 800, breakpoints: { 320: { slidesPerView: "auto" }, 800: { slidesPerView: 3 }, 1200: { slidesPerView: 4 } } });
    new Swiper(".team-swiper", { loop: true, spaceBetween: 17.28, autoplay: { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }, speed: 800, breakpoints: { 320: { slidesPerView: "auto" }, 800: { slidesPerView: 4 }, 1200: { slidesPerView: 6 } } });
    new Swiper(".services-swiper", { loop: true, freeMode: true, freeModeMomentum: false, slidesPerView: "auto", spaceBetween: 35, speed: 6000, autoplay: { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }, allowTouchMove: false });
    new Swiper(".card-swiper", { loop: true, slidesPerView: "auto", spaceBetween: 24, navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }, autoplay: { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true } });
    new Swiper(".blog-swiper", { loop: true, spaceBetween: 30, autoplay: { delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }, speed: 800, breakpoints: { 320: { slidesPerView: "auto" }, 576: { slidesPerView: 2 }, 992: { slidesPerView: 3 } } });
  }

  // Modal & Auth Logic
  const signupLeft = document.getElementById("signupLeft");
  const signupRight = document.getElementById("signupRight");
  const loginLeft = document.getElementById("loginLeft");
  const loginRight = document.getElementById("loginRight");

  if (signupLeft && signupRight && loginLeft && loginRight) {
    signupLeft.style.display = "none";
    signupRight.style.display = "none";
    loginLeft.style.display = "block";
    loginRight.style.display = "block";
  }

  // Prevent Form Defaults
  document.querySelectorAll("form").forEach(form => {
    // Only prevent if it's NOT the newsletter form (handled separately) and NOT the search form
    if (form.id !== 'newsletterForm' && !form.classList.contains('nav-form')) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
      });
    }
  });

  // Toggle Functions
  window.showLogin = function () {
    if (signupLeft) signupLeft.style.display = "none";
    if (signupRight) signupRight.style.display = "none";
    if (loginLeft) loginLeft.style.display = "block";
    if (loginRight) loginRight.style.display = "block";
  };

  window.toggleBox = function () {
    if (loginLeft) loginLeft.style.display = "none";
    if (loginRight) loginRight.style.display = "none";
    if (signupLeft) signupLeft.style.display = "block";
    if (signupRight) signupRight.style.display = "block";
  };

  // Sticky Navbar
  let lastScrollTop = 0;
  const navbar = document.querySelector(".header-sec");
  if (navbar) {
    window.addEventListener("scroll", function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        navbar.classList.add("nav-hide");
      } else {
        navbar.classList.remove("nav-hide");
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }

  // Interactive Maps & Location
  const locationBox = document.querySelector(".nav-location");
  const locationSelect = document.getElementById("locationSelect");
  const locationText = document.querySelector(".location-text");
  const mapUrls = {
    "Salt Lake, Kolkata": "https://www.google.com/maps?q=Salt+Lake+Kolkata&output=embed",
    "Delhi": "https://www.google.com/maps?q=Delhi&output=embed",
    "Mumbai": "https://www.google.com/maps?q=Mumbai&output=embed",
    "Bengaluru": "https://www.google.com/maps?q=Bengaluru&output=embed",
  };

  function openMap(city) {
    if (!mapUrls[city] || typeof Fancybox === 'undefined') return;
    Fancybox.show([{ src: mapUrls[city], type: "iframe" }]);
  }

  if (locationSelect) {
    locationSelect.addEventListener("click", (e) => e.stopPropagation());
    locationSelect.addEventListener("change", function (e) {
      e.stopPropagation();
      const city = this.value;
      if (locationText) locationText.textContent = city;
      openMap(city);
    });
  }

  if (locationBox) {
    locationBox.addEventListener("click", () => {
      if (locationSelect) openMap(locationSelect.value);
    });
  }

  // Init Libraries
  if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });
  if (typeof VanillaTilt !== 'undefined' && document.querySelector(".mobile-img")) {
    VanillaTilt.init(document.querySelector(".mobile-img"), { max: 15, speed: 400, scale: 1.05, glare: true, "max-glare": 0.2 });
  }
  if (typeof luxy !== 'undefined') luxy.init({ wrapper: "#luxy", targets: ".luxy-el", wrapperSpeed: 0.08 });
  if (typeof Fancybox !== 'undefined') {
    Fancybox.bind("[data-fancybox]", { Toolbar: true, closeButton: "top", animated: true, dragToClose: true, showClass: "fancybox-fadeIn", hideClass: "fancybox-fadeOut" });
  }
});

// btn-icrement
const cartItemsBox = document.querySelector(".cart-items");
const totalPriceEl = document.querySelector(".btn-price");

let cart = {};

// 🔥 SINGLE CLICK HANDLER (DOUBLE INCREMENT)
document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("add-btn")) return;

  e.preventDefault();

  const name = e.target.dataset.name;
  const price = Number(e.target.dataset.price);

  if (!cart[name]) {
    cart[name] = { price, qty: 1 };   // 👈 FIRST CLICK = +2
  } else {
    cart[name].qty += 1;              // 👈 EVERY CLICK = +2
  }

  renderCart();
});

function renderCart() {
  cartItemsBox.innerHTML = "";
  let total = 0;

  for (let name in cart) {
    const item = cart[name];
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <p class="item-name">${name}</p>
      <div class="item-controls">
        <div class="qty-control">
          <button onclick="changeQty('${name}', -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${name}', 1)">+</button>
        </div>
        <span class="item-price">₹${item.price * item.qty}</span>
      </div>
    `;
    cartItemsBox.appendChild(div);
  }

  totalPriceEl.textContent = `₹${total}`;
}

function changeQty(name, value) {
  cart[name].qty += value;
  if (cart[name].qty <= 0) delete cart[name];
  renderCart();
}

// isotop-js
 const serviceItems = document.querySelectorAll(".service-item");
const serviceCards = document.querySelectorAll(".service-card");

const DEFAULT_FILTER = "ac"; // 👈 first load category

function applyFilter(filter) {
  serviceCards.forEach((card, index) => {
    if (card.dataset.category === filter) {
      setTimeout(() => {
        card.classList.remove("hide");
        card.classList.add("show");
      }, index * 100);
    } else {
      card.classList.remove("show");
      card.classList.add("hide");
    }
  });
}

/* INITIAL LOAD → SHOW AC ONLY */
applyFilter(DEFAULT_FILTER);

// active AC item on load
serviceItems.forEach(item => {
  if (item.dataset.filter === DEFAULT_FILTER) {
    item.classList.add("active");
  }
});

/* CLICK FILTER */
serviceItems.forEach(item => {
  item.addEventListener("click", () => {
    const filter = item.dataset.filter;
    if (!filter) return;

    serviceItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    applyFilter(filter);
  });
});

//   log in

   document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".log-modal-btn")?.closest("form");

    if (!form) return;

    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');

    const emailError = form.querySelector("#emailError");
    const passwordError = form.querySelector("#passwordError");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // 🚫 stop refresh

      let isValid = true;

      // reset errors
      emailError.textContent = "";
      passwordError.textContent = "";

      // email check
      if (emailInput.value.trim() === "") {
        emailError.textContent = "Email is required";
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
        emailError.textContent = "Enter a valid email";
        isValid = false;
      }

      // password check
      if (passwordInput.value.trim() === "") {
        passwordError.textContent = "Password is required";
        isValid = false;
      }

      if (!isValid) return;

      // ✅ SUCCESS (NO REFRESH)
      console.log("Login successful");
      console.log("Email:", emailInput.value);
      console.log("Password:", passwordInput.value);

      // 👉 here you will call API later
      // fetch('/login', {...})
    });
  });

  // singup form

document.getElementById("modalform").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("modal-email").value.trim();
  const password = document.getElementById("modal-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const address = document.getElementById("address").value.trim();

  // Clear errors
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  let isValid = true;

  if (!email) {
    document.getElementById("emailError").textContent = "Email is required";
    isValid = false;
  }

  if (password.length < 6) {
    document.getElementById("passwordError").textContent =
      "Password must be at least 6 characters";
    isValid = false;
  }

  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").textContent =
      "Passwords do not match";
    isValid = false;
  }

  if (!address) {
    document.getElementById("addressError").textContent =
      "Address is required";
    isValid = false;
  }

  if (isValid) {
    alert("Account created successfully ✅");
    // this.submit(); // enable when backend is ready
  }
});