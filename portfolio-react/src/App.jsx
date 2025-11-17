import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const timeline = [
  {
    role: 'Front-End Developer Intern · Logicmojo',
    meta: 'May 2025 — Jul 2025 · Remote',
    bullets: [
      'Developed and optimized responsive front-end modules using React.js, Bootstrap, and modern ES6 JavaScript.',
      'Collaborated with backend engineers to integrate REST APIs and dynamic real-time rendering.',
      'Created reusable UI components and improved design accessibility for all devices.',
      'Designed and deployed clean dashboards enhancing user experience and navigation flow.',
    ],
  },
  {
    role: 'Freelance Developer & Designer (Independent)',
    meta: '2016 — 2019 · Independent',
    bullets: [
      'Worked with startups and studios on product and brand websites.',
      'Helped teams quickly prototype new ideas and concepts.',
    ],
  },
];

const snapshot = [
  {
    title: 'Strengths',
    body:
      'Systems thinking, frontend implementation, ML model integration, problem solving.',
  },
  {
    title: 'Working style',
    body:
      'Collaborative, detail-oriented, comfortable owning projects from idea to launch.',
  },
  {
    title: 'Looking for',
    body:
      'Frontend or Full-Stack roles focusing on product and ML integrations.',
  },
];

const skillPrimary = {
  label: 'Programming & Tools',
  tag: 'Primary',
  summary:
    'Programming: C, Python, Java, SQL\nFrameworks & Libraries: React, Node.js, Express, Flask\nDatabases: MongoDB, basic SQL\nDev Tools: VS Code, GitHub, Vercel, basic AWS (EC2, S3)',
  extra: 'React, Node.js, MongoDB, Tailwind CSS, Bootstrap, Flask, Git, Vercel, AWS basics.',
};

const skillSecondary = {
  label: 'Data & ML',
  tag: 'Supporting',
  summary:
    'Machine Learning model building, feature analysis, model ensembling (Random Forest, XGBoost), basic deep learning (ResNeXt, LSTM).',
  extra: 'Tools: scikit-learn, pandas, numpy, basic PyTorch/TensorFlow exposure.',
};

const highlights = [
  'Building responsive frontends with React and component-driven architecture.',
  'Integrating ML backends with web frontends (Flask + React).',
  'Creating prototypes and production-ready dashboards.',
  'Good cross-team communication and ownership.',
];

const projectFilters = [
  { label: 'All', value: 'all' },
  { label: 'ML', value: 'ml' },
  { label: 'Web', value: 'web' },
];

const projects = [
  {
    title: 'DeepFake Detection',
    type: 'ml',
    tag: 'ML · Web',
    description:
      'Deep Learning, React, Flask – Developed a web app to detect AI-generated videos using ResNeXt and LSTM models. Integrated React front-end with Flask backend for user uploads and authenticity prediction.',
    stack: 'ResNeXt · LSTM · React · Flask',
    link: 'https://github.com/cherizz00/DeepFake-Detection',
  },
  {
    title: 'Employee Attrition Prediction',
    type: 'ml',
    tag: 'ML',
    description:
      'Machine Learning – Built an ensemble ML model using Random Forest and XGBoost achieving ~85% accuracy. Performed feature analysis and visualization for HR insights.',
    stack: 'Random Forest · XGBoost · Data viz',
    link: 'https://github.com/cherizz00/Employee-Attrition',
  },
  {
    title: 'Marketing Site for Product Launch',
    type: 'web',
    tag: 'Web',
    description:
      'Designed and built a responsive launch site with a clean, editorial layout and fast-loading front-end implementation.',
    stack: 'Design · Frontend · Optimization',
  },
  {
    title: 'Personal Portfolio',
    type: 'web',
    tag: 'Web',
    description:
      'A minimal, typography-first site that presents work and experience with clarity.',
    stack: 'Design · Frontend',
    link: 'https://yourportfolio.com',
  },
];

const education = {
  degree: 'B.Tech in Computer Science Engineering',
  school: 'National Institute of Technology, Durgapur · 2022 - 2026',
  coursework:
    'Relevant Coursework: Data Structures, Algorithms, Machine Learning, Databases, Operating Systems',
};

const certifications =
  'Certifications: Goldman Sachs Operations Simulation, Google Qwiklabs (BigQuery & Dataflow), AWS Cloud Workshop – CDC NIT Durgapur.';

const languages = 'Languages: English, Hindi, Telugu, Tamil';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'dark'
  );
  const [navOpen, setNavOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showBackTop, setShowBackTop] = useState(false);
  const [toolsExpanded, setToolsExpanded] = useState(false);
  const [dataExpanded, setDataExpanded] = useState(false);
  const [coords, setCoords] = useState({
    text: 'Allow location access to fetch coords',
    link: null,
  });
  const [localTime, setLocalTime] = useState('--:--:--');
  const [timezone, setTimezone] = useState('Detecting…');
  const [dateLabel, setDateLabel] = useState('--');
  const yearRef = useRef(new Date().getFullYear());
  const contactFormRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { root: null, threshold: 0.4 }
    );

    const sections = document.querySelectorAll('main section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const current = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackTop(current > 260);

      if (navOpen) return;

      if (current < 100) {
        setNavHidden(false);
      } else if (current > lastScroll + 5) {
        setNavHidden(true);
      } else if (current < lastScroll - 5) {
        setNavHidden(false);
      }

      lastScroll = current <= 0 ? 0 : current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navOpen]);

  useEffect(() => {
    const timeFormatter = new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const dateFormatter = new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const tzPart = new Intl.DateTimeFormat(undefined, {
      timeZoneName: 'short',
    })
      .formatToParts(new Date())
      .find((part) => part.type === 'timeZoneName');

    if (tzPart) {
      setTimezone(tzPart.value);
    } else {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }

    const tick = () => {
      const now = new Date();
      setLocalTime(timeFormatter.format(now));
      setDateLabel(dateFormatter.format(now));
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setCoords({ text: 'Location not available', link: null });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const lat = latitude.toFixed(3);
        const lon = longitude.toFixed(3);
        setCoords({
          text: `Lat ${lat}, Lon ${lon}`,
          link: `https://www.google.com/maps?q=${lat},${lon}`,
        });
      },
      () => {
        setCoords({ text: 'Location permission denied', link: null });
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((project) => project.type === activeFilter);
  }, [activeFilter]);

  const handleFilterChange = (value) => {
    setActiveFilter(value);
  };

  const handleNavClick = (href) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setNavOpen(false);
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    if (!contactFormRef.current) return;

    const form = contactFormRef.current;
    const submitButton = form.querySelector('.form-submit');
    const originalText = submitButton.innerHTML;

    submitButton.innerHTML = '<span>Sending...</span> <span>⏳</span>';
    submitButton.disabled = true;

    emailjs
      .sendForm(
        'service_pus3mv9',
        'template_j1dobnh',
        contactFormRef.current,
        '1RdG9o6-DR7HKj5zt'
      )
      .then(() => {
        submitButton.innerHTML = '<span>Message Sent! ✓</span>';
        form.reset();
        setTimeout(() => {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        }, 2500);
      })
      .catch(() => {
        alert(
          'Sorry, there was an error sending your message. Please try again.'
        );
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      });
  };

  const year = yearRef.current;

  return (
    <>
      <div
        className={`nav-shell ${navHidden ? 'nav-hidden' : ''} ${
          navOpen ? 'nav-menu-open' : ''
        }`}
      >
        <div className="nav-inner" id="top-nav">
          <div className="nav-logo">PRASANNA KUMAR</div>
          <button
            className="nav-toggle"
            id="nav-toggle"
            aria-label="Toggle navigation"
            onClick={() => setNavOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${
                  activeSection === link.href.replace('#', '') ? 'active' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                data-nav-link=""
              >
                {link.label}
              </a>
            ))}
            <button
              className="nav-cta"
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              <span>Get in touch</span>
              <span className="nav-cta-icon">↗</span>
            </button>
          </nav>
          <button
            className="theme-toggle"
            id="theme-toggle"
            aria-label="Toggle theme"
            onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
          >
            <svg
              className="sun-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line
                x1="4.22"
                y1="19.78"
                x2="5.64"
                y2="18.36"
              ></line>
              <line
                x1="18.36"
                y1="5.64"
                x2="19.78"
                y2="4.22"
              ></line>
            </svg>
            <svg
              className="moon-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>
      </div>

      <main>
        <motion.section
          id="about"
          className="hero"
          data-animate=""
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="hero-left">
            <div className="hero-kicker">Portfolio Resume</div>
            <h1 className="hero-name">Dasari Venkata Prasanna Kumar</h1>
            <div className="hero-role">
              Full-Stack Developer & Computer Science Undergraduate
            </div>
            <p className="hero-description">
              Results-driven Computer Science undergraduate specializing in
              Full-Stack Development. Skilled in React, Node.js, MongoDB, and
              Python, with hands-on experience in building scalable web
              applications and machine-learning-based predictive models. Strong
              problem-solving and collaborative abilities with a focus on
              delivering efficient, user-centric digital solutions.
            </p>
            <div className="hero-meta">
              <div className="hero-meta-item">Based in Andhra Pradesh, India</div>
              <div className="hero-meta-item">
                Open to internships, remote & full-time
              </div>
            </div>
            <div className="hero-actions">
              <a
                className="btn"
                id="download-resume"
                href="https://drive.google.com/file/d/11DlHBytMusgSP7lKQevizB_3mnm9REc1/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                <span className="btn-icon">⬇</span>
                <span>Download resume</span>
              </a>
              <button
                className="btn btn-ghost"
                onClick={() =>
                  document
                    .getElementById('experience')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <span className="btn-icon">↓</span>
                <span>View experience</span>
              </button>
            </div>
          </div>

          <div className="hero-right">
            <motion.div
              className="profile-card"
              aria-label="GitHub profile"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="profile-photo-wrapper">
                <img
                  src="https://github.com/cherizz00.png?size=400"
                  alt="GitHub profile of Dasari Venkata Prasanna Kumar"
                  className="profile-photo"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="profile-username">@cherizz00</div>
              <a
                className="profile-link"
                href="https://github.com/cherizz00"
                target="_blank"
                rel="noreferrer"
              >
                <span>Open GitHub</span>
                <span>↗</span>
              </a>
            </motion.div>

            <motion.div
              className="hero-skills"
              aria-label="Skill set"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="hero-skills-title">Skills</div>
              <div className="hero-skills-list">
                <span className="hero-skills-label">Programming</span>
                <span>C</span> · <span>Python</span> · <span>Java</span> ·{' '}
                <span>JavaScript</span> · <span>SQL</span>
                <br />
                <span className="hero-skills-label">Frameworks</span>
                <span>React</span> · <span>Node.js</span> · <span>MongoDB</span> ·{' '}
                <span>Angular</span> · <span>Tailwind CSS</span>
                <br />
                <span className="hero-skills-label">Tools & Cloud</span>
                <span>VS Code</span> · <span>GitHub</span> · <span>Vercel</span> ·{' '}
                <span>AWS (EC2, S3)</span>
              </div>
            </motion.div>

            <motion.div
              className="language-card"
              aria-label="Quick info"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="language-card-title">Quick info</div>
              <div className="hero-info-row hero-info-row--time">
                <div>
                  <div className="hero-info-label">Local time</div>
                  <div className="hero-time-value">
                    <span className="hero-timer">{localTime}</span>
                    <span className="hero-timezone">{timezone}</span>
                  </div>
                </div>
                <div className="hero-date">{dateLabel}</div>
              </div>
              <div className="hero-info-row hero-info-row--location">
                <div className="hero-info-label">Live coordinates</div>
                <a
                  className="hero-location-link"
                  id="hero-location-link"
                  href={coords.link || undefined}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={coords.link ? 'false' : 'true'}
                >
                  <span className="hero-location-pin" role="presentation">
                    📍
                  </span>
                  <span id="hero-location-text">{coords.text}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="experience"
          data-animate=""
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-header">
            <div className="section-title">Experience</div>
            <p className="section-subtitle">
              A summary of recent roles and responsibilities.
            </p>
          </div>
          <div className="section-body">
            <div>
              <div className="timeline">
                {timeline.map((item) => (
                  <article className="timeline-item" key={item.role}>
                    <div className="timeline-role">{item.role}</div>
                    <div className="timeline-meta">{item.meta}</div>
                    <ul className="timeline-bullets">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <div className="card">
                <div className="skills-group-header" style={{ marginBottom: 6 }}>
                  <div className="skills-group-title">Snapshot</div>
                </div>
                <div className="edu-list">
                  {snapshot.map((item) => (
                    <div className="edu-item" key={item.title}>
                      <div className="edu-degree">{item.title}</div>
                      <div>{item.body}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          data-animate=""
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-header">
            <div className="section-title">Skills</div>
            <p className="section-subtitle">
              Technologies, tools and languages I use regularly.
            </p>
          </div>
          <div className="section-body">
      <div className="card">
              <div className="skills-grid">
                <div>
                  <div className="skills-group-header">
                    <div className="skills-group-title">{skillPrimary.label}</div>
                    <div className="skills-group-tag">{skillPrimary.tag}</div>
                  </div>
                  <div className="skills-list">
                    {skillPrimary.summary.split('\n').map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </div>
                  <button
                    className="skills-toggle"
                    type="button"
                    onClick={() => setToolsExpanded((prev) => !prev)}
                  >
                    {toolsExpanded ? 'Hide tools' : 'Show tools'}
                  </button>
                  {toolsExpanded && (
                    <div className="skills-list" data-skill-extra="">
                      {skillPrimary.extra}
                    </div>
                  )}
                </div>
                <div>
                  <div className="skills-group-header">
                    <div className="skills-group-title">
                      {skillSecondary.label}
                    </div>
                    <div className="skills-group-tag">{skillSecondary.tag}</div>
                  </div>
                  <div className="skills-list">{skillSecondary.summary}</div>
                  <button
                    className="skills-toggle"
                    type="button"
                    onClick={() => setDataExpanded((prev) => !prev)}
                  >
                    {dataExpanded ? 'Hide details' : 'Show details'}
                  </button>
                  {dataExpanded && (
                    <div className="skills-list" data-skill-extra="">
                      {skillSecondary.extra}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card highlights-card">
              <div className="skills-group-header" style={{ marginBottom: 10 }}>
                <div className="skills-group-title">Highlights</div>
              </div>
              <div className="skills-list">
                {highlights.map((highlight) => (
                  <span key={highlight}>
                    • {highlight}
                    <br />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          data-animate=""
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-header">
            <div className="section-title">Projects</div>
            <p className="section-subtitle">
              Selected work that reflects technical breadth and product focus.
            </p>
          </div>
          <div className="section-body">
            <div>
              <div className="filter-row" id="project-filters">
                {projectFilters.map((filter) => (
                  <button
                    key={filter.value}
                    className={`filter-chip ${
                      activeFilter === filter.value ? 'active' : ''
                    }`}
                    type="button"
                    onClick={() => handleFilterChange(filter.value)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              <div className="projects-grid" id="projects-grid">
                {filteredProjects.map((project) => (
                  <motion.article
                    className="project-card"
                    data-type={project.type}
                    key={project.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="project-title-row">
                      <h3 className="project-title">{project.title}</h3>
                      <div className="project-tag">{project.tag}</div>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-meta-row">
                      <div>{project.stack}</div>
                      {project.link ? (
                        <a
                          className="project-link"
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span>View code</span>
                          <span>↗</span>
                        </a>
                      ) : (
                        <button className="project-link" type="button">
                          <span>View live</span>
                          <span>↗</span>
        </button>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
            <div>
              <div className="card">
                <div className="skills-group-header" style={{ marginBottom: 6 }}>
                  <div className="skills-group-title">Approach</div>
                </div>
                <div className="skills-list">
                  • Start with user journeys and constraints.
                  <br />• Reduce the screen to what is essential.
                  <br />• Build reusable components and patterns.
                  <br />• Ship, measure, and refine.
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="education"
          data-animate=""
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-header">
            <div className="section-title">Education</div>
            <p className="section-subtitle">
              Formal training and continuous learning.
        </p>
      </div>
          <div className="section-body">
            <div>
              <div className="card">
                <div className="edu-list">
                  <div className="edu-item">
                    <div className="edu-degree">{education.degree}</div>
                    <div>{education.school}</div>
                  </div>
                  <div className="edu-item">
                    <div className="edu-degree">Relevant Coursework</div>
                    <div>{education.coursework}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card">
                <div className="skills-group-header" style={{ marginBottom: 6 }}>
                  <div className="skills-group-title">Notes</div>
                </div>
                <div className="skills-list">{certifications}</div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          data-animate=""
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-header">
            <div className="section-title">Contact</div>
            <p className="section-subtitle">
              For roles, collaborations, or questions - reach out.
            </p>
          </div>
          <div className="contact-card">
            <div className="contact-row">
              <div>
                <div className="contact-info-item">
                  Email ·{' '}
                  <a href="mailto:cherrybangari583@gmail.com">
                    cherrybangari583@gmail.com
                  </a>
                </div>
                <div className="contact-info-item">
                  LinkedIn ·{' '}
                  <a
                    href="https://www.linkedin.com/in/prasanna-kumar-399364261/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/prasanna-kumar-399364261
                  </a>
                </div>
                <div className="contact-info-item">
                  GitHub ·{' '}
                  <a href="https://github.com/cherizz00/" target="_blank" rel="noreferrer">
                    github.com/cherizz00
                  </a>
                </div>
                <div className="contact-info-item">
                  Location · <span>Andhra Pradesh, India</span>
                </div>
              </div>
              <form
                className="contact-form"
                id="contact-form"
                ref={contactFormRef}
                onSubmit={handleContactSubmit}
              >
                <div className="field-row-inline">
                  <div>
                    <label className="field-label" htmlFor="name">
                      Name
                    </label>
                    <input className="field-input" id="name" name="from_name" type="text" required />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="email">
                      Email
                    </label>
                    <input className="field-input" id="email" name="from_email" type="email" required />
                  </div>
                </div>
                <div>
                  <label className="field-label" htmlFor="message">
                    Message
                  </label>
                  <textarea className="field-textarea" id="message" name="message" required></textarea>
                </div>
                <div className="form-footer">
                  <div className="form-note">
                    Your message will be sent directly to my email.
                  </div>
                  <button className="form-submit" type="submit">
                    <span>Send message</span>
                    <span>↗</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.section>
      </main>

      <button
        className={`back-to-top ${showBackTop ? 'visible' : ''}`}
        id="back-to-top"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <span>Back to top</span>
        <span>↑</span>
      </button>

      <footer>
        <div className="footer-content">
          <div className="footer-left">
            <div>
              © <span id="year">{year}</span> Dasari Venkata Prasanna Kumar. All
              rights reserved.
            </div>
            <div className="footer-tagline">
              Built with a focus on clarity, performance, and practical Full-Stack
              Development.
            </div>
          </div>
          <div className="footer-social">
            <a
              href="https://github.com/cherizz00"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="social-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/prasanna-kumar-399364261/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="social-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:cherrybangari583@gmail.com"
              aria-label="Email"
              className="social-link"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
