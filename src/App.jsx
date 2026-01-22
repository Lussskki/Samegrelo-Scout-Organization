import './App.css'

export default function App() {
  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <div className="logo-group">
          <span className="logo">⚜️</span>
          <img src="https://via.placeholder.com/100x40?text=LOGO" alt="Scouts Logo" className="logo-img" />
        </div>

        <nav className="nav">
          <a href="#" className="active">მთავარი</a>
          <a href="#">ცენტრის შესახებ</a>
          <a href="#">აქტივობები</a>
          <a href="#">შემოუერთდი</a>
        </nav>

        <div className="lang">KA / EN</div>
      </header>

      {/* HERO SECTION */}
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

      {/* THREE PILLAR SECTION */}
      <section className="activities-section">
        <h2 className="section-title">ჩვენი ცენტრი ინგირში</h2>
        <div className="activities-grid">
          <div className="card">
            <div className="card-top purple">
              <span className="icon">⛺</span>
              <p>საბანაკე ზონა</p>
            </div>
            <div className="card-img" style={{backgroundImage: 'url(https://picsum.photos/id/13/400/300)'}}></div>
          </div>

          <div className="card">
            <div className="card-top green">
              <span className="icon">🧗</span>
              <p>სათავგადასავლო პარკი</p>
            </div>
            <div className="card-img" style={{backgroundImage: 'url(https://picsum.photos/id/1036/400/300)'}}></div>
          </div>

          <div className="card">
            <div className="card-top orange">
              <span className="icon">💼</span>
              <p>საგანმანათლებლო სივრცე</p>
            </div>
            <div className="card-img" style={{backgroundImage: 'url(https://picsum.photos/id/1/400/300)'}}></div>
          </div>
        </div>
      </section>

      {/* DUAL TARGET SECTION */}
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

      {/* LATEST ACTIVITIES / GALLERY */}
      <section className="gallery">
        <h2 className="gallery-title">ბოლო აქტივობები</h2>
        <div className="gallery-grid">
          <div className="photo-card" style={{backgroundImage: 'url(https://picsum.photos/id/1018/400/300)'}}></div>
          <div className="photo-card" style={{backgroundImage: 'url(https://picsum.photos/id/1015/400/300)'}}></div>
          <div className="photo-card" style={{backgroundImage: 'url(https://picsum.photos/id/1016/400/300)'}}></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-col">
          <h4>SOCIAL MEDIA</h4>
          <div className="social-icons">
             <span>f</span> <span>t</span> <span>i</span> <span>vk</span>
          </div>
          <div className="contact-details">
            <p>📞 533 455 7890</p>
            <p>✉️ info@samegrelo.com</p>
            <p>🌐 samegreloscouts.ka</p>
          </div>
        </div>

        <div className="footer-col">
          <h4>CONTACT INFO</h4>
          <div className="map-placeholder">
            {/* Map image or iframe would go here */}
            <img src="https://via.placeholder.com/200x100?text=MAP" alt="Map" />
          </div>
        </div>

        <div className="footer-col">
          <h4>PARTNER</h4>
          <div className="partner-logos">
             <img src="https://via.placeholder.com/50?text=Scout" alt="Partner" />
             <img src="https://via.placeholder.com/80x40?text=USAID" alt="USAID" />
          </div>
        </div>
      </footer>
    </div>
  )
}
