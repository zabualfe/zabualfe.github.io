const experienceData = [
  {
    title: "Capstone Project Engineer",
    company: "Amazon",
    duration: "Jan 2025 - May 2025",
    tags: ["LLMs", "AWS", "Python", "OpenSearch"],
    description: "Built a cloud-native semantic code search system using Bedrock, OpenSearch, and custom embeddings."
  },
  {
    title: "Undergraduate Learner's Assistant",
    company: "Michigan State University",
    duration: "Jan 2023 - May 2024",
    tags: ["C++", "Mentorship", "Debugging"],
    description: "Guided 500+ students through programming concepts, code reviews, and debugging strategies."
  },
  {
    title: "Community Manager Intern",
    company: "Roblox",
    duration: "May 2023 - Aug 2023",
    tags: ["Community", "Onboarding", "Lua", "Engagement"],
    description: "Led the launch of Connect Hub and created onboarding tools to support Roblox creators."
  },
  {
    title: "Summer Accelerator Intern",
    company: "Roblox",
    duration: "May 2022 - Jul 2022",
    tags: ["Lua", "Frontend", "Backend"],
    description: "Developed a multiplayer prototype with gameplay logic, UI, and server systems in Lua."
  }
];

const experienceContainer = document.querySelector("#experience .card-grid");

experienceData.forEach(exp => {
  const li = document.createElement("li");
  li.className = "card clickable";

  li.innerHTML = `
    <h3>${exp.title}</h3>
    <div class="subtitle">${exp.company} · ${exp.duration}</div>
    <div class="tags">
      ${exp.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <div class="details">
      <p>${exp.description}</p>
    </div>
  `;

  experienceContainer.appendChild(li);
});
