import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'

const translations = {
  ka: {
    dev: "საიტი დეველოპმეტის პროცესშია",
    subtitle: "საქართველოს სკაუტური მოძრაობის სამეგრელოს ორგანიზაციის წევრთა სარეგისტრაციო ფორმა",
    join: "შემოგვიერთდი",
    region: "ჩვენი რეგიონი",
    samegrelo: "სამეგრელო",
    samegreloText: "ზუგდიდი და დადიანების სასახლე.",
    svaneti: "ზემო სვანეთი",
    svanetiText: "მესტია და უშგული.",
    activities: "აქტივობები",
    camp: "🏕️ ბანაკები",
    hike: "🧗 ლაშქრობები",
    projects: "🤝 პროექტები",
    help: "🩹 დახმარება",
    photos: "ჩვენი ფოტოები",
    viewAll: "ყველა ფოტოს ნახვა",
    contact: "კონტაქტი",
    name: "თქვენი სახელი და გვარი",
    email: "თქვენი ელ-ფოსტა",
    message: "თქვენი შეტყობინება",
    send: "გაგზავნა",
    main: "მთავარი",
    gallery: "ფოტოები",
    fullGallery: "სრული გალერეა",
    back: "← მთავარზე დაბრუნება",
    day: "☀️ დღე",
    night: "🌙 ღამე"
  },
  en: {
    dev: "Site is under development",
    join: "Join Us",
    region: "Our Region",
    samegrelo: "Samegrelo",
    samegreloText: "Zugdidi and Dadiani Palace.",
    svaneti: "Upper Svaneti",
    svanetiText: "Mestia and Ushguli.",
    activities: "Activities",
    camp: "🏕️ Camps",
    hike: "🧗 Hiking",
    projects: "🤝 Projects",
    help: "🩹 Assistance",
    photos: "Our Photos",
    viewAll: "View All Photos",
    contact: "Contact",
    name: "Your Name and Surname",
    email: "Your Email",
    message: "Your Message",
    send: "Send",
    main: "Home",
    gallery: "Gallery",
    fullGallery: "Full Gallery",
    back: "← Back to Main",
    day: "☀️ Day",
    night: "🌙 Night"
  }
};

function FullGallery({ images, lang }) {
  const [localSelectedImg, setLocalSelectedImg] = useState(null);
  const t = translations[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gallery-container gallery-page">
      <div className="section-title">
        <h2>{t.fullGallery}</h2>
        <Link to="/" className="cta-btn back-btn">{t.back}</Link>
      </div>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="gallery-item" 
            style={{ backgroundImage: `url(${img})` }}
            onClick={() => setLocalSelectedImg(img)}
          ></div>
        ))}
      </div>
      {localSelectedImg && (
        <div className="modal" onClick={() => setLocalSelectedImg(null)}>
          <span className="close">&times;</span>
          <img className="modal-content" src={localSelectedImg} alt="Enlarged" />
        </div>
      )}
    </div>
  );
}

function HomePage({ images, setSelectedImg, lang }) {
  const dadianiPhoto = '/assets/photos/dadianebis-sasakhle-palace-of-dadiani.jpg';
  const ushguliPhoto = '/assets/photos/ushguli.jpg';
  const t = translations[lang];

  return (
    <>
      <header className="hero">
        <div className="hero-text">
          <p style={{ color: '#ffc107', marginTop: '10px', fontSize: '1rem' }}>"{t.dev}"</p>
          {/* <h1>{translations[lang].title || "სამეგრელოს სკაუტები"}</h1> */}
          <p>{t.subtitle}</p>
          <a href="#contact" className="cta-btn">{t.join}</a>
        </div>
      </header>

      <main className="container" id="region-section">
        <div className="section-title"><h2>{t.region}</h2></div>
        <div className="region-grid">
          <RegionCard title={t.samegrelo} text={t.samegreloText} imgClass="img-samegrelo" onClick={() => setSelectedImg(dadianiPhoto)} />
          <RegionCard title={t.svaneti} text={t.svanetiText} imgClass="img-svaneti" onClick={() => setSelectedImg(ushguliPhoto)} />
        </div>
      </main>

      <section className="activities-container" id="activities">
        <div className="section-title"><h2>{t.activities}</h2></div>
        <div className="activities-list">
          <div className="activity-item">{t.camp}</div>
          <div className="activity-item">{t.hike}</div>
          <div className="activity-item">{t.projects}</div>
          <div className="activity-item">{t.help}</div>
        </div>
      </section>

      <section className="gallery-container" id="gallery">
        <div className="section-title"><h2>{t.photos}</h2></div>
        <div className="gallery-grid">
          {images.slice(0, 6).map((img, index) => (
            <div key={index} className="gallery-item" style={{ backgroundImage: `url(${img})` }} onClick={() => setSelectedImg(img)}></div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/gallery" className="cta-btn view-more-btn">{t.viewAll}</Link>
        </div>
      </section>

      <section className="contact-container" id="contact">
        <div className="section-title"><h2>{t.contact}</h2></div>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder={t.name} required />
          <input type="email" placeholder={t.email} required />
          <textarea placeholder={t.message}></textarea>
          <button type="submit" className="cta-btn">{t.send}</button>
        </form>
      </section>
    </>
  );
}

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('ka');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const t = translations[lang];

  const galleryImages = [
    '/assets/photos/chveni-fotoebi/1.jpg', '/assets/photos/chveni-fotoebi/2.jpg',
    '/assets/photos/chveni-fotoebi/3.jpg', '/assets/photos/chveni-fotoebi/4.jpg',
    '/assets/photos/chveni-fotoebi/5.jpg', '/assets/photos/chveni-fotoebi/6.jpg',
    '/assets/photos/chveni-fotoebi/7.jpg', '/assets/photos/chveni-fotoebi/8.jpg',
    '/assets/photos/chveni-fotoebi/9.jpg', '/assets/photos/chveni-fotoebi/10.jpg'
  ];

  // გვერდის შეცვლისას მენიუ ავტომატურად დაიხუროს
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <nav>
        <Link to="/" className="logo">სამეგრელოს სკაუტები</Link>
        
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? '✕' : '☰'}</div>

        <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
          <li className="nav-controls">
            <button className="lang-btn" onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}>
              {lang === 'ka' ? 'ENGLISH' : 'ქართული'}
            </button>
            <button className="theme-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? t.day : t.night}
            </button>
          </li>
          <li><Link to="/">{t.main}</Link></li>
          <li><Link to="/gallery">{t.gallery}</Link></li>
          <li><a href="/#activities">{t.activities}</a></li>
          <li><a href="/#contact">{t.contact}</a></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage images={galleryImages} setSelectedImg={setSelectedImg} lang={lang} />} />
        <Route path="/gallery" element={<FullGallery images={galleryImages} lang={lang} />} />
      </Routes>

      {selectedImg && (
        <div className="modal" onClick={() => setSelectedImg(null)}>
          <span className="close">&times;</span>
          <img className="modal-content" src={selectedImg} alt="Enlarged" />
        </div>
      )}

      <footer>
        <div className="footer-content">
            <p>© 2026 Scout Of Samegrelo</p>
            <div className="social-links">
                <a href="https://www.facebook.com/profile.php?id=100064482258846" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/scoutsofsamegrelo/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
            </div>
        </div>
      </footer>
    </div>
  )
}

function RegionCard({ title, text, imgClass, onClick }) {
  return (
    <div className="region-card" onClick={onClick}>
      <div className={`region-img ${imgClass}`}></div>
      <div className="region-info"><h3>{title}</h3><p>{text}</p></div>
    </div>
  )
}

export default App;