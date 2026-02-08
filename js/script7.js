  document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // remove old errors
    document.querySelectorAll(".error").forEach(err => err.remove());

    let valid = true;

    const showError = (input, message) => {
      const error = document.createElement("small");
      error.className = "error";
      error.innerText = message;
      input.parentElement.appendChild(error);
      valid = false;
    };

    // inputs
    const email = document.getElementById("checkout-email");
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const country = document.getElementById("country");
    const address = document.getElementById("address");
    const city = document.getElementById("city");
    const state = document.getElementById("state");
    const pincode = document.getElementById("pincode");
    const phone = document.getElementById("phone");
    const slot = document.getElementById("slot");
    const terms = document.getElementById("terms");

    // email
    if (!email.value.trim()) {
      showError(email, "Email is required");
    } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
      showError(email, "Enter a valid email");
    }

    // names
    if (!fname.value.trim()) showError(fname, "First name required");
    if (!lname.value.trim()) showError(lname, "Last name required");

    // address
    if (!country.value.trim()) showError(country, "Country required");
    if (!address.value.trim()) showError(address, "Address required");
    if (!city.value.trim()) showError(city, "City required");
    if (!state.value.trim()) showError(state, "State required");

    // pincode (India)
    if (!/^\d{6}$/.test(pincode.value)) {
      showError(pincode, "Enter valid 6-digit pincode");
    }

    // phone
    if (!/^\d{10}$/.test(phone.value)) {
      showError(phone, "Enter valid 10-digit phone number");
    }

    // slot
    if (!slot.value) showError(slot, "Please select a slot time");

    // payment
    const payment = document.querySelector('input[name="payment"]:checked');
    if (!payment) {
      alert("Please select a payment method");
      valid = false;
    }

    // terms
    if (!terms.checked) {
      alert("Please accept Terms & Conditions");
      valid = false;
    }

    // final
    if (valid) {
      alert("Checkout form validated successfully ✅");
      // form.submit(); // enable when backend is ready
    }
  });
});

let lastScrollTop = 0;
  const navbar = document.querySelector(".header-sec");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // scrolling down
      navbar.classList.add("nav-hide");
    } else {
      // scrolling up
      navbar.classList.remove("nav-hide");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

AOS.init({
    duration: 1000,   // animation duration (ms)
    easing: "ease-in-out",
    once: true,       // animation happens only once
    offset: 120       // trigger distance
  });


   Fancybox.bind("[data-fancybox]", {
    placeFocusBack: false,
    trapFocus: false,
    iframe: {
      preload: false,
    },
  });

  // sing up animation

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

  // log in

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