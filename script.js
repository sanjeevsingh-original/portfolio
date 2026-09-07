const criticalVisibility = document.createElement("style");
criticalVisibility.textContent = `
  .reveal,
  .hero-copy,
  .hero-visual,
  .stats {
    opacity: 1 !important;
    visibility: visible !important;
    transform: none !important;
  }
`;
document.head.appendChild(criticalVisibility);

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

const heroActions = document.querySelector(".hero-actions");
if (heroActions && !document.querySelector(".research-profiles")) {
  const profiles = document.createElement("div");
  profiles.className = "research-profiles";
  profiles.setAttribute("aria-label", "Research profiles");
  profiles.innerHTML = `
    <span>RESEARCH PROFILES</span>
    <a href="https://scholar.google.com/citations?user=5njnkWgAAAAJ&hl=en" target="_blank" rel="noopener">Google Scholar ↗</a>
    <a href="https://orcid.org/0000-0000-6680-6531" target="_blank" rel="noopener">ORCID ↗</a>
    <a href="https://github.com/sanjeevsingh-original" target="_blank" rel="noopener">GitHub ↗</a>
  `;
  heroActions.insertAdjacentElement("afterend", profiles);
}

const toolkitTheme = document.createElement("link");
toolkitTheme.rel = "stylesheet";
toolkitTheme.href = "toolkit-dark.css";
document.head.appendChild(toolkitTheme);

const experienceEducationTheme = document.createElement("link");
experienceEducationTheme.rel = "stylesheet";
experienceEducationTheme.href = "experience-education.css";
document.head.appendChild(experienceEducationTheme);

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
