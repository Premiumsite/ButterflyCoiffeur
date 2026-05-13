const loader = document.getElementById("loader");

setTimeout(() => {
  if(loader){
    loader.classList.add("hide");
  }
}, 1200);

window.addEventListener("load", () => {
  if(loader){
    loader.classList.add("hide");
  }
});

const topbar = document.getElementById("topbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const current = window.scrollY;

  if(current > lastScroll && current > 160){
    topbar.classList.add("hide");
  }else{
    topbar.classList.remove("hide");
  }

  lastScroll = current;
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if(target){
      event.preventDefault();
      target.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });
    }
  });
});

const petals = document.getElementById("petals");
const petalAmount = window.innerWidth < 768 ? 18 : 38;

for(let i = 0; i < petalAmount; i++){
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.style.left = Math.random() * 110 + "%";
  petal.style.animationDuration = (5 + Math.random() * 8) + "s";
  petal.style.animationDelay = Math.random() * 8 + "s";
  petal.style.opacity = (0.18 + Math.random() * 0.62).toString();
  petal.style.transform = `rotate(${Math.random() * 180}deg)`;
  petals.appendChild(petal);
}

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
}, {
  threshold:0.16
});

reveals.forEach((item) => revealObserver.observe(item));

const counters = document.querySelectorAll("[data-count]");
let counterStarted = false;

function runCounters(){
  if(counterStarted) return;

  const trigger = document.querySelector(".hero-stats");

  if(!trigger) return;

  const rect = trigger.getBoundingClientRect();

  if(rect.top < window.innerHeight - 80){
    counterStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.count);
      let current = 0;
      const increment = Math.max(1, target / 70);

      const timer = setInterval(() => {
        current += increment;

        if(current >= target){
          counter.textContent = target;
          clearInterval(timer);
        }else{
          counter.textContent = Math.ceil(current);
        }
      }, 18);
    });
  }
}

window.addEventListener("scroll", runCounters);
runCounters();

const glow = document.getElementById("cursorGlow");

window.addEventListener("mousemove", (event) => {
  if(!glow) return;
  glow.style.left = event.clientX + "px";
  glow.style.top = event.clientY + "px";
});

document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("canplay", () => {
    video.play().catch(() => {});
  });
});