import { useEffect, useState } from 'react'

import movaLogo from '/assets/MOVA.jpg'
import avatarLogo from '/assets/AVATAR2020.jpg'
import redCrossLogo from '/assets/REDCROSS.png'
import scoutLearnLogo from '/assets/SCOUTLEARN.png'
import energyLogo from '/assets/photos/nexus.jfif'
import nexusLogo from '/assets/NEXUS.png'
import koreaLogo from '/assets/KOREA.png'
import charityLogo from '/assets/CHARITY.png'
import currentLogo from '/assets/CURRENT.png'
import interCampLogo from '/assets/Intercamp.png'
import campOfToday from '/assets/photos/dgis-banaki2.jfif'
import guide from '/assets/photos/megzuri-logo.jfif'
import aboutUsLogo from '/assets/ABOUTUS.png'
import servicesLogo from '/assets/SERVICES.png'

import { fetchSiteContent, loadSiteContent, SITE_CONTENT_UPDATED_EVENT } from '../Content/siteContent'
import './App.css'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`back-to-top ${isVisible ? 'visible' : ''}`}
      aria-label="ზემოთ დაბრუნება"
      title="ზემოთ დაბრუნება"
    >
      ↑
    </button>
  )
}

function getLangCode(lang) {
  return lang === 'ქარ' ? 'ka' : 'en'
}

function renderHtml(html) {
  return { __html: html }
}

function extractIbanValue(ibanText) {
  const matchedValue = ibanText.match(/[A-Z]{2}\d{2}[A-Z0-9]+/)
  return matchedValue ? matchedValue[0] : ibanText
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState('ქარ')
  const [theme, setTheme] = useState('day')
  const [selectedImgIndex, setSelectedImgIndex] = useState(null)
  const [showFullPage, setShowFullPage] = useState(false)
  const [adminContent, setAdminContent] = useState(loadSiteContent)
  const [contentLoadFailed, setContentLoadFailed] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    fetchSiteContent()
      .then((nextContent) => {
        setAdminContent(nextContent)
        setContentLoadFailed(false)
      })
      .catch(() => setContentLoadFailed(true))
  }, [])

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setSelectedImgIndex(null)
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    document.body.className = theme === 'day' ? 'day' : 'night'
  }, [theme])

  useEffect(() => {
    const loadPage = window.setTimeout(() => setShowFullPage(true), 1200)
    return () => window.clearTimeout(loadPage)
  }, [])

  useEffect(() => {
    const refreshAdminContent = async () => {
      try {
        const nextContent = await fetchSiteContent()
        setAdminContent(nextContent)
        setContentLoadFailed(false)
      } catch {
        setContentLoadFailed(true)
      }
    }

    window.addEventListener(SITE_CONTENT_UPDATED_EVENT, refreshAdminContent)

    return () => {
      window.removeEventListener(SITE_CONTENT_UPDATED_EVENT, refreshAdminContent)
    }
  }, [])

  if (contentLoadFailed) {
    return (
      <main className="maintenance-page">
        <section className="maintenance-panel" aria-live="polite">
          <img src="/assets/icon-64.png" alt="Samegrelo Scouts" width="64" height="64" />
          <p>საიტი დროებით ახლდება</p>
          <h1>მონაცემები იტვირთება, გთხოვთ სცადოთ ცოტა ხანში.</h1>
          <span>Scouts of Samegrelo</span>
        </section>
      </main>
    )
  }

  const langCode = getLangCode(lang)
  const langContent = adminContent.translations[langCode] ?? adminContent.translations.ka
  const visibleGalleryPhotos = adminContent.gallery
    .filter((photo) => photo.src)
    .map((photo) => ({
      id: photo.id,
      src: photo.src,
      alt: photo.alt || photo.type || 'Scout photo',
    }))
  const contactContent = adminContent.contact

  const closeAllDropdowns = () => {
    setAboutOpen(false)
    setServicesOpen(false)
    setContactOpen(false)
  }

  const closeMobileMenu = () => {
    setMenuOpen(false)
    closeAllDropdowns()
  }

  const canUseHoverMenu = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const toggleDropdown = (dropdown) => {
    if (canUseHoverMenu() && !menuOpen) {
      return
    }

    setAboutOpen((current) => (dropdown === 'about' ? !current : false))
    setServicesOpen((current) => (dropdown === 'services' ? !current : false))
    setContactOpen((current) => (dropdown === 'contact' ? !current : false))
  }

  const scrollCarousel = (direction, id) => {
    const container = document.getElementById(id)
    if (!container) {
      return
    }

    container.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    })
  }

  const nextPhoto = (event) => {
    event.stopPropagation()
    setSelectedImgIndex((previous) => (previous + 1) % visibleGalleryPhotos.length)
  }

  const prevPhoto = (event) => {
    event.stopPropagation()
    setSelectedImgIndex((previous) => (previous - 1 + visibleGalleryPhotos.length) % visibleGalleryPhotos.length)
  }

  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(extractIbanValue(adminContent.donation.iban))
      alert('Copied!')
    } catch {
      alert('Could not copy IBAN automatically.')
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div className="header-inner">
        <div className="logo-group">
          <a href="#hero" onClick={closeMobileMenu}>
            <img src="/assets/icon-64.png" alt="Logo" className="logo-img" width="40" height="40" />
            <img src="assets/mountain-logo.ico" className="logo-sec-img" alt="Mountain Logo" width="45" height="45" />
          </a>
        </div>

        <button
          type="button"
          className="hamburger"
          aria-label="Toggle navigation"
          onClick={() => {
            if (menuOpen) {
              closeAllDropdowns()
            }
            setMenuOpen((current) => !current)
          }}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="#hero" onClick={closeMobileMenu}>
            {langContent.home}
          </a>

          <div
            className={`nav-dropdown ${aboutOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (canUseHoverMenu()) {
                closeAllDropdowns()
                setAboutOpen(true)
              }
            }}
            onMouseLeave={() => {
              if (canUseHoverMenu()) {
                setAboutOpen(false)
              }
            }}
          >
            <button type="button" className="nav-link" aria-expanded={aboutOpen} onClick={() => toggleDropdown('about')}>
              {langContent.join}
              <span className={`dropdown-arrow ${aboutOpen ? 'rotate' : ''}`}>▾</span>
            </button>
            {aboutOpen && (
              <div className="dropdown-panel">
                <a href="#who" onClick={closeMobileMenu}>{langContent.whoTitle}</a>
                <a href="#history" onClick={closeMobileMenu}>{langContent.histTitle}</a>
                <a href="#mission" onClick={closeMobileMenu}>{langContent.missTitle}</a>
                <a href="#become" onClick={closeMobileMenu}>{langContent.howTitle}</a>
                <a href="#books" onClick={closeMobileMenu}>{langContent.bookTitle}</a>
              </div>
            )}
          </div>

          <div
            className={`nav-dropdown ${servicesOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (canUseHoverMenu()) {
                closeAllDropdowns()
                setServicesOpen(true)
              }
            }}
            onMouseLeave={() => {
              if (canUseHoverMenu()) {
                setServicesOpen(false)
              }
            }}
          >
            <button type="button" className="nav-link" aria-expanded={servicesOpen} onClick={() => toggleDropdown('services')}>
              {langContent.services}
              <span className={`dropdown-arrow ${servicesOpen ? 'rotate' : ''}`}>▾</span>
            </button>
            {servicesOpen && (
              <div className="dropdown-panel">
                <a href="#service-school" onClick={closeMobileMenu}>{langContent.service1}</a>
                <a href="#service-camps" onClick={closeMobileMenu}>{langContent.service2}</a>
                <a href="#service-schools" onClick={closeMobileMenu}>{langContent.service3}</a>
                <a href="#service-eco" onClick={closeMobileMenu}>{langContent.service4}</a>
                <a href="#service-venue" onClick={closeMobileMenu}>{langContent.service5}</a>
                <a href="#service-event" onClick={closeMobileMenu}>{langContent.service6}</a>
                <a href="#service-international" onClick={closeMobileMenu}>{langContent.service7}</a>
              </div>
            )}
          </div>

          <a href="#target" onClick={closeMobileMenu}>{langContent.youthTitle}</a>
          <a href="#education" onClick={closeMobileMenu}>{langContent.eduTitle}</a>
          <a href="#gallery" onClick={closeMobileMenu}>{langContent.sponsors}</a>
          <a href="#donation" onClick={closeMobileMenu}>{langContent.donation}</a>

          <div
            className={`nav-dropdown ${contactOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (canUseHoverMenu()) {
                closeAllDropdowns()
                setContactOpen(true)
              }
            }}
            onMouseLeave={() => {
              if (canUseHoverMenu()) {
                setContactOpen(false)
              }
            }}
          >
            <button type="button" className="nav-link" aria-expanded={contactOpen} onClick={() => toggleDropdown('contact')}>
              {langContent.contact}
              <span className={`dropdown-arrow ${contactOpen ? 'rotate' : ''}`}>▾</span>
            </button>
            {contactOpen && (
              <div className="dropdown-panel">
                <a href="#contact" onClick={closeMobileMenu}>{langContent.socialMedia}</a>
                <a href="#location" onClick={closeMobileMenu}>{langContent.location}</a>
                <a href="#register" onClick={closeMobileMenu}>{langContent.register}</a>
                <a href="#donation" onClick={closeMobileMenu}>{langContent.donation}</a>
                <a href="#developer" onClick={closeMobileMenu}>{langContent.developer}</a>
                <a href="#partner" onClick={closeMobileMenu}>{langContent.partner}</a>
              </div>
            )}
          </div>

          <div className="menu-controls">
            <button className="control-btn" onClick={() => setLang(lang === 'ქარ' ? 'ENG' : 'ქარ')}>
              {lang}
            </button>
            <button className="control-btn" onClick={() => setTheme(theme === 'day' ? 'night' : 'day')}>
              {theme === 'day' ? '☀' : '☽'}
            </button>
          </div>
        </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="hero-content">
            <p>{adminContent.hero.text}</p>
            <h1>{adminContent.hero.title}</h1>
            <a href="#register" className="hero-btn">
              {adminContent.hero.button}
            </a>
          </div>
        </section>

        {showFullPage && (
          <>
            <section id="target" className="youth-projects-section">
              <h2 className="section-title">{langContent.youthTitle}</h2>

              <div className="carousel-container">
                <button className="carousel-btn left" onClick={() => scrollCarousel('left', 'youth-carousel')}>&#10094;</button>

                <div className="youth-projects-grid" id="youth-carousel">
                  {Array.from({ length: 4 }).map((_, index) => {
                    const cardData = langContent[`youthCard${index + 1}D`]
                    return (
                      <div className="youth-card" key={index}>
                        <div className="icon-wrapper logo-crop">
                          <img
                            src={index === 0 ? interCampLogo : index === 1 ? campOfToday : index === 2 ? guide : currentLogo}
                            alt={`Project ${index + 1}`}
                            className="mova-icon"
                            width="120"
                            height="120"
                            loading="lazy"
                          />
                        </div>
                        <h3>{langContent[`youthCard${index + 1}T`]}</h3>
                        <div
                          className="card-text-content"
                          dangerouslySetInnerHTML={renderHtml(typeof cardData === 'string' ? cardData : '')}
                          onClick={(event) => {
                            if (event.target.classList.contains('open-megzuri-photo')) {
                              event.preventDefault()
                              setSelectedImgIndex(20)
                            }
                            if (event.target.classList.contains('open-dgis-banaki-photo')) {
                              event.preventDefault()
                              setSelectedImgIndex(21)
                            }
                          }}
                        />
                      </div>
                    )
                  })}
                </div>

                <button className="carousel-btn right" onClick={() => scrollCarousel('right', 'youth-carousel')}>&#10095;</button>
              </div>
            </section>

            <section className="section-photo">
              <img src="/assets/photos/chveni-fotoebi/ch.jpeg" alt="Scouts activity" loading="lazy" width="1200" height="600" />
            </section>

            <section id="education" className="edu-projects-section">
              <h2 className="section-title">{langContent.eduTitle}</h2>

              <div className="carousel-container">
                <button className="carousel-btn left" onClick={() => scrollCarousel('left', 'edu-carousel')}>&#10094;</button>

                <div className="edu-projects-grid" id="edu-carousel">
                  {[
                    { logo: redCrossLogo, t: 'eduCard1T', d: 'eduCard1D' },
                    { logo: avatarLogo, t: 'eduCard2T', d: 'eduCard2D' },
                    { logo: movaLogo, t: 'eduCard3T', d: 'eduCard3D' },
                    { logo: scoutLearnLogo, t: 'eduCard4T', d: 'eduCard4D' },
                    { logo: energyLogo, t: 'eduCard5T', d: 'eduCard5D' },
                    { logo: nexusLogo, t: 'eduCard6T', d: 'eduCard6D' },
                    { logo: koreaLogo, t: 'eduCard7T', d: 'eduCard7D' },
                    { logo: charityLogo, t: 'eduCard8T', d: 'eduCard8D' },
                  ].map((card, index) => (
                    <div className="edu-card" key={index}>
                      <div className="icon-wrapper logo-crop">
                        <img src={card.logo} alt={langContent[card.t]} className="mova-icon" width="120" height="120" loading="lazy" />
                      </div>
                      <h3>{langContent[card.t]}</h3>
                      <div className="card-text-content" dangerouslySetInnerHTML={renderHtml(langContent[card.d])} />
                    </div>
                  ))}
                </div>

                <button className="carousel-btn right" onClick={() => scrollCarousel('right', 'edu-carousel')}>&#10095;</button>
              </div>
            </section>

            <section id="services" className="services-section">
              <h2 className="section-title">{langContent.services}</h2>

              <div className="carousel-container">
                <button className="carousel-btn left" onClick={() => scrollCarousel('left', 'services-carousel')}>&#10094;</button>

                <div className="services-grid" id="services-carousel">
                  {[
                    { id: 'service-school', key: 'service1' },
                    { id: 'service-camps', key: 'service2' },
                    { id: 'service-schools', key: 'service3' },
                    { id: 'service-eco', key: 'service4' },
                    { id: 'service-venue', key: 'service5' },
                    { id: 'service-event', key: 'service6' },
                    { id: 'service-international', key: 'service7' },
                    { id: 'service-extra', key: 'service8' },
                  ].map((service, index) => (
                    <div id={service.id} className="service-card" key={index}>
                      <div className="icon-wrapper logo-crop">
                        <img src={servicesLogo} alt="Service" className="service-icon" width="120" height="120" loading="lazy" />
                      </div>
                      <h3>{langContent[service.key]}</h3>
                      <div className="card-text-content" dangerouslySetInnerHTML={renderHtml(langContent[`${service.key}D`])} />
                    </div>
                  ))}
                </div>

                <button className="carousel-btn right" onClick={() => scrollCarousel('right', 'services-carousel')}>&#10095;</button>
              </div>
            </section>

            <section className="section-photo">
              <img src="/assets/photos/chveni-fotoebi/ch2.jpeg" alt="Scouts activity" loading="lazy" width="1200" height="600" />
            </section>

            <section id="about" className="about-section">
              <h2 className="section-title">{langContent.aboutTitle}</h2>
              <p className="section-subtitle">{langContent.aboutSubtitle}</p>

              <div className="carousel-container">
                <button className="carousel-btn left" onClick={() => scrollCarousel('left', 'about-carousel')}>&#10094;</button>

                <div className="about-content" id="about-carousel">
                  {[
                    { id: 'who', titleKey: 'whoTitle', textKey: 'whoText' },
                    { id: 'history', titleKey: 'histTitle', textKey: 'histText' },
                    { id: 'mission', titleKey: 'missTitle', textKey: 'missText' },
                    { id: 'become', titleKey: 'howTitle', textKey: 'howText' },
                  ].map((block) => (
                    <section id={block.id} className="about-block" key={block.id}>
                      <div className="icon-wrapper logo-crop">
                        <img src={aboutUsLogo} alt="About us" className="service-icon" width="120" height="120" loading="lazy" />
                      </div>
                      <h3>{langContent[block.titleKey]}</h3>
                      <div className="card-text-content" dangerouslySetInnerHTML={renderHtml(langContent[block.textKey])} />
                    </section>
                  ))}
                </div>

                <button className="carousel-btn right" onClick={() => scrollCarousel('right', 'about-carousel')}>&#10095;</button>
              </div>
            </section>

            <section className="section-photo">
              <img src="/assets/photos/chveni-fotoebi/tent-city.jfif" alt="Scouts activity" loading="lazy" width="1200" height="600" />
            </section>

            <section id="register" className="register-section">
              <h2 className="section-title">{langContent.register}</h2>
              <p className="section-subtitle">{langContent.registerSubtitle}</p>
              <div className="register-content">
                <a href="https://forms.gle/7NJ5KFZpbnMAD4Wy7" target="_blank" rel="noopener noreferrer" className="register-btn">
                  {langContent.register}
                </a>
              </div>
            </section>

            <section id="books" className="books-section">
              <h1 className="section-title">{langContent.bookTitle}</h1>
              <h2 className="section-subtitle">{langContent.bookSubTitle}</h2>
              <div className="books-container">
                {langContent.books.map((book) => (
                  <a key={book.id} className="book-card" href={book.link} target="_blank" rel="noopener noreferrer">
                    <div className="cover-wrapper">
                      <img src={book.cover} alt={book.title} className="book-cover" loading="lazy" width="220" height="300" />
                    </div>
                    <p className="book-title">{book.title}</p>
                  </a>
                ))}
              </div>
            </section>

            <section id="gallery" className="gallery-section">
              <h2 className="section-title">{langContent.sponsors}</h2>
              <div className="masonry-wrapper">
                <div className="masonry-grid">
                  {visibleGalleryPhotos.map((photo, index) => (
                    <div key={photo.id} className="masonry-item" onClick={() => setSelectedImgIndex(index)}>
                      <img src={photo.src} alt={photo.alt} loading="lazy" width="400" height="300" />
                      <div className="masonry-overlay">
                        <span>{photo.alt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {selectedImgIndex !== null && (
              <div className="lightbox" onClick={() => setSelectedImgIndex(null)}>
                <button
                  type="button"
                  className="close-btn"
                  aria-label="Close gallery"
                  onClick={(event) => {
                    event.stopPropagation()
                    setSelectedImgIndex(null)
                  }}
                >
                  &times;
                </button>
                <button type="button" className="nav-btn prev" aria-label="Previous photo" onClick={prevPhoto}>&#10094;</button>
                <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
                  <img src={visibleGalleryPhotos[selectedImgIndex].src} alt="Selected" />
                  <p className="caption">{visibleGalleryPhotos[selectedImgIndex].alt}</p>
                </div>
                <button type="button" className="nav-btn next" aria-label="Next photo" onClick={nextPhoto}>&#10095;</button>
              </div>
            )}

            <section id="donation" className="donation-simple">
              <h2 className="section-title">{langContent.donation}</h2>
              <div className="account-container">
                <p className="iban-text">{adminContent.donation.iban}</p>
                <p className="iban-text">{adminContent.donation.text}</p>
                <button className="copy-btn-simple" onClick={copyIban}>
                  Copy IBAN
                </button>
              </div>
            </section>

            <section id="developer" className="developer-section">
              <div className="developer-card">
                <div className="developer-header">
                  <img src="/assets/photos/developer.jpg" alt="Developer" className="developer-photo" loading="lazy" width="150" height="150" />
                  <div className="developer-text">
                    <h2 className="section-title">{langContent.developerTitle}</h2>
                    <h3>{langContent.developerName}</h3>
                    <p>{langContent.developerText}</p>
                  </div>
                </div>
                <div className="developer-contact">
                  <div className="phone-number">
                    <span aria-hidden="true">Tel.</span>
                    <span>+995 557 463 444</span>
                  </div>
                  <div className="social-links">
                    <span>{langContent.developerContact}</span>
                    <div className="icons">
                      <a href="https://www.linkedin.com/in/lukaguledani/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      <a href="https://x.com/UnknownPass7" target="_blank" rel="noopener noreferrer">X</a>
                      <a href="https://github.com/Lussskki" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <footer className="footer">
              <div className="footer-col" id="contact">
                <h4>{langContent.socialMedia}</h4>
                <div className="social-icons">
                  <a href="https://www.facebook.com/profile.php?id=100064482258846" target="_blank" rel="noopener noreferrer">
                    <img src="assets/facebook.png" alt="Facebook" className="logo-third-img-camp" width="50" height="50" loading="lazy" />
                  </a>
                  <a href="https://www.instagram.com/scoutsofsamegrelo/" target="_blank" rel="noopener noreferrer">
                    <img src="assets/instagram.png" alt="Instagram" className="logo-third-img-camp" width="50" height="50" loading="lazy" />
                  </a>
                  <a href="https://www.tiktok.com/@scoutsofsamegrelo" target="_blank" rel="noopener noreferrer">
                    <img src="assets/tik-tok.png" alt="Tiktok" className="logo-third-img-camp" width="50" height="50" loading="lazy" />
                  </a>
                </div>
                <div className="contact-details">
                  <p><a href={`tel:${contactContent.phone.replace(/\s/g, '')}`}><img src="assets/phone.png" alt="Phone" className="contact-icon-small" width="20" height="20" loading="lazy" /> {contactContent.phone}</a></p>
                  <p><a href={`mailto:${contactContent.email}`}><img src="assets/mail.png" alt="Email" className="contact-icon-small" width="20" height="20" loading="lazy" /> {contactContent.email}</a></p>
                  <p><a href={`https://${contactContent.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer"><img src="assets/web.png" alt="Web" className="contact-icon-small" width="20" height="20" loading="lazy" /> {contactContent.website}</a></p>
                </div>
              </div>

              <div className="footer-col" id="location">
                <h4>{langContent.location}</h4>
                <div className="map-container">
                  <iframe
                    title="Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.140492091809!2d41.8297427!3d42.4977788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c2506c0f5b005%3A0xe6ae831db81149c0!2z4YOV4YOU4YOi4YOU4YO_4YOY4YOc4YOQ4YO_4YWYIC8gVmV0ZXJpbmFyaWFu!5e0!3m2!1sen!2sge!4v1705312345678"
                    width="100%"
                    height="300"
                    className="map-iframe"
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="footer-col" id="partner">
                <h4>{langContent.partner}</h4>
                <div className="partner-logos">
                  <img src="assets/deja-vu.jpg" alt="DEJA VU" className="dejavu" width="150" height="100" loading="lazy" />
                </div>
              </div>
            </footer>
          </>
        )}
      </main>

      <BackToTop />
    </div>
  )
}
