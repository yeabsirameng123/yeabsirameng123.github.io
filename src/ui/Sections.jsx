import {
  profile, stats, about, projects, publication,
  jobs, skills, education, honor, sections,
} from '../data/content.js'

const Ar = () => <span className="ar">↗</span>

export function TopNav() {
  return (
    <nav className="top" id="top-nav">
      <a href="#top" className="brand">Yeabsira&nbsp;Dana</a>
      <div className="nav-links">
        <a href="#work" className="l">Work</a>
        <a href="#live-demos" className="l">Demos</a>
        <a href="#experience" className="l">Experience</a>
        <a href={`mailto:${profile.email}`} className="btn btn-grad">Email me</a>
      </div>
    </nav>
  )
}

export function SideNav() {
  return (
    <nav className="side" aria-label="Sections">
      {sections.map(([id, label]) => (
        <a key={id} href={`#${id}`} data-s={id}>
          <span className="nm">{label}</span>
          <span className="dot" />
        </a>
      ))}
    </nav>
  )
}

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-scrim" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-meta">
          <span>{profile.role}</span>
          <span>{profile.location}</span>
          <span className="av">Research to production</span>
        </div>
        <h1 className="name">Yeabsira <span className="gt">Dana</span></h1>
        <p className="hero-intro">
          I build machine learning systems, and the software that puts them to use. Right now I'm helping train and evaluate frontier language models at Handshake AI.
        </p>
        <div className="hero-cta">
          <a href="#work" className="btn btn-grad">See my work <span className="ar">↓</span></a>
          <a href={profile.paper} target="_blank" rel="noopener" className="btn">Read my paper <Ar /></a>
        </div>
        <div className="hero-stats">
          {stats.map((s) => (
            <div className="hs" key={s.label}>
              <div className="n gt">{s.n}</div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-cue"><span className="ln" /><span className="mono">Scroll</span></div>
    </header>
  )
}

export function About() {
  return (
    <section id="about">
      <div className="wrap sec">
        <div className="about-grid reveal">
          <div className="portrait">
            <img src="./profile.jpg" alt="Yeabsira Dana" />
            <span className="cap">Yeabsira Dana — Washington, DC</span>
          </div>
          <div className="about-copy">
            <p className="lead">
              I care about models that can be{' '}
              <span className="gt">measured, inspected, and used.</span>
            </p>
            {about.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p.replace('LLM work', '<b>LLM work</b>') }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Work() {
  return (
    <section id="work">
      <div className="wrap sec">
        <div className="sec-head reveal">
          <span className="ix">02</span><h2>Selected work</h2>
          <span className="sub">Applied AI systems, research projects, and production software.</span>
        </div>
        <div className="work stagger">
          {projects.map((p) => (
            <article className={`card proj${p.published ? ' feat' : ''}`} key={p.title}>
              <div className="ph">
                <h3>{p.title}</h3>
                <span className="yr">{p.year}</span>
                {p.published && <span className="pub-mark">Published</span>}
              </div>
              <p>{p.body}</p>
              <div className="pf">
                <span className="stack">{p.stack}</span>
                <div className="pactions">
                  {p.link && (
                    <a className="plink" href={p.link} target={p.link.startsWith('#') ? undefined : '_blank'} rel={p.link.startsWith('#') ? undefined : 'noopener'}>
                      {p.linkLabel} <Ar />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Publication() {
  return (
    <section id="publication">
      <div className="wrap sec">
        <div className="sec-head reveal">
          <span className="ix">05</span><h2>Publication</h2>
          <span className="sub">Peer-reviewed work in medical-image segmentation.</span>
        </div>
        <div className="card pub-card reveal">
          <div className="pub-title">{publication.title}</div>
          <p className="d">{publication.body}</p>
          <div className="pub-foot">
            <a className="btn btn-grad" href={publication.link} target="_blank" rel="noopener">
              View on Wiley <Ar />
            </a>
            <span className="doi">{publication.venue}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience">
      <div className="wrap sec">
        <div className="sec-head reveal">
          <span className="ix">06</span><h2>Where I've worked</h2>
          <span className="sub">Frontier-AI evaluation, software engineering, and teaching.</span>
        </div>
        <div className="timeline stagger">
          {jobs.map((j) => (
            <div className={`job${j.current ? ' cur' : ''}`} key={j.role + j.when}>
              <div className="job-top"><h3>{j.role}</h3><span className="when">{j.when}</span></div>
              <div className="where">
                {j.where}{j.current && <span className="now">Current</span>}
              </div>
              <p>{j.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills">
      <div className="wrap sec">
        <div className="sec-head reveal">
          <span className="ix">07</span><h2>What I use</h2>
          <span className="sub">Grouped by where it lives in the stack.</span>
        </div>
        <div className="skills stagger">
          {skills.map((s) => (
            <div className={`card sk${s.feat ? ' feat' : ''}`} key={s.cat}>
              <h4>{s.feat ? '★ ' : ''}{s.cat}</h4>
              <div className="it">{s.items}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Education() {
  return (
    <section id="education">
      <div className="wrap sec">
        <div className="sec-head reveal">
          <span className="ix">08</span><h2>Education</h2>
          <span className="sub">Three countries, one through-line: AI.</span>
        </div>
        <div className="edu-grid reveal">
          <div className="edu-list">
            {education.map((e) => (
              <div className="edu" key={e.deg}>
                <div>
                  <div className="deg">{e.deg}</div>
                  <div className="school">{e.school}</div>
                </div>
                <span className="when">{e.when}</span>
              </div>
            ))}
          </div>
          <div className="card honor">
            <span className="tag">{honor.tag}</span>
            <p>{honor.body}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap sec">
        <div className="reveal">
          <span className="mono" style={{ display: 'block', marginBottom: 22 }}>Get in touch</span>
          <h2 className="big">Building <span className="gt">applied AI systems</span> with research depth.</h2>
          <p className="lead">
            I like work that combines models, data, software, and clear evaluation.
            For applied AI, ML engineering, or research-aligned collaborations, reach out.
          </p>
          <div className="contact-row">
            <a className="btn btn-grad" href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noopener">LinkedIn <Ar /></a>
            <a className="btn" href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}>{profile.phone}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <span>Yeabsira Dana — Washington, DC</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
