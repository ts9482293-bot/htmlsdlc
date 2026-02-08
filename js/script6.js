 document.addEventListener("DOMContentLoaded", function () {
    const signupLeft = document.getElementById("signupLeft");
    const signupRight = document.getElementById("signupRight");
    const loginLeft = document.getElementById("loginLeft");
    const loginRight = document.getElementById("loginRight");

    /* -------------------------
       INITIAL STATE: LOGIN FIRST
    -------------------------- */
    signupLeft.style.display = "none";
    signupRight.style.display = "none";
    loginLeft.style.display = "block";
    loginRight.style.display = "block";

    /* -------------------------
       PREVENT ALL FORM REFRESH
    -------------------------- */
    document.querySelectorAll("form").forEach(form => {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
      });
    });

    /* -------------------------
       SIGN IN → LOGIN
    -------------------------- */
    window.showLogin = function () {
      signupLeft.style.display = "none";
      signupRight.style.display = "none";
      loginLeft.style.display = "block";
      loginRight.style.display = "block";
    };

    /* -------------------------
       CREATE ACCOUNT → SIGNUP
    -------------------------- */
    window.toggleBox = function () {
      loginLeft.style.display = "none";
      loginRight.style.display = "none";
      signupLeft.style.display = "block";
      signupRight.style.display = "block";
    };
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

const locationBox = document.querySelector(".nav-location");
const locationSelect = document.getElementById("locationSelect");
const locationText = document.querySelector(".location-text");

const mapUrls = {
  "Salt Lake, Kolkata":
    "https://www.google.com/maps?q=Salt+Lake+Kolkata&output=embed",
  "Delhi":
    "https://www.google.com/maps?q=Delhi&output=embed",
  "Mumbai":
    "https://www.google.com/maps?q=Mumbai&output=embed",
  "Bengaluru":
    "https://www.google.com/maps?q=Bengaluru&output=embed",
};

// ✅ click ONLY on box (not select)
locationBox.addEventListener("click", (e) => {
  if (e.target === locationSelect) return; // stop dropdown click
  openMap(locationText.textContent.trim());
});

// ✅ stop bubbling from select
locationSelect.addEventListener("click", (e) => {
  e.stopPropagation();
});

// ✅ open map only AFTER selection
locationSelect.addEventListener("change", () => {
  const city = locationSelect.value;
  locationText.textContent = city;
  openMap(city);
});

function openMap(city) {
  if (!mapUrls[city]) return;

  Fancybox.show([
    {
      src: mapUrls[city],
      type: "iframe",
    },
  ]);
}

function openMap(city) {
  if (!mapUrls[city]) return;

  Fancybox.show([
    {
      src: mapUrls[city],
      type: "iframe",
    },
  ]);
}

Fancybox.bind("[data-fancybox]", {
  placeFocusBack: false,
  trapFocus: false,
  iframe: {
    preload: false,
  },
});

function openMap(city) {
  if (!mapUrls[city]) return;

  Fancybox.show([
    {
      src: mapUrls[city],
      type: "iframe",
    },
  ]);
}

// scroll-top

document.addEventListener("DOMContentLoaded", () => {
  let lastScrollTop = 0;
  const navbar = document.querySelector(".header-sec");

  if (!navbar) return;

  window.addEventListener("scroll", () => {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      navbar.classList.add("nav-hide");
    } else {
      navbar.classList.remove("nav-hide");
    }

    lastScrollTop = scrollTop;
  });
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




