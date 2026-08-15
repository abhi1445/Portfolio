import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown, ArrowUp, ArrowUpRight, BriefcaseBusiness, Code2, Database,
  Download, Github, GraduationCap, Mail, Menu, Moon, Send, Sparkles, Sun, X,
} from "lucide-react";
import { portfolio } from "./data/portfolio";
import "./styles.css";

const nav = ["Home", "About", "Skills", "Projects", "Education", "Experience", "Contact"];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <>
      <header className="navbar">
        <button className="brand" onClick={() => scrollTo("Home")} aria-label="Go home">
          <span className="brand-mark">{portfolio.initials}</span>
          <span>{portfolio.name}</span>
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {nav.map((item) => (
            <button key={item} onClick={() => scrollTo(item)}>{item}</button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={() => setDark((v) => !v)} aria-label="Toggle theme">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="menu-btn icon-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-copy reveal">
            <div className="eyebrow"><Sparkles size={15} /> Available for opportunities</div>
            <h1>Hi, I'm <span>{portfolio.name}</span>.</h1>
            <h2>{portfolio.title}</h2>
            <p>{portfolio.bio}</p>
            <div className="hero-buttons">
              <button className="btn primary" onClick={() => scrollTo("Projects")}>View My Projects <ArrowDown size={17} /></button>
              <button className="btn secondary" onClick={() => scrollTo("Contact")}>Contact Me <Mail size={17} /></button>
              <a className="btn ghost" href={portfolio.resume} download><Download size={17} /> Resume</a>
            </div>
            <div className="socials">
              <a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
              <a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness /></a>
              <a href={`mailto:${portfolio.email}`} aria-label="Email"><Mail /></a>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="glow"></div>
            <div className="code-card">
              <div className="window-bar"><i></i><i></i><i></i><span>developer.js</span></div>
              <pre><code>{`const developer = {
  name: "${portfolio.name}",
  role: "Full-Stack Developer",
  skills: [
    "React",
    "Java",
    "Python",
    "SQL"
  ],
  passion: "building useful things",
  status: "learning & growing"
};`}</code></pre>
              <div className="code-footer"><span>●</span> open to new ideas</div>
            </div>
            <div className="floating-chip chip-one"><Code2 size={16}/> Clean Code</div>
            <div className="floating-chip chip-two"><Database size={16}/> SQL</div>
          </div>
        </section>

        <section id="about" className="section">
          <SectionHeading eyebrow="01 — About" title="A little about me" />
          <div className="about-grid reveal">
            <div className="profile-card">
              <div className="avatar">{portfolio.initials}</div>
              <div>
                <strong>{portfolio.name}</strong>
                <span>{portfolio.title}</span>
              </div>
              <div className="location">📍 {portfolio.location}</div>
            </div>
            <div className="about-text">
              <p>{portfolio.about}</p>
              <p>I like learning by building. From database-driven systems to responsive front-end interfaces, I focus on understanding the fundamentals and turning them into working software.</p>
              <div className="stats">
                {portfolio.stats.map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <SectionHeading eyebrow="02 — Skills" title="Tools I work with" />
          <div className="skills-grid reveal">
            {Object.entries(portfolio.skills).map(([category, skills]) => (
              <div className="skill-card" key={category}>
                <div className="skill-icon"><Code2 size={20}/></div>
                <h3>{category}</h3>
                <div className="tags">{skills.map((s) => <span key={s}>{s}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <SectionHeading eyebrow="03 — Projects" title="Things I've built" />
          <div className="projects-grid reveal">
            {portfolio.projects.map((p, i) => (
              <article className="project-card" key={p.name}>
                <div className={`project-art art-${i % 3}`}><Code2 size={40}/><span>0{i + 1}</span></div>
                <div className="project-body">
                  <div className="project-title"><h3>{p.name}</h3><a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.name} GitHub`}><Github size={18}/></a></div>
                  <p>{p.description}</p>
                  <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  <a className="project-link" href={p.demo} target="_blank" rel="noreferrer">Live Demo <ArrowUpRight size={16}/></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section">
          <SectionHeading eyebrow="04 — Education" title="My learning journey" />
          <div className="timeline reveal">
            {portfolio.education.map((e) => (
              <div className="timeline-item" key={e.degree}>
                <div className="timeline-icon"><GraduationCap size={20}/></div>
                <div><span className="period">{e.period}</span><h3>{e.degree}</h3><h4>{e.institution}</h4><p>{e.details}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="section">
          <SectionHeading eyebrow="05 — Experience" title="What I've worked on" />
          <div className="timeline reveal">
            {portfolio.experience.map((e) => (
              <div className="timeline-item" key={e.role}>
                <div className="timeline-icon"><BriefcaseBusiness size={20}/></div>
                <div><span className="period">{e.period}</span><h3>{e.role}</h3><h4>{e.company}</h4><p>{e.details}</p><div className="tags">{e.tags.map(t => <span key={t}>{t}</span>)}</div></div>
              </div>
            ))}
          </div>
          <div className="cert-grid reveal">
            {portfolio.certifications.map(([name, org, year]) => <div className="cert-card" key={name}><Sparkles size={18}/><div><strong>{name}</strong><span>{org} · {year}</span></div></div>)}
          </div>
          <div className="training-card reveal">
            <div className="training-icon"><Sparkles size={20}/></div>
            <div><span className="period">Training</span><h3>{portfolio.training.name}</h3><h4>{portfolio.training.organization} · {portfolio.training.duration}</h4><p>{portfolio.training.details}</p></div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <SectionHeading eyebrow="06 — Contact" title="Let's build something" />
          <div className="contact-grid reveal">
            <div>
              <p className="contact-lead">Have a project idea, internship opportunity, or just want to connect? Send me a message.</p>
              <div className="contact-details">
                <a href={`mailto:${portfolio.email}`}><Mail/><span><small>Email</small>{portfolio.email}</span></a>
                <a href={portfolio.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness/><span><small>LinkedIn</small>Connect with me</span></a>
                <a href={portfolio.github} target="_blank" rel="noreferrer"><Github/><span><small>GitHub</small>View my code</span></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={submit}>
              <label>Name<input required name="name" placeholder="Your name" /></label>
              <label>Email<input required type="email" name="email" placeholder="you@example.com" /></label>
              <label>Subject<input required name="subject" placeholder="How can I help?" /></label>
              <label>Message<textarea required name="message" rows="5" placeholder="Tell me about your idea..."></textarea></label>
              <button className="btn primary" type="submit"><Send size={17}/> {sent ? "Message Ready to Send" : "Send Message"}</button>
              <small className="form-note">This demo form is frontend-only. Connect Formspree, EmailJS, Resend, or your own backend to receive messages.</small>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div><strong>{portfolio.name}</strong><span>Building, learning, improving.</span></div>
        <div className="footer-links">{nav.slice(0, 5).map(n => <button key={n} onClick={() => scrollTo(n)}>{n}</button>)}</div>
        <span>© {new Date().getFullYear()} {portfolio.name}. All rights reserved.</span>
      </footer>
      <button className="back-top" onClick={() => scrollTo("Home")} aria-label="Back to top"><ArrowUp size={17}/></button>
    </>
  );
}

function SectionHeading({ eyebrow, title }) {
  return <div className="section-heading reveal"><span>{eyebrow}</span><h2>{title}</h2></div>;
}

createRoot(document.getElementById("root")).render(<App />);