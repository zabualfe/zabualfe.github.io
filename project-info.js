// Modal logic
const modalData = {
  semanticsearch: {
    icon: "SS",
    title: "Semantic Search for Code Assets and Architecture",
    subtitle: "Search for code snippets",
    link: "#",
    tech: ["AWS", "Python", "LLMs", "Postman", "Docker", "LangChain", "Git", "GitLab"],
    images: ["project-assets/videos/SSVideo.mp4"],
    star: {
      situation: "Developers at large organizations like Amazon struggle to efficiently locate relevant code snippets, templates, and technical assets. Existing solutions such as Slack sharing or manual Git searches are fragmented, slow, and rely on tribal knowledge. Tools like Amazon Q Developer assist in real-time coding but lack deep, context-aware search capabilities for broader architectural and historical code insights.",
      task: "Working with a team, design and implement a centralized semantic code search platform that allows developers to use natural language queries to retrieve contextually relevant assets. The system must provide accurate search results, highlight commit history and ownership, scale to thousands of assets across multiple languages, and present results in an intuitive user interface optimized for productivity.",
      action: "Designed and deployed a robust code parsing and metadata extraction pipeline to process over 1,000 technical assets across Python, JavaScript, and C++, enabling scalable ingestion. Built custom vector embedding workflows using Amazon Bedrock and domain-specific models to transform code and architecture documents into searchable representations. Engineered an LLM-powered retrieval system integrating Bedrock APIs for intelligent summarization and contextual query response. Implemented a cloud-native search platform using OpenSearch, Lambda, and S3, including indexing logic, API endpoints, and relevance scoring mechanisms.",
      result: "Achieved a 90%+ relevance rate for top search results, significantly improving developer productivity when locating reusable code and documentation. Reduced query response latency and eliminated the need for manual file digging or SME triaging. Delivered a functioning semantic search MVP integrating natural language search, visual commit summaries, and scalable multi-language support—positioning the platform as a foundational internal tool for code discovery at scale."
    }
  },
  cosmicdefenders: {
    icon: "TD",
    title: "Tower Defense Game",
    subtitle: "Place troops to eliminate incoming enemies",
    link: "https://www.roblox.com/games/126456150786948/UPDATE-1-Cosmic-Defenders",
    tech: ["Lua", "Object-Oriented Programming", "Event-Driven Architecture", "Modular Design", "DevOps", "Client-Server Communication", "Remote Procedure Calls (RPCs)", "GitHub"],
    images: ["project-assets/videos/CDFootage.mp4", "project-assets/videos/CDEarlyFootage.mp4", "project-assets/videos/CDTroops.mp4"],
    star: {
      situation: "I wanted to build a full-featured tower defense game from the ground up that could showcase my ability to architect game systems, implement real-time logic, and handle both client and server responsibilities within a multiplayer environment.",
      task: "Develop an end-to-end, multiplayer tower defense game that includes wave progression, tower management, enemy AI, and persistent player progression—all optimized for performance and modularity.",
      action: "Programmed the entire game from scratch using Lua. Designed a scalable round system using data structures to manage enemy waves and difficulty scaling. Applied object-oriented principles to implement modular tower behaviors and reusable attack logic. Built client-server architecture using RemoteEvents for real-time tower placement, upgrades, and attack coordination. Integrated data persistence using DataStoreService to retain player progression and upgrades. Ensured responsiveness and low-latency communication with efficient event handling and logic separation.",
      result: "Delivered a fully playable and optimized tower defense game with smooth wave transitions, interactive UI, persistent upgrades, and real-time multiplayer functionality. The architecture allows for fast iteration, reusability, and future scalability, and the project served as a strong demonstration of my backend systems design, real-time logic implementation, and full-stack game development skills."
    }
  },
  ballin: {
    icon: "B",
    title: "Ballin",
    subtitle: "Control a rolling ball through an obstacle course",
    link: "https://www.roblox.com/games/17486824111/Ballin",
    tech: [
      "Lua",
      "Object-Oriented Programming",
      "Event-Driven Architecture",
      "Custom Movement Systems",
      "Client-Server Communication",
      "RemoteEvents & RemoteFunctions (RPCs)",
      "Collision Detection",
      "Modular Design",
      "GitHub",
    ],
    images: ["project-assets/videos/BallinFootage.mp4", "project-assets/videos/BallinEarlyFootage.mp4"],
    star: {
      situation: "I wanted to create a physics-driven game that challenges players to maintain balance and control while navigating complex obstacle courses in a unique way.",
      task: "Design and program a game where players physically roll on top of a dynamic ball to traverse obstacle-filled environments, requiring realistic movement, input control, and collision handling.",
      action: "Used a physics engine to simulate rolling dynamics and friction. Programmed a custom movement system where players control the ball's momentum using applied forces and torque. Built obstacle logic with sensors and triggers to detect progress, failure states, and checkpoint tracking. Implemented real-time camera follow logic, balance correction, and fail recovery systems for a smooth gameplay experience. Designed multiple stages with increasing difficulty and precision challenges.",
      result: "Created a fully functional physics-based game that delivers a unique and skill-based movement mechanic. Players can roll through multi-stage obstacle courses with realistic control, leading to an engaging and replayable gameplay loop. The system showcases advanced physics handling, player feedback, and custom movement design."
    }
  },
  apa: {
    icon: "AP",
    title: "Active Park Assist System",
    subtitle: "Real-Time APA System",
    link: "#",
    tech: ["Embedded Systems", "Simulation", "UML"],
    images: ["project-assets/videos/APATitle.mp4", "project-assets/videos/APAScenario1.mp4", "project-assets/videos/APAScenario2.mp4"],
    star: {
      situation: "Over 60 million people are injured annually in parking-related accidents. Manual parking often results in user error, collisions, and stress due to tight spaces or poor visibility.",
      task: "Design and specify an embedded APA system that automates parking maneuvers, detects obstacles, and ensures safety using sensors and a human-machine interface (HMI).",
      action: "Collaborated on a comprehensive software requirements specification featuring use case diagrams, domain models, and state diagrams. Developed a functional 3D prototype simulating five parking scenarios (e.g., parallel, perpendicular, obstacle timeout). Integrated real-time logic for ultrasonic sensors, VCS controls (steering, throttle, braking), and HMI interactions.",
      result: "Delivered a working prototype and technical documentation demonstrating how APA intelligently parks a vehicle, responds to obstacles, and safely hands back control to the driver. The system fulfills safety constraints, real-time responsiveness, and user interaction via HMI and mobile app."
    }
  },
  basketball: {
    icon: "BB",
    title: "2D Basketball Physics Engine",
    subtitle: "Physics-Based Game Logic",
    link: "https://github.com/zabualfe/2D-Basketball-Physics-Engine",
    tech: ["C++", "Physics", "Rendering"],
    images: [],
    star: {
      situation: "Wanted to build a realistic game prototype using core C++ fundamentals.",
      task: "Develop a custom engine that manages movement, collision, and scoring in a 2D environment.",
      action: "Coded physics equations, built collision detection, and added UI to reflect scores.",
      result: "Built a smooth-playing prototype that could simulate real-time physics and scoring logic."
    }
  }
};

const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("closeModal");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalTech = document.getElementById("modalTech");
const modalLink = document.getElementById("modalLink");
const modalLinks = document.getElementById("modalLinks");
const modalSTAR = document.getElementById("modalSTAR");
const modalGallery = document.getElementById("modalGallery");
const modalImages = document.getElementById("modalImages");

const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageList = [];
let currentImageIndex = 0;

function showModal() {
  modal.classList.add("show");
  modal.classList.remove("fade-out");
  document.body.classList.add("modal-open");
}

function hideModal() {
  modal.classList.add("fade-out");
  modal.classList.remove("show");
  setTimeout(() => {
    document.body.classList.remove("modal-open");
  }, 300);
}

function openLightbox(index) {
  currentImageIndex = index;
  const overlay = document.getElementById("lightboxOverlay");
  const img = document.getElementById("lightboxImage");
  const isVideo = /\.(mp4)$/i.test(currentImageList[currentImageIndex]);

  img.style.display = "none";
  const existingVideo = document.getElementById("lightboxVideo");
  if (existingVideo) existingVideo.remove();

  if (isVideo) {
    const video = document.createElement("video");
    video.id = "lightboxVideo";
    video.src = currentImageList[currentImageIndex];
    video.controls = true;
    video.autoplay = true;
    video.style.maxWidth = "90%";
    video.style.maxHeight = "90%";
    video.style.borderRadius = "0.5rem";
    video.style.boxShadow = "0 0 1rem rgba(0,0,0,0.6)";
    overlay.appendChild(video);
  } else {
    img.src = currentImageList[currentImageIndex];
    img.onload = () => {
      img.style.opacity = 1;
      img.style.transform = "scale(1)";
      img.style.display = "block";
    };
  }

  overlay.style.display = "flex";
  requestAnimationFrame(() => {
    overlay.style.opacity = 1;
    overlay.style.pointerEvents = "auto";
  });
}

function closeLightboxOverlay() {
  const overlay = document.getElementById("lightboxOverlay");
  overlay.style.opacity = 0;
  overlay.style.pointerEvents = "none";
  setTimeout(() => {
    overlay.style.display = "none";
    const video = document.getElementById("lightboxVideo");
    if (video) video.remove();
  }, 400);
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + currentImageList.length) % currentImageList.length;
  openLightbox(currentImageIndex);
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % currentImageList.length;
  openLightbox(currentImageIndex);
}

closeModal.onclick = hideModal;
closeLightbox.onclick = closeLightboxOverlay;
lightboxPrev.onclick = showPrevImage;
lightboxNext.onclick = showNextImage;

window.onclick = e => {
  if (e.target === modal) hideModal();
  if (e.target === lightboxOverlay) closeLightboxOverlay();
};

document.onkeydown = e => {
  if (e.key === "Escape") {
    hideModal();
    closeLightboxOverlay();
  }
  if (lightboxOverlay.style.display === "flex") {
    if (e.key === "ArrowLeft") showPrevImage();
    if (e.key === "ArrowRight") showNextImage();
  }
};

document.querySelectorAll(".learn-more-button").forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    const key = button.getAttribute("data-project");
    const data = modalData[key];

    if (/\.(png|jpg|jpeg|webp|gif)$/i.test(data.icon)) {
      modalIcon.innerHTML = `<img src="${data.icon}" alt="icon" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.5rem;" />`;
    } else {
      modalIcon.textContent = data.icon;
    }

    modalTitle.textContent = data.title;
    modalSubtitle.textContent = data.subtitle;
    modalTech.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join("");

    currentImageList = data.images || [];
    if (currentImageList.length > 0) {
      modalGallery.style.display = "block";
      modalImages.innerHTML = currentImageList.map((src, i) => {
        if (/\.(mp4)$/i.test(src)) {
          return `<video class="gallery-thumb" style="max-width: 300px; border-radius: 0.5rem; cursor: pointer;" autoplay muted loop playsinline onclick="openLightbox(${i})">
                    <source src="${src}" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>`;
        } else {
          return `<img src="${src}" class="gallery-thumb" style="max-width: 300px; border-radius: 0.5rem; cursor: pointer;" onclick="openLightbox(${i})" />`;
        }
      }).join("");
    } else {
      modalGallery.style.display = "none";
      modalImages.innerHTML = "";
    }

    if (data.link && data.link !== "#") {
      modalLinks.style.display = "block";
      modalLink.href = data.link;
    } else {
      modalLinks.style.display = "none";
    }

    modalSTAR.innerHTML = `
      <p><strong>Situation:</strong> ${data.star.situation}</p>
      <p><strong>Task:</strong> ${data.star.task}</p>
      <p><strong>Action:</strong> ${data.star.action}</p>
      <p><strong>Result:</strong> ${data.star.result}</p>
    `;

    showModal();
  });
});
