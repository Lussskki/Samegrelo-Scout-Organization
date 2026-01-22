import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <div className="logo-group">
          <img src="/assets/icon.ico" alt="Logo" className="logo-img" />
        </div>

        {/* HAMBURGER (mobile only) */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </div>

        {/* FULLSCREEN NAV (opens when hamburger clicked) */}
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="#" className="active" onClick={() => setMenuOpen(false)}>მთავარი</a>
          <a href="#" onClick={() => setMenuOpen(false)}>ცენტრის შესახებ</a>
          <a href="#" onClick={() => setMenuOpen(false)}>აქტივობები</a>
          <a href="#" onClick={() => setMenuOpen(false)}>შემოუერთდი</a>
        </nav>

        <div className="lang">KA / EN</div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>თავგადასავალი, ბუნება და ლიდერობა სამეგრელოს გულში.</h1>
          <p>ინგირის საერთაშორისო სკაუტური ცენტრი გელით!</p>

          <div className="hero-buttons">
            <button className="btn purple">შემოუერთდი სკაუტებს</button>
            <button className="btn green">გაიგე მეტი ცენტრზე</button>
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="activities-section">
        <h2 className="section-title">ჩვენი ცენტრი ინგირში</h2>
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
      <section className="target-section">
        <div className="target-card green-bg">
          <h3>ახალგაზრდებისთვის</h3>
          <div className="target-img-container">
            <img src="https://picsum.photos/id/660/600/400" alt="Youth" />
            <button className="overlay-btn">გახდი სკაუტი</button>
          </div>
        </div>

        <div className="target-card orange-bg">
          <h3>მშობლებისთვის</h3>
          <div className="target-img-container">
            <img src="https://picsum.photos/id/64/600/400" alt="Parents" />
            <button className="overlay-btn">წევრობის შესახებ</button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery">
        <h2 className="gallery-title">ბოლო აქტივობები</h2>
        <div className="gallery-grid">
          <div className="photo-card" style={{ backgroundImage: 'url(https://picsum.photos/id/1018/400/300)' }} />
          <div className="photo-card" style={{ backgroundImage: 'url(https://picsum.photos/id/1015/400/300)' }} />
          <div className="photo-card" style={{ backgroundImage: 'url(https://picsum.photos/id/1016/400/300)' }} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-col">
          <h4>SOCIAL MEDIA</h4>
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
          <h4>CONTACT INFO</h4>
          <img src="https://via.placeholder.com/200x100?text=MAP" alt="Map" />
        </div>

        <div className="footer-col">
          <h4>PARTNER</h4>
          <div className="partner-logos">
            <img src="https://via.placeholder.com/50?text=Scout" />
            <img src="https://via.placeholder.com/80x40?text=USAID" />
          </div>
        </div>
      </footer>
    </div>
  )
}
