const WHATSAPP = "970595430191";

const modal = document.getElementById("bookingModal");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const toast = document.getElementById("toast");

function openBooking() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => modal.querySelector("input")?.focus(), 120);
}
function closeBooking() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

for (const trigger of document.querySelectorAll("[data-open-booking]")) {
  trigger.addEventListener("click", openBooking);
}
for (const trigger of document.querySelectorAll("[data-close-booking]")) {
  trigger.addEventListener("click", closeBooking);
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeBooking();
});

menuToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3200);
}

function goToWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.getElementById("quickBookingForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const message = [
    "السلام عليكم، أود طلب موعد في عيادة الدكتور محمود أبو بكر.",
    "",
    `الاسم: ${data.get("name")}`,
    `رقم الهاتف: ${data.get("phone")}`,
    `سبب الزيارة: ${data.get("service")}`,
    "",
    "أرجو التواصل معي لتأكيد الموعد."
  ].join("\n");
  showToast("تم تجهيز رسالة الحجز.");
  goToWhatsApp(message);
  closeBooking();
  e.currentTarget.reset();
});

document.getElementById("appointmentForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const notes = data.get("notes")?.trim();
  const message = [
    "السلام عليكم، أود طلب موعد في عيادة الدكتور محمود أبو بكر.",
    "",
    `الاسم: ${data.get("name")}`,
    `رقم الهاتف: ${data.get("phone")}`,
    `الخدمة المطلوبة: ${data.get("service")}`,
    `الوقت المفضل: ${data.get("time")}`,
    notes ? `ملاحظات: ${notes}` : "",
    "",
    "أرجو التواصل معي لتأكيد الموعد."
  ].filter(Boolean).join("\n");
  showToast("سيتم فتح واتساب لإرسال الطلب.");
  goToWhatsApp(message);
});

document.getElementById("year").textContent = new Date().getFullYear();

// Subtle reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in-view");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });

document.querySelectorAll(".service-card, .principle, .process-step, .detail-card, .featured-service").forEach((el) => observer.observe(el));
