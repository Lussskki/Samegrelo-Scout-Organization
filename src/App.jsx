import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('ქარ'); // ქარ / ENG
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
    'ქარ': {
      title: 'სამეგრელოს ორგანიზაციის სკაუტები',
      home: 'მთავარი',
      about: 'ჩვენი ცენტრი ინგირში',
      join: 'ჩვენს შესახებ',
      sponsors: 'გალერეა',
      heroTitle: 'თავგადასავალი, ბუნება და ლიდერობა სამეგრელოს გულში.',
      heroText: 'სამეგრელოს სკაუტური ცენტრი გელით!',
      eduTitle: 'საგანმანათლებლო პროექტები',
      eduSubtitle: 'სკაუტური საგანმანათლებლო პროგრამები, რომლებიც ხელს უწყობს ახალგაზრდების განვითარებას პრაქტიკული გამოცდილების გზით.',
      eduCard1T: 'ლიდერობის პროგრამა',
      eduCard1D: 'ახალგაზრდებში ლიდერული უნარების განვითარება გუნდური მუშაობისა და პრაქტიკული აქტივობების მეშვეობით.',
      eduCard2T: 'გარემოსდაცვითი განათლება',
      eduCard2D: 'ბუნების დაცვა, ეკოლოგიური ცნობიერება და პასუხისმგებლობის აღზრდა.',
      eduCard3T: 'ცხოვრების უნარები',
      eduCard3D: 'თვითკმარობა, პრობლემების გადაჭრა და რეალურ ცხოვრებაში გამოსაყენებელი ცოდნა.',
      eduCard4T: 'არაფორმალური განათლება',
      eduCard4D: 'სწავლა გამოცდილებით, თამაშით და პრაქტიკული ჩართულობით.',
      services: 'სერვისები',
      service1: 'სკაუტური სკოლა',
      service1D: 'ლიდერობის, გუნდურობისა და სკაუტური უნარების განვითარება.',
      service2: 'ახალგაზრდული ბანაკები',
      service2D: 'საბანაკე პროგრამები და პრაქტიკული სწავლება ბუნებაში.',
      service3: 'შეთავაზება სკოლებს',
      service3D: 'საგანმანათლებლო სკაუტური პროგრამები სკოლებისთვის.',
      service4: 'ეკოტურები და ლაშქრობები',
      service4D: 'აქტიური დასვენება და ეკოლოგიური ცნობიერების ამაღლება.',
      service5: 'ადგილი ღონისძიებისთვის',
      service5D: 'სივრცის გაქირავება ბანაკებისა და ღონისძიებებისთვის.',
      service6: 'ივენთ მენეჯმენტი',
      service6D: 'ღონისძიებების სრული დაგეგმვა და ორგანიზება.',
      service7: 'საერთაშორისო აქტივობები',
      service7D: 'საერთაშორისო ბანაკები და სკაუტური პარტნიორობები.',
      aboutTitle: 'ჩვენს შესახებ',
      aboutSubtitle: 'სამეგრელოს სკაუტური ცენტრი არის ახალგაზრდული სივრცე, რომელიც აერთიანებს განათლებას, ბუნებასა და ლიდერობას.',
      whoTitle: 'ვინ ვართ ჩვენ',
      whoText: 'ჩვენ ვართ სკაუტური ორგანიზაცია, რომელიც ხელს უწყობს ახალგაზრდების პიროვნულ განვითარებას, გუნდურ მუშაობასა და აქტიურ მოქალაქეობას.',
      histTitle: 'სკაუტინგის ისტორია',
      histText: 'სკაუტური მოძრაობა დაარსდა 1907 წელს და დღეს მსოფლიოს მილიონობით ახალგაზრდას აერთიანებს საერთო ღირებულებებით.',
      missTitle: 'მიზანი • მისია • ხედვა',
      missText: 'ჩვენი მიზანია ლიდერული, პასუხისმგებელი და ბუნებაზე მზრუნველი თაობის აღზრდა.',
      howTitle: 'როგორ გავხდე სკაუტი',
      howText: 'სკაუტად გახდომა შესაძლებელია რეგისტრაციისა და აქტიურ პროგრამებში ჩართვის გზით.',
      youthTitle: 'ახალგაზრდული პროექტები',
      youthSubtitle: 'პროექტები, რომლებიც აძლიერებს ახალგაზრდების ჩართულობას, ლიდერობასა და სოციალურ პასუხისმგებლობას.',
      youthCard1T: 'ახალგაზრდული ლიდერობა',
      youthCard1D: 'ლიდერული უნარების განვითარება პრაქტიკული აქტივობებით და გუნდურ გარემოში.',
      youthCard2T: 'სოციალური ინიციატივები',
      youthCard2D: 'მოხალისეობა, საზოგადოებრივი პროექტები და აქტიური მოქალაქეობის მხარდაჭერა.',
      youthCard3T: 'კულტურული და სპორტული აქტივობები',
      youthCard3D: 'სპორტი, ლაშქრობები და კულტურული ღონისძიებები ჯანსაღი ცხოვრების სტილისთვის.',
      youthCard4T: 'საერთაშორისო ჩართულობა',
      youthCard4D: 'გაცვლითი პროგრამები, საერთაშორისო ბანაკები და მეგობრობა საზღვრებს გარეთ.',
      socialMedia: 'სოციალური მედია',
      location: 'ადგილმდებარობა',
      partner: 'პარტნიორი',
      contact: 'კონტაქტი',
      donation: 'დონაცია'
    },
    'ENG': {
      title: 'Samegrelo Organization Scouts',
      home: 'Home',
      about: 'About Ingiri Center',
      join: 'About Us',
      sponsors: 'Gallery',
      heroTitle: 'Adventure, Nature, and Leadership in the Heart of Samegrelo.',
      heroText: 'Welcome to Samegrelo Scout Center!',
      eduTitle: 'Educational Projects',
      eduSubtitle: 'Scout educational programs that promote youth development through practical experience.',
      eduCard1T: 'Leadership Program',
      eduCard1D: 'Developing leadership skills in youth through teamwork and practical activities.',
      eduCard2T: 'Environmental Education',
      eduCard2D: 'Nature conservation, ecological awareness, and fostering responsibility.',
      eduCard3T: 'Life Skills',
      eduCard3D: 'Self-sufficiency, problem solving, and knowledge for real-world use.',
      eduCard4T: 'Non-formal Education',
      eduCard4D: 'Learning by doing, through play and practical engagement.',
      services: 'Services',
      service1: 'Scout School',
      service1D: 'Development of leadership, teamwork, and scouting skills.',
      service2: 'Youth Camps',
      service2D: 'Camping programs and practical training in nature.',
      service3: 'Offer for Schools',
      service3D: 'Educational scouting programs for schools.',
      service4: 'Eco-tours & Hiking',
      service4D: 'Active recreation and raising ecological awareness.',
      service5: 'Event Venue',
      service5D: 'Space rental for camps and events.',
      service6: 'Event Management',
      service6D: 'Full planning and organization of events.',
      service7: 'International Activities',
      service7D: 'International camps and scouting partnerships.',
      aboutTitle: 'About Us',
      aboutSubtitle: 'Samegrelo Scout Center is a youth space uniting education, nature, and leadership.',
      whoTitle: 'Who We Are',
      whoText: 'We are a scouting organization promoting personal development, teamwork, and active citizenship.',
      histTitle: 'Scouting History',
      histText: 'The Scout movement was founded in 1907 and today unites millions of youth worldwide through shared values.',
      missTitle: 'Goal • Mission • Vision',
      missText: 'Our goal is to raise a leadership-oriented, responsible, and nature-caring generation.',
      howTitle: 'How to Become a Scout',
      howText: 'Becoming a scout is possible through registration and joining active programs.',
      youthTitle: 'Youth Projects',
      youthSubtitle: 'Projects that strengthen youth engagement, leadership, and social responsibility.',
      youthCard1T: 'Youth Leadership',
      youthCard1D: 'Leadership skill development through practical activities and team settings.',
      youthCard2T: 'Social Initiatives',
      youthCard2D: 'Volunteering, community projects, and support for active citizenship.',
      youthCard3T: 'Cultural & Sports Activities',
      youthCard3D: 'Sports, hiking, and cultural events for a healthy lifestyle.',
      youthCard4T: 'International Engagement',
      youthCard4D: 'Exchange programs, international camps, and friendship across borders.',
      socialMedia: 'Social Media',
      location: 'Location',
      partner: 'Partner',
      contact: 'Contact',
      donation: 'Donation'
    }
  };

  const langContent = content[lang];
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);


  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <div className="logo-group">
          <a href="#hero" onClick={() => setMenuOpen(false)}>
            <img src="/assets/icon.ico" alt="Logo" className="logo-img" />
            <img src="assets/mountain-logo.png" className='logo-sec-img' />
          </a>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </div>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="#hero" onClick={() => setMenuOpen(false)}>
            {langContent.home}
          </a>

          {/* ABOUT US DROPDOWN */}
          <div className={`nav-dropdown ${aboutOpen ? 'open' : ''}`}>
            <button className="nav-link" onClick={() => setAboutOpen(!aboutOpen)}>
              {langContent.join}
              <span className={`dropdown-arrow ${aboutOpen ? 'rotate' : ''}`}>▾</span>
            </button>
            {aboutOpen && (
              <div className="dropdown-panel">
                <a href="#who" onClick={() => { setMenuOpen(false); setAboutOpen(false); }}>{langContent.whoTitle}</a>
                <a href="#history" onClick={() => { setMenuOpen(false); setAboutOpen(false); }}>{langContent.histTitle}</a>
                <a href="#mission" onClick={() => { setMenuOpen(false); setAboutOpen(false); }}>{langContent.missTitle}</a>
                <a href="#become" onClick={() => { setMenuOpen(false); setAboutOpen(false); }}>{langContent.howTitle}</a>
              </div>
            )}
          </div>

          <a href="#services" onClick={() => setMenuOpen(false)}>{langContent.eduTitle}</a>
          <a href="#target" onClick={() => setMenuOpen(false)}>{langContent.youthTitle}</a>

          {/* SERVICES DROPDOWN */}
          <div className={`nav-dropdown ${servicesOpen ? 'open' : ''}`}>
            <button type="button" className="nav-link" onClick={(e) => { e.stopPropagation(); setServicesOpen(prev => !prev); }}>
              {langContent.services}
              <span className={`dropdown-arrow ${servicesOpen ? 'rotate' : ''}`}>▾</span>
            </button>
            {servicesOpen && (
              <div className="dropdown-panel">
                <a href="#service-school" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>{langContent.service1}</a>
                <a href="#service-camps" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>{langContent.service2}</a>
                <a href="#service-schools" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>{langContent.service3}</a>
                <a href="#service-eco" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>{langContent.service4}</a>
                <a href="#service-venue" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>{langContent.service5}</a>
                <a href="#service-event" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>{langContent.service6}</a>
                <a href="#service-international" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>{langContent.service7}</a>
              </div>
            )}
          </div>

          <a href="#gallery" onClick={() => setMenuOpen(false)}>{langContent.sponsors}</a>
          <a href="#donation" onClick={() => setMenuOpen(false)}>{langContent.donation}</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>{langContent.contact}</a>

          <div className="menu-controls">
            <button className="control-btn" onClick={() => setLang(lang === 'ქარ' ? 'ENG' : 'ქარ')}>
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
        <img src="/assets/photos/first.jpg" alt="Scouts adventure" className="hero-img-tag" />
        <div className="hero-content">
          <h1>{langContent.heroTitle}</h1>
          <p>{langContent.heroText}</p>
        </div>
      </section>

      {/* EDUCATIONAL PROJECTS */}
      <section id="services" className="edu-projects-section">
        <h2 className="section-title">{langContent.eduTitle}</h2>
        <p className="section-subtitle">{langContent.eduSubtitle}</p>
        <div className="edu-projects-grid">
          <div className="edu-card">
            <h3>{langContent.eduCard1T}</h3>
            <p>{langContent.eduCard1D}</p>
          </div>
          <div className="edu-card">
            <h3>{langContent.eduCard2T}</h3>
            <p>{langContent.eduCard2D}</p>
          </div>
          <div className="edu-card">
            <h3>{langContent.eduCard3T}</h3>
            <p>{langContent.eduCard3D}</p>
          </div>
          <div className="edu-card">
            <h3>{langContent.eduCard4T}</h3>
            <p>{langContent.eduCard4D}</p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="services-section">
        <h2 className="section-title">{langContent.services}</h2>
        <div className="services-grid">
          <div id="service-school" className="service-card">
            <h3>{langContent.service1}</h3>
            <p>{langContent.service1D}</p>
          </div>
          <div id="service-camps" className="service-card">
            <h3>{langContent.service2}</h3>
            <p>{langContent.service2D}</p>
          </div>
          <div id="service-schools" className="service-card">
            <h3>{langContent.service3}</h3>
            <p>{langContent.service3D}</p>
          </div>
          <div id="service-eco" className="service-card">
            <h3>{langContent.service4}</h3>
            <p>{langContent.service4D}</p>
          </div>
          <div id="service-venue" className="service-card">
            <h3>{langContent.service5}</h3>
            <p>{langContent.service5D}</p>
          </div>
          <div id="service-event" className="service-card">
            <h3>{langContent.service6}</h3>
            <p>{langContent.service6D}</p>
          </div>
          <div id="service-international" className="service-card">
            <h3>{langContent.service7}</h3>
            <p>{langContent.service7D}</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <h2 className="section-title">{langContent.aboutTitle}</h2>
        <p className="section-subtitle">{langContent.aboutSubtitle}</p>
        <div className="about-content">
          <section id="who" className="about-block">
            <h3>{langContent.whoTitle}</h3>
            <p>{langContent.whoText}</p>
          </section>
          <section id="history" className="about-block">
            <h3>{langContent.histTitle}</h3>
            <p>{langContent.histText}</p>
          </section>
          <section id="mission" className="about-block">
            <h3>{langContent.missTitle}</h3>
            <p>{langContent.missText}</p>
          </section>
          <section id="become" className="about-block">
            <h3>{langContent.howTitle}</h3>
            <p>{langContent.howText}</p>
          </section>
        </div>
      </section>

      {/* YOUTH PROJECTS */}
      <section id="target" className="youth-projects-section">
        <h2 className="section-title">{langContent.youthTitle}</h2>
        <p className="section-subtitle">{langContent.youthSubtitle}</p>
        <div className="youth-projects-grid">
          <div className="youth-card">
            <h3>{langContent.youthCard1T}</h3>
            <p>{langContent.youthCard1D}</p>
          </div>
          <div className="youth-card">
            <h3>{langContent.youthCard2T}</h3>
            <p>{langContent.youthCard2D}</p>
          </div>
          <div className="youth-card">
            <h3>{langContent.youthCard3T}</h3>
            <p>{langContent.youthCard3D}</p>
          </div>
          <div className="youth-card">
            <h3>{langContent.youthCard4T}</h3>
            <p>{langContent.youthCard4D}</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-col">
          <h4>{langContent.socialMedia}</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=100064482258846" target="_blank" rel="noopener noreferrer">
              <img src="assets/facebook.png" alt="Facebook" className="logo-third-img-camp" />
            </a>
            <a href="https://www.instagram.com/scoutsofsamegrelo/" target="_blank" rel="noopener noreferrer">
              <img src="assets/instagram.png" alt="Instagram" className="logo-third-img-camp" />
            </a>
          </div>
          <div className="contact-details">
            <p><a href="tel:+9955334557890"><img src="assets/phone.png" alt="Phone" className="contact-icon-small" /> + 995 533 455 7890</a></p>
            <p><a href="mailto:scoutsofsamegrelo@gmail.com"><img src="assets/mail.png" alt="Email" className="contact-icon-small" /> scoutsofsamegrelo@gmail.com</a></p>
            <p><a href="https://scoutsofsamegrelo.com" target="_blank" rel="noreferrer"><img src="assets/web.png" alt="Web" className="contact-icon-small" /> scoutsofsamegrelo.com</a></p>
          </div>
        </div>

        <div className="footer-col" id="location">
          <h4>{langContent.location}</h4>
          <div className="map-container" style={{ marginTop: '20px' }}>
            <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.140492091809!2d41.8297427!3d42.4977788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c2506c0f5b005%3A0xe6ae831db81149c0!2z4YOV4YOU4YOi4YOU4YO_4YOY4YOc4YOQ4YO_4YOYIC8gVmV0ZXJpbmFyaWFu!5e0!3m2!1sen!2sge!4v1705312345678" width="100%" height="450" style={{ border: 0, borderRadius: '12px' }} allowFullScreen="" loading="lazy"></iframe>
          </div>
        </div>

        <div className="footer-col">
          <h4>{langContent.partner}</h4>
          <div className="partner-logos">
            <img src="assets/deja-vu.jpg" alt="DEJA VU" className='dejavu'/>
          </div>
        </div>
      </footer>
    </div>
  );
}