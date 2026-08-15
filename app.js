/* ==========================================================================
   WEDDING INVITATION - JAVASCRIPT LOGIC
   Handles Wax Seal Opening, Scroll Reveals, Countdown Timer & RSVP Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    const sealButton = document.getElementById('sealButton');
    const sealOverlay = document.getElementById('seal-overlay');
    const mainContent = document.getElementById('mainContent');

    // ==================== 1. WAX SEAL OPENING ANIMATION ====================
    sealButton.addEventListener('click', () => {
        // Trigger opening animation on seal
        sealOverlay.classList.add('seal-open');

        // Fade out overlay and reveal main content smoothly
        setTimeout(() => {
            sealOverlay.classList.add('fade-out');
            mainContent.classList.add('visible');
            
            // Initialize Scroll Reveal Animations after content is revealed
            initScrollReveal();
        }, 800);
    });

    // ==================== 2. COUNTDOWN TIMER (17 AUGUST 2026) ====================
    const weddingDate = new Date('August 17, 2026 18:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        } else {
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // ==================== 3. SCROLL REVEAL (IntersectionObserver) ====================
    function initScrollReveal() {
        const observerOptions = {
            root: null,
            threshold: 0.12
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target); // Reveal once
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));
    }

    // ==================== 4. RSVP MODAL HANDLERS ====================
    const openRsvpBtn = document.getElementById('openRsvpModal');
    const closeRsvpBtn = document.getElementById('closeRsvpModal');
    const rsvpModal = document.getElementById('rsvpModal');
    const rsvpForm = document.getElementById('rsvpForm');

    openRsvpBtn.addEventListener('click', () => {
        rsvpModal.classList.add('active');
    });

    closeRsvpBtn.addEventListener('click', () => {
        rsvpModal.classList.remove('active');
    });

    rsvpModal.addEventListener('click', (e) => {
        if (e.target === rsvpModal) {
            rsvpModal.classList.remove('active');
        }
    });

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for confirming your attendance!');
        rsvpModal.classList.remove('active');
        rsvpForm.reset();
    });
});