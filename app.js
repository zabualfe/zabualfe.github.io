/* Renders the portfolio from data.js: Library, feed, Now panel, timeline
   player, search and the mobile tabs. No framework; state lives in `state`
   and each panel re-renders from it. Deep links use the item id as the hash. */

(() => {
  const P = PORTFOLIO;
  const $ = (sel, root = document) => root.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const compactNow = window.matchMedia("(max-width: 1240px)");
  const mobile = window.matchMedia("(max-width: 860px)");

  // ---------- Data model ----------
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const ym = (s) => { const [y, m] = s.split("-").map(Number); return new Date(y, m - 1, 1); };
  const fmt = (s) => (s ? `${MONTHS[ym(s).getMonth()]} ${ym(s).getFullYear()}` : "Present");
  const range = (a, b) => `${fmt(a)} – ${fmt(b)}`;
  const year = (s) => s.slice(0, 4);
  const today = new Date();
  const isCurrent = (it) => !it.end && ym(it.start) <= today;
  const isFuture = (it) => ym(it.start) > today;

  const items = new Map();
  P.experience.forEach((it) => items.set(it.id, { ...it, kind: "experience" }));
  P.education.forEach((it) => items.set(it.id, { ...it, kind: "education" }));
  P.projects.forEach((it) => items.set(it.id, { ...it, kind: "project" }));
  P.talks.forEach((it) => items.set(it.id, { ...it, kind: "talk" }));
  P.certifications.forEach((it) => items.set(it.id, { ...it, kind: "cert" }));

  // Chronological timeline the player steps through
  const timeline = [...items.values()].filter((it) => it.kind === "experience" || it.kind === "education").sort((a, b) => ym(a.start) - ym(b.start));
  const currentRole = items.get((P.experience.find(isCurrent) || P.experience[0]).id);

  const state = {
    selected: "about", // the item in the Now panel: "about" (default) or an item id
    view: { name: "home", filter: "all" }, // or { name: "project" | "talk", id }
    tab: "home",
    open: { experience: true, education: true, projects: false, talks: false },
    touring: null,
  };

  // ---------- Small builders ----------
  const icons = {
    chevDown: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h4v16H7zM14 4h4v16h-4z"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 20 9 12l10-8zM5 19V5"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 4 10 8-10 8zM19 5v14"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22M18 2l4 4-4 4M2 6h1.9c1.5 0 2.9.9 3.6 2.2M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8M18 14l4 4-4 4"/></svg>',
    repeat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m17 2 4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    file: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5zM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1M7.1 20.5H3.6V9h3.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0"/></svg>',
    ext: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2"/></svg>',
  };

  const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const coverBg = (c) => `background: radial-gradient(circle at 50% 50%, ${c.from}cc, ${c.to}26), #151528`;

  function logo(it, extra = "") {
    if (it.kind === "project") return `<span class="logo ${extra}" style="background: linear-gradient(135deg, ${it.cover.from}, ${it.cover.to})"><span class="cover-glyph">${esc(it.cover.glyph)}</span></span>`;
    if (it.kind === "talk") return `<span class="logo ${extra}"><img src="${ytThumb(it.youtube)}" alt="" loading="lazy" /></span>`;
    if (it.kind === "cert") return `<span class="logo logo--fit ${extra}"><img src="${esc(it.badge)}" alt="" loading="lazy" /></span>`;
    return `<span class="logo ${extra}"><img src="${esc(it.logo)}" alt="" loading="lazy" /></span>`;
  }

  const tags = (list, plain) => (list && list.length ? `<div class="tags">${list.map((t) => `<span class="tag${plain ? " tag--plain" : ""}">${esc(t)}</span>`).join("")}</div>` : "");

  function rowMeta(it) {
    if (it.kind === "experience") return isCurrent(it) ? "Now" : year(it.start);
    if (it.kind === "education" || it.kind === "project") return year(it.start);
    return "";
  }
  function rowSub(it) {
    if (it.kind === "experience" || it.kind === "education") return it.title;
    if (it.kind === "project") return it.context;
    if (it.kind === "talk") return it.event;
    return it.date;
  }
  const rowTitle = (it) => it.org || it.short || it.title;
  const isActive = (it) => (it.kind === "project" || it.kind === "talk" ? state.view.id === it.id : state.selected === it.id);

  const row = (it) => `
    <button type="button" class="row" data-open="${it.id}" ${isActive(it) ? 'aria-current="true"' : ""}>
      ${logo(it)}
      <span><span class="row__title">${esc(rowTitle(it))}</span><span class="row__sub">${esc(rowSub(it))}</span></span>
      <span class="row__meta">${esc(rowMeta(it))}</span>
    </button>`;

  // ---------- Library ----------
  function renderLibrary() {
    const sections = [
      ["experience", "Experience", P.experience],
      ["education", "Education", P.education],
      ["projects", "Projects", P.projects],
      ["talks", "Talks", P.talks],
    ];
    $("#library").innerHTML = `
      <div class="library__head">
        <h2>Library</h2>
        <button type="button" class="icon-btn" data-focus-search aria-label="Search">${icons.search}</button>
      </div>
      ${sections
        .map(([key, label, list], i) => {
          const open = state.open[key];
          const kindOf = key === "projects" ? "project" : key === "talks" ? "talk" : key;
          return `
          <section class="lib-section" aria-label="${label}">
            <button type="button" class="lib-toggle" data-toggle="${key}" aria-expanded="${open}" aria-controls="lib-${key}">
              <span class="lib-label"><span class="kicker">${label}</span><span class="count">${list.length}</span></span>${icons.chevDown}
            </button>
            <div class="lib-list" id="lib-${key}" ${open ? "" : "hidden"}>${list.map((x) => row(items.get(x.id) || { ...x, kind: kindOf })).join("")}</div>
          </section>${i === 0 || i === 1 ? '<div class="lib-divider"></div>' : ""}`;
        })
        .join("")}`;
  }

  // ---------- Feed ----------
  const projectCard = (p) => `
    <button type="button" class="card" data-open="${p.id}">
      <span class="card__cover" style="${coverBg(p.cover)}">
        <span class="card__glyph" aria-hidden="true">${esc(p.cover.glyph)}</span>
        <span class="card__label" style="background:${p.cover.from}">${esc(p.short)}</span>
      </span>
      <span class="card__desc">${esc(p.card)}</span>
    </button>`;

  const skillCard = (s) => `
    <button type="button" class="card" data-search="${esc(s.name)}" aria-label="Search for ${esc(s.name)}">
      <span class="skill__cover" style="background:${s.color}">
        <span class="skill__tag">STACK</span>
        <span class="skill__plate"><img src="${esc(s.icon)}" alt="" /></span>
        <span class="skill__name">${esc(s.name)}</span>
      </span>
      <span class="card__desc">${esc(s.with)}</span>
    </button>`;

  const talkCard = (t) => `
    <button type="button" class="card" data-open="${t.id}">
      <span class="talk__thumb"><img src="${ytThumb(t.youtube)}" alt="" loading="lazy" /><span class="talk__play"><span>${icons.play}</span></span></span>
      <span class="card__title">${esc(t.title)}</span>
      <span class="card__desc">${esc(t.event)}</span>
    </button>`;

  const sectionHead = (title, filter, kicker) => `
    <div class="section-head">
      <div>${kicker ? `<p>${esc(kicker)}</p>` : ""}<h2>${esc(title)}</h2></div>
      ${filter ? `<button type="button" class="link-btn" data-filter="${filter}">Show all</button>` : ""}
    </div>`;

  function renderHome() {
    const f = state.view.filter;
    const chips = [["all", "All"], ["experience", "Experience"], ["projects", "Projects"], ["talks", "Talks"]]
      .map(([k, l]) => `<button type="button" class="chip" data-filter="${k}" aria-pressed="${f === k}">${l}</button>`).join("");
    let body = "";
    if (f === "all") {
      const quick = P.quick.map((id) => items.get(id)).filter(Boolean)
        .map((it) => `<button type="button" class="tile" data-open="${it.id}">${logo(it, it.kind === "cert" ? "logo--fit" : "")}<span>${esc(it.short || it.org || it.title)}</span></button>`).join("");
      body = `
        <div class="quick">${quick}</div>
        <section class="feed-section">${sectionHead("Projects", "projects")}<div class="cards">${P.projects.map(projectCard).join("")}</div></section>
        <section class="feed-section">${sectionHead("Skills")}<div class="cards cards--all">${P.skills.featured.map(skillCard).join("")}</div></section>
        <section class="feed-section">${sectionHead("Talks", "talks")}<div class="talks">${P.talks.map(talkCard).join("")}</div></section>`;
    } else if (f === "experience") {
      const list = [...P.experience, ...P.education].map((x) => items.get(x.id)).sort((a, b) => ym(b.start) - ym(a.start));
      body = `<section class="feed-section">${sectionHead("Experience & education")}<div class="list">${list
        .map((it) => `<button type="button" class="list-item" data-open="${it.id}">${logo(it)}<span><span class="list-item__title">${esc(it.org)} · ${esc(it.title)}</span><span class="list-item__meta">${esc(range(it.start, it.end))}</span><span class="list-item__summary">${esc(it.summary)}</span></span></button>`)
        .join("")}</div></section>`;
    } else if (f === "projects") {
      body = `<section class="feed-section">${sectionHead("Projects")}<div class="cards cards--all">${P.projects.map(projectCard).join("")}</div></section>`;
    } else {
      body = `<section class="feed-section">${sectionHead("Talks")}<div class="talks">${P.talks.map(talkCard).join("")}</div></section>`;
    }
    return `
      <div class="intro"><h1>Hi, I’m ${esc(P.person.first)}</h1><p>${esc(P.person.tagline)}</p></div>
      <div class="chips" role="group" aria-label="Filter">${chips}</div>
      ${body}`;
  }

  function renderProject(p) {
    const media = (p.media || []).map((src) => `<video src="${esc(src)}" controls playsinline preload="metadata"></video>`).join("");
    return `
      <article class="detail" style="--wash:${p.cover.to}8c">
        <header class="detail__head">
          <nav class="crumbs" aria-label="Breadcrumb"><button type="button" data-home aria-label="Back to home">${icons.back}</button><span>Projects</span><span aria-hidden="true">/</span><strong>${esc(p.short)}</strong></nav>
          <div class="detail__hero">
            <div class="detail__cover" style="${coverBg(p.cover)}"><span class="card__glyph" aria-hidden="true">${esc(p.cover.glyph)}</span></div>
            <div class="detail__text">
              <p class="kicker">Project · ${esc(p.context)}</p>
              <h1 class="detail__title">${esc(p.title)}</h1>
              <p class="detail__summary">${esc(p.summary)}</p>
              <p class="detail__stats">${esc(range(p.start, p.end))} · ${esc(p.stats)}</p>
            </div>
          </div>
          <div class="detail__actions">
            ${media ? `<button type="button" class="play-btn" data-play-demo><span>${icons.play}</span>Watch the demo</button>` : ""}
            ${p.link ? `<a class="pill" href="${esc(p.link)}" target="_blank" rel="noopener">${icons.github} View on GitHub</a>` : ""}
          </div>
        </header>
        <div class="detail__body">
          <section><h3>Highlights</h3><ol class="numbered">${p.bullets.map((b, i) => `<li data-n="${String(i + 1).padStart(2, "0")}">${esc(b)}</li>`).join("")}</ol></section>
          <aside>
            <div class="side-block"><h3>Stack</h3>${tags(p.tech)}</div>
            ${media ? `<div class="side-block media" id="demo"><p class="kicker">Demo</p>${media}</div>` : ""}
          </aside>
        </div>
      </article>`;
  }

  function renderTalk(t) {
    return `
      <article class="detail" style="--wash:rgba(157,78,221,0.45)">
        <header class="detail__head">
          <nav class="crumbs" aria-label="Breadcrumb"><button type="button" data-home aria-label="Back to home">${icons.back}</button><span>Talks</span><span aria-hidden="true">/</span><strong>${esc(t.event)}</strong></nav>
          <div class="detail__text">
            <p class="kicker">Talk · ${esc(t.event)}</p>
            <h1 class="detail__title">${esc(t.title)}</h1>
            <p class="detail__summary">${esc(t.about)}</p>
          </div>
        </header>
        <div class="detail__body" style="grid-template-columns: minmax(0, 1fr)">
          <div class="media" style="margin-top:0">
            <iframe src="https://www.youtube-nocookie.com/embed/${esc(t.youtube)}" title="${esc(t.title)}" loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
      </article>`;
  }

  function renderSearchPage() {
    return `
      <div class="search-page">
        <div class="library__head" style="padding-left:0"><h2 style="font-size:28px;font-weight:700;letter-spacing:-0.03em">Search</h2></div>
        <div class="search-page__field">${icons.search}
          <input id="mobileSearch" type="search" placeholder="Roles, projects, skills…" autocomplete="off" spellcheck="false" aria-label="Search" value="${esc(searchQuery)}" />
        </div>
        <div id="mobileResults">${resultsHTML(searchQuery, false)}</div>
      </div>`;
  }

  function renderFeed() {
    const feed = $("#feed");
    if (mobile.matches && state.tab === "search") feed.innerHTML = renderSearchPage();
    else if (state.view.name === "project") feed.innerHTML = renderProject(items.get(state.view.id));
    else if (state.view.name === "talk") feed.innerHTML = renderTalk(items.get(state.view.id));
    else feed.innerHTML = renderHome();
  }

  // ---------- Now panel ----------
  function neighbor(it) {
    const i = timeline.indexOf(it);
    if (i < 0) return null;
    const after = timeline.slice(i + 1).find(isFuture);
    if ((isCurrent(it) || isFuture(it)) && after && after !== it) return ["Up next", after];
    const prevSame = timeline.slice(0, i).reverse().find((x) => x.kind === it.kind);
    return prevSame ? ["Previously", prevSame] : null;
  }

  function renderAbout() {
    const p = P.person;
    const next = [...P.education].map((x) => items.get(x.id)).find(isFuture);
    const now = $("#now");
    now.style.setProperty("--sheet-tint", "rgba(196,181,253,0.32)");
    now.innerHTML = `
      <span class="now__grab" aria-hidden="true"></span>
      <div class="now__head">
        <button type="button" class="icon-btn now__close" data-close-now aria-label="Close details">${icons.chevDown}</button>
        <h2>About me</h2>
      </div>
      <div class="about">
        <img class="about__avatar" src="${esc(p.avatar)}" alt="${esc(p.name)}" width="112" height="112" />
        <h3 class="now__title">${esc(p.name)}</h3>
        <p class="now__meta">${esc(p.role)} at ${esc(p.company)}</p>
        <p class="now__summary">${esc(p.about)}</p>
        <div class="about__links">
          <a class="pill pill--accent" href="mailto:${esc(p.email)}">${icons.mail} Email me</a>
          <a class="icon-btn icon-btn--ring" href="${esc(p.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${icons.linkedin}</a>
          <a class="icon-btn icon-btn--ring" href="${esc(p.github)}" target="_blank" rel="noopener" aria-label="GitHub">${icons.github}</a>
          <a class="icon-btn icon-btn--ring" href="${esc(p.resume)}" target="_blank" rel="noopener" aria-label="Résumé">${icons.file}</a>
        </div>
      </div>
      <div class="now-card"><h3>Currently</h3>${row(currentRole).replace('aria-current="true"', "")}</div>
      ${next ? `<div class="now-card"><h3>Next</h3>${row(next).replace('aria-current="true"', "")}</div>` : ""}
      ${p.facts && p.facts.length ? `<div class="now-card"><h3>Quick facts</h3><ol class="numbered">${p.facts.map((f, i) => `<li data-n="${String(i + 1).padStart(2, "0")}">${esc(f)}</li>`).join("")}</ol></div>` : ""}`;
  }

  function renderNow() {
    if (!items.has(state.selected)) return renderAbout();
    const it = items.get(state.selected);
    const p = P.person;
    let head, status, art, title, meta, body = "";
    if (it.kind === "cert") {
      head = "Certification";
      status = `<span class="status status--dim">${esc(it.date)}</span>`;
      art = `<div class="now__art now__art--badge"><img src="${esc(it.badge)}" alt="${esc(it.title)} badge" /></div>`;
      title = it.title;
      meta = `Amazon Web Services · ${it.date}`;
      body = `<div class="now-card"><a class="pill pill--accent" href="${esc(it.url)}" target="_blank" rel="noopener">View on Credly ${icons.ext}</a></div>`;
    } else {
      const current = isCurrent(it), future = isFuture(it);
      head = `${current ? "Now" : it.kind === "education" ? "Education" : "Experience"} · ${it.org}`;
      status = current ? `<span class="status">Current</span>` : future ? `<span class="status status--gold">${esc(fmt(it.start))}</span>` : `<span class="status status--dim">${year(it.start)} – ${year(it.end)}</span>`;
      art = `<div class="now__art"><img src="${esc(it.logo)}" alt="${esc(it.orgFull || it.org)} logo" /></div>`;
      title = it.degree || (it.roles ? `${it.org} internships` : it.title);
      meta = `${it.orgFull || it.org} · ${range(it.start, it.end)}`;
      if (it.bullets && it.bullets.length) body += `<div class="now-card"><h3>What I did</h3><ul class="bullets">${it.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>`;
      if (it.roles) body += `<div class="now-card">${it.roles.map((r) => `<div class="role"><p class="role__title">${esc(r.title)}</p><p class="role__dates">${esc(r.dates)}</p><ul class="bullets">${r.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>`).join("")}</div>`;
      if (it.highlights && it.highlights.length) body += `<div class="now-card"><h3>Highlights</h3>${tags(it.highlights)}</div>`;
      if (it.courses && it.courses.length) body += `<div class="now-card"><h3>Coursework</h3>${tags(it.courses, true)}</div>`;
      if (it.tags && it.tags.length) body += `<div class="now-card"><h3>Stack</h3>${tags(it.tags)}</div>`;
      const n = neighbor(it);
      if (n) body += `<div class="now-card"><h3>${n[0]}</h3>${row(n[1]).replace('class="row"', 'class="row" data-keep-sheet').replace('aria-current="true"', "")}</div>`;
    }
    body += `<div class="now-card"><h3>About ${esc(p.first)}</h3><p>${esc(p.about)}</p></div>`;
    const tint = it.kind === "education" && it.id === "georgia-tech" ? "rgba(179,163,105,0.55)" : "rgba(142,197,255,0.28)";
    const now = $("#now");
    now.style.setProperty("--sheet-tint", tint);
    now.innerHTML = `
      <span class="now__grab" aria-hidden="true"></span>
      <div class="now__head">
        <button type="button" class="icon-btn now__close" data-close-now aria-label="Close details">${icons.chevDown}</button>
        <h2>${esc(head)}</h2>${status}
      </div>
      ${art}
      <h3 class="now__title">${esc(title)}</h3>
      <p class="now__meta">${esc(meta)}</p>
      ${it.summary ? `<p class="now__summary">${esc(it.summary)}</p>` : ""}
      ${body}`;
  }

  // ---------- Player ----------
  function playerItem() {
    const it = items.get(state.selected);
    return it && (it.kind === "experience" || it.kind === "education") ? it : currentRole;
  }
  function progressOf(it) {
    const s = ym(it.start), e = it.end ? ym(it.end) : today;
    if (s > today) return 0;
    if (e <= s) return 1;
    return Math.max(0, Math.min(1, (Math.min(today, e) - s) / (e - s)));
  }
  function renderPlayer() {
    const it = playerItem();
    const pct = Math.round(progressOf(it) * 100);
    const playing = !!state.touring;
    $("#player").innerHTML = `
      <button type="button" class="player__now" data-open-now aria-label="Show details for ${esc(it.org)}">
        ${logo(it)}
        <span class="player__text"><span class="player__title">${esc(it.degree || (it.roles ? `${it.org} internships` : it.title))}</span><span class="player__sub">${esc(it.org)} · ${esc(range(it.start, it.end))}</span></span>
      </button>
      <button type="button" class="player__mobile-play" data-tour aria-label="${playing ? "Pause timeline tour" : "Play timeline tour"}" aria-pressed="${playing}">${playing ? icons.pause : icons.play}</button>
      <span class="player__bar" aria-hidden="true"><span style="width:${pct}%"></span></span>
      <div class="player__center">
        <div class="controls">
          <button type="button" class="ctrl ctrl--accent" data-shuffle aria-label="Open a random project">${icons.shuffle}</button>
          <button type="button" class="ctrl" data-step="-1" aria-label="Previous in timeline">${icons.prev}</button>
          <button type="button" class="ctrl ctrl--play" data-tour aria-label="${playing ? "Pause timeline tour" : "Play timeline tour"}" aria-pressed="${playing}">${playing ? icons.pause : icons.play}</button>
          <button type="button" class="ctrl" data-step="1" aria-label="Next in timeline">${icons.next}</button>
          <button type="button" class="ctrl" data-current aria-label="Back to current role">${icons.repeat}</button>
        </div>
        <div class="progress">
          <span>${esc(fmt(it.start))}</span>
          <span class="track" role="img" aria-label="${pct}% through ${esc(it.org)}"><span class="track__fill" style="transform:scaleX(${pct / 100})"></span><span class="track__knob-wrap" style="transform:translateX(${pct}%)"><span class="track__knob"></span></span></span>
          <span>${esc(fmt(it.end))}</span>
        </div>
      </div>
      <div class="player__links">
        <a href="mailto:${esc(P.person.email)}">${esc(P.person.email)}</a>
        <a href="mailto:${esc(P.person.email)}" aria-label="Email">${icons.mail}</a>
      </div>`;
  }

  // ---------- Search ----------
  let searchQuery = "";
  let activeIndex = 0;
  const GROUPS = [["experience", "Experience", "Role"], ["education", "Education", "School"], ["project", "Projects", "Project"], ["talk", "Talks", "Talk"], ["cert", "Certifications", "Cert"]];
  const index = [...items.values()].map((it) => {
    const words = [it.org, it.orgFull, it.title, it.degree, it.short, it.context, it.event, it.summary, it.about, it.card,
      ...(it.tags || []), ...(it.tech || []), ...(it.bullets || []), ...(it.courses || []), ...(it.highlights || []),
      ...(it.roles || []).flatMap((r) => [r.title, ...r.bullets])];
    if (it.kind === "cert") words.push("AWS", "Amazon Web Services", "Solutions Architect", "certification");
    const extras = [...(it.tags || []), ...(it.tech || []), ...(it.courses || [])];
    return { it, hay: words.filter(Boolean).join(" ").toLowerCase(), extras };
  });

  function search(q) {
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!tokens.length) return [];
    return index
      .filter((e) => tokens.every((t) => e.hay.includes(t)))
      .map((e) => {
        const title = rowTitle(e.it).toLowerCase();
        const sub = rowSub(e.it).toLowerCase();
        const score = tokens.reduce((s, t) => s + (title.startsWith(t) ? 6 : title.includes(t) ? 4 : sub.includes(t) ? 2 : 0), 0);
        let why = rowSub(e.it);
        if (!tokens.some((t) => title.includes(t) || sub.includes(t))) {
          const hit = e.extras.find((x) => tokens.some((t) => x.toLowerCase().includes(t)));
          why = hit ? `${rowSub(e.it)} · ${hit}` : `${rowSub(e.it)} · mentions “${q.trim()}”`;
        }
        return { ...e, score, why };
      })
      .sort((a, b) => b.score - a.score);
  }

  function mark(text, q) {
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!tokens.length) return esc(text);
    const re = new RegExp(`(${tokens.join("|")})`, "ig");
    return String(text).split(re).map((part, i) => (i % 2 ? `<mark>${esc(part)}</mark>` : esc(part))).join("");
  }

  const SUGGEST = ["AWS", "Python", "Georgia Tech", "accessibility", "LLMs"];
  function resultsHTML(q, withHints) {
    if (!q.trim()) {
      return `<div class="results-empty"><p>Search roles, schools, projects, skills and talks.</p><div class="suggest">${SUGGEST.map((s) => `<button type="button" class="chip" data-search="${esc(s)}">${esc(s)}</button>`).join("")}</div></div>`;
    }
    const res = search(q);
    if (!res.length) return `<div class="results-empty"><p>No matches for “${esc(q)}”.</p><p>Try a company, a language or a project name.</p></div>`;
    let n = 0;
    const groups = GROUPS.map(([kind, label, short]) => {
      const list = res.filter((r) => r.it.kind === kind);
      if (!list.length) return "";
      return `<div class="results-group kicker">${label}</div>${list
        .map((r) => {
          const i = n++;
          return `<button type="button" class="result" role="option" id="opt-${i}" data-open="${r.it.id}" data-index="${i}" aria-selected="${withHints && i === activeIndex}">
            ${logo(r.it, r.it.kind === "cert" ? "logo--fit" : "")}
            <span><span class="result__title">${mark(r.it.title && r.it.kind !== "experience" && r.it.kind !== "education" ? r.it.title : rowTitle(r.it), q)}</span><span class="result__sub">${mark(r.why, q)}</span></span>
            <span class="result__kind">${withHints && i === activeIndex ? "↵" : short}</span>
          </button>`;
        })
        .join("")}`;
    }).join("");
    const hints = withHints ? `<div class="results-hints"><span>↑↓ navigate</span><span>↵ open</span><span>esc close</span><span>${res.length} result${res.length === 1 ? "" : "s"}</span></div>` : "";
    return groups + hints;
  }

  const input = $("#searchInput");
  const box = $("#searchResults");
  function openResults() {
    box.innerHTML = resultsHTML(searchQuery, true);
    box.hidden = false;
    input.setAttribute("aria-expanded", "true");
    document.body.classList.add("search-open");
    const sel = box.querySelector('[aria-selected="true"]');
    if (sel) input.setAttribute("aria-activedescendant", sel.id); else input.removeAttribute("aria-activedescendant");
  }
  function closeResults() {
    box.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
    document.body.classList.remove("search-open");
  }
  input.addEventListener("focus", openResults);
  input.addEventListener("input", () => { searchQuery = input.value; activeIndex = 0; openResults(); });
  input.addEventListener("keydown", (e) => {
    const opts = [...box.querySelectorAll(".result")];
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!opts.length) return;
      activeIndex = (activeIndex + (e.key === "ArrowDown" ? 1 : -1) + opts.length) % opts.length;
      openResults();
      box.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      const opt = opts[activeIndex];
      if (opt) { e.preventDefault(); pick(opt.dataset.open); }
    } else if (e.key === "Escape") {
      closeResults();
      input.blur();
    }
  });
  box.addEventListener("mousedown", (e) => e.preventDefault()); // keep focus while clicking a result
  box.addEventListener("mousemove", (e) => {
    const opt = e.target.closest(".result");
    if (opt && Number(opt.dataset.index) !== activeIndex) { activeIndex = Number(opt.dataset.index); openResults(); }
  });
  document.addEventListener("click", (e) => { if (!e.target.closest(".search")) closeResults(); });

  function pick(id) {
    searchQuery = "";
    input.value = "";
    closeResults();
    input.blur();
    open(id, { user: true });
  }

  // ---------- Navigation ----------
  let sheetReturnFocus = null;
  function openSheet() {
    if (!compactNow.matches) return;
    sheetReturnFocus = document.activeElement;
    document.body.classList.add("now-open");
    $("#now").scrollTop = 0;
    requestAnimationFrame(() => $(".now__close")?.focus({ preventScroll: true }));
  }
  function closeSheet() {
    if (!document.body.classList.contains("now-open")) return;
    document.body.classList.remove("now-open");
    sheetReturnFocus?.focus?.({ preventScroll: true });
  }

  function setTab(tab) {
    state.tab = tab;
    document.body.dataset.tab = tab;
    document.querySelectorAll("[data-tab-btn]").forEach((b) => (b.dataset.tabBtn === tab ? b.setAttribute("aria-current", "page") : b.removeAttribute("aria-current")));
  }

  function renderAll() {
    renderLibrary();
    renderFeed();
    renderNow();
    renderPlayer();
  }

  // Opens any item: roles, schools and certs go to the Now panel; projects and talks open in the feed.
  function open(id, { user = false, push = true } = {}) {
    if (id === "about") {
      if (user) stopTour();
      state.selected = "about";
      renderAll();
      $("#now").scrollTop = 0;
      if (user) openSheet();
      if (push && location.hash.slice(1) !== id) history.pushState(null, "", "#about");
      return;
    }
    const it = items.get(id);
    if (!it) return;
    if (user) stopTour();
    if (it.kind === "project" || it.kind === "talk") {
      state.view = { name: it.kind, id };
      state.open[it.kind === "project" ? "projects" : "talks"] = true;
      setTab("home");
      renderAll();
      $("#feed").scrollTop = 0;
      if (mobile.matches) window.scrollTo({ top: 0 });
      closeSheet();
    } else {
      state.selected = id;
      if (state.view.name !== "home" && user && !compactNow.matches) { /* keep the open project; the Now panel updates beside it */ }
      renderAll();
      if (user) openSheet();
    }
    if (push && location.hash.slice(1) !== id) history.pushState(null, "", `#${id}`);
  }

  function goHome({ push = true } = {}) {
    state.view = { name: "home", filter: state.view.filter || "all" };
    state.selected = "about";
    setTab("home");
    closeSheet();
    renderAll();
    $("#feed").scrollTop = 0;
    if (push && location.hash) history.pushState(null, "", location.pathname + location.search);
  }

  function step(dir) {
    const it = playerItem();
    const i = timeline.indexOf(it);
    const next = timeline[(i + dir + timeline.length) % timeline.length];
    state.selected = next.id;
    renderAll();
    history.replaceState(null, "", `#${next.id}`);
  }

  function stopTour() {
    if (!state.touring) return;
    clearInterval(state.touring);
    state.touring = null;
    renderPlayer();
  }
  function toggleTour() {
    if (state.touring) return stopTour();
    state.touring = setInterval(() => step(1), 3500);
    step(1);
  }

  window.addEventListener("hashchange", applyHash);
  window.addEventListener("popstate", applyHash);
  function applyHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return goHome({ push: false });
    if (items.has(id) || id === "about") open(id, { push: false });
  }

  // ---------- Events ----------
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a");
    if (!t) return;
    const d = t.dataset;
    if ("home" in d) { e.preventDefault(); stopTour(); goHome(); }
    else if (d.open) { e.preventDefault(); if (t.closest(".search-results")) pick(d.open); else open(d.open, { user: true }); }
    else if (d.filter) { state.view = { name: "home", filter: d.filter }; renderFeed(); $("#feed").scrollTop = 0; }
    else if (d.toggle) { state.open[d.toggle] = !state.open[d.toggle]; renderLibrary(); $(`[data-toggle="${d.toggle}"]`)?.focus(); }
    else if ("closeNow" in d) closeSheet();
    else if ("openNow" in d) { if (compactNow.matches) openSheet(); else open(playerItem().id, { user: true }); }
    else if ("tour" in d) toggleTour();
    else if (d.step) { stopTour(); step(Number(d.step)); }
    else if ("current" in d) { stopTour(); open(currentRole.id, { user: false }); }
    else if ("shuffle" in d) { stopTour(); const pool = P.projects.filter((p) => p.id !== state.view.id); open(pool[Math.floor(Math.random() * pool.length)].id, { user: true }); }
    else if (d.search !== undefined && d.search !== "") { e.preventDefault(); runSearch(d.search); }
    else if ("focusSearch" in d) { if (mobile.matches) { setTab("search"); renderFeed(); $("#mobileSearch")?.focus(); } else input.focus(); }
    else if (d.tabBtn) {
      closeSheet();
      if (d.tabBtn === "home" && state.tab === "home") goHome();
      setTab(d.tabBtn);
      renderFeed();
      window.scrollTo({ top: 0 });
      if (d.tabBtn === "search") $("#mobileSearch")?.focus();
    } else if ("playDemo" in d) {
      const v = $("#demo video");
      if (v) { v.scrollIntoView({ behavior: "smooth", block: "center" }); v.play().catch(() => {}); }
    }
  });

  function runSearch(q) {
    searchQuery = q;
    activeIndex = 0;
    if (mobile.matches) { setTab("search"); renderFeed(); const m = $("#mobileSearch"); m.focus(); m.setSelectionRange(q.length, q.length); }
    else { input.value = q; input.focus(); openResults(); }
  }

  document.addEventListener("input", (e) => {
    if (e.target.id === "mobileSearch") { searchQuery = e.target.value; $("#mobileResults").innerHTML = resultsHTML(searchQuery, false); }
  });

  document.addEventListener("keydown", (e) => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
      e.preventDefault();
      if (mobile.matches) { setTab("search"); renderFeed(); $("#mobileSearch")?.focus(); } else input.focus();
    } else if (e.key === "Escape" && document.body.classList.contains("now-open")) closeSheet();
  });

  compactNow.addEventListener("change", () => { if (!compactNow.matches) document.body.classList.remove("now-open"); });
  mobile.addEventListener("change", () => { if (!mobile.matches) setTab("home"); renderFeed(); });

  // ---------- Start ----------
  renderAll();
  const initial = decodeURIComponent(location.hash.slice(1));
  if (initial && (items.has(initial) || initial === "about")) open(initial, { push: false });
})();
