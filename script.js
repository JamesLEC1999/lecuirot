// ====== CONFIG: change this ======
const EMAIL = "james@lecuirot.je"; // <- replace with your real email

// ====== Helpers ======
function setEmailEverywhere() {
  const emailLink = document.getElementById("emailLink");
  const emailButton = document.getElementById("emailButton");

  if (emailLink) {
    emailLink.textContent = EMAIL;
    emailLink.href = `mailto:${EMAIL}`;
  }
  if (emailButton) {
    emailButton.href = `mailto:${EMAIL}`;
  }
}

async function copyEmail(statusEl) {
  try {
    await navigator.clipboard.writeText(EMAIL);
    if (statusEl) statusEl.textContent = "Email copied to clipboard ✅";
  } catch {
    // Fallback prompt if clipboard permissions block
    if (statusEl) statusEl.textContent = "Copy failed — please copy manually.";
    window.prompt("Copy this email:", EMAIL);
  } finally {
    if (statusEl) {
      setTimeout(() => (statusEl.textContent = ""), 2500);
    }
  }
}

// ====== Mobile nav toggle ======
function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector("[data-nav-mobile]");

  if (!toggle || !mobileNav) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.hidden = isOpen;
  });

  // Close menu when a link is clicked
  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileNav.hidden = true;
    });
  });
}

// ====== Init ======
document.addEventListener("DOMContentLoaded", () => {
  // Year in footer
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  setEmailEverywhere();
  setupMobileNav();

  // Copy buttons
  const statusEl = document.getElementById("copyStatus");
  const btn1 = document.getElementById("copyEmailBtn");
  const btn2 = document.getElementById("copyEmailBtn2");

  if (btn1) btn1.addEventListener("click", () => copyEmail(statusEl));
  if (btn2) btn2.addEventListener("click", () => copyEmail(statusEl));
});
