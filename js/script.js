var swiper = new Swiper(".myswiper", {
  //   direction: "vertical",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
     pauseOnMouseEnter: true,
  },
   speed: 800,
})
const swiper2 = new Swiper(".trustslider", {
  speed: 10000,
  direction: "horizontal",
  spaceBetween: 50,
  loop: true,
  slidesPerView: "auto",

  freeMode: {
    enabled: true,
    momentum: false,
  },

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true, // ✅ pause on hover
  },

  allowTouchMove: false,
  pagination: false,
  navigation: false,
});

var swiper3 = new Swiper(".equipment-swiper", {
  // Optional parameters
  loop: true,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
     pauseOnMouseEnter: true,
  },

  speed: 800,

  breakpoints: {
    320: {
      slidesPerView: "auto",
    },
    800: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});

var swiper7 = new Swiper(".team-swiper", {
  // Optional parameters
  loop: true,
  spaceBetween: 17.28,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
     pauseOnMouseEnter: true,
  },

  speed: 800,

  breakpoints: {
    320: {
      slidesPerView: "auto",
    },
    800: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 6,
    },
  },
});
var swiper4 = new Swiper(".services-swiper", {
  // Optional parameters
  loop: true,
  freeMode: true,
  freeModeMomentum: false,
  slidesPerView: "auto",
  spaceBetween: 43,

  speed: 6000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
     pauseOnMouseEnter: true,
  },

  allowTouchMove: false,
  spaceBetween: 35,
  slidesPerView: "auto",
});

var swiper5 = new Swiper(".card-swiper", {
  // Optional parameters
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 24,
  slidesPerView: "auto",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
     pauseOnMouseEnter: true,
  },
});

var swiper6 = new Swiper(".blog-swiper", {
  loop: true,
  spaceBetween: 30,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  speed: 800,

  breakpoints: {
    320: {
      slidesPerView: "auto",
    },
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
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



  // 🔒 IMPORTANT: scoped selectors
 document.addEventListener("DOMContentLoaded", function () {

  const loginBtn = document.querySelector("#loginLeft .log-modal-btn");
  if (!loginBtn) return;

  const form = loginBtn.closest("form");
  const otpModal = document.getElementById("otpModal");
  const otpEmail = document.getElementById("otpEmail");

  if (!form || !otpModal) return;

  const emailInput = form.querySelector('input[name="email"]');
  const passwordInput = form.querySelector('input[name="password"]');

  const emailError = form.querySelector("#emailError");
  const passwordError = form.querySelector("#passwordError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    emailError.textContent = "";
    passwordError.textContent = "";

    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
      emailError.textContent = "Enter a valid email";
      isValid = false;
    }

    if (!passwordInput.value.trim()) {
      passwordError.textContent = "Password is required";
      isValid = false;
    }

    if (!isValid) return;

    // ✅ SUCCESS
    console.log("Login successful");
    console.log("Email:", emailInput.value);

    // ✅ SHOW OTP MODAL
    otpModal.style.display = "flex";
    otpEmail.textContent = emailInput.value;
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

function openMap(city) {
  if (!mapUrls[city]) return;

  Fancybox.show([
    {
      src: mapUrls[city],
      type: "iframe",
    },
  ]);
}

/* Prevent dropdown click from opening map */
locationSelect.addEventListener("click", function (e) {
  e.stopPropagation();
});

/* 🔹 Open map ONLY when clicking box (not dropdown) */
locationBox.addEventListener("click", function () {
  openMap(locationSelect.value);
});

/* 🔹 Change city → update text + open map */
locationSelect.addEventListener("change", function (e) {
  e.stopPropagation();
  const city = this.value;
  locationText.textContent = city;
  openMap(city);
});


const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});
const homebtn = document.querySelectorAll(".home-btn");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    homebtn.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const bookmarks = document.querySelectorAll(".bookmark");

bookmarks.forEach(bookmark => {
  bookmark.addEventListener("click", () => {
    bookmark.classList.toggle("active");
  });
});

const cards = document.querySelectorAll(".how-card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");
  });
});

// splash-screen
window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("splash-screen").style.opacity = "0";
      document.getElementById("splash-screen").style.transition = "0.8s";
      setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("main-content").style.display = "block";
      }, 800);
    }, 3000);
  });

Fancybox.bind("[data-fancybox]", {
  Toolbar: true,
  closeButton: "top",
  animated: true,
  dragToClose: true,
  showClass: "fancybox-fadeIn",
  hideClass: "fancybox-fadeOut",
});

VanillaTilt.init(document.querySelector(".mobile-img"), {
    max: 15,
    speed: 400,
    scale: 1.05,
    glare: true,
    "max-glare": 0.2,
  });

AOS.init({
  duration: 1000,
  once: true,
});

//  const openText = document.getElementById("openText");
//   const todayStatus = document.getElementById("todayStatus");

//   const now = new Date();
//   const hour = now.getHours();
//   const day = now.getDay(); // 0 = Sunday

//   let isOpen = false;

//   if (day >= 1 && day <= 5) {
//     isOpen = hour >= 9 && hour < 22;
//   } else if (day === 6) {
//     isOpen = hour >= 9 && hour < 20;
//   }

//   if (isOpen) {
//     openText.textContent = "Open Now • Closes at 10 PM";
//     todayStatus.innerHTML = "🟢 We are open right now";
//   } else {
//     openText.textContent = "Closed • Opens at 9 AM";
//     todayStatus.innerHTML = "🔴 We are currently closed";
//   }

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

