document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const medallionSeal = document.getElementById("medallionSeal");
  const lightOverlay = document.getElementById("lightOverlay");
  const envelopeScene = document.getElementById("envelopeScene");
  const mainInvitation = document.getElementById("mainInvitation");
  const music = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicToggle");

  // GSAP Setup
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Smooth Scroll (Lenis)
  if (typeof Lenis !== "undefined") {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Music Play/Pause Toggle
  let musicPlaying = false;

  function playAudio() {
    if (music) {
      music.play().then(() => {
        musicPlaying = true;
        if (musicBtn) musicBtn.innerHTML = "❚❚";
      }).catch(err => console.log("Audio play deferred:", err));
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      if (!musicPlaying) {
        playAudio();
      } else {
        music.pause();
        musicPlaying = false;
        musicBtn.innerHTML = "♫";
      }
    });
  }

  // Medallion Click Event Trigger
  if (medallionSeal) {
    medallionSeal.addEventListener("click", () => {
      // Start Playing Audio
      playAudio();

      // Fallback if GSAP is missing
      if (typeof gsap === "undefined") {
        if (envelopeScene) envelopeScene.style.display = "none";
        if (mainInvitation) {
          mainInvitation.style.display = "block";
          mainInvitation.style.opacity = "1";
        }
        return;
      }

      // GSAP Reveal Sequence
      const tl = gsap.timeline();

      tl.to(medallionSeal, {
        scale: 1.15,
        filter: "brightness(1.8) drop-shadow(0 0 20px #ffd700)",
        duration: 0.4,
        ease: "power2.out"
      })
      .to(lightOverlay, {
        opacity: 1,
        scale: 25,
        duration: 1.1,
        ease: "power3.in"
      }, "-=0.1")
      .set(envelopeScene, { display: "none" })
      .set(mainInvitation, { display: "block", opacity: 1 })
      .to(lightOverlay, {
        opacity: 0,
        duration: 1.0,
        ease: "power2.out"
      })
      .from(".hero-anim", {
        y: 25,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
        ease: "power3.out"
      }, "-=0.6");
    });
  }

  // Countdown Logic (15 August 2026)
  const targetDate = new Date("2026-08-15T20:00:00");
  function updateTimer() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) return;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    if (dEl) dEl.innerText = String(days).padStart(2, '0');
    if (hEl) hEl.innerText = String(hours).padStart(2, '0');
    if (mEl) mEl.innerText = String(minutes).padStart(2, '0');
    if (sEl) sEl.innerText = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
});