function escapeHtmlProjects(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function buildProjectMediaHtml(media) {
  if (!media || !media.length) return "";
  const blocks = media.map((src) => {
    const safe = escapeHtmlProjects(src);
    if (/\.mp4$/i.test(src)) {
      return `<video class="project-item__video" controls playsinline preload="metadata" src="${safe}"></video>`;
    }
    if (/\.(png|jpg|jpeg|webp|gif)$/i.test(src)) {
      return `<button type="button" class="project-item__thumb" data-lightbox-role="thumb" aria-label="View larger">
        <img src="${safe}" alt="" loading="lazy" decoding="async" />
      </button>`;
    }
    return "";
  }).filter(Boolean);

  if (!blocks.length) return "";

  return `
    <div class="project-item__block">
      <p class="project-item__section-label">Media</p>
      <div class="project-item__gallery">
        ${blocks.join("")}
      </div>
    </div>
  `;
}

function buildProjectTechHtml(tech) {
  if (!tech || !tech.length) return "";
  const tags = tech.map((t) => `<span class="tech-tag">${escapeHtmlProjects(t)}</span>`).join("");
  return `
    <div class="project-item__block">
      <p class="project-item__section-label">Stack</p>
      <div class="project-item__tech tech-tags">${tags}</div>
    </div>
  `;
}

function buildProjectLinkHtml(link) {
  if (!link || link === "#") return "";
  const safe = escapeHtmlProjects(link);
  const gh = /github\.com/i.test(link);
  const label = gh ? "GitHub repository" : "Project link";
  const icon = gh
    ? '<i class="fab fa-github" aria-hidden="true"></i>'
    : '<i class="fas fa-external-link-alt" aria-hidden="true"></i>';
  return `
    <div class="project-item__block project-item__block--link">
      <a href="${safe}" class="project-item__link" target="_blank" rel="noopener noreferrer">
        ${icon}
        <span>${escapeHtmlProjects(label)}</span>
      </a>
    </div>
  `;
}

/* Timeline + accordion (same as experience); full detail lives in the expanded panel. */
const projectData = [
  {
    icon: "RS",
    title: "AI-Powered Recipe Sourcing Tool",
    subtitle: "Semantic search with live ingredient pricing",
    context: "Course project",
    duration: "May 2025 – Jun 2025",
    preview:
      "LLM-backed recipe retrieval over 100+ indexed recipes, paired with Kroger API pricing and product links.",
    tags: ["Python", "LLM", "Flask", "ChromaDB"],
    tech: ["Python", "Flask", "Ollama", "Llama3", "ChromaDB", "Git"],
    media: [],
    link: "#",
    bullets: [
      "Built an end-to-end semantic search platform with Ollama (Llama3) and ChromaDB, indexing 100+ recipes for natural-language queries and precise retrieval",
      "Integrated the Kroger API in Python with OAuth 2.0, request batching, and error recovery for real-time ingredient pricing, availability, and product links",
      "Shipped concept to MVP across three agile sprints using a modular stack (Flask backend, LLM parsing, batch pipelines) and user feedback to prioritize live data and resilience"
    ]
  },
  {
    icon: "SS",
    title: "Semantic Search for Code Assets",
    subtitle: "LLM-backed internal search",
    context: "Amazon Capstone",
    duration: "Jan 2025 - May 2025",
    preview:
      "Natural-language discovery for code and architecture assets with LLMs and OpenSearch.",
    tags: ["AWS", "LLMs", "Python"],
    tech: ["AWS", "Python", "LLMs", "Postman", "Docker", "LangChain", "Git", "GitLab"],
    media: ["project-assets/videos/SSVideo.mp4"],
    link: "#",
    bullets: [
      "Constructed a pipeline to parse and extract metadata from 1,000+ code assets (Python, JavaScript, C++), enabling semantic indexing for large-scale technical documentation",
      "Engineered vector embedding workflows using Amazon Bedrock and custom models, optimizing searchable representations of codeand architecture",
      "Deployed a cloud-native search platform (OpenSearch, Lambda, S3) with LLM-backed retrieval, improving code discovery accuracy by 35% and reducing latency"
    ]
  },
  {
    icon: "AP",
    title: "Active Park Assist System",
    subtitle: "Real-time APA simulation",
    context: "Course project",
    duration: "Aug 2024 - Nov 2024",
    preview: "Embedded APA spec, simulation, and HMI flows for assisted parking.",
    tags: ["Embedded", "Simulation", "UML"],
    tech: ["Embedded Systems", "Simulation", "UML"],
    media: [
      "project-assets/videos/APATitle.mp4",
      "project-assets/videos/APAScenario1.mp4",
      "project-assets/videos/APAScenario2.mp4"
    ],
    link: "#",
    bullets: [
      "UML-heavy SRS: use cases, states, domain model",
      "3D prototype: parallel, perpendicular, obstacle cases",
      "Sensor, VCS, and HMI logic in real time"
    ]
  },
  {
    icon: "BB",
    title: "2D Basketball Physics Engine",
    subtitle: "Physics-based gameplay",
    context: "Personal",
    duration: "Aug 2023 - Nov 2023",
    preview: "C++ physics, collisions, and scoring in a small playable prototype.",
    tags: ["C++", "Physics"],
    tech: ["C++", "Physics", "Rendering"],
    media: [],
    link: "https://github.com/zabualfe/2D-Basketball-Physics-Engine",
    bullets: [
      "Custom motion and collision in C++",
      "Scoring loop tied to physics events",
      "Playable 2D prototype"
    ]
  }
];

const projectsTimeline = document.querySelector("#projectsTimeline");

if (projectsTimeline) {
  projectData.forEach((proj, i) => {
    const panelId = `project-panel-${i}`;
    const triggerId = `project-trigger-${i}`;

    const li = document.createElement("li");
    li.className = "experience-item project-item";

    const bulletsHtml = (proj.bullets || [])
      .map((b) => `<li>${escapeHtmlProjects(b)}</li>`)
      .join("");

    const tagsHtml = proj.tags.map((t) => `<span class="tag">${escapeHtmlProjects(t)}</span>`).join("");

    const previewBody =
      proj.preview && String(proj.preview).trim()
        ? escapeHtmlProjects(String(proj.preview).trim())
        : "";

    const previewRowHtml = previewBody
      ? `<div class="experience-item__trigger-preview"><p class="experience-item__preview">${previewBody}</p></div>`
      : "";

    const ini = escapeHtmlProjects(proj.icon || "PR");
    const brandHtml = `<span class="experience-item__brand" aria-hidden="true"><span class="experience-item__brand-fallback">${ini}</span></span>`;

    const meta = `${proj.context} · ${proj.duration}`;

    const subtitleHtml =
      proj.subtitle && String(proj.subtitle).trim()
        ? `<p class="project-item__subtitle">${escapeHtmlProjects(String(proj.subtitle).trim())}</p>`
        : "";

    const techHtml = buildProjectTechHtml(proj.tech);
    const mediaHtml = buildProjectMediaHtml(proj.media);
    const linkHtml = buildProjectLinkHtml(proj.link);

    li.innerHTML = `
      <div class="experience-item__marker" aria-hidden="true">
        <span class="experience-item__dot"></span>
      </div>
      <div class="experience-item__content">
        <button type="button" class="experience-item__trigger" id="${triggerId}" aria-expanded="false" aria-controls="${panelId}">
          <div class="experience-item__trigger-top">
            ${brandHtml}
            <div class="experience-item__headlines">
              <span class="experience-item__title">${escapeHtmlProjects(proj.title)}</span>
              <span class="experience-item__meta">${escapeHtmlProjects(meta)}</span>
              <span class="experience-item__tags">${tagsHtml}</span>
            </div>
            <span class="experience-item__chevron" aria-hidden="true"></span>
          </div>
          ${previewRowHtml}
        </button>
        <div class="experience-item__panel project-item__panel" id="${panelId}" role="region" aria-labelledby="${triggerId}" hidden>
          ${subtitleHtml}
          ${techHtml}
          <div class="project-item__block">
            <p class="project-item__section-label">Highlights</p>
            <ul class="experience-item__bullets project-item__bullets">
              ${bulletsHtml}
            </ul>
          </div>
          ${mediaHtml}
          ${linkHtml}
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

    const imageSources = (proj.media || []).filter((s) =>
      /\.(png|jpg|jpeg|webp|gif)$/i.test(s)
    );
    panel.querySelectorAll(".project-item__thumb[data-lightbox-role]").forEach((btn, thumbIdx) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window.openProjectLightbox === "function") {
          window.openProjectLightbox(imageSources, thumbIdx);
        }
      });
    });

    projectsTimeline.appendChild(li);
  });
}
