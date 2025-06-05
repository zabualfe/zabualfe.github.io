const talksData = [
  {
    title: "Why Adding Accessibility Is Impactful to the User Experience | RDC24",
    about: "Adding accessibility to experiences is important. My talk discussed different umbrella areas of accessibility- visual, hearing, and physical disabilities- and examples of ways to integrate settings and why those settings improve the user experience.",
    youtube: "https://www.youtube.com/embed/_4h7SzlhhRU"
  },
  {
    title: "Introduction to Programming",
    about: "I had the opportunity to host a workshop for Roblox's Global Developer Challenge. During this session, I introduced participants to programming fundamentals, covering key topics such as variables, loops, functions, etc. It was an incredible experience to contribute to the growth of our global developer community.",
    youtube: "https://www.youtube.com/embed/cvUSE2Q0hcw"
  },
  {
    title: "Designing for Accessibility",
    about: "I had the opportunity speak on a panel about designing accessibilty in experiences for those with physical disabilities.",
    youtube: "https://www.youtube.com/embed/K1pEI6LVJJA"
  }
];

const talksContainer = document.getElementById("talksContainer");

talksData.forEach((talk, index) => {
  const li = document.createElement("li");
  li.className = "card clickable";
  li.setAttribute("data-talk", index);
  li.innerHTML = `
    <h3>${talk.title}</h3>
    <div class="subtitle">Click to watch</div>
    <div class="details"><p>${talk.about}</p></div>
  `;
  talksContainer.appendChild(li);
});

document.querySelectorAll("#talksContainer .card").forEach(card => {
  card.addEventListener("click", () => {
    const index = card.getAttribute("data-talk");
    const talk = talksData[index];

    modalIcon.innerHTML = "🎤";
    modalTitle.textContent = talk.title;
    modalSubtitle.textContent = "Talk / Presentation";
    modalTech.innerHTML = "";
    modalGallery.style.display = "none";
    modalImages.innerHTML = "";

    modalLinks.style.display = "none";
    modalSTAR.innerHTML = `
      <div class="modal-section">
        <p><strong>About:</strong> ${talk.about}</p>
        <div style="margin-top: 1rem;">
          <iframe width="100%" height="315" src="${talk.youtube}" title="YouTube video" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen style="border-radius: 0.5rem;"></iframe>
        </div>
      </div>
    `;

    showModal();
  });
});
