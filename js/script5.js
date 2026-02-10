

 Fancybox.bind("[data-fancybox]", {
    Toolbar: true,
    dragToClose: false,
  });


  document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let valid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("form-email");
  const phone = document.getElementById("phone");
  const terms = document.getElementById("terms");

  clearErrors();

  // Name
  if (name.value.trim() === "") {
    setError(name, "Name is required");
    valid = false;
  } else {
    setSuccess(name);
  }

  // Email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    setError(email, "Enter a valid email");
    valid = false;
  } else {
    setSuccess(email);
  }

  // Phone
  if (!/^[0-9]{10,15}$/.test(phone.value)) {
    setError(phone, "Enter valid phone number");
    valid = false;
  } else {
    setSuccess(phone);
  }

  // Checkbox
  if (!terms.checked) {
    document.getElementById("termsError").innerText =
      "You must agree to the terms";
    valid = false;
  }

  if (valid) {
    alert("Form submitted successfully ✅");
    this.reset();
    clearBorders();
  }
});

function setError(input, message) {
  input.classList.add("error-border");
  input.nextElementSibling.innerText = message;
}

function setSuccess(input) {
  input.classList.add("success-border");
}

function clearErrors() {
  document.querySelectorAll(".error").forEach(e => e.innerText = "");
  clearBorders();
}

function clearBorders() {
  document.querySelectorAll("input").forEach(input => {
    input.classList.remove("error-border", "success-border");
  });
}

// modal animation

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

  // login-form

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

// map location




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



  let lastScrollTop = 0;
const navbar = document.querySelector(".header-sec");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navbar.classList.add("nav-hide");
  } else {
    navbar.classList.remove("nav-hide");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

   AOS.init({
    duration: 1000,   // animation duration
    easing: "ease-in-out",
    once: true,       // animate only once
    offset: 120       // trigger distance
  });