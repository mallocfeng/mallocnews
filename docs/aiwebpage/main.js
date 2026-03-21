const header = document.querySelector("[data-header]");
const revealNodes = document.querySelectorAll("[data-reveal]");

const syncHeaderState = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -8% 0px",
  },
);

revealNodes.forEach((node, index) => {
  node.style.transitionDelay = `${Math.min(index * 45, 220)}ms`;
  revealObserver.observe(node);
});

window.addEventListener("scroll", syncHeaderState, { passive: true });
syncHeaderState();

/*
Future animation direction:
Use GSAP + ScrollTrigger for section timelines, pinned hero treatments,
and staggered card choreography. This page is structured with semantic
sections and reveal hooks so the migration is straightforward.
*/
