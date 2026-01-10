import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

// 1. სრული გალერეის გვერდი
function FullGallery({ images }) {
  const [localSelectedImg, setLocalSelectedImg] = useState(null);

  return (
    <div className="container gallery-page">
      <div className="section-title">
        <h2>სრული გალერეა</h2>
        <Link to="/" className="cta-btn back-btn">← მთავარზე დაბრუნება</Link>
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

// 2. მთავარი გვერდი
function HomePage({ images, setSelectedImg }) {
  const dadianiPhoto = '/assets/photos/dadianebis-sasakhle-palace-of-dadiani.jpg';
  const ushguliPhoto = '/assets/photos/ushguli.jpg';

  return (
    <>
      <header className="hero">
        <div className="hero-text">
          <h1>სამეგრელო-ზემო სვანეთი</h1>
          <p>აღმოაჩინე კოლხეთი და სვანეთის მწვერვალები</p>
          <a href="#contact" className="cta-btn">შემოგვიერთდი</a>
        </div>
      </header>

      <main className="container" id="region-section">
        <div className="section-title"><h2>ჩვენი რეგიონი</h2></div>
        <div className="region-grid">
          <RegionCard 
            title="სამეგრელო" 
            text="ზუგდიდი და დადიანების სასახლე." 
            imgClass="img-samegrelo" 
            onClick={() => setSelectedImg(dadianiPhoto)} 
          />
          <RegionCard 
            title="ზემო სვანეთი" 
            text="მესტია და უშგული." 
            imgClass="img-svaneti" 
            onClick={() => setSelectedImg(ushguliPhoto)} 
          />
        </div>
      </main>

      <section className="activities-container" id="activities">
        <div className="section-title"><h2>აქტივობები</h2></div>
        <div className="activities-list">
          <div className="activity-item">🏕️ ბანაკები</div>
          <div className="activity-item">🧗 ლაშქრობები</div>
          <div className="activity-item">🤝 პროექტები</div>
          <div className="activity-item">🩹 დახმარება</div>
        </div>
      </section>

      <section className="gallery-container" id="gallery">
        <div className="section-title"><h2>ჩვენი ფოტოები</h2></div>
        <div className="gallery-grid">
          {images.slice(0, 6).map((img, index) => (
            <div 
              key={index} 
              className="gallery-item" 
              style={{ backgroundImage: `url(${img})` }} 
              onClick={() => setSelectedImg(img)}
            ></div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/gallery" className="cta-btn view-more-btn">ყველა ფოტოს ნახვა</Link>
        </div>
      </section>

      <section className="contact-container" id="contact">
        <div className="section-title"><h2>კონტაქტი</h2></div>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="თქვენი სახელი და გვარი" required />
          <input type="email" placeholder="თქვენი ელ-ფოსტა" required />
          <textarea placeholder="თქვენი შეტყობინება"></textarea>
          <button type="submit" className="cta-btn">გაგზავნა</button>
        </form>
      </section>
    </>
  );
}

// 3. მთავარი App
function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const galleryImages = [
    '/assets/photos/chveni-fotoebi/1.jpg', '/assets/photos/chveni-fotoebi/2.jpg',
    '/assets/photos/chveni-fotoebi/3.jpg', '/assets/photos/chveni-fotoebi/4.jpg',
    '/assets/photos/chveni-fotoebi/5.jpg', '/assets/photos/chveni-fotoebi/6.jpg'
  ];

  return (
    <div className="app-container">
      <nav>
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
        სამეგრელოს სკაუტები
        </Link>
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </div>
        <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>მთავარი</Link></li>
          <li><Link to="/gallery" onClick={() => setIsMenuOpen(false)}>ფოტოები</Link></li>
          <li><a href="/#activities" onClick={() => setIsMenuOpen(false)}>აქტივობები</a></li>
          <li><a href="/#contact" onClick={() => setIsMenuOpen(false)}>კონტაქტი</a></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage images={galleryImages} setSelectedImg={setSelectedImg} />} />
        <Route path="/gallery" element={<FullGallery images={galleryImages} />} />
      </Routes>

      {selectedImg && (
        <div className="modal" onClick={() => setSelectedImg(null)}>
          <span className="close">&times;</span>
          <img className="modal-content" src={selectedImg} alt="Enlarged" />
        </div>
      )}

      <footer className="footer"><p>&copy; 2026 Scout Of Samegrelo</p></footer>
    </div>
  )
}

function RegionCard({ title, text, imgClass, onClick }) {
  return (
    <div className="region-card" onClick={onClick}>
      <div className={`region-img ${imgClass}`}></div>
      <div className="region-info">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default App;