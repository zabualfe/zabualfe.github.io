/**
 * All portfolio content lives here. app.js renders the site from it.
 *
 * Each item has a stable `id` (used in the URL: zabualfe.github.io/#georgia-tech).
 * Logos: `logo` is a path under project-assets/. Projects use `cover` instead
 * (a glyph and two colors for a generated cover).
 * Dates: `start` / `end` are "YYYY-MM"; leave `end` empty for "Present".
 */

const PORTFOLIO = {
  person: {
    name: "Zayd Abualfellat",
    first: "Zayd",
    role: "Associate Software Engineer",
    company: "Capital One",
    tagline: "Software engineer at Capital One. I build backend systems and search that understands code.",
    about:
      "Michigan State CS grad and AWS Certified Solutions Architect. I build backend systems, cloud pipelines and search that understands code, and I’m starting an M.S. in Computer Science at Georgia Tech in 2027.",
    avatar: "https://github.com/zabualfe.png?size=460",
    // Shown in the About me panel (the right column on first visit)
    facts: [
      "AWS Certified Solutions Architect – Associate",
      "Raised semantic search relevance from 55% to 85% on the Amazon capstone",
      "Mentored 500+ students in C++ at Michigan State",
      "Spoke at RDC24 on accessible game design",
    ],
    email: "zabualfe@gmail.com",
    linkedin: "https://www.linkedin.com/in/zabualfe/",
    github: "https://github.com/zabualfe",
    resume: "Resume.pdf",
  },

  experience: [
    {
      id: "capital-one",
      org: "Capital One",
      title: "Associate Software Engineer",
      logo: "project-assets/company-logos/capital_one.svg",
      start: "2026-02",
      end: "",
      summary:
        "Participating in Capital One’s Technology Development Program (TDP) to build and scale new features for Capital One’s products.",
      tags: ["AWS", "Full-Stack", "JavaScript", "Java"],
      bullets: [],
    },
    {
      id: "amazon",
      org: "Amazon",
      title: "Capstone Backend Engineer",
      logo: "project-assets/company-logos/amazon.svg",
      start: "2025-01",
      end: "2025-05",
      summary:
        "Michigan State University capstone: built an AWS Bedrock-powered semantic pipeline, boosting search accuracy to 85% and enabling scalable indexing of 1,500+ assets.",
      tags: ["LLMs", "AWS", "Python", "OpenSearch"],
      bullets: [
        "Designed a pipeline using AWS S3 and Amazon Bedrock to parse and extract metadata from 1,500+ Python, JavaScript, and C++ assets in under 5 minutes, enabling scalable semantic indexing",
        "Constructed vector embedding workflows via Amazon Bedrock, including a custom chunking system that improved semantic search relevancy from 55% to 85% by intelligently segmenting technical content into meaningful units for embedding",
        "Drove engineering quality for a 5-person agile team by managing the GitHub codebase, leading sprints, enforcing pull request reviews, adopting best practices, and setting up CI/CD pipelines",
      ],
    },
    {
      id: "msu-la",
      org: "Michigan State",
      title: "Undergraduate Learner’s Assistant",
      logo: "project-assets/company-logos/michigan_state_university.svg",
      start: "2023-01",
      end: "2024-05",
      summary:
        "Mentored students in C++ and software design, providing support that strengthened their coding skills and understanding of key concepts.",
      tags: ["C++", "Mentorship", "Debugging"],
      bullets: [
        "Mentored over 500 undergraduate students by delivering hands-on code reviews, debugging support, and conceptual guidance on object-oriented programming principles",
        "Led structured lab sessions and individualized assistance to reinforce core topics such as memory management, inheritance hierarchies, and modular function design",
        "Elevated student comprehension and code quality by clarifying complex language features and guiding effective software design practices",
      ],
    },
    {
      id: "roblox",
      org: "Roblox",
      title: "2 internships",
      logo: "project-assets/company-logos/roblox.svg",
      start: "2022-05",
      end: "2023-08",
      summary:
        "Two summers at Roblox: building a multiplayer experience from zero to one, then growing the creator community worldwide.",
      tags: ["Lua", "Community", "Frontend", "Backend"],
      roles: [
        {
          title: "Community Manager Intern",
          dates: "May 2023 – Aug 2023",
          bullets: [
            "Directed the creation of the Connect Hub to facilitate networking among 100,000+ creators for the Connect 2023 event, executing weekly sprints and QA testing, resulting in a 20% increase in event participation",
            "Identified gaps in creator education across regions and launched a multilingual training program focused on game development fundamentals, piloting it in the Portuguese developer community and generating 20+ valid submissions in the first week",
          ],
        },
        {
          title: "Summer Accelerator Intern",
          dates: "May 2022 – Jul 2022",
          bullets: [
            "Engineered both frontend and backend systems in Lua to support a multiplayer gameplay prototype, improving real-time responsiveness and overall server performance",
            "Partnered with a 5-person team to architect, implement, and debug modular systems, ensuring scalable client-server communication and feature extensibility",
            "Delivered a fully functional multiplayer prototype within aggressive deadlines, establishing a foundation for future iteration and external community testing",
          ],
        },
      ],
    },
  ],

  education: [
    {
      id: "georgia-tech",
      org: "Georgia Tech",
      orgFull: "Georgia Institute of Technology",
      title: "M.S. Computer Science",
      degree: "M.S. in Computer Science",
      logo: "project-assets/company-logos/georgia_tech.svg",
      start: "2027-01",
      end: "",
      summary:
        "Graduate study in computer science, building on my B.S. from Michigan State and my work in backend systems, cloud and machine learning.",
      highlights: [],
      courses: [],
    },
    {
      id: "michigan-state",
      org: "Michigan State",
      orgFull: "Michigan State University",
      title: "B.S. Computer Science",
      degree: "B.S. in Computer Science",
      logo: "project-assets/company-logos/michigan_state_university.svg",
      start: "2022-09",
      end: "2025-05",
      summary: "Computer science with a pre-law cognate. Dean’s List.",
      highlights: ["Dean’s List", "Pre-Law Cognate"],
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
  ],

  projects: [
    {
      id: "semantic-search",
      title: "Semantic Search for Code Assets",
      short: "Semantic Search",
      context: "Amazon capstone",
      start: "2025-01",
      end: "2025-05",
      summary: "Natural-language discovery for code and architecture assets with LLMs and OpenSearch.",
      stats: "1,500+ assets indexed · 55% → 85% relevance",
      cover: { glyph: "{ }", from: "#8ec5ff", to: "#3b5bdb" },
      card: "AWS Bedrock, OpenSearch and LLM retrieval",
      tech: ["AWS", "Python", "LLMs", "Bedrock", "OpenSearch", "LangChain", "Docker", "Postman"],
      media: ["project-assets/videos/SSVideo.mp4"],
      link: "",
      bullets: [
        "Constructed a pipeline to parse and extract metadata from 1,000+ code assets (Python, JavaScript, C++), enabling semantic indexing for large-scale technical documentation",
        "Engineered vector embedding workflows using Amazon Bedrock and custom models, optimizing searchable representations of code and architecture",
        "Deployed a cloud-native search platform (OpenSearch, Lambda, S3) with LLM-backed retrieval, improving code discovery accuracy by 35% and reducing latency",
      ],
    },
    {
      id: "recipe-sourcing",
      title: "AI-Powered Recipe Sourcing Tool",
      short: "Recipe Sourcing",
      context: "Course project",
      start: "2025-05",
      end: "2025-06",
      summary: "LLM-backed recipe retrieval over 100+ indexed recipes, paired with Kroger API pricing and product links.",
      stats: "100+ recipes indexed · live ingredient pricing",
      cover: { glyph: "AI", from: "#f0abfc", to: "#9d4edd" },
      card: "Ollama, ChromaDB and the Kroger API",
      tech: ["Python", "Flask", "Ollama", "Llama3", "ChromaDB", "Git"],
      media: [],
      link: "",
      bullets: [
        "Built an end-to-end semantic search platform with Ollama (Llama3) and ChromaDB, indexing 100+ recipes for natural-language queries and precise retrieval",
        "Integrated the Kroger API in Python with OAuth 2.0, request batching, and error recovery for real-time ingredient pricing, availability, and product links",
        "Shipped concept to MVP across three agile sprints using a modular stack (Flask backend, LLM parsing, batch pipelines) and user feedback to prioritize live data and resilience",
      ],
    },
    {
      id: "park-assist",
      title: "Active Park Assist System",
      short: "Park Assist",
      context: "Course project",
      start: "2024-08",
      end: "2024-11",
      summary: "Embedded APA spec, simulation, and HMI flows for assisted parking.",
      stats: "Parallel, perpendicular and obstacle scenarios",
      cover: { glyph: "P", from: "#67e8f9", to: "#0e7490" },
      card: "Embedded spec, simulation and HMI flows",
      tech: ["Embedded Systems", "Simulation", "UML"],
      media: [
        "project-assets/videos/APATitle.mp4",
        "project-assets/videos/APAScenario1.mp4",
        "project-assets/videos/APAScenario2.mp4",
      ],
      link: "",
      bullets: [
        "Wrote a UML-heavy SRS: use cases, states and the domain model",
        "Built a 3D prototype covering parallel, perpendicular and obstacle cases",
        "Modeled sensor, vehicle control and HMI logic in real time",
      ],
    },
    {
      id: "physics-engine",
      title: "2D Basketball Physics Engine",
      short: "Physics Engine",
      context: "Personal",
      start: "2023-08",
      end: "2023-11",
      summary: "C++ physics, collisions, and scoring in a small playable prototype.",
      stats: "Custom motion and collision in C++",
      cover: { glyph: "2D", from: "#fde68a", to: "#d97706" },
      card: "C++ collisions, scoring and rendering",
      tech: ["C++", "Physics", "Rendering"],
      media: [],
      link: "https://github.com/zabualfe/2D-Basketball-Physics-Engine",
      bullets: [
        "Custom motion and collision in C++",
        "Scoring loop tied to physics events",
        "Playable 2D prototype",
      ],
    },
  ],

  talks: [
    {
      id: "rdc24-accessibility",
      title: "Why Adding Accessibility Is Impactful to the User Experience",
      event: "RDC24",
      about: "Explores accessibility for visual, hearing, and physical disabilities, with settings that improve user experience.",
      youtube: "_4h7SzlhhRU",
    },
    {
      id: "intro-programming",
      title: "Introduction to Programming",
      event: "Roblox Global Developer Challenge",
      about: "A workshop on programming basics: variables, loops, functions, and related fundamentals.",
      youtube: "cvUSE2Q0hcw",
    },
    {
      id: "designing-accessibility",
      title: "Designing for Accessibility",
      event: "Panel",
      about: "Panel on designing accessible experiences for users with physical disabilities.",
      youtube: "K1pEI6LVJJA",
    },
  ],

  certifications: [
    {
      id: "aws-saa",
      title: "AWS Certified Solutions Architect – Associate",
      short: "AWS Certified",
      date: "Jan 2026",
      url: "https://www.credly.com/badges/6a683961-4120-4fdd-874c-5fff2d26abf3/linked_in_profile",
      badge: "https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
    },
  ],

  // Featured tiles in the Skills row (logo SVGs from Devicon), then the full list for search.
  skills: {
    featured: [
      { name: "Python", icon: "project-assets/skills/python.svg", color: "#c4b5fd", with: "With Flask, Django and LangChain" },
      { name: "AWS", icon: "project-assets/skills/aws.svg", color: "#fde68a", with: "With S3, Lambda, Bedrock and OpenSearch" },
      { name: "C++", icon: "project-assets/skills/cplusplus.svg", color: "#8ec5ff", with: "With physics, systems and OOP" },
      { name: "TypeScript", icon: "project-assets/skills/typescript.svg", color: "#f0abfc", with: "With React, Node and JavaScript" },
    ],
    all: [
      "Python", "C/C++", "Lua", "HTML", "CSS", "JavaScript", "TypeScript", "SQL", "XML",
      "Flask", "Django", "LangChain", "React", "Linux",
      "Git", "GitHub", "Jira", "Docker", "Postman", "AWS", "Azure", "Google Cloud", "MongoDB",
    ],
  },

  // Quick-access tiles on Home, by item id.
  quick: ["capital-one", "georgia-tech", "amazon", "roblox", "michigan-state", "aws-saa"],
};
