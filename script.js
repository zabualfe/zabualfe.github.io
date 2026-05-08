document.addEventListener("DOMContentLoaded", () => {
  const WELCOME_STORAGE_KEY = "zayd-portfolio-welcome-seen";
  const welcomeOverlay = document.getElementById("welcomeOverlay");

  /** Exit animation, then `close()` (form submit is intercepted so we control timing). */
  function startWelcomeExit() {
    if (!welcomeOverlay || !welcomeOverlay.open) return;
    if (welcomeOverlay.classList.contains("welcome-overlay--exiting")) return;
    welcomeOverlay.classList.add("welcome-overlay--exiting");

    const done = () => {
      welcomeOverlay.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallbackTimer);
      if (welcomeOverlay.open) {
        welcomeOverlay.close();
      }
    };

    const onTransitionEnd = (e) => {
      if (e.target !== welcomeOverlay || e.propertyName !== "opacity") return;
      done();
    };

    welcomeOverlay.addEventListener("transitionend", onTransitionEnd);
    const fallbackTimer = window.setTimeout(done, 700);
  }

  welcomeOverlay?.addEventListener("close", () => {
    welcomeOverlay?.classList.remove("welcome-overlay--shown", "welcome-overlay--exiting");
    try {
      localStorage.setItem(WELCOME_STORAGE_KEY, "1");
    } catch {
      /* private mode or quota */
    }
    document.body.classList.remove("welcome-open");
  });

  welcomeOverlay?.querySelector("form.welcome-overlay__inner")?.addEventListener("submit", (e) => {
    e.preventDefault();
    startWelcomeExit();
  });

  welcomeOverlay?.addEventListener("cancel", (e) => {
    e.preventDefault();
    startWelcomeExit();
  });

  function openWelcomeOverlay() {
    if (!welcomeOverlay) return;
    if (welcomeOverlay.open) {
      welcomeOverlay.classList.add("welcome-overlay--shown");
      document.body.classList.add("welcome-open");
      return;
    }
    try {
      if (typeof welcomeOverlay.showModal === "function") {
        welcomeOverlay.showModal();
      } else if (typeof welcomeOverlay.show === "function") {
        welcomeOverlay.show();
      } else {
        return;
      }
    } catch {
      try {
        if (typeof welcomeOverlay.show === "function") {
          welcomeOverlay.show();
        } else {
          return;
        }
      } catch {
        return;
      }
    }
    welcomeOverlay.classList.add("welcome-overlay--shown");
    document.body.classList.add("welcome-open");
  }

  try {
    if (!localStorage.getItem(WELCOME_STORAGE_KEY)) {
      openWelcomeOverlay();
    }
  } catch {
    openWelcomeOverlay();
  }

  const TAB_IDS = ["experience", "education", "projects", "talks"];

  function selectTab(tabId, { updateHash = true } = {}) {
    const id = TAB_IDS.includes(tabId) ? tabId : "experience";
    TAB_IDS.forEach((tid) => {
      const panel = document.getElementById(tid);
      const tab = document.getElementById(`tab-${tid}`);
      const on = tid === id;
      if (panel) {
        if (on) panel.removeAttribute("hidden");
        else panel.setAttribute("hidden", "");
      }
      if (tab) {
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", on ? "true" : "false");
      }
    });
    if (updateHash && window.location.hash !== `#${id}`) {
      history.replaceState(null, "", `#${id}`);
    }
  }

  const tabNav = document.querySelector(".sidebar-nav[role='tablist']");
  if (tabNav) {
    tabNav.querySelectorAll('a[href^="#"][role="tab"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const id = link.getAttribute("href")?.slice(1);
        if (id) selectTab(id);
      });
    });

    const initial = location.hash.slice(1);
    const first = TAB_IDS.includes(initial) ? initial : "experience";
    selectTab(first, { updateHash: false });
    if (!TAB_IDS.includes(initial)) {
      history.replaceState(null, "", `#${first}`);
    }

    window.addEventListener("hashchange", () => {
      const id = location.hash.slice(1);
      if (TAB_IDS.includes(id)) selectTab(id, { updateHash: false });
    });
  }

  const linkedinAvatarUrl = "https://unavatar.io/linkedin/zabualfe";

  async function resolveProfileAvatar() {
    const img = document.getElementById("profile-avatar");
    if (!img) return;
    try {
      const res = await fetch(linkedinAvatarUrl, { method: "GET" });
      const type = (res.headers.get("content-type") || "").toLowerCase();
      if (res.ok && !type.includes("svg")) {
        img.src = linkedinAvatarUrl;
        return;
      }
    } catch {
      /* keep default avatar (GitHub) */
    }
  }

  resolveProfileAvatar();

  const cover = document.querySelector(".profile-card__cover");
  const coverImg = document.querySelector(".profile-card__cover-img");
  if (cover && coverImg) {
    coverImg.addEventListener("error", () => {
      cover.classList.add("profile-card__cover--no-banner");
    });
    if (coverImg.complete && coverImg.naturalWidth === 0) {
      cover.classList.add("profile-card__cover--no-banner");
    }
  }

  const cards = document.querySelectorAll(".card.clickable");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });

  const phrases = ["Software Engineer", "Backend Developer", "System Designer", "College Graduate", "Creator"];
  let index = 0;
  let charIndex = 0;
  let typing = true;
  const speed = 100;
  const delay = 1500;
  const element = document.getElementById("typewriter");

  function typeLoop() {
    const base = "I'm a ";
    const current = base + phrases[index];

    if (typing) {
      if (charIndex < current.length) {
        element.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeLoop, speed);
      } else {
        typing = false;
        setTimeout(typeLoop, delay);
      }
    } else {
      if (charIndex > 0) {
        element.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeLoop, speed / 2);
      } else {
        typing = true;
        index = (index + 1) % phrases.length;
        setTimeout(typeLoop, 300);
      }
    }
  }

  if (element) {
    typeLoop();
  }
});

