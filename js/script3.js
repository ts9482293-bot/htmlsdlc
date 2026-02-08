var swiper = new Swiper(".swiper", {
  //   direction: "vertical",
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 39,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
     pauseOnMouseEnter: true,
  },
});

const form = document.getElementById("modalform");
  const emailInput = document.getElementById("modal-email");
  const passwordInput = document.getElementById("modal-password");

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // stop form submission

    let isValid = true;

    // Reset errors
    emailError.textContent = "";
    passwordError.textContent = "";

    // Email validation
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      emailError.textContent = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      emailError.textContent = "Enter a valid email address";
      isValid = false;
    }

    // Password validation
    const passwordValue = passwordInput.value.trim();

    if (passwordValue === "") {
      passwordError.textContent = "Password is required";
      isValid = false;
    } else if (passwordValue.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters";
      isValid = false;
    }

    // If everything is valid
    if (isValid) {
      console.log("Form submitted successfully!");
      form.reset(); // optional
    }
  });

  

  
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
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    offset: 120
  });

   Fancybox.bind("[data-fancybox]", {
    placeFocusBack: false,
    trapFocus: false,
    iframe: {
      preload: false,
    },
  });