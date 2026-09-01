/*
  ==========================================================
  EDIT FOTO ORANG DI SINI
  ==========================================================

  Struktur folder:

  pkl-jalantra-web/
  ├── index.html
  ├── style.css
  ├── script.js
  │
  └── assets/
      ├── citra.jpg
      ├── eris.jpg
      └── nanda.jpg

  ==========================================================
*/


// ==========================================================
// FOTO HERO
// ==========================================================

// FOTO YANG MUNCUL DI HERO
const heroImage = "assets/kapten.jpg";


// ==========================================================
// PROFILE
// ==========================================================

const profiles = [
  {
    name: "Citra Yuriska",
    role: "RPL · SMKN 6 Malang",
    period: "PKL | 1 Juli 2026 — 30 April 2027",
    image: "assets/citra.jpg",
    initial: "CY"
  },

  {
    name: "Nanda Anisa Rizki",
    role: "Mentor",
    period: "Pendamping PKL",
    image: "assets/nanda.jpg",
    initial: "NA"
  },

  {
    name: "Eris Rahma Vidiawati",
    role: "RPL · SMKN 6 Malang",
    period: "PKL | 1 Juli 2026 — 30 April 2027",
    image: "assets/eris.jpg",
    initial: "EV"
  }
];


// ==========================================================
// MENAMPILKAN FOTO HERO
// ==========================================================

const heroPhoto = document.getElementById("heroPhoto");

if (heroPhoto && heroImage) {

  heroPhoto.innerHTML = `
    <img
      src="${heroImage}"
      alt="Foto Kapten"
      >
  `;

}

// ==========================================================
// GALERI KEGIATAN
// ==========================================================

const galleryImages = [
  "assets/kegiatan1.jpg",
  "assets/kegiatan3.jpg"
];

const galleryPhotos = document.getElementById("galleryPhotos");

if (galleryPhotos) {

  galleryImages.forEach((src) => {

    galleryPhotos.insertAdjacentHTML(
      "beforeend",
      `
        <div class="gallery-photo">
          <img
            src="${src}"
            alt="Dokumentasi kegiatan frontliner"
            loading="lazy"
          >
        </div>
      `
    );

  });

}


// ==========================================================
// MENAMPILKAN PROFILE
// ==========================================================

const profileGrid = document.getElementById("profileGrid");

if (profileGrid) {

  profiles.forEach((person) => {

    const imageHTML = person.image
      ? `
        <img
          src="${person.image}"
          alt="Foto ${person.name}"
          loading="lazy"
        >
      `
      : `
        <div class="placeholder">
          ${person.initial}
        </div>
      `;

    profileGrid.insertAdjacentHTML(
      "beforeend",
      `
        <article class="profile-card reveal">

          <div class="profile-image">
            ${imageHTML}
          </div>

          <div class="profile-info">

            <span class="profile-role">
              ${person.role}
            </span>

            <h3>
              ${person.name}
            </h3>

            <p>
              ${person.period}
            </p>

          </div>

        </article>
      `
    );

  });

}


// ==========================================================
// MOBILE NAVIGATION
// ==========================================================

const nav = document.querySelector(".nav");
const menuBtn = document.querySelector(".menu-btn");

if (menuBtn && nav) {

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

}


document
  .querySelectorAll(".nav-links a")
  .forEach((link) => {

    link.addEventListener("click", () => {

      if (nav) {
        nav.classList.remove("open");
      }

    });

  });


// ==========================================================
// SCROLL PROGRESS
// ==========================================================

const progress = document.getElementById("progress");

window.addEventListener("scroll", () => {

  if (!progress) return;

  const scrollTop = window.scrollY;

  const docHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  if (docHeight <= 0) return;

  const percentage =
    (scrollTop / docHeight) * 100;

  progress.style.width = `${percentage}%`;

});


// ==========================================================
// REVEAL ANIMATION
// ==========================================================

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);


document
  .querySelectorAll(".reveal")
  .forEach((element) => {

    observer.observe(element);

  });