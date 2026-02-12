console.log("JS LOADED");
const navbar = document.querySelector(".header-sec");
console.log(navbar);
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  offset: 120,
});

// nav-link
const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  const duration = 1500;
  let startTime = null;

  function update(time) {
    if (!startTime) startTime = time;

    const progress = Math.min((time - startTime) / duration, 1);
    counter.innerText = Math.floor(progress * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.innerText = target + "+";
    }
  }

  requestAnimationFrame(update);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.innerText = "0"; // reset
        animateCounter(entry.target); // count again
      }
    });
  },
  { threshold: 0.6 }
);


counters.forEach((counter) => observer.observe(counter));

const form = document.getElementById("modalform");
const emailInput = document.getElementById("modal-email");
const passwordInput = document.getElementById("modal-password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop form submission

  let isValid = true;

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

  // log-form

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

// dash-toggle

document.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", function () {
    const role = this.dataset.role;
    document.querySelector(".drop-text").innerText =
      role.charAt(0).toUpperCase() + role.slice(1);

    document.getElementById("selectedRole").value = role;
  });
});

