const talksData = [
  {
    title: "Why Adding Accessibility Is Impactful to the User Experience | RDC24",
    about: "Explores accessibility for visual, hearing, and physical disabilities, with settings that improve user experience.",
    youtube: "https://www.youtube.com/embed/_4h7SzlhhRU"
  },
  {
    title: "Introduction to Programming",
    about: "Roblox Global Developer Challenge workshop on programming basics: variables, loops, functions, and related fundamentals.",
    youtube: "https://www.youtube.com/embed/cvUSE2Q0hcw"
  },
  {
    title: "Designing for Accessibility",
    about: "Panel on designing accessible experiences for users with physical disabilities.",
    youtube: "https://www.youtube.com/embed/K1pEI6LVJJA"
  }
];

const talksContainer = document.getElementById("talksContainer");

talksData.forEach((talk, index) => {
  const li = document.createElement("li");
  li.className = "card talk-card";
  li.setAttribute("data-talk", String(index));
  li.setAttribute("role", "button");
  li.setAttribute("tabindex", "0");
  li.setAttribute("aria-expanded", "false");
  li.innerHTML = `
    <h3>${talk.title}</h3>
    <p class="talk-description">${talk.about}</p>
    <p class="talk-card__hint">
      <span class="talk-card__hint-collapsed">Click to show video</span>
      <span class="talk-card__hint-expanded">Click to hide video</span>
    </p>
    <div class="talk-video-panel">
      <div class="talk-video-wrap">
        <iframe class="talk-video-frame" data-src="${talk.youtube}" title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen loading="lazy"></iframe>
      </div>
    </div>
  `;

  function toggleTalk() {
    const opening = !li.classList.contains("open");
    li.classList.toggle("open");
    li.setAttribute("aria-expanded", opening ? "true" : "false");
    const iframe = li.querySelector(".talk-video-frame");
    if (opening) {
      if (iframe && iframe.dataset.src && !iframe.getAttribute("src")) {
        iframe.src = iframe.dataset.src;
      }
    } else if (iframe) {
      iframe.removeAttribute("src");
    }
  }

  li.addEventListener("click", toggleTalk);
  li.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleTalk();
    }
  });

  talksContainer.appendChild(li);
});
