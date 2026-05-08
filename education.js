/**
 * Education tab: one card per school. Data drives markup (same idea as experiences.js).
 *
 * Each entry may include:
 *   schoolIconUrl — e.g. project-assets/company-logos/michigan_state_university.jpeg
 *   schoolIconClass — Font Awesome classes (only if schoolIconUrl is omitted)
 *   (omit both) — two-letter initials from `school`
 */

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function safeIconClass(classStr) {
  if (typeof classStr !== "string") return "";
  return classStr.replace(/[^a-zA-Z0-9\s\-]/g, "").trim().slice(0, 120);
}

function initialsFromSchool(school) {
  const parts = String(school || "")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2);
  }
  return String(school || "?")
    .slice(0, 2)
    .toUpperCase();
}

function buildSchoolBrandHtml(edu) {
  const url = edu.schoolIconUrl && String(edu.schoolIconUrl).trim();
  if (url) {
    const safeUrl = escapeHtml(url);
    const alt = escapeHtml(edu.school || "School");
    return `<div class="education-card__brand"><img class="education-card__logo" src="${safeUrl}" alt="${alt} logo" width="96" height="96" loading="lazy" decoding="async" /></div>`;
  }
  const cls = safeIconClass(edu.schoolIconClass || "");
  if (cls) {
    return `<div class="education-card__brand education-card__brand--icon" aria-hidden="true"><span class="education-card__logo-fallback"><i class="${cls}"></i></span></div>`;
  }
  const ini = escapeHtml(initialsFromSchool(edu.school));
  return `<div class="education-card__brand" aria-hidden="true"><span class="education-card__logo-fallback">${ini}</span></div>`;
}

const educationData = [
  {
    school: "Michigan State University",
    schoolIconUrl: "project-assets/company-logos/michigan_state_university.jpeg",
    degree: "B.S. in Computer Science",
    start: { datetime: "2022-09", label: "Sep 2022" },
    end: { datetime: "2025-05", label: "May 2025" },
    highlights: ["Dean's List", "Pre-Law Cognate"],
    courses: [
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Systems",
      "Computer Systems & Networking",
      "Web Development",
      "Software Engineering",
      "Machine Learning",
      "Calculus I, II, & III",
      "Linear Algebra",
    ],
  },
];

function renderEducation() {
  const list = document.getElementById("educationList");
  if (!list) return;

  educationData.forEach((edu) => {
    const brandHtml = buildSchoolBrandHtml(edu);

    const highlights = edu.highlights || [];
    const highlightsHtml = highlights
      .map((h) => `<li class="education-card__highlight">${escapeHtml(h)}</li>`)
      .join("");

    const highlightsBlock =
      highlights.length > 0
        ? `<ul class="education-card__highlights" aria-label="Academic highlights">${highlightsHtml}</ul>`
        : "";

    const courses = edu.courses || [];
    const coursesHtml = courses
      .map((c) => `<span class="education-course-tag">${escapeHtml(c)}</span>`)
      .join("");

    const coursesBlock =
      courses.length > 0
        ? `<div class="education-card__courses">
        <h4 class="education-card__courses-title">Relevant coursework</h4>
        <div class="education-card__course-tags">${coursesHtml}</div>
      </div>`
        : "";

    const start = edu.start || {};
    const end = edu.end || {};
    const startDt = start.datetime ? ` datetime="${escapeHtml(start.datetime)}"` : "";
    const endDt = end.datetime ? ` datetime="${escapeHtml(end.datetime)}"` : "";

    const li = document.createElement("li");
    li.innerHTML = `
      <article class="card education-card">
        <div class="education-card__body">
          <div class="education-card__top">
            ${brandHtml}
            <div class="education-card__head">
              <h3 class="education-card__school">${escapeHtml(edu.school)}</h3>
              <p class="education-card__degree">${escapeHtml(edu.degree)}</p>
              <p class="education-card__dates">
                <time${startDt}>${escapeHtml(start.label || "")}</time>
                <span class="education-card__dates-sep" aria-hidden="true">-</span>
                <time${endDt}>${escapeHtml(end.label || "")}</time>
              </p>
            </div>
          </div>
          ${highlightsBlock}
          ${coursesBlock}
        </div>
      </article>
    `;

    list.appendChild(li);
  });
}

renderEducation();
