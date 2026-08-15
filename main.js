// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scroll with Lenis
const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Elements
const waxSeal = document.getElementById("waxSeal");
const lightReveal = document.getElementById("lightReveal");
const openingScene = document.getElementById("openingScene");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");

// Audio Handler
let musicPlaying = false;
musicBtn.addEventListener("click", () => {
  if (!musicPlaying) {
    music.play();
    musicPlaying = true;
    musicBtn.innerHTML = "❚❚";
  } else {
    music.pause();
    musicPlaying = false;
    musicBtn.innerHTML = "♫";
  }
});

// ==========================================
// GSAP LIGHT REVEAL ANIMATION (Match Video)
// ==========================================
waxSeal.addEventListener("click", () => {
  // Start Music
  music.play().then(() => { musicPlaying = true; musicBtn.innerHTML = "❚❚"; }).catch(() => {});

  const tl = gsap.timeline();

  // 1. Seal pulse and light start
  tl.to(waxSeal, {
    scale: 1.2,
    brightness: 2,
    duration: 0.4,
    ease: "power2.out"
  })
  // 2. Expand light bloom overlay to fill screen
  .to(lightReveal, {
    opacity: 1,
    scale: 15,
    duration: 1.2,
    ease: "power3.in"
  }, "-=0.1")
  // 3. Hide Envelope & Show Main Content behind the light
  .to(openingScene, {
    display: "none",
    duration: 0
  })
  .set(mainContent, {
    display: "block",
    opacity: 1
  })
  // 4. Fade out the light bloom overlay to reveal the hero section
  .to(lightReveal, {
    opacity: 0,
    duration: 1.2,
    ease: "power2.out"
  })
  // 5. Animate Hero Names sequentially
  .from(".reveal-item", {
    y: 30,
    opacity: 0,
    stagger: 0.25,
    duration: 1,
    ease: "power3.out"
  }, "-=0.8");
});

// ==========================================
// SCROLLTRIGGER ANIMATIONS
// ==========================================
gsap.from(".countdown-section", {
  scrollTrigger: {
    trigger: ".countdown-section",
    start: "top 80%"
  },
  y: 50,
  opacity: 0,
  duration: 1
});

gsap.from(".event-card", {
  scrollTrigger: {
    trigger: ".event-section",
    start: "top 80%"
  },
  y: 60,
  opacity: 0,
  stagger: 0.3,
  duration: 1.2,
  ease: "power3.out"
});

// ==========================================
// COUNTDOWN TIMER (FOR 15 AUGUST 2026)
// ==========================================
const weddingDate = new Date("2026-08-15T20:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = days.toString().padStart(2, '0');
  document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ==========================================
// GOOGLE CALENDAR
// ==========================================
document.getElementById("calendarBtn").addEventListener("click", () => {
  const start = "20260815T200000";
  const end = "20260816T020000";
  const title = encodeURIComponent("حفل زفاف مصطفى وإسراء");
  const details = encodeURIComponent("قاعة Bella Vita - مدينة دمياط الجديدة");
  const location = encodeURIComponent("https://maps.app.goo.gl/Tgtuzm1XXxXVLfUJ7");

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  window.open(url, "_blank");
});