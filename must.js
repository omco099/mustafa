/* ================================= */
/* COUNTDOWN */
/* ================================= */
// تم تغيير التاريخ إلى 15 أغسطس
const weddingDate = new Date("2026-08-15T20:00:00"); 

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
/* CALENDAR */
/* ================================= */
const calendarBtn = document.getElementById("calendarBtn");

calendarBtn.addEventListener("click", () => {
  // تم تغيير التاريخ ليناسب 15 أغسطس
  const start = "20260815T200000";
  const end = "20260816T010000"; 
  
  // تم تغيير الأسماء في عنوان التقويم
  const title = encodeURIComponent("حفل زفاف إسراء ومصطفى");
  
  const details = encodeURIComponent("قاعة أوركيدا - رأس البر");
  const location = encodeURIComponent("قاعة أوركيدا - رأس البر");
  
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

  window.open(url, "_blank");
});