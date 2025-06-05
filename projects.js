const projectData = [
  {
    title: "Semantic Search for Code Assets and Architecture",
    duration: "Jan 2025 - May 2025",
    tags: ["AWS", "LLMs", "Python", "Cloud-Native"],
    description: "Engineered the backend system for searching for code assets using LLMs.",
    key: "semanticsearch"
  },
  {
    title: "Tower Defense Game",
    duration: "May 2025",
    tags: ["Lua", "Object-Oriented Programming", "DevOps", "GitHub"],
    description: "Programmmed a tower defense experience using Lua.",
    key: "cosmicdefenders"
  },
  {
    title: "Ballin",
    duration: "May 2024 - July 2024",
    tags: ["Lua", "Object-Oriented Programming", "DevOps", "GitHub"],
    description: "Programmmed a ball that user's can control to complete obstacle courses using Lua.",
    key: "ballin"
  },
  {
    title: "Active Park Assist System",
    duration: "Aug 2024 - Nov 2024",
    tags: ["Embedded Systems", "Simulation", "UML"],
    description: "Designed and simulated an APA system with real-time obstacle detection and override logic.",
    key: "apa"
  },
  {
    title: "2D Basketball Physics Engine",
    duration: "Aug 2023 - Nov 2023",
    tags: ["C++", "Physics", "Rendering"],
    description: "Created a C++ engine to simulate scoring, physics, and collision-based gameplay for 2D basketball.",
    key: "basketball"
  }
];

const projectContainer = document.querySelector("#projects .card-grid");

projectData.forEach(proj => {
  const li = document.createElement("li");
  li.className = "card clickable";

  li.innerHTML = `
    <h3>${proj.title}</h3>
    <div class="subtitle">${proj.duration}</div>
    <div class="tags">
      ${proj.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <div class="details">
      <p>${proj.description}</p>
      <a href="#" class="learn-more-button" data-project="${proj.key}">Learn More</a>
    </div>
  `;

  projectContainer.appendChild(li);
});
