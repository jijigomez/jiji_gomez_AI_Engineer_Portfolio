import React, { useEffect, useState } from "react";

import $ from "jquery";
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Github,
  Linkedin,
  Mail,
  Menu,
  Mic2,
  Network,
  ScanEye,
  Sparkles,
  X,
  Cpu,
  ExternalLink,
  FileText,
  Download,
} from "lucide-react";

const projects = [
  {
    number: "01",
    icon: Mic2,
    type: "EDGE AI · AUDIO",
    title: "Real-Time Speech Enhancement",
    description: "Noise reduction and speech intelligibility on an embedded AI platform.",
    tags: ["Python", "Edge AI", "Audio", "Femto SPU-001"],
    accent: "coral",
    link: "https://github.com/jijigomez",
  },
  {
    number: "02",
    icon: BrainCircuit,
    type: "GENERATIVE AI · RAG",
    title: "Document Q&A Assistant",
    description: "Retrieval-augmented QA grounded in document context.",
    tags: ["Python", "LLMs", "RAG", "Embeddings"],
    accent: "violet",
    link: "https://github.com/jijigomez",
  },
  {
    number: "03",
    icon: Network,
    type: "MACHINE LEARNING",
    title: "Hybrid Recommendation System",
    description: "Collaborative + content-based signals, served via a web API.",
    tags: ["Scikit-learn", "Django", "REST", "AWS"],
    accent: "blue",
    link: "https://github.com/jijigomez",
  },
  {
    number: "04",
    icon: ScanEye,
    type: "COMPUTER VISION",
    title: "Image Classification",
    description: "Transfer learning pipeline with preprocessing and augmentation.",
    tags: ["TensorFlow", "CNN", "Transfer Learning"],
    accent: "pink",
    link: "https://github.com/jijigomez",
  },
  {
    number: "05",
    icon: Cpu,
    type: "IOT · ENERGY",
    title: "Solar Charging Parking System",
    description: "IoT-monitored solar vehicle charging for smart parking.",
    tags: ["IoT", "Solar", "Automation"],
    accent: "blue",
    link: "https://github.com/jijigomez",
  },
];

const skillGroups = [
  {
    title: "AI & ML",
    icon: BrainCircuit,
    skills: ["Machine Learning", "Deep Learning", "Scikit-learn", "TensorFlow", "Computer Vision", "Recommenders"],
  },
  {
    title: "Generative AI",
    icon: Sparkles,
    skills: ["LLMs", "RAG", "Prompt Engineering", "Embeddings", "LangChain", "Hugging Face"],
  },
  {
    title: "Engineering",
    icon: Code2,
    skills: ["Python", "SQL", "Django", "FastAPI", "React", "REST APIs", "Git"],
  },
  {
    title: "Data & BI",
    icon: Network,
    skills: ["Power BI", "Pandas", "NumPy", "EDA", "Visualization", "Tableau"],
  },
  {
    title: "Cloud",
    icon: Cpu,
    skills: ["AWS", "EC2", "S3", "Docker", "Model Deployment", "CI/CD"],
  },
];

const journey = [
  {
    period: "2023 — Present",
    title: "Data Scientist · AI/ML Engineer",
    company: "Spectrum Softech Solutions · Kochi",
    description: "End-to-end AI solutions — GenAI, NLP, recommenders, CV. REST APIs, AWS deployment, and technical training.",
  },
  {
    period: "2022 — 2023",
    title: "Junior Data Scientist",
    company: "Oracuz Infotech",
    description: "Business problems to ML solutions: preprocessing, modeling, evaluation across predictive analytics and GenAI.",
  },
  {
    period: "2020 — 2022",
    title: "M.Sc. Electronics",
    company: "Marthoma College of Science & Technology",
    description: "Foundation in electronic systems, analytical thinking, and engineering principles.",
  },
];

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">
        <span className="eyebrow-dot" />
        {eyebrow}
      </p>
      <h2>{title}</h2>
    </div>
  );
}

const ROLES = ["AI ENGINEER", "GEN AI ENGINEER", "DATA SCIENTIST"];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [roleIndex, setRoleIndex] = useState(0);
  const [rolePhase, setRolePhase] = useState("is-visible");
  const filters = ["All", "GenAI", "Machine Learning", "Computer Vision", "Edge AI"];
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "GenAI") return project.type.includes("GENERATIVE AI");
    if (activeFilter === "Machine Learning") return project.type.includes("MACHINE LEARNING");
    if (activeFilter === "Computer Vision") return project.type.includes("COMPUTER VISION");
    return project.type.includes("EDGE AI");
  });

  useEffect(() => {
    const $window = $(window);
    const $document = $(document);

    const onScroll = () => {
      $(".reveal").each(function () {
        const top = $(this).offset().top;
        if (top < window.scrollY + window.innerHeight * 0.88) {
          $(this).addClass("is-visible");
        }
      });
      $(".site-header").toggleClass("scrolled", window.scrollY > 18);
    };

    const onAnchorClick = function (event) {
      const href = $(this).attr("href");
      if (href && href.startsWith("#")) {
        const $target = $(href);
        if ($target.length) {
          event.preventDefault();
          $("html, body").stop().animate({ scrollTop: $target.offset().top - 78 }, 550);
          setMenuOpen(false);
        }
      }
    };

    $document.on("click.portfolio", 'a[href^="#"]', onAnchorClick);
    $window.on("scroll.portfolio", onScroll);
    onScroll();

    return () => {
      $document.off(".portfolio");
      $window.off(".portfolio");
    };
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setRolePhase("is-leaving");
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setRolePhase("is-entering");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setRolePhase("is-visible"));
        });
      }, 220);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-shell">
      <style>{`
        .robot-visual {
          --robot-blue: #00e5a8;
          --robot-dark: #0a1218;
          position: relative;
          min-height: 520px;
          display: grid;
          place-items: center;
          isolation: isolate;
          overflow: hidden;
          border-radius: 24px;
          background:
            radial-gradient(ellipse at 50% 48%, rgba(0, 229, 168, .12), transparent 48%),
            linear-gradient(145deg, #0c0e12 0%, #12151c 55%, #0a0c10 100%);
          border: 1px solid rgba(0, 229, 168, .12);
        }
        .robot-scene-grid {
          position: absolute; inset: 0; opacity: .22;
          background-image: linear-gradient(rgba(107,159,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(107,159,255,.08) 1px, transparent 1px);
          background-size: 36px 36px;
          mask-image: linear-gradient(to bottom, transparent, #000 22%, #000 82%, transparent);
          transform: perspective(600px) rotateX(58deg) scale(1.5) translateY(28%);
          transform-origin: bottom;
        }
        .robot-glow {
          position: absolute; width: 300px; height: 300px; border-radius: 50%;
          background: rgba(0, 229, 168, .12); filter: blur(60px); bottom: 12%;
        }
        .robot-status {
          position: absolute; z-index: 4; top: 20px; padding: 8px 11px;
          border: 1px solid rgba(107,159,255,.16); border-radius: 999px;
          background: rgba(9,22,37,.7); color: #7a9590; font-size: 9px;
          letter-spacing: .12em; backdrop-filter: blur(10px);
        }
        .robot-status strong { color: #00e5a8; margin-left: 6px; }
        .status-left { left: 18px; display: flex; align-items: center; gap: 7px; }
        .status-right { right: 18px; }
        .walking-robot {
          position: relative; z-index: 3; width: 230px; height: 390px;
          display: flex; justify-content: center; align-items: flex-start;
          animation: robot-bob 1.05s ease-in-out infinite;
          filter: drop-shadow(0 16px 24px rgba(0,0,0,.28));
        }
        .robot-body { position: relative; width: 168px; height: 360px; }
        .robot-head {
          position: absolute; width: 104px; height: 84px; top: 16px; left: 32px;
          border-radius: 30px 30px 26px 26px;
          background: linear-gradient(145deg,#f4fbff 0%,#a9c3d2 48%,#647f94 100%);
          border: 3px solid #d6edf7; box-shadow: inset -8px -7px 12px rgba(24,52,73,.22), 0 0 20px rgba(75,197,255,.16);
          z-index: 5;
        }
        .robot-antenna { position:absolute; top: 0; left: 80px; width: 4px; height: 18px; background:#b9dce9; border-radius:4px; }
        .robot-antenna:after { content:""; position:absolute; width:9px; height:9px; left:-2.5px; top:-6px; border-radius:50%; background:#65dcff; box-shadow:0 0 12px #65dcff; }
        .robot-ear { position:absolute; top:26px; width:11px; height:28px; border-radius:6px; background:linear-gradient(#8ba8ba,#e6f7ff); }
        .ear-left { left:-9px; } .ear-right { right:-9px; }
        .robot-face {
          position:absolute; inset:14px 11px 12px; border-radius:20px;
          background:linear-gradient(145deg,#142d43,#071522);
          display:flex; align-items:center; justify-content:center; gap:22px;
          box-shadow:inset 0 0 16px rgba(65,190,255,.14);
        }
        .robot-eye { width:11px; height:6px; border-radius:50%; background:#73e5ff; box-shadow:0 0 9px 2px rgba(72,207,255,.7); animation: robot-blink 4.5s infinite; }
        .robot-mouth { position:absolute; width:17px; height:3px; bottom:12px; border-radius:4px; background:#6acff1; opacity:.8; }
        .robot-neck { position:absolute; top:96px; left:70px; width:26px; height:17px; background:linear-gradient(90deg,#607d91,#e2f4fb,#718da0); border-radius:5px; }
        .robot-torso {
          position:absolute; top:110px; left:35px; width:98px; height:114px;
          border-radius:22px 22px 18px 18px;
          background:linear-gradient(110deg,#effaff 0%,#9fb9c9 42%,#58758c 100%);
          border:2px solid #d8eff8; box-shadow:inset -9px -5px 12px rgba(20,49,70,.22);
        }
        .robot-chest-light { position:absolute; width:30px; height:30px; border-radius:50%; top:28px; left:32px; border:3px solid #9beaff; box-shadow:0 0 14px rgba(74,205,255,.55), inset 0 0 10px rgba(74,205,255,.45); }
        .robot-chest-line { position:absolute; width:56px; height:3px; top:76px; left:19px; border-radius:3px; background:#526f84; }
        .robot-core-dot { position:absolute; width:6px; height:6px; top:74px; left:44px; border-radius:50%; background:#75e4ff; box-shadow:0 0 7px #75e4ff; }
        .robot-arm { position:absolute; top:122px; width:27px; height:104px; transform-origin:top center; }
        .arm-left { left:16px; animation: robot-arm-left 1.05s ease-in-out infinite; }
        .arm-right { right:16px; animation: robot-arm-right 1.05s ease-in-out infinite; }
        .robot-joint { display:block; width:25px; height:36px; border-radius:12px; background:linear-gradient(90deg,#647f92,#e4f5fc,#849eaf); border:1px solid #d6edf7; }
        .robot-forearm { display:block; width:20px; height:44px; margin:2px auto 0; border-radius:11px; background:linear-gradient(90deg,#718da1,#dceef6,#718da1); }
        .robot-hand { display:block; width:22px; height:18px; margin:0 auto; border-radius:7px 7px 11px 11px; background:#a9c3d2; }
        .robot-hip { position:absolute; top:218px; left:45px; width:76px; height:24px; border-radius:9px; background:linear-gradient(#d8edf5,#718da1); }
        .robot-leg { position:absolute; top:232px; width:35px; height:118px; transform-origin:top center; }
        .leg-left { left:44px; animation: robot-leg-left 1.05s ease-in-out infinite; }
        .leg-right { right:44px; animation: robot-leg-right 1.05s ease-in-out infinite; }
        .robot-knee { display:block; width:31px; height:31px; margin:0 auto; border-radius:10px; background:linear-gradient(135deg,#e8f7fc,#7793a6); border:1px solid #d7edf5; }
        .robot-shin { display:block; width:25px; height:52px; margin:1px auto 0; border-radius:8px; background:linear-gradient(90deg,#647f92,#e0f1f8,#7894a6); }
        .robot-foot { display:block; width:40px; height:15px; margin:-1px 0 0 -2px; border-radius:7px 12px 6px 6px; background:linear-gradient(#eaf8fc,#819daf); }
        .robot-shadow { position:absolute; width:175px; height:22px; bottom:0; left:28px; border-radius:50%; background:rgba(0,0,0,.36); filter:blur(8px); animation: robot-shadow 1.05s ease-in-out infinite; }
        .robot-float-card {
          position:absolute; z-index:4; display:flex; align-items:center; gap:7px;
          padding:9px 11px; border-radius:9px; color:#a8f0d8; font-size:8px;
          letter-spacing:.1em; background:rgba(12,31,49,.8);
          border:1px solid rgba(107,159,255,.18); box-shadow:0 8px 22px rgba(0,0,0,.14);
          backdrop-filter:blur(10px); animation: robot-card-float 4s ease-in-out infinite;
        }
        .robot-float-card svg { color:#00e5a8; }
        .float-card-one { top:26%; left:5%; }
        .float-card-two { top:48%; right:4%; animation-delay:-1.3s; }
        .float-card-three { bottom:16%; left:7%; animation-delay:-2.4s; }
        .robot-caption { position:absolute; z-index:4; bottom:18px; left:20px; right:20px; color:#5c7a72; font-size:8px; letter-spacing:.14em; text-align:center; }
        .robot-caption span { color:#00e5a8; margin-right:8px; }
        @keyframes robot-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes robot-leg-left { 0%,100%{transform:rotate(22deg)} 50%{transform:rotate(-22deg)} }
        @keyframes robot-leg-right { 0%,100%{transform:rotate(-22deg)} 50%{transform:rotate(22deg)} }
        @keyframes robot-arm-left { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)} }
        @keyframes robot-arm-right { 0%,100%{transform:rotate(20deg)} 50%{transform:rotate(-20deg)} }
        @keyframes robot-shadow { 0%,100%{transform:scaleX(1);opacity:.6} 50%{transform:scaleX(.82);opacity:.38} }
        @keyframes robot-card-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        @keyframes robot-blink { 0%,45%,48%,100%{transform:scaleY(1)} 46%,47%{transform:scaleY(.12)} }
        @media (max-width: 900px) {
          .robot-visual { min-height:460px; }
          .walking-robot { transform:scale(.88); }
          .float-card-one { left:2%; } .float-card-two { right:2%; }
        }
        @media (max-width: 560px) {
          .robot-visual { min-height:400px; border-radius:18px; }
          .walking-robot { transform:scale(.74); transform-origin:center center; }
          .robot-status { top:12px; font-size:7px; padding:6px 8px; }
          .status-left { left:10px; } .status-right { right:10px; }
          .robot-float-card { font-size:7px; padding:7px; }
          .float-card-one { top:24%; } .float-card-two { top:46%; }
          .float-card-three { bottom:13%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .walking-robot, .robot-arm, .robot-leg, .robot-shadow, .robot-float-card, .robot-eye { animation:none !important; }
        }
      `}</style>

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Jiji Gomez home">
          <span className="brand-mark"><BrainCircuit size={18} /></span>
          <span>JIJI<span className="brand-slash">/</span>GOMEZ</span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {["Home", "About", "Skills", "Projects", "Journey", "Resume", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Contact <ArrowUpRight size={13} />
          </a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero section-wrap" id="home">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="eyebrow-dot" />
                <span className={`role-rotate ${rolePhase}`}>{ROLES[roleIndex]}</span>
              </p>
              <h1>
                Ideas into<br />
                <span className="gradient-text">intelligence.</span>
              </h1>
              <p className="hero-description">
                Building practical AI systems — ML, GenAI, and production software.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Projects <ArrowUpRight size={16} />
                </a>
                <a className="button button-secondary" href="#contact">
                  Contact
                </a>
              </div>
              <div className="hero-meta">
                <span><span className="status-pulse" /> OPEN TO OPPORTUNITIES</span>
                <span>PYTHON · ML · GENAI · EDGE</span>
              </div>
            </div>

            <div className="hero-visual robot-visual" aria-label="Animated AI robot">
              <div className="robot-scene-grid" />
              <div className="robot-glow" />
              <div className="robot-status status-left"><span className="status-pulse" /> ONLINE</div>
              <div className="robot-status status-right">CORE <strong>98.7%</strong></div>

              <div className="walking-robot" aria-hidden="true">
                <div className="robot-shadow" />
                <div className="robot-body">
                  <div className="robot-antenna" />
                  <div className="robot-head">
                    <div className="robot-ear ear-left" />
                    <div className="robot-ear ear-right" />
                    <div className="robot-face">
                      <span className="robot-eye" />
                      <span className="robot-eye" />
                      <span className="robot-mouth" />
                    </div>
                  </div>
                  <div className="robot-neck" />
                  <div className="robot-torso">
                    <span className="robot-chest-light" />
                    <span className="robot-chest-line" />
                    <span className="robot-core-dot" />
                  </div>
                  <div className="robot-arm arm-left"><span className="robot-joint" /><span className="robot-forearm" /><span className="robot-hand" /></div>
                  <div className="robot-arm arm-right"><span className="robot-joint" /><span className="robot-forearm" /><span className="robot-hand" /></div>
                  <div className="robot-hip" />
                  <div className="robot-leg leg-left"><span className="robot-knee" /><span className="robot-shin" /><span className="robot-foot" /></div>
                  <div className="robot-leg leg-right"><span className="robot-knee" /><span className="robot-shin" /><span className="robot-foot" /></div>
                </div>
              </div>

              <div className="robot-float-card float-card-one"><BrainCircuit size={14} /><span>NEURAL NET</span></div>
              <div className="robot-float-card float-card-two"><Cpu size={14} /><span>EDGE AI</span></div>
              <div className="robot-float-card float-card-three"><Sparkles size={14} /><span>LEARNING</span></div>
              <div className="robot-caption"><span>01</span> HUMAN × MACHINE</div>
            </div>
          </div>
          <a href="#about" className="scroll-cue">
            <span className="scroll-line" /> SCROLL <ArrowDown size={13} />
          </a>
        </section>

        {/* ABOUT */}
        <section className="section-wrap content-section" id="about">
          <SectionHeading
            eyebrow="ABOUT"
            title={<>Engineering with <span className="gradient-text">purpose.</span></>}
          />
          <div className="about-layout">
            <div className="about-copy reveal">
              <p>
                Data scientist and AI engineer focused on ML, GenAI, NLP, and computer vision — from data and models to APIs and deployment.
              </p>
              <p>
                I also teach Python and AI, combining hands-on experimentation with clarity and real-world impact.
              </p>
            </div>
            <div className="about-note reveal">
              <span className="note-label">APPROACH</span>
              <div className="note-item">
                <span>01</span>
                <div><strong>Understand</strong><p>User, context, data.</p></div>
              </div>
              <div className="note-item">
                <span>02</span>
                <div><strong>Build</strong><p>Practical models, solid engineering.</p></div>
              </div>
              <div className="note-item">
                <span>03</span>
                <div><strong>Measure</strong><p>Evaluate, iterate, ship.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section-wrap content-section" id="skills">
          <SectionHeading
            eyebrow="TOOLKIT"
            title={<>Skills that <span className="gradient-text">ship.</span></>}
          />
          <div className="skills-grid">
            {skillGroups.map(({ title, icon: Icon, skills }, i) => (
              <article className="skill-card reveal" key={title}>
                <div className="skill-card-head">
                  <span className="skill-icon"><Icon size={18} /></span>
                  <span className="card-index">0{i + 1}</span>
                </div>
                <h3>{title}</h3>
                <div className="skill-tags">
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section-wrap content-section" id="projects">
          <SectionHeading
            eyebrow="WORK"
            title={<>Selected <span className="gradient-text">projects.</span></>}
          />
          <div className="project-toolbar">
            <span className="project-count">
              {String(filteredProjects.length).padStart(2, "0")} PROJECTS
            </span>
            <div className="filter-list" aria-label="Filter projects">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={activeFilter === filter ? "filter active" : "filter"}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="projects-grid">
            {filteredProjects.map(({ number, icon: Icon, type, title, description, tags, accent, link }) => (
              <article className={`project-card ${accent} reveal`} key={title}>
                <div className="project-card-top">
                  <span className="project-number">{number}</span>
                  <a href={link} target="_blank" rel="noreferrer" aria-label={`Open ${title}`}>
                    <ArrowUpRight size={17} />
                  </a>
                </div>
                <div className="project-art">
                  <img
                    className="project-image"
                    src={
                      type.includes("EDGE AI")
                        ? "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
                        : type.includes("GENERATIVE AI")
                        ? "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80"
                        : type.includes("MACHINE LEARNING")
                        ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
                        : "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"
                    }
                    alt=""
                    loading="lazy"
                  />
                  <div className="project-image-overlay" />
                  <div className="art-ring ring-one" />
                  <div className="art-ring ring-two" />
                  <div className="art-core"><Icon size={30} strokeWidth={1.2} /></div>
                </div>
                <p className="project-type">{type}</p>
                <h3>{title}</h3>
                <p className="project-description">{description}</p>
                <div className="project-tags">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a className="project-link" href={link} target="_blank" rel="noreferrer">
                  View <ExternalLink size={13} />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* JOURNEY */}
        <section className="journey-section" id="journey">
          <div className="section-wrap content-section">
            <SectionHeading
              eyebrow="JOURNEY"
              title={<>Path so <span className="gradient-text">far.</span></>}
            />
            <div className="timeline">
              {journey.map((item, index) => (
                <article className="timeline-item reveal" key={item.title}>
                  <div className="timeline-marker">{String(index + 1).padStart(2, "0")}</div>
                  <div className="timeline-content">
                    <span className="timeline-period">{item.period}</span>
                    <h3>{item.title}</h3>
                    <p className="timeline-company">{item.company}</p>
                    <p className="timeline-description">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* RESUME */}
        <section className="section-wrap content-section resume-section" id="resume">
          <SectionHeading
            eyebrow="RESUME"
            title={<>Experience at a <span className="gradient-text">glance.</span></>}
          />
          <div className="resume-layout">
            <div className="resume-card reveal">
              <div className="resume-card-icon"><FileText size={26} /></div>
              <p className="project-type">PROFILE</p>
              <h3>Jiji Gomez</h3>
              <p className="resume-summary">
                AI Engineer & Data Scientist — ML, GenAI, analytics, and full-stack deployment. Also delivers technical training.
              </p>
              <div className="resume-actions">
                <a className="button button-primary" href="/jiji_Gomez_AI_Engineer_Resume.pdf" download>
                  <Download size={15} /> Resume
                </a>
                <a
                  className="button button-secondary"
                  href="https://www.linkedin.com/in/jiji-gomez-640b2a24b/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>
            </div>
            <div className="resume-highlights reveal">
              <div className="resume-highlight">
                <span>01</span>
                <div>
                  <h4>AI & ML</h4>
                  <p>Models, CV, recommenders, evaluation.</p>
                </div>
              </div>
              <div className="resume-highlight">
                <span>02</span>
                <div>
                  <h4>GenAI & NLP</h4>
                  <p>LLMs, RAG, embeddings, prompting.</p>
                </div>
              </div>
              <div className="resume-highlight">
                <span>03</span>
                <div>
                  <h4>Software</h4>
                  <p>Python, Django, FastAPI, AWS.</p>
                </div>
              </div>
              <div className="resume-highlight">
                <span>04</span>
                <div>
                  <h4>Education</h4>
                  <p>M.Sc. Electronics</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section-wrap contact-section" id="contact">
          <div className="contact-panel reveal">
            <div className="contact-glow" />
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              LET'S TALK
            </p>
            <h2>
              Build something<br />
              <span className="gradient-text">intelligent.</span>
            </h2>
            <p className="contact-description">
              AI idea, role, or collaboration — reach out.
            </p>
            <div className="contact-actions">
              <a className="button button-primary" href="mailto:your.email@example.com">
                <Mail size={15} /> Email
              </a>
              <a
                className="button button-secondary"
                href="https://www.linkedin.com/in/jiji-gomez-640b2a24b/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={15} /> LinkedIn
              </a>
              <a
                className="button button-secondary"
                href="https://github.com/jijigomez"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={15} /> GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="brand" href="#home">
          <span className="brand-mark"><BrainCircuit size={16} /></span>
          <span>JIJI<span className="brand-slash">/</span>GOMEZ</span>
        </a>
        <p>Designed with curiosity.</p>
        <span className="footer-copy">© {new Date().getFullYear()} JIJI GOMEZ</span>
      </footer>
    </div>
  );
}