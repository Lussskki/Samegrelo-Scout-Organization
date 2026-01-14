import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './App.css';

const translations = {
    ka: {
        title: "საქართველოს სკაუტური მოძრაობის სამეგრელოს ორგანიზაცია",
        dev: "საიტი დეველოპმეტის პროცესშია",
        subtitle: "საქართველოს სკაუტური მოძრაობის სამეგრელოს ორგანიზაციის წევრთა სარეგისტრაციო ფორმა",
        join: "შემოგვიერთდი",
        region: "ჩვენი რეგიონი",
        donation: "დონაცია",
        donationTitle: "მხარი დაგვიჭირეთ",
        donationText: "თქვენი წვლილი გვეხმარება უფრო მეტი საინტერესო პროექტი და ბანაკი შევთავაზოთ ახალგაზრდებს.",
        donateBtn: "გაიღე წვლილი",
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
        night: "🌙 ღამე",
        whoWeAre: "ვინ ვართ ჩვენ",
        whatWeDo: "რას ვაკეთებთ",
        mission: "მიზანი მისია და ხედვა",
        aboutText: "ჩვენ ვართ მოხალისეობრივი, არაპოლიტიკური ორგანიზაცია ახალგაზრდებისთვის.",
        missionText: "ჩვენი მისიაა წვლილი შევიტანოთ ახალგაზრდების აღზრდაში ღირებულებათა სისტემის მეშვეობით.",
        logoLine1: "სამეგრელოს",
        logoLine2: " სკაუტები"
    },
    en: {
        title: "Samegrelo Organization of the Scout Movement of Georgia",
        dev: "Site is under development",
        subtitle: "Registration form for members of the Samegrelo organization of the Scout Movement of Georgia",
        join: "Join Us",
        region: "Our Region",
        donation: "Donation",
        donationTitle: "Support Us",
        donationText: "Your contribution helps us offer more interesting projects and camps for young people.",
        donateBtn: "Donate Now",
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
        night: "🌙 Night",
        whoWeAre: "Who We Are",
        whatWeDo: "What We Do",
        mission: "Mission & Vision",
        aboutText: "We are a voluntary, non-political educational movement for young people.",
        missionText: "Our mission is to contribute to the education of young people through a value system.",
        logoLine1: "Samegrelo",
        logoLine2: "Scouts"
    }
};

// --- Helper Components ---

function RegionCard({ title, text, imgClass }) {
    return (
        <div className="region-card">
            <div className={`region-img ${imgClass}`}></div>
            <div className="region-info"><h3>{title}</h3><p>{text}</p></div>
        </div>
    );
}

function AdminUpload({ lang }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    const handleUpload = async () => {
        if (!file) return alert(lang === 'ka' ? "აირჩიეთ ფაილი!" : "Select a file!");
        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.url) setUrl(data.url);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
            <h2>Upload New Photo</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ margin: '20px 0' }} />
            <br />
            <button className="cta-btn" onClick={handleUpload} disabled={loading}>
                {loading ? (lang === 'ka' ? "მუშავდება..." : "Processing...") : (lang === 'ka' ? "ატვირთვა" : "Upload to Cloudinary")}
            </button>
            {url && <div style={{ marginTop: '20px' }}><p>Link: <a href={url} target="_blank" rel="noreferrer">{url}</a></p></div>}
        </div>
    );
}

function FullGallery({ images, lang }) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const t = translations[lang];

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `${t.fullGallery} | ${translations[lang].title}`;
    }, [t.fullGallery, lang]);

    const nextImg = (e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev + 1) % images.length); };
    const prevImg = (e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev - 1 + images.length) % images.length); };

    return (
        <div className="gallery-container gallery-page">
            <div className="section-title">
                <h1>{t.fullGallery}</h1>
                <Link to="/" className="cta-btn" style={{marginTop: '10px'}}>{t.back}</Link>
            </div>
            <div className="gallery-grid">
                {images.map((img, index) => (
                    <div key={index} className="gallery-item" onClick={() => setSelectedIndex(index)}>
                        <img src={img} alt="Scout" loading="lazy" />
                    </div>
                ))}
            </div>

            {selectedIndex !== null && (
                <div className="modal-overlay" onClick={() => setSelectedIndex(null)}>
                    <span className="close-modal" onClick={() => setSelectedIndex(null)}>&times;</span>
                    <button className="nav-btn prev" onClick={prevImg}>&#10094;</button>
                    <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
                         <img className="modal-content" src={images[selectedIndex]} alt="Enlarged" />
                    </div>
                    <button className="nav-btn next" onClick={nextImg}>&#10095;</button>
                </div>
            )}
        </div>
    );
}

function HomePage({ images, lang }) {
    const form = useRef();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const t = translations[lang];

    useEffect(() => { document.title = `${translations[lang].title}`; }, [lang]);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            form.current, 
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        ).then(() => {
            alert(lang === 'ka' ? 'შეტყობინება გაიგზავნა!' : 'Message sent!');
            form.current.reset();
        }, () => {
            alert(lang === 'ka' ? 'შეცდომაა, სცადეთ მოგვიანებით.' : 'Error, please try again.');
        });
    };

    const nextImg = (e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev + 1) % images.length); };
    const prevImg = (e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev - 1 + images.length) % images.length); };

    return (
        <>
            <header className="hero" id="home">
                <div className="hero-text">
                    <p style={{ color: '#ffc107', marginBottom: '10px', fontSize: '1.2rem' }}>"{t.dev}"</p>
                    <h1>{translations[lang].title}</h1>
                    <p>{t.subtitle}</p>
                    <a href="#contact" className="cta-btn">{t.join}</a>
                </div>
            </header>

            <section className="container" id="about">
                <div className="section-title"><h2>{t.whoWeAre}</h2></div>
                <div className="centered-text"><p>{t.aboutText}</p></div>
            </section>

            <section className="container" id="region-section">
                <div className="section-title"><h2>{t.region}</h2></div>
                <div className="region-grid">
                    <RegionCard title={t.samegrelo} text={t.samegreloText} imgClass="img-samegrelo" />
                    <RegionCard title={t.svaneti} text={t.svanetiText} imgClass="img-svaneti" />
                </div>
            </section>

            <section className="activities-container" id="activities">
                <div className="section-title"><h2>{t.whatWeDo}</h2></div>
                <div className="activities-list">
                    <div className="activity-item">{t.camp}</div>
                    <div className="activity-item">{t.hike}</div>
                    <div className="activity-item">{t.projects}</div>
                    <div className="activity-item">{t.help}</div>
                </div>
            </section>

            <section className="container" id="mission">
                <div className="section-title"><h2>{t.mission}</h2></div>
                <div className="centered-text"><p>{t.missionText}</p></div>
            </section>

            {/* --- NEW DONATION SECTION --- */}
            <section className="container donation-section" id="donation">
                <div className="section-title"><h2>{t.donationTitle}</h2></div>
                <div className="centered-text">
                    <p>{t.donationText}</p>
                    <button className="cta-btn" style={{marginTop: '20px'}}>{t.donateBtn}</button>
                </div>
            </section>

            <section className="gallery-container" id="gallery-section">
                <div className="section-title"><h2>{t.photos}</h2></div>
                <div className="gallery-grid">
                    {images.slice(0, 6).map((img, index) => (
                        <div key={index} className="gallery-item" onClick={() => setSelectedIndex(index)}>
                            <img src={img} alt="Gallery preview" loading="lazy" />
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Link to="/gallery" className="cta-btn">{t.viewAll}</Link>
                </div>
            </section>

            {selectedIndex !== null && (
                <div className="modal-overlay" onClick={() => setSelectedIndex(null)}>
                    <span className="close-modal" onClick={() => setSelectedIndex(null)}>&times;</span>
                    <button className="nav-btn prev" onClick={prevImg}>&#10094;</button>
                    <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
                        <img className="modal-content" src={images[selectedIndex]} alt="Enlarged" />
                    </div>
                    <button className="nav-btn next" onClick={nextImg}>&#10095;</button>
                </div>
            )}

            <section className="contact-container" id="contact">
                <div className="section-title"><h2>{t.contact}</h2></div>
                <form ref={form} className="contact-form" onSubmit={sendEmail}>
                    <input type="text" name="name" placeholder={t.name} required />
                    <input type="email" name="email" placeholder={t.email} required />
                    <textarea name="message" placeholder={t.message} required></textarea>
                    <button type="submit" className="cta-btn">{t.send}</button>
                </form>
            </section>
        </>
    );
}

// --- Main App Component ---

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lang, setLang] = useState('ka');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const t = translations[lang];

    const galleryImages = [
        'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345768/scouts_gallery/xihnsdvz89yaim6uy0mq.jpg', 
        'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345779/scouts_gallery/bdmgyvbc4u2v84euxevu.jpg',
        'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345785/scouts_gallery/hq7xlxa83oqeue2v7n5f.jpg', 
        'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768344314/scouts_gallery/lwlaa6otqrviplveleic.jpg',
        'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345790/scouts_gallery/suwowi2cp8gsjzulots8.jpg', 
        'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345795/scouts_gallery/qi1gguz0ixsjy8plnhwf.jpg',
        'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345799/scouts_gallery/lgdufaxatpl96ya3o7mc.jpg', 
        'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345804/scouts_gallery/idnuvxc76dalu7mxuwso.jpg',
        'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345810/scouts_gallery/ne49f5mvrmqeqdoekqiw.jpg', 
        'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345815/scouts_gallery/sainsemc72f3ul9teb3l.jpg'
    ];

    useEffect(() => { setIsMenuOpen(false); }, [location]);

    const scrollToSection = (e, id) => {
        if (e) e.preventDefault();
        setIsMenuOpen(false);
        
        const executeScroll = () => {
            const target = id === 'top' ? document.documentElement : document.getElementById(id);
            target?.scrollIntoView({ behavior: 'smooth' });
        };

        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(executeScroll, 100);
        } else {
            executeScroll();
        }
    };

    return (
        <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <nav>
                <div className="logo" onClick={(e) => scrollToSection(e, 'top')} style={{ cursor: 'pointer' }}>
                    <img src="/assets/icon.ico" alt="Logo" style={{ height: '45px', borderRadius: '5px' }} />
                    <div className="logo-text">
                        <span className="line1">{t.logoLine1}</span>
                        <span className="line2">{t.logoLine2}</span>
                    </div>
                </div>

                <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? '✕' : '☰'}
                </div>

                <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
                    <li><a href="/" onClick={(e) => scrollToSection(e, 'top')}>{t.main}</a></li>
                    <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{t.whoWeAre}</a></li>
                    <li><a href="#activities" onClick={(e) => scrollToSection(e, 'activities')}>{t.whatWeDo}</a></li>
                    <li><a href="#mission" onClick={(e) => scrollToSection(e, 'mission')}>{t.mission}</a></li>
                    <li><a href="#region" onClick={(e) => scrollToSection(e, 'region-section')}>{t.region}</a></li>
                    {/* Navigation now correctly targets #donation */}
                    <li><a href="#donation" onClick={(e) => scrollToSection(e, 'donation')}>{t.donation}</a></li>
                    
                    <li><a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery-section')}>{t.gallery}</a></li>
                    <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>{t.contact}</a></li>
                    
                    <li className="nav-controls-wrapper">
                        <div className="nav-controls">
                            <button className="lang-btn" onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}>
                                {lang === 'ka' ? 'EN' : 'KA'}
                            </button>
                            <button className="theme-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
                                {isDarkMode ? t.day : t.night}
                            </button>
                        </div>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage images={galleryImages} lang={lang} />} />
                <Route path="/gallery" element={<FullGallery images={galleryImages} lang={lang} />} />
                <Route path="/admin-upload" element={<AdminUpload lang={lang} />} />
            </Routes>

            <footer>
                <p>© 2026 Scout Of Samegrelo</p>
                <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                </div>
            </footer>
        </div>
    );
}

export default App;