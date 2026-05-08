/**
 * Skills under Experience tab: icon + label chips with hover glow.
 * Icons: Devicon (class on <i>) or Font Awesome (fa: "fas fa-…").
 */

const skillsData = [
  {
    title: "Languages",
    items: [
      { label: "Python", devicon: "devicon-python-plain colored" },
      { label: "C/C++", devicon: "devicon-cplusplus-plain colored" },
      { label: "Lua", devicon: "devicon-lua-plain colored" },
      { label: "HTML", devicon: "devicon-html5-plain colored" },
      { label: "CSS", devicon: "devicon-css3-plain colored" },
      { label: "JavaScript", devicon: "devicon-javascript-plain colored" },
      { label: "Typescript", devicon: "devicon-typescript-plain colored" },
      { label: "SQL", devicon: "devicon-mysql-plain colored" },
      { label: "XML", fa: "fas fa-code" },
    ],
  },
  {
    title: "Frameworks/Operating Systems",
    items: [
      { label: "Flask", devicon: "devicon-flask-original colored" },
      { label: "Django", devicon: "devicon-django-plain colored" },
      { label: "LangChain", fa: "fas fa-link" },
      { label: "React.js", devicon: "devicon-react-original colored" },
      { label: "Linux/Unix", devicon: "devicon-linux-plain colored" },
    ],
  },
  {
    title: "DevOps/Tools",
    items: [
      { label: "Git", devicon: "devicon-git-plain colored" },
      { label: "GitHub", devicon: "devicon-github-original colored" },
      { label: "Jira", devicon: "devicon-jira-plain colored" },
      { label: "Docker", devicon: "devicon-docker-plain colored" },
      { label: "Postman", devicon: "devicon-postman-plain colored" },
      { label: "Amazon Web Services", devicon: "devicon-amazonwebservices-plain colored" },
      { label: "Microsoft Azure", devicon: "devicon-azure-plain colored" },
      { label: "Google Cloud Platform", devicon: "devicon-googlecloud-plain colored" },
      { label: "MongoDB", devicon: "devicon-mongodb-plain colored" },
    ],
  },
];

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function safeFaClass(s) {
  return String(s || "")
    .replace(/[^a-zA-Z0-9\s\-]/g, "")
    .trim()
    .slice(0, 100);
}

function safeDeviconClass(s) {
  return String(s || "")
    .replace(/[^a-zA-Z0-9\s\-]/g, "")
    .trim()
    .slice(0, 120);
}

function skillIconHtml(item) {
  if (item.fa) {
    return `<span class="skills-chip__icons" aria-hidden="true"><i class="${safeFaClass(item.fa)}"></i></span>`;
  }
  if (item.devicon) {
    return `<span class="skills-chip__icons" aria-hidden="true"><i class="${safeDeviconClass(item.devicon)}"></i></span>`;
  }
  return `<span class="skills-chip__icons" aria-hidden="true"><i class="fas fa-circle-notch"></i></span>`;
}

function renderSkills() {
  const mount = document.getElementById("skillsSection");
  if (!mount) return;

  const frag = document.createDocumentFragment();
  const h3 = document.createElement("h3");
  h3.className = "skills-section__heading";
  h3.textContent = "Skills";
  frag.appendChild(h3);

  skillsData.forEach((group) => {
    const block = document.createElement("div");
    block.className = "skills-group";

    const gt = document.createElement("h4");
    gt.className = "skills-group__title";
    gt.textContent = group.title;
    block.appendChild(gt);

    const list = document.createElement("ul");
    list.className = "skills-group__list";

    group.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "skills-group__item";

      const chip = document.createElement("div");
      chip.className = "skills-chip";
      chip.innerHTML = `
        ${skillIconHtml(item)}
        <span class="skills-chip__label">${escapeHtml(item.label)}</span>
      `;

      li.appendChild(chip);
      list.appendChild(li);
    });

    block.appendChild(list);
    frag.appendChild(block);
  });

  mount.appendChild(frag);
}

document.addEventListener("DOMContentLoaded", renderSkills);
