import React from "react";
import { useEffect, useState } from "react";
import $ from "jquery";
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, BrainCircuit, Code2, Github,
  Linkedin, Mail, Menu, Mic2, Network, ScanEye, Sparkles, X, Cpu, ExternalLink, FileText, Download
} from "lucide-react";

const projects = [
  {
    number: "01",
    icon: Mic2,
    type: "EDGE AI · AUDIO",
    title: "Real-Time Speech Enhancement",
    description: "Exploring AI-powered background-noise reduction and speech intelligibility for real-time audio using an embedded AI platform.",
    tags: ["Python", "Edge AI", "Audio Processing", "Femto SPU-001"],
    accent: "coral",
    link: "https://github.com/jijigomez"
  },
  {
    number: "02",
    icon: BrainCircuit,
    type: "GENERATIVE AI · RAG",
    title: "Document Q&A Assistant",
    description: "A retrieval-augmented question-answering workflow designed to ground responses in document context.",
    tags: ["Python", "LLMs", "RAG", "Embeddings"],
    accent: "violet",
    link: "https://github.com/jijigomez"
  },
  {
    number: "03",
    icon: Network,
    type: "MACHINE LEARNING",
    title: "Hybrid Recommendation System",
    description: "A recommendation approach combining collaborative and content-based signals, exposed through a web application.",
    tags: ["Scikit-learn", "Django", "REST API", "AWS"],
    accent: "blue",
    link: "https://github.com/jijigomez"
  },
  {
    number: "04",
    icon: ScanEye,
    type: "COMPUTER VISION",
    title: "Image Classification",
    description: "A deep-learning workflow using image preprocessing, augmentation, and transfer learning to classify visual data.",
    tags: ["TensorFlow", "CNN", "Transfer Learning", "Python"],
    accent: "pink",
    link: "https://github.com/jijigomez"
  },
  {
    number: "05",
    icon: Cpu,
    type: "IOT · RENEWABLE ENERGY",
    title: "IoT-Integrated Solar Charging Car Parking System",
    description: "An academic project exploring solar-powered vehicle charging with IoT-based monitoring and automation for a smart parking environment.",
    tags: ["IoT", "Solar Energy", "Automation", "Electronics"],
    accent: "blue",
    link: "https://github.com/jijigomez"
  }
];

const skillGroups = [
  {
    title: "AI & Machine Learning",
    icon: BrainCircuit,
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Scikit-learn",
      "TensorFlow / Keras",
      "Computer Vision",
      "Recommendation Systems",
    ],
  },
  {
    title: "Generative AI",
    icon: Sparkles,
    skills: [
      "LLMs",
      "RAG",
      "Prompt Engineering",
      "Embeddings",
      "LangChain",
      "Hugging Face",
      "NLP",
    ],
  },
  {
    title: "Software Development",
    icon: Code2,
    skills: [
      "Python",
      "SQL",
      "Django",
      "FastAPI",
      "React.js",
      "REST APIs",
      "HTML / CSS / JavaScript",
      "Git / GitHub",
    ],
  },
  {
    title: "Data Analytics & BI",
    icon: Network,
    skills: [
      "Power BI",
      "Microsoft Excel",
      "Pandas",
      "NumPy",
      "Data Cleaning",
      "Exploratory Data Analysis",
      "Data Visualization",
      "Tableau",
      "Statistics",
    ],
  },
  {
    title: "Cloud & Deployment",
    icon: Cpu,
    skills: [
      "AWS",
      "Amazon EC2",
      "Amazon S3",
      "Docker",
      "Model Deployment",
      "CI/CD Fundamentals",
    ],
  },
];

const journey = [
{
  period: "AUG 2023 — PRESENT",
  title: "Data Scientist | AI/ML Engineer",
  company: "Spectrum Softech Solutions Pvt. Ltd. · Kochi",
  description:
    "Designing and developing end-to-end AI/ML solutions, from data preprocessing and feature engineering to model training, evaluation, and application integration. Building intelligent applications across Generative AI, NLP, recommendation systems, predictive analytics, and computer vision using Python, TensorFlow, Scikit-learn, and Django. Developing REST APIs and supporting cloud-based deployment on AWS to integrate machine learning capabilities into practical software solutions. Additionally, delivering hands-on technical training in Python, Data Science, Machine Learning, and Deep Learning."
},
{
  period: "2022 — 2023",
  title: "Junior Data Scientist",
  company: "Oracuz Infotech Pvt. Ltd.",
  description:
    "Worked on practical AI and data science projects focused on translating business problems into data-driven solutions. Applied data preprocessing, exploratory data analysis, feature engineering, machine learning model development, and performance evaluation across predictive analytics, recommendation systems, NLP, generative AI, and computer vision. Gained hands-on experience in developing and integrating intelligent solutions into application workflows."
},
{
  period: "2020 — 2022",
  title: "Master of Science (M.Sc.) in Electronics",
  company: "Marthoma College of Science and Technology",
  description:
    "Completed postgraduate studies in Electronics, building a foundation in electronic systems, technical problem-solving, analytical thinking, and engineering principles, with an interest in intelligent and sustainable technology solutions."
    
}
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "GenAI", "Machine Learning", "Computer Vision", "Edge AI"];
  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "GenAI") return project.type.includes("GENERATIVE AI");
    if (activeFilter === "Machine Learning") return project.type.includes("MACHINE LEARNING");
    if (activeFilter === "Computer Vision") return project.type.includes("COMPUTER VISION");
    return project.type.includes("EDGE AI");
  });

  useEffect(() => {
    // jQuery is used for small DOM interactions; React still owns the UI.
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

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Jiji Gomez home">
          <span className="brand-mark"><BrainCircuit size={19} /></span>
          <span>JIJI<span className="brand-slash">/</span>GOMEZ</span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {["Home", "About", "Skills", "Projects", "My Journey", "Resume", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} onClick={closeMenu}>{item}</a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={14} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" />AI ENGINEER / BUILDING INTELLIGENT SYSTEMS</p>
              <h1>Turning ideas<br />into <span className="gradient-text">intelligence.</span></h1>
              <p className="hero-description">I build thoughtful AI solutions with machine learning, generative AI, and real-world software engineering.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">Explore projects <ArrowUpRight size={17} /></a>
                <a className="button button-secondary" href="#contact">Let's connect <ArrowDownRight size={16} /></a>
              </div>
              <div className="hero-meta">
                <span><span className="status-pulse" /> OPEN TO AI OPPORTUNITIES</span>
                <span>PYTHON · ML · GENAI · EDGE AI</span>
              </div>
            </div>

            <div className="hero-visual portrait-visual" aria-label="Editorial portrait placeholder with animated AI graphics">
              <div className="visual-grid" />
              <div className="portrait-halo" />
              <div className="portrait-frame">
                <img className="hero-portrait" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85" alt="Portrait placeholder — replace with Jiji's own professional photo" />
                <div className="portrait-shade" />
                <div className="portrait-label"><span className="status-pulse" /> AI ENGINEER <span>•</span> DATA SCIENTIST</div>
              </div>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="neural-core portrait-core">
                <div className="core-inner"><BrainCircuit size={45} strokeWidth={1.1} /></div>
                <span className="core-node node-a" /><span className="core-node node-b" /><span className="core-node node-c" />
              </div>
              <div className="float-chip chip-top"><Sparkles size={15} /><span>GENERATIVE AI</span></div>
              <div className="float-chip chip-right"><Network size={15} /><span>NEURAL SYSTEMS</span></div>
              <div className="float-chip chip-bottom"><Cpu size={15} /><span>EDGE INTELLIGENCE</span></div>
              <div className="visual-caption"><span>FIG. 01</span> INTELLIGENCE IN MOTION</div>
            </div>
          </div>
          <a href="#about" className="scroll-cue"><span className="scroll-line" />SCROLL TO EXPLORE <ArrowDown size={14} /></a>
        </section>

        <section className="intro-strip">
          <div className="section-wrap strip-inner">
            <span>01 / CURIOUS BY DESIGN</span>
            <p>From data to decisions. From models to meaningful products.</p>
            <span className="strip-decoration">AI × HUMAN IMPACT</span>
          </div>
        </section>

        <section className="section-wrap content-section" id="about">
          <SectionHeading eyebrow="A LITTLE ABOUT ME" title={<>Engineering with <span className="gradient-text">purpose.</span></>} description="I’m a data scientist and AI engineer who enjoys turning complex problems into practical, useful systems." />
          <div className="about-layout">
            <div className="about-copy reveal">
              <p>My work spans machine learning, deep learning, generative AI, NLP, recommendation systems, and computer vision. I care about more than a model's output — I care about the complete experience, from data preparation and evaluation to APIs and deployment.</p>
              <p>I also enjoy teaching and helping others build confidence with Python and AI technologies. My approach combines hands-on experimentation with a focus on clarity, reliability, and real-world value.</p>
              <a className="text-link" href="#contact">More about my work <ArrowUpRight size={16} /></a>
            </div>
            <div className="about-note reveal">
              <span className="note-label">MY APPROACH</span>
              <div className="note-item"><span>01</span><div><strong>Understand the problem</strong><p>Start with the user, context, and data.</p></div></div>
              <div className="note-item"><span>02</span><div><strong>Build with intention</strong><p>Choose practical models and solid engineering.</p></div></div>
              <div className="note-item"><span>03</span><div><strong>Measure real impact</strong><p>Evaluate, iterate, and communicate clearly.</p></div></div>
            </div>
          </div>
        </section>

        <section className="section-wrap content-section" id="skills">
          <SectionHeading eyebrow="MY TOOLKIT" title={<>Skills that build <span className="gradient-text">systems.</span></>} description="A practical toolkit across the AI lifecycle — from data and models to APIs and deployment." />
          <div className="skills-grid">
            {skillGroups.map(({ title, icon: Icon, skills }) => (
              <article className="skill-card reveal" key={title}>
                <div className="skill-card-head"><span className="skill-icon"><Icon size={19} /></span><span className="card-index">TOOLKIT / 0{skillGroups.findIndex(g => g.title === title) + 1}</span></div>
                <h3>{title}</h3>
                <div className="skill-tags">{skills.map(skill => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-wrap content-section" id="projects">
          <SectionHeading eyebrow="SELECTED WORK" title={<>Ideas, built into <span className="gradient-text">systems.</span></>} description="A selection of AI and software projects. Open each repository to explore implementation details." />
          <div className="project-toolbar">
            <span className="project-count">FEATURED PROJECTS <strong>/{String(filteredProjects.length).padStart(2, "0")}</strong></span>
            <div className="filter-list" aria-label="Filter projects">
              {filters.map(filter => <button key={filter} className={activeFilter === filter ? "filter active" : "filter"} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
            </div>
          </div>
          <div className="projects-grid">
            {filteredProjects.map(({ number, icon: Icon, type, title, description, tags, accent, link }) => (
              <article className={`project-card ${accent} reveal`} key={title}>
                <div className="project-card-top"><span className="project-number">{number} / PROJECT</span><a href={link} target="_blank" rel="noreferrer" aria-label={`Open ${title} repository`}><ArrowUpRight size={18} /></a></div>
                <div className="project-art">
                  <img className="project-image" src={
                    type.includes("EDGE AI") ? "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80" :
                    type.includes("GENERATIVE AI") ? "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80" :
                    type.includes("MACHINE LEARNING") ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80" :
                    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80"
                  } alt={`${title} visual`} loading="lazy" />
                  <div className="project-image-overlay" />
                  <div className="art-ring ring-one" /><div className="art-ring ring-two" /><div className="art-core"><Icon size={34} strokeWidth={1.2} /></div><span className="art-orbit-dot" />
                </div>
                <p className="project-type">{type}</p>
                <h3>{title}</h3>
                <p className="project-description">{description}</p>
                <div className="project-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                <a className="project-link" href={link} target="_blank" rel="noreferrer">Explore project <ExternalLink size={14} /></a>
              </article>
            ))}
          </div>
          <p className="projects-note"><Sparkles size={15} /> Replace the sample repository links and descriptions with your final project URLs and verified results before publishing.</p>
        </section>

        <section className="journey-section" id="my-journey">
          <div className="section-wrap content-section">
            <SectionHeading eyebrow="THE JOURNEY SO FAR" title={<>Learning. Building. <span className="gradient-text">Growing.</span></>} description="A snapshot of the experience and education behind my work." />
            <div className="timeline">
              {journey.map((item, index) => (
                <article className="timeline-item reveal" key={item.title}>
                  <div className="timeline-marker">{String(index + 1).padStart(2, "0")}</div>
                  <div className="timeline-content">
                    <span className="timeline-period">{item.period}</span>
                    <h3>{item.title}</h3><p className="timeline-company">{item.company}</p><p className="timeline-description">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap content-section resume-section" id="resume">
          <SectionHeading
            eyebrow="RESUME & EXPERIENCE"
            title={<>A closer look at my <span className="gradient-text">work.</span></>}
            description="Explore my background in AI engineering, data science, software development, and technical training."
          />
          <div className="resume-layout">
            <div className="resume-card reveal">
              <div className="resume-card-icon"><FileText size={28} /></div>
              <p className="project-type">PROFESSIONAL PROFILE</p>
              <h3>Jiji Gomez</h3>
              <p className="resume-summary">
                Data Scientist and AI Engineer working across machine learning, deep learning, generative AI, data analytics, and application development. Experienced in building practical workflows from data preparation and model evaluation through API integration and deployment, alongside hands-on technical training.
              </p>
              <div className="resume-actions">
                <a className="button button-primary" href="/jiji_Gomez_AI_Engineer_Resume.pdf" download>
                  <Download size={16} /> Download Resume
                </a>
                <a className="button button-secondary" href="https://www.linkedin.com/in/jiji-gomez-640b2a24b/" target="_blank" rel="noreferrer">
                  <Linkedin size={16} /> View LinkedIn <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
            <div className="resume-highlights reveal">
              <div className="resume-highlight"><span>01</span><div><h4>AI & Machine Learning</h4><p>Model development, evaluation, computer vision, and recommendation systems.</p></div></div>
              <div className="resume-highlight"><span>02</span><div><h4>Generative AI & NLP</h4><p>LLMs, retrieval-augmented generation, embeddings, and prompt engineering.</p></div></div>
              <div className="resume-highlight"><span>03</span><div><h4>Software & Deployment</h4><p>Python, Django, FastAPI, REST APIs, AWS, and data applications.</p></div></div>
              <div className="resume-highlight"><span>04</span><div><h4>Education</h4><p>M.Sc. in Electronics — Marthoma College of Science and Technology.</p></div></div>
            </div>
          </div>
          <p className="projects-note"><FileText size={15} /> Add your actual PDF as <strong>Jiji_Gomez_Resume.pdf</strong> inside the project's <strong>public</strong> folder for the download link to work.</p>
        </section>

        <section className="section-wrap contact-section" id="contact">
          <div className="contact-panel reveal">
            <div className="contact-glow" />
            <p className="eyebrow"><span className="eyebrow-dot" /> HAVE A CHALLENGE IN MIND?</p>
            <h2>Let's build something<br /><span className="gradient-text">intelligent.</span></h2>
            <p className="contact-description">Have an AI idea, an opportunity, or a project worth exploring? I'd love to hear from you.</p>
            <div className="contact-actions">
              <a className="button button-primary" href="mailto:your.email@example.com"><Mail size={16} /> Email me</a>
              <a className="button button-secondary" href="https://www.linkedin.com/in/jiji-gomez-640b2a24b/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={14} /></a>
              <a className="button button-secondary" href="https://github.com/jijigomez" target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="brand" href="#home"><span className="brand-mark"><BrainCircuit size={17} /></span><span>JIJI<span className="brand-slash">/</span>GOMEZ</span></a>
        <p>Designed with curiosity. Built with code.</p>
        <span className="footer-copy">© {new Date().getFullYear()} JIJI GOMEZ</span>
      </footer>
    </div>
  );
}