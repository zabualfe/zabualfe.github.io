document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card.clickable");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });

  const fadeIns = document.querySelectorAll(".fade-in");
  fadeIns.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.2}s`;
    el.classList.add("animate");
  });

  const phrases = ["Software Engineer", "Backend Developer", "System Designer", "College Graduate", "Creator"];
  let index = 0;
  let charIndex = 0;
  let typing = true;
  const speed = 100;
  const delay = 1500;
  const element = document.getElementById("typewriter");

  function typeLoop() {
    const base = "I'm a ";
    const current = base + phrases[index];

    if (typing) {
      if (charIndex < current.length) {
        element.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeLoop, speed);
      } else {
        typing = false;
        setTimeout(typeLoop, delay);
      }
    } else {
      if (charIndex > 0) {
        element.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeLoop, speed / 2);
      } else {
        typing = true;
        index = (index + 1) % phrases.length;
        setTimeout(typeLoop, 300);
      }
    }
  }

  if (element) {
    typeLoop();
  }
});

