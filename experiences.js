function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function safeIconClass(classStr) {
  if (typeof classStr !== "string") return "";
  return classStr.replace(/[^a-zA-Z0-9\s\-]/g, "").trim().slice(0, 120);
}

function initialsFromCompany(company) {
  const parts = String(company || "")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2);
  }
  return String(company || "?")
    .slice(0, 2)
    .toUpperCase();
}

/** Optional: `companyIconUrl` (image), or `companyIconClass` (e.g. fab fa-amazon), else initials from `company`. */
function buildCompanyBrandHtml(exp) {
  const url = exp.companyIconUrl && String(exp.companyIconUrl).trim();
  if (url) {
    const safeUrl = escapeHtml(url);
    const alt = escapeHtml(exp.company || "Company");
    return `<span class="experience-item__brand"><span class="experience-item__brand-img-wrap"><img class="experience-item__brand-img" src="${safeUrl}" alt="${alt} logo" loading="lazy" decoding="async" /></span></span>`;
  }
  const cls = safeIconClass(exp.companyIconClass || "");
  if (cls) {
    return `<span class="experience-item__brand" aria-hidden="true"><span class="experience-item__brand-icon"><i class="${cls}"></i></span></span>`;
  }
  const ini = escapeHtml(initialsFromCompany(exp.company));
  return `<span class="experience-item__brand" aria-hidden="true"><span class="experience-item__brand-fallback">${ini}</span></span>`;
}

/* Each entry may include:
 *   companyIconUrl — path under site root, e.g. project-assets/company-logos/amazon.jpeg
 *   companyIconClass — Font Awesome classes (used only if companyIconUrl is omitted)
 *   (omit both) — two-letter initials from `company`
 * Logos in project-assets/company-logos/: amazon, michigan_state_university, roblox, capital_one */
const experienceData = [
  {
    title: "Associate Software Engineer",
    company: "Capital One",
    companyIconUrl: "project-assets/company-logos/capital_one.jpeg",
    duration: "Feb 2026 - Present",
    preview:
      "Participating in Capital One's Technology Development Program (TDP) to build and scale new features for Capital One's products",
    tags: ["AWS", "Full-Stack", "JavaScript", "Java"],
    bullets: [
    ],
  },
  {
    title: "Capstone Backend Engineer",
    company: "Amazon",
    companyIconUrl: "project-assets/company-logos/amazon.jpeg",
    duration: "Jan 2025 - May 2025",
    preview:
      "Michigan State University Capstone Project: Built an AWS Bedrock-powered semantic pipeline, boosting search accuracy to 85% and enabling scalable indexing of 1,500+ assets",
    tags: ["LLMs", "AWS", "Python", "OpenSearch"],
    bullets: [
      "Designed a pipeline using AWS S3 and Amazon Bedrock to parse and extract metadata from 1,500+ Python, JavaScript, and C++ assets in under 5 minutes, enabling scalable semantic indexing",
      "Constructed vector embedding workflows via Amazon Bedrock, including a custom chunking system that improved semantic search relevancy from 55% to 85% by intelligently segmenting technical content into meaningful units for embedding",
      "Drove engineering quality for a 5-person agile team by managing GitHub codebase, leading sprints, enforcing pull request reviews, adopting best practices, and setting up CI/CD pipelines"
    ],
  },
  {
    title: "Undergraduate Learner's Assistant",
    company: "Michigan State University",
    companyIconUrl: "project-assets/company-logos/michigan_state_university.jpeg",
    duration: "Jan 2023 - May 2024",
    preview:
      "Mentored students in C++ and software design, providing support that strengthened their coding skills and understanding of key concepts",
    tags: ["C++", "Mentorship", "Debugging"],
    bullets: [
      "Mentored over 500 undergraduate students by delivering hands-on code reviews, debugging support, and conceptual guidance on object-oriented programming principles",
      "Led structured lab sessions and individualized assistance to reinforce core topicssuch as memory management, inheritance hierarchies, and modular function design",
      "Elevated student comprehension and code quality by clarifying complex language features and guiding effective software design practices"
    ],
  },
  {
    title: "Community Manager Intern",
    company: "Roblox",
    companyIconUrl: "project-assets/company-logos/roblox.jpeg",
    duration: "May 2023 - Aug 2023",
    preview:
      "Worked with international teams and creators to improve development and expand creator engagement on Roblox",
    tags: ["Community", "Onboarding", "Lua", "Engagement"],
    bullets: [
      "Directed the creation of the Connect Hub to facilitate networking among 100,000+ creators for the Connect 2023 event, executing weekly sprints and QA testing, resulting in a 20% increase in event participation",
      "Identified gaps in creator education across regions and launched a multilingual training program focused on game development fundamentals, piloting the initiative in the Portuguese developer community and generating 20+ valid submissions in the first week, which broadened creator engagement globally",
    ],
  },
  {
    title: "Summer Accelerator Intern",
    company: "Roblox",
    companyIconUrl: "project-assets/company-logos/roblox.jpeg",
    duration: "May 2022 - Jul 2022",
    preview:
      "Programmed a 0 to 1 multiplayer experience with a small team in 12 weeks, building scalable systems and improving performance",
    tags: ["Lua", "Frontend", "Backend"],
    bullets: [
      "Engineered both frontend and backend systems in Lua to support a multiplayer gameplay prototype, improving real-time responsiveness and overall server performance",
      "Partnered with a 5-person team to architect, implement, and debug modular systems, ensuring scalable client-server communication and feature extensibility",
      "Delivered a fully functional multiplayer prototype within aggressive deadlines, establishing a foundation for future iteration and external community testing",
    ],
  },
];

const experienceContainer = document.querySelector("#experienceTimeline");

if (experienceContainer) {
  experienceData.forEach((exp, i) => {
    const panelId = `experience-panel-${i}`;
    const triggerId = `experience-trigger-${i}`;

    const li = document.createElement("li");
    li.className = "experience-item";

    const bulletsHtml = (exp.bullets || [])
      .map((b) => `<li>${escapeHtml(b)}</li>`)
      .join("");

    const tagsHtml = exp.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");

    const previewBody =
      exp.preview && String(exp.preview).trim()
        ? escapeHtml(String(exp.preview).trim())
        : "";

    const previewRowHtml = previewBody
      ? `<div class="experience-item__trigger-preview"><p class="experience-item__preview">${previewBody}</p></div>`
      : "";

    const brandHtml = buildCompanyBrandHtml(exp);

    li.innerHTML = `
      <div class="experience-item__marker" aria-hidden="true">
        <span class="experience-item__dot"></span>
      </div>
      <div class="experience-item__content">
        <button type="button" class="experience-item__trigger" id="${triggerId}" aria-expanded="false" aria-controls="${panelId}">
          <div class="experience-item__trigger-top">
            ${brandHtml}
            <div class="experience-item__headlines">
              <span class="experience-item__title">${escapeHtml(exp.title)}</span>
              <span class="experience-item__meta">${escapeHtml(exp.company)} · ${escapeHtml(exp.duration)}</span>
              <span class="experience-item__tags">${tagsHtml}</span>
            </div>
            <span class="experience-item__chevron" aria-hidden="true"></span>
          </div>
          ${previewRowHtml}
        </button>
        <div class="experience-item__panel" id="${panelId}" role="region" aria-labelledby="${triggerId}" hidden>
          <ul class="experience-item__bullets">
            ${bulletsHtml}
          </ul>
        </div>
      </div>
    `;

    const trigger = li.querySelector(".experience-item__trigger");
    const panel = li.querySelector(".experience-item__panel");

    trigger.addEventListener("click", () => {
      const open = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", open ? "false" : "true");
      li.classList.toggle("is-open", !open);
      panel.hidden = open;
    });

    experienceContainer.appendChild(li);
  });
}
