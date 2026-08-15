/* ================================= */
/* GSAP */
/* ================================= */

gsap.registerPlugin(ScrollTrigger);

/* ================================= */
/* LENIS */
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

/* ================================= */
/* MUSIC */
/* ================================= */

let musicPlaying = false;

function fadeAudio(targetVolume, duration = 2000) {

  const startVolume = music.volume;
  const steps = 40;

  let current = 0;

  const interval = setInterval(() => {

    current++;

    music.volume =
      startVolume +
      ((targetVolume - startVolume) * current / steps);

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

/* ================================= /
/ OPEN ENVELOPE /
/ ================================= */

seal.addEventListener("click", () => {

music.volume = 0;

music.play();

fadeAudio(1);

musicPlaying = true;

musicBtn.innerHTML = "❚❚";

const tl = gsap.timeline();

tl.to(seal,{
scale:0,
rotation:180,
opacity:0,
duration:.6,
ease:"back.in"
})

.to(flap,{
rotateX:-180,
duration:1,
ease:"power3.inOut"
},"-=0.2")

.to(letter,{
opacity:1,
y:-220,
duration:1.4,
ease:"power4.out"
},"-=0.3")

.to(".basmala",{
  opacity:1,
  y:0,
  duration:.8,
  ease:"power3.out"
})

.to(scrollIndicator,{
opacity:1,
duration:.8
})

.to(envelope,{
opacity:0,
scale:.9,
duration:.8
},"-=0.5")

.to(heroSection,{
opacity:1,
y:0,
duration:1.2,
ease:"power3.out"
},"-=0.2");

});

/* ================================= */
/* HEART PULSE */
/* ================================= */

gsap.to(".heart", {

  scale: 1.2,

  duration: 1.2,

  repeat: -1,

  yoyo: true,

  ease: "power1.inOut"

});

gsap.to(".final-heart", {

  scale: 1.15,

  duration: 1.3,

  repeat: -1,

  yoyo: true

});

/* ================================= */
/* HERO NAMES */
/* ================================= */

gsap.from(".bride-name", {

  x: 120,

  opacity: 0,

  duration: 1.5,

  scrollTrigger: {

    trigger: ".hero-section",

    start: "top 70%"

  }

});

gsap.from(".groom-name", {

  x: -120,

  opacity: 0,

  duration: 1.5,

  scrollTrigger: {

    trigger: ".hero-section",

    start: "top 70%"

  }

});

/* ================================= */
/* HERO GLOW */
/* ================================= */

gsap.to(".hero-glow", {

  scale: 1.2,

  duration: 3,

  repeat: -1,

  yoyo: true

});

/* ================================= */
/* ENGAGEMENT IMAGES */
/* ================================= */

gsap.from(".image-right", {

  x: 120,

  y: 50,

  opacity: 0,

  duration: 1.4,

  ease: "power3.out",

  scrollTrigger: {

    trigger: ".image-right",

    start: "top 80%"

  }

});

gsap.from(".image-left", {

  x: -120,

  y: 50,

  opacity: 0,

  duration: 1.4,

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

  y: 100,

  opacity: 0,

  duration: 1.4,

  scrollTrigger: {

    trigger: ".henna-card",

    start: "top 80%"

  }

});

/* ================================= */
/* COUNTDOWN */
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

/* ================================= */
/* VENUE */
/* ================================= */

gsap.from(".venue-card", {

  y: 100,

  opacity: 0,

  duration: 1.3,

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

  y: 100,

  duration: 1.5,

  scrollTrigger: {

    trigger: ".final-section",

    start: "top 70%"

  }

});

/* ================================= */
/* PARTICLES */
/* ================================= */

document
.querySelectorAll(".floating-particles span")
.forEach((particle, index) => {

  gsap.to(particle, {

    y: -80,

    duration: 4 + index,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

  });

});

/* ================================= */
/* COUNTDOWN */
/* ================================= */

const weddingDate =
new Date("2026-07-08T20:00:00");

function updateCountdown() {

  const now = new Date();

  const diff = weddingDate - now;

  if (diff <= 0) return;

  const days =
    Math.floor(diff / (1000 * 60 * 60 * 24));

  const hours =
    Math.floor(
      (diff / (1000 * 60 * 60)) % 24
    );

  const minutes =
    Math.floor(
      (diff / (1000 * 60)) % 60
    );

  const seconds =
    Math.floor(
      (diff / 1000) % 60
    );

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

}

updateCountdown();

setInterval(updateCountdown, 1000);

/* ================================= */
/* CALENDAR */
/* ================================= */

const calendarBtn =
document.getElementById("calendarBtn");

calendarBtn.addEventListener("click", () => {

  const start =
    "20260708T200000";

  const end =
    "20260709T010000";

  const title =
    encodeURIComponent(
      "حفل زفاف مريم وحسن"
    );

  const details =
    encodeURIComponent(
      "قاعة أوركيدا - رأس البر"
    );

  const location =
    encodeURIComponent(
      "قاعة أوركيدا - رأس البر"
    );

  const url =
`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

  window.open(url, "_blank");

});
/* ================================= */
/* EXTRA ELEMENTS */
/* ================================= */

const envelope =
document.getElementById("envelope");

const heroSection =
document.getElementById("heroSection");

/* ================================= */
/* HERO INITIAL STATE */
/* ================================= */

gsap.set(heroSection,{
opacity:0,
y:100
});
/* ================================= */
/* BASMALA TEXT */
/* ================================= */

gsap.from(".basmala",{

  opacity:0,

  y:20,

  duration:1,

  ease:"power3.out"

});
