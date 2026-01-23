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
      title: 'სამეგრელოს ორგანიზაციის სკაუტები',
      home: 'მთავარი',
      about: 'ჩვენი ცენტრი ინგირში',
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
      latestActivities: 'ბოლო აქტივობები',
      campZone: 'საბანაკე ზონა',
      adventurePark: 'სათავგადასავლო პარკი',
      eduSpace: 'საგანმანათლებლო სივრცე',
      socialMedia: 'სოციალური მედია',
      location: 'ადგილმდებარეობა',
      partner: 'პარტნიორი'
    },
    EN: {
      title: 'Samegrelo Organization Scouts',
      home: 'Home',
      about: 'About',
      activities: 'Activities',
      join: 'Join',
      sponsors: 'Sponsors',
      heroTitle: 'Adventure, Nature, and Leadership in the Heart of Samegrelo.',
      heroText: 'Welcome to Ingiri International Scout Center!',
      joinBtn: 'Join the Scouts',
      learnBtn: 'Learn More About Center In Ingiri',
      youth: 'For Youth',
      parents: 'For Parents',
      becomeScout: 'Become a Scout',
      membership: 'Membership Info',
      latestActivities: 'Latest Activities',
      campZone: 'Camping Zone',
      adventurePark: 'Adventure Park',
      eduSpace: 'Educational Space',
      socialMedia: 'Social Media',
      location: 'Location',
      partner: 'Partners'
    }
  };

  const langContent = content[lang];

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <div className="logo-group">
          <a href="#hero" onClick={() => setMenuOpen(false)}>
            <img src="/assets/icon.ico" alt="Logo" className="logo-img" />
            <img
              src="assets/mountain-logo.png" className='logo-sec-img'
            />

          </a>
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
            <a href="https://www.flaticon.com/free-icons/camping" title="camping icons">
              <img src="assets/camp-zone.png" className="logo-third-img-camp" />
            </a>
              <p>{langContent.campZone}</p>
            </div>
            <div className="card-img" style={{ backgroundImage: 'url(https://picsum.photos/id/13/400/300)' }} />
          </div>

          <div className="card">
            <div className="card-top green">
            <a href="https://www.flaticon.com/free-icons/camping" title="camping icons">
              <img src="assets/adventure-park.png" className="logo-third-img-camp" />
            </a>
              <p>{langContent.adventurePark}</p>
            </div>
            <div className="card-img" style={{ backgroundImage: 'url(https://picsum.photos/id/1036/400/300)' }} />
          </div>

          <div className="card">
            <div className="card-top orange">
            <a href="https://www.flaticon.com/free-icons/camping" title="camping icons">
              <img src="assets/educational-space.png" className="logo-third-img-camp" />
            </a>
              <p>{langContent.eduSpace}</p>
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
          <h4>{langContent.socialMedia}</h4>
          
          <div className="social-icons">
            {/* Facebook Icon */}
            <a href="https://www.facebook.com/profile.php?id=100064482258846" target="_blank" rel="noopener noreferrer">
              <img src="assets/facebook.png" alt="Facebook" className="logo-third-img-camp" />
            </a>

            {/* Instagram Icon */}
            <a href="https://www.instagram.com/scoutsofsamegrelo/" target="_blank" rel="noopener noreferrer">
              <img src="assets/instagram.png" alt="Instagram" className="logo-third-img-camp" />
            </a>
          </div>

          <div className="contact-details">
            <p>
              <a href="tel:+9955334557890">
                <img src="assets/phone.png" alt="Phone" className="contact-icon-small" />
                + 995 533 455 7890
              </a>
            </p>
            <p>
              <a href="mailto:scoutsofsamegrelo@gmail.com">
                <img src="assets/mail.png" alt="Email" className="contact-icon-small" />
                scoutsofsamegrelo@gmail.com
              </a>
            </p>
            <p>
              <a href="https://scoutsofsamegrelo.com" target="_blank" rel="noreferrer">
                <img src="assets/web.png" alt="Web" className="contact-icon-small" />
                scoutsofsamegrelo.com
              </a>
            </p>
          </div>
        </div>
      

        <div className="footer-col">
          <h4>{langContent.location}</h4>
          <div className="map-container" style={{ marginTop: '20px' }}>
            <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.140492091809!2d41.8297427!3d42.4977788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c2506c0f5b005%3A0xe6ae831db81149c0!2z4YOV4YOU4YOi4YOU4YO_4YOY4YOc4YOQ4YO_4YOYIC8gVmV0ZXJpbmFyaWFu!5e0!3m2!1sen!2sge!4v1705312345678"
             width="100%" height="450" style={{ border: 0, borderRadius: '12px' }} allowFullScreen="" loading="lazy">
             </iframe>
          </div>
        </div>

        <div className="footer-col">
          <h4>{langContent.partner}</h4>
          <div className="partner-logos">
            <img src="https://via.placeholder.com/50?text=Scout" alt="Scout" />
            <img src="https://via.placeholder.com/80x40?text=USAID" alt="USAID" />
          </div>
        </div>
      </footer>
    </div>
  );
}
