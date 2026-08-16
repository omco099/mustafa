/* ================================= */
/* GSAP REGISTER */
/* ================================= */
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ================================= */
/* SAFE LENIS SMOOTH SCROLL */
/* ================================= */
let lenis;
if (typeof Lenis !== "undefined") {
  lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true
  });

  // إيقاف السكرول مبدئياً عند تحميل الصفحة
  lenis.stop();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// قفل السكرول على الصفحة
document.body.classList.add("no-scroll");

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
const customBg = document.getElementById("customBg");

/* ================================= */
/* MUSIC LOGIC */
/* ================================= */
let musicPlaying = false;

function fadeAudio(targetVolume, duration = 2000) {
  if (!music) return;
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

if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (!musicPlaying) {
      if (music) music.play().catch(() => {});
      fadeAudio(1);
      musicPlaying = true;
      musicBtn.innerHTML = "❚❚";
    } else {
      fadeAudio(0, 800);
      setTimeout(() => {
        if (music) music.pause();
      }, 900);
      musicPlaying = false;
      musicBtn.innerHTML = "♫";
    }
  });
}

/* ================================= */
/* INITIAL STATES */
/* ================================= */
if (heroSection) {
  gsap.set(heroSection, {
    opacity: 0,
    y: 100
  });
}

/* ================================= */
/* OPEN ENVELOPE ANIMATION */
/* ================================= */
if (seal) {
  seal.addEventListener("click", () => {
    // تفعيل التمرير مجدداً بعد الضغط على الختم
    document.body.classList.remove("no-scroll");
    if (lenis) lenis.start();

    if (music) {
      music.volume = 0;
      music.play().catch(() => {});
      fadeAudio(1);
      musicPlaying = true;
      if (musicBtn) musicBtn.innerHTML = "❚❚";
    }

    if (customBg) {
      customBg.classList.add("active");
    }

    const tl = gsap.timeline();

    seal.classList.add("gold-mode");

    tl.to(".seal-text", {
      scale: 1.25,
      duration: 0.3,
      ease: "back.out(2)"
    })
    .to(lightFlash, {
      opacity: 1,
      scale: 120,
      duration: 1,
      ease: "power2.inOut"
    })
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
}

/* ================================= */
/* SCROLL REVEALS & ANIMATIONS */
/* ================================= */

gsap.from(".story-image.image-1", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#heroSection",
    start: "top 80%"
  }
});

gsap.from(".engagement-section .image-right", {
  x: 100,
  y: 40,
  opacity: 0,
  duration: 1.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".engagement-section",
    start: "top 80%"
  }
});

gsap.from(".engagement-section .image-left", {
  x: -100,
  y: 40,
  opacity: 0,
  duration: 1.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".engagement-section",
    start: "top 80%"
  }
});

gsap.from(".katbelketab-section .image-right", {
  x: 100,
  y: 40,
  opacity: 0,
  duration: 1.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".katbelketab-section",
    start: "top 80%"
  }
});

gsap.from(".katbelketab-section .image-left", {
  x: -100,
  y: 40,
  opacity: 0,
  duration: 1.3,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".katbelketab-section",
    start: "top 80%"
  }
});

gsap.from(".henna-card", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  scrollTrigger: {
    trigger: ".henna-card",
    start: "top 80%"
  }
});

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

  const d = document.getElementById("days");
  const h = document.getElementById("hours");
  const m = document.getElementById("minutes");
  const s = document.getElementById("seconds");

  if (d) d.innerHTML = days;
  if (h) h.innerHTML = hours;
  if (m) m.innerHTML = minutes;
  if (s) s.innerHTML = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

gsap.from(".venue-card", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  scrollTrigger: {
    trigger: ".venue-card",
    start: "top 80%"
  }
});

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
if (calendarBtn) {
  calendarBtn.addEventListener("click", () => {
    const start = "20260817T200000";
    const end = "20260818T010000";
    const title = encodeURIComponent("حفل زفاف اسراء ومصطفى");
    const details = encodeURIComponent("قاعة بيلا فيتا - دمياط الجديدة");
    const location = encodeURIComponent("قاعة بيلا فيتا - دمياط الجديدة");

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

    window.open(url, "_blank");
  });
}