/**
 * Certifications under Experience tab: Credly-linked cards with badge art.
 */

const certificationsData = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    date: "Jan 2026",
    credlyUrl:
      "https://www.credly.com/badges/6a683961-4120-4fdd-874c-5fff2d26abf3/linked_in_profile",
    badgeImageUrl:
      "https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
  },
];

function isCredlyHttpsUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname === "www.credly.com";
  } catch {
    return false;
  }
}

function isCredlyCdnImageUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname === "images.credly.com";
  } catch {
    return false;
  }
}

function renderCertifications() {
  const mount = document.getElementById("certificationsSection");
  if (!mount) return;

  const frag = document.createDocumentFragment();
  const h3 = document.createElement("h3");
  h3.className = "certifications-section__heading";
  h3.textContent = "Certifications";
  frag.appendChild(h3);

  const list = document.createElement("ul");
  list.className = "certifications-grid";

  certificationsData.forEach((cert) => {
    const hrefOk = isCredlyHttpsUrl(cert.credlyUrl);
    const imgOk = isCredlyCdnImageUrl(cert.badgeImageUrl);
    if (!hrefOk || !imgOk) return;

    const li = document.createElement("li");
    li.className = "certifications-grid__item";

    const a = document.createElement("a");
    a.className = "certification-card";
    a.href = cert.credlyUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", `${cert.title} — view on Credly`);

    const badgeWrap = document.createElement("div");
    badgeWrap.className = "certification-card__badge-wrap";

    const img = document.createElement("img");
    img.className = "certification-card__badge";
    img.src = cert.badgeImageUrl;
    img.alt = `${cert.title} badge`;
    img.width = 136;
    img.height = 136;
    img.loading = "lazy";
    img.decoding = "async";

    const body = document.createElement("div");
    body.className = "certification-card__body";

    const titleEl = document.createElement("h3");
    titleEl.className = "certification-card__title";
    titleEl.textContent = cert.title;

    const dateEl = document.createElement("p");
    dateEl.className = "certification-card__date";
    dateEl.textContent = cert.date;

    const credlyEl = document.createElement("p");
    credlyEl.className = "certification-card__credly";
    credlyEl.textContent = "View on Credly";

    badgeWrap.appendChild(img);
    body.appendChild(titleEl);
    body.appendChild(dateEl);
    body.appendChild(credlyEl);
    a.appendChild(badgeWrap);
    a.appendChild(body);
    li.appendChild(a);
    list.appendChild(li);
  });

  frag.appendChild(list);
  mount.appendChild(frag);
}

document.addEventListener("DOMContentLoaded", renderCertifications);
