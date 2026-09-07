const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

const progress = document.querySelector("#progress");
if (progress) {
  const updateProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const scrolled = max > 0 ? (h.scrollTop / max) * 100 : 0;
    progress.style.width = `${scrolled}%`;
  };

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}
