document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const items = document.querySelectorAll(".activity-item");

  function filterItems(filter) {
    items.forEach(item => {
      item.style.display =
        item.dataset.status === filter ? "flex" : "none";
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      filterItems(tab.dataset.filter);
    });
  });

  // 🔥 auto-load first tab
  if (tabs.length) {
    tabs[0].classList.add("active");
    filterItems(tabs[0].dataset.filter);
  }
});






// clanedar-js

const daysEl = document.getElementById("days");
const monthYearEl = document.getElementById("monthYear");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let date = new Date();

function renderCalendar() {
  daysEl.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();

  monthYearEl.textContent =
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  // previous month days
  for (let i = firstDay; i > 0; i--) {
    const span = document.createElement("span");
    span.className = "muted";
    span.textContent = prevLastDate - i + 1;
    daysEl.appendChild(span);
  }

  // current month days
  for (let i = 1; i <= lastDate; i++) {
    const span = document.createElement("span");
    span.textContent = i;
    daysEl.appendChild(span);
  }

  // next month days
  const totalCells = daysEl.children.length;
  for (let i = 1; totalCells + i <= 42; i++) {
    const span = document.createElement("span");
    span.className = "muted";
    span.textContent = i;
    daysEl.appendChild(span);
  }
}

prevBtn.onclick = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

nextBtn.onclick = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

renderCalendar();

// toggle-js
const openBtn = document.querySelector(".toggel-btn");
const closeBtn = document.querySelector(".toggel-close-btn");
const aside = document.querySelector(".aside-sec");

// OPEN
openBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  aside.classList.add("active");
});

// CLOSE (INSIDE BUTTON)
closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();      // 🔥 REQUIRED
  aside.classList.remove("active");
});

// CLICK OUTSIDE CLOSE
document.addEventListener("click", function (e) {
  if (
    !aside.contains(e.target) &&
    !openBtn.contains(e.target)
  ) {
    aside.classList.remove("active");
  }
});


// search-toggel

const searchForm = document.querySelector(".nav-form");
const searchIcon = document.querySelector(".search-icon");
const scanIcon = document.querySelector(".scan-icon");

// stop form submit
searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
});

// toggle search
searchIcon.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  searchForm.querySelector(".search").classList.toggle("active");
  searchForm.querySelector(".search").focus();
});

// click outside close
document.addEventListener("click", function (e) {
  if (!searchForm.contains(e.target)) {
    searchForm.querySelector(".search").classList.remove("active");
  }
});



