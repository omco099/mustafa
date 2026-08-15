/* ================================= */
/* GSAP REGISTER */
/* ================================= */

gsap.registerPlugin(ScrollTrigger);

/* ================================= */
/* LENIS SMOOTH SCROLL */
/* ================================= */

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* ================================= */
/* ELEMENTS */
/* ================================= */

const seal = document.getElementById("waxSeal");
const flap = document.querySelector(".envelope-flap");
const letter = document.getElementById("letter");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
const scrollIndicator = document.querySelector(".scroll-indicator");
const envelope = document.getElementById("envelope");
const heroSection = document.getElementById("heroSection");
const lightFlash = document.getElementById("lightFlash");

/* ================================= */
/* MUSIC LOGIC */
/* ================================= */

let musicPlaying = false;

function fadeAudio(targetVolume, duration = 2000) {
  const startVolume = music.volume;
  const steps = 40;
  let current = 0;

  const interval = setInterval(() => {
    current++;
    music.volume = startVolume + ((targetVolume - startVolume) * current / steps);
    if (current >= steps) {
      clearInterval(interval);
    }
  }, duration / steps);
}

musicBtn.addEventListener("click", () => {
  if (!musicPlaying) {
    music.play();
    fadeAudio(1);
    musicPlaying = true;
    musicBtn.innerHTML = "❚❚";
  } else {
    fadeAudio(0, 800);
    setTimeout(() => {
      music.pause();
    }, 900);
    musicPlaying = false;
    musicBtn.innerHTML = "♫";
  }
});

/* ================================= */
/* INITIAL STATES */
/* ================================= */

gsap.set(heroSection, {
  opacity: 0,
  y: 100
});

/* ================================= */
/* OPEN ENVELOPE ANIMATION */
/* ================================= */

seal.addEventListener("click", () => {
  music.volume = 0;
  music.play();
  fadeAudio(1);
  musicPlaying = true;
  musicBtn.innerHTML = "❚❚";

  const tl = gsap.timeline();

  // 1. تحول الختم إلى اللون الذهبي مع خروج الضوء من الحروف
  seal.classList.add("gold-mode");

  tl.to(".seal-text", {
    scale: 1.25,
    duration: 0.3,
    ease: "back.out(2)"
  })

  // 2. انبعاث الضوء لملء الشاشة كاملاً في ثانية
  .to(lightFlash, {
    opacity: 1,
    scale: 120,
    duration: 1,
    ease: "power2.inOut"
  })

  // 3. اختفاء الختم وفتح الغطاء خلف الإضاءة
  .to(seal, {
    scale: 0,
    opacity: 0,
    duration: 0.3
  }, "-=0.5")

  .to(flap, {
    rotateX: -180,
    duration: 0.8,
    ease: "power3.inOut"
  }, "-=0.5")

  .to(letter, {
    opacity: 1,
    y: -220,
    duration: 1,
    ease: "power4.out"
  }, "-=0.2")

  // 4. تلاشي الإضاءة تدريجياً لكشف الرسالة
  .to(lightFlash, {
    opacity: 0,
    duration: 0.8,
    ease: "power1.out"
  })

  .to(scrollIndicator, {
    opacity: 1,
    duration: 0.6
  })

  .to(envelope, {
    opacity: 0,
    scale: .9,
    duration: 0.6
  }, "-=0.4")

  .to(heroSection, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.2");
});

/* ================================= */
/* SCROLL REVEALS (STORY / ENGAGEMENT) */
/* ================================= */

gsap.from(".story-image", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  stagger: 0.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".story-grid",
    start: "top 80%"
  }
});

gsap.from(".image-right", {
  x: 100,
  y: 40,
  opacity: 0,
  duration: 1.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".image-right",
    start: "top 80%"
  }
});

gsap.from(".image-left", {
  x: -100,
  y: 40,
  opacity: 0,
  duration: 1.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".image-left",
    start: "top 80%"
  }
});

/* ================================= */
/* HENNA */
/* ================================= */

gsap.from(".henna-card", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  scrollTrigger: {
    trigger: ".henna-card",
    start: "top 80%"
  }
});

/* ================================= */
/* COUNTDOWN DISPLAY & ANIMATION */
/* ================================= */

gsap.from(".count-box", {
  opacity: 0,
  scale: .7,
  stagger: .15,
  duration: .8,
  scrollTrigger: {
    trigger: "#countdown",
    start: "top 85%"
  }
});

const weddingDate = new Date("2026-08-17T20:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ================================= */
/* VENUE */
/* ================================= */

gsap.from(".venue-card", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  scrollTrigger: {
    trigger: ".venue-card",
    start: "top 80%"
  }
});

/* ================================= */
/* FINAL */
/* ================================= */

gsap.from(".final-overlay", {
  opacity: 0,
  y: 80,
  duration: 1.3,
  scrollTrigger: {
    trigger: ".final-section",
    start: "top 70%"
  }
});

gsap.to(".final-heart", {
  scale: 1.15,
  duration: 1.3,
  repeat: -1,
  yoyo: true
});

/* ================================= */
/* CALENDAR */
/* ================================= */

const calendarBtn = document.getElementById("calendarBtn");

calendarBtn.addEventListener("click", () => {
  const start = "20260817T200000";
  const end = "20260818T010000";
  const title = encodeURIComponent("حفل زفاف اسراء ومصطفى");
  const details = encodeURIComponent("قاعة بيلا فيتا - دمياط الجديدة");
  const location = encodeURIComponent("قاعة بيلا فيتا - دمياط الجديدة");

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

  window.open(url, "_blank");
});