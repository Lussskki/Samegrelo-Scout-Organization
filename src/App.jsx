import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('KA'); // KA / EN
  const [theme, setTheme] = useState('day'); // day / night

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  // Set body class for day/night
  useEffect(() => {
    document.body.className = theme === 'day' ? 'day' : 'night';
  }, [theme]);

  // Language content
  const content = {
    KA: {
      home: 'მთავარი',
      about: 'ცენტრის შესახებ',
      activities: 'აქტივობები',
      join: 'შემოუერთდი',
      sponsors: 'სპონსორები',
      heroTitle: 'თავგადასავალი, ბუნება და ლიდერობა სამეგრელოს გულში.',
      heroText: 'ინგირის საერთაშორისო სკაუტური ცენტრი გელით!',
      joinBtn: 'შემოუერთდი სკაუტებს',
      learnBtn: 'გაიგე მეტი ცენტრზე',
      youth: 'ახალგაზრდებისთვის',
      parents: 'მშობლებისთვის',
      becomeScout: 'გახდი სკაუტი',
      membership: 'წევრობის შესახებ',
      latestActivities: 'ბოლო აქტივობები'
    },
    EN: {
      home: 'Home',
      about: 'About',
      activities: 'Activities',
      join: 'Join',
      sponsors: 'Sponsors',
      heroTitle: 'Adventure, Nature, and Leadership in the Heart of Samegrelo.',
      heroText: 'Welcome to Ingiri International Scout Center!',
      joinBtn: 'Join the Scouts',
      learnBtn: 'Learn More About Center',
      youth: 'For Youth',
      parents: 'For Parents',
      becomeScout: 'Become a Scout',
      membership: 'Membership Info',
      latestActivities: 'Latest Activities'
    }
  };

  const langContent = content[lang];

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <div className="logo-group">
          <img src="/assets/icon.ico" alt="Logo" className="logo-img" />
        </div>

        {/* HAMBURGER (mobile only) */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </div>

        {/* FULLSCREEN NAV */}
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="#hero" onClick={() => setMenuOpen(false)}>{langContent.home}</a>
          <a href="#activities" onClick={() => setMenuOpen(false)}>{langContent.about}</a>
          <a href="#target" onClick={() => setMenuOpen(false)}>{langContent.activities}</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>{langContent.join}</a>
          <a href="#sponsors" onClick={() => setMenuOpen(false)}>{langContent.sponsors}</a>

          {/* MOVED: Language and Theme buttons are now inside the menu */}
          <div className="menu-controls">
            <button className="control-btn" onClick={() => setLang(lang === 'KA' ? 'EN' : 'KA')}>
              {lang}
            </button>
            <button className="control-btn" onClick={() => setTheme(theme === 'day' ? 'night' : 'day')}>
              {theme === 'day' ? '🌞' : '🌙'}
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1>{langContent.heroTitle}</h1>
          <p>{langContent.heroText}</p>
          <div className="hero-buttons">
            <button className="btn purple">{langContent.joinBtn}</button>
            <button className="btn green">{langContent.learnBtn}</button>
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section id="activities" className="activities-section">
        <h2 className="section-title">{langContent.about}</h2>
        <div className="activities-grid">
          <div className="card">
            <div className="card-top purple">
              <span className="icon">⛺</span>
              <p>საბანაკე ზონა</p>
            </div>
            <div className="card-img" style={{ backgroundImage: 'url(https://picsum.photos/id/13/400/300)' }} />
          </div>
          <div className="card">
            <div className="card-top green">
              <span className="icon">🧗</span>
              <p>სათავგადასავლო პარკი</p>
            </div>
            <div className="card-img" style={{ backgroundImage: 'url(https://picsum.photos/id/1036/400/300)' }} />
          </div>
          <div className="card">
            <div className="card-top orange">
              <span className="icon">💼</span>
              <p>საგანმანათლებლო სივრცე</p>
            </div>
            <div className="card-img" style={{ backgroundImage: 'url(https://picsum.photos/id/1/400/300)' }} />
          </div>
        </div>
      </section>

      {/* TARGET */}
      <section id="target" className="target-section">
        <div className="target-card green-bg">
          <h3>{langContent.youth}</h3>
          <div className="target-img-container">
            <img src="https://picsum.photos/id/660/600/400" alt="Youth" />
            <button className="overlay-btn">{langContent.becomeScout}</button>
          </div>
        </div>

        <div className="target-card orange-bg">
          <h3>{langContent.parents}</h3>
          <div className="target-img-container">
            <img src="https://picsum.photos/id/64/600/400" alt="Parents" />
            <button className="overlay-btn">{langContent.membership}</button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="gallery">
        <h2 className="gallery-title">{langContent.latestActivities}</h2>
        <div className="gallery-grid">
          <div className="photo-card" style={{ backgroundImage: 'url(https://picsum.photos/id/1018/400/300)' }} />
          <div className="photo-card" style={{ backgroundImage: 'url(https://picsum.photos/id/1015/400/300)' }} />
          <div className="photo-card" style={{ backgroundImage: 'url(https://picsum.photos/id/1016/400/300)' }} />
        </div>
      </section>

      {/* SPONSORS */}
      <section id="sponsors" className="sponsors-section">
        <h2 className="section-title">{langContent.sponsors}</h2>
        <div className="sponsors-grid">
          <img src="https://via.placeholder.com/150x80?text=Sponsor1" alt="Sponsor 1" />
          <img src="https://via.placeholder.com/150x80?text=Sponsor2" alt="Sponsor 2" />
          <img src="https://via.placeholder.com/150x80?text=Sponsor3" alt="Sponsor 3" />
          <img src="https://via.placeholder.com/150x80?text=Sponsor4" alt="Sponsor 4" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-col">
          <h4>სოციალური მედია</h4>
          <div className="social-icons">
            <span>f</span><span>t</span><span>i</span><span>vk</span>
          </div>
          <div className="contact-details">
            <p>📞 533 455 7890</p>
            <p>✉️ info@samegrelo.com</p>
            <p>🌐 samegreloscouts.ka</p>
          </div>
        </div>

        <div className="footer-col">
          <h4>ადგილმდებარეობა</h4>
          <img src="https://via.placeholder.com/200x100?text=MAP" alt="Map" />
        </div>

        <div className="footer-col">
          <h4>პარტნიორი</h4>
          <div className="partner-logos">
            <img src="https://via.placeholder.com/50?text=Scout" alt="Scout" />
            <img src="https://via.placeholder.com/80x40?text=USAID" alt="USAID" />
          </div>
        </div>
      </footer>
    </div>
  );
}