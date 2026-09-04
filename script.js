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
// MODE PRESENTASI (SLIDE / PPT-STYLE)
//
// Setiap <section> langsung di dalam <main> diperlakukan
// sebagai satu "slide". Pindah slide bisa lewat:
//   - tombol panah kiri/kanan di layar
//   - titik navigasi di kanan layar (klik langsung lompat)
//   - tombol arrow keyboard / PageUp / PageDown / spasi
//   - scroll wheel (dibaca sebagai next/prev, bukan scroll biasa)
//   - swipe di layar sentuh
//   - klik tombol "Jelajahi progress" / "Kembali ke atas"
// ==========================================================

const slides = Array.from(document.querySelectorAll("main > section"));
const progress = document.getElementById("progress");

let currentSlide = 0;
let isAnimating = false;
const TRANSITION_MS = 600;

if (slides.length > 0) {

  slides.forEach((section) => {
    section.classList.add("slide");
  });


  // --- buat titik navigasi ---
  const dotsWrap = document.createElement("div");
  dotsWrap.className = "slide-dots";

  slides.forEach((section, index) => {

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slide-dot";
    dot.setAttribute("aria-label", `Ke slide ${index + 1}`);

    dot.addEventListener("click", () => goToSlide(index));

    dotsWrap.appendChild(dot);

  });

  document.body.appendChild(dotsWrap);


  // --- tombol panah ---
  const prevArrow = document.createElement("button");
  prevArrow.type = "button";
  prevArrow.className = "slide-arrow prev-arrow";
  prevArrow.setAttribute("aria-label", "Slide sebelumnya");
  prevArrow.innerHTML = "&#8249;";
  prevArrow.addEventListener("click", () => goToSlide(currentSlide - 1));

  const nextArrow = document.createElement("button");
  nextArrow.type = "button";
  nextArrow.className = "slide-arrow next-arrow";
  nextArrow.setAttribute("aria-label", "Slide berikutnya");
  nextArrow.innerHTML = "&#8250;";
  nextArrow.addEventListener("click", () => goToSlide(currentSlide + 1));

  document.body.appendChild(prevArrow);
  document.body.appendChild(nextArrow);


  // --- penghitung slide ---
  const counter = document.createElement("div");
  counter.className = "slide-counter";
  document.body.appendChild(counter);


  function playReveal(section) {

    const items = section.querySelectorAll(".reveal");

    items.forEach((item, index) => {

      item.classList.remove("show");

      // paksa reflow supaya animasi bisa diulang tiap pindah slide
      void item.offsetWidth;

      window.setTimeout(() => {
        item.classList.add("show");
      }, 70 * index + 60);

    });

  }


  function updateUI() {

    slides.forEach((section, index) => {
      section.classList.toggle("active-slide", index === currentSlide);
      section.classList.toggle("prev-slide", index < currentSlide);
    });

    dotsWrap
      .querySelectorAll(".slide-dot")
      .forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
      });

    prevArrow.disabled = currentSlide === 0;
    nextArrow.disabled = currentSlide === slides.length - 1;

    counter.textContent =
      `${String(currentSlide + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;

    if (progress) {
      progress.style.width =
        `${((currentSlide + 1) / slides.length) * 100}%`;
    }

  }


  function goToSlide(index) {

    if (isAnimating) return;

    const target = Math.max(0, Math.min(slides.length - 1, index));

    if (target === currentSlide) return;

    isAnimating = true;
    currentSlide = target;

    updateUI();

    const activeSection = slides[currentSlide];
    activeSection.scrollTop = 0;

    playReveal(activeSection);

    window.setTimeout(() => {
      isAnimating = false;
    }, TRANSITION_MS);

  }


  // init tampilan pertama
  updateUI();
  playReveal(slides[currentSlide]);


  // --- keyboard ---
  document.addEventListener("keydown", (event) => {

    if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      goToSlide(currentSlide + 1);
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault();
      goToSlide(currentSlide - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      goToSlide(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goToSlide(slides.length - 1);
    }

  });


  // --- scroll wheel dibaca sebagai next/prev slide ---
  let wheelLocked = false;

  document.addEventListener("wheel", (event) => {

    const activeSection = slides[currentSlide];

    const atTop = activeSection.scrollTop <= 0;
    const atBottom =
      activeSection.scrollTop + activeSection.clientHeight
      >= activeSection.scrollHeight - 2;

    // kalau isi slide masih bisa di-scroll ke arah itu, biarkan scroll dalam slide dulu
    if (event.deltaY > 0 && !atBottom) return;
    if (event.deltaY < 0 && !atTop) return;

    event.preventDefault();

    if (wheelLocked || Math.abs(event.deltaY) < 12) return;

    wheelLocked = true;

    if (event.deltaY > 0) {
      goToSlide(currentSlide + 1);
    } else if (event.deltaY < 0) {
      goToSlide(currentSlide - 1);
    }

    window.setTimeout(() => {
      wheelLocked = false;
    }, TRANSITION_MS + 150);

  }, { passive: false });


  // --- swipe layar sentuh ---
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener("touchend", (event) => {

    const deltaX = event.changedTouches[0].screenX - touchStartX;
    const deltaY = event.changedTouches[0].screenY - touchStartY;

    // hanya dianggap swipe kalau gerakan horizontal cukup jauh
    // & lebih dominan dibanding gerakan vertikal
    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0) {
      goToSlide(currentSlide + 1);
    } else {
      goToSlide(currentSlide - 1);
    }

  }, { passive: true });


  // --- link di navbar / tombol "Jelajahi progress" / "Kembali ke atas"
  //     langsung lompat ke slide terkait, bukan scroll biasa ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href").slice(1);
      const targetIndex = slides.findIndex((s) => s.id === targetId);

      if (targetIndex !== -1) {
        event.preventDefault();
        goToSlide(targetIndex);
      }

    });

  });

}