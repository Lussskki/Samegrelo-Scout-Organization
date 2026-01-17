import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './App.css';

// 1. SHARED DATA SOURCE
const ALL_PHOTOS = [
    { id: 1, year: '2026', type: 'CAMP', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345768/scouts_gallery/xihnsdvz89yaim6uy0mq.jpg', title: 'Summer Camp' },
    { id: 2, year: '2026', type: 'HIKE', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345779/scouts_gallery/bdmgyvbc4u2v84euxevu.jpg', title: 'Mountain Hike' },
    { id: 3, year: '2026', type: 'PROJECT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345785/scouts_gallery/hq7xlxa83oqeue2v7n5f.jpg', title: 'Eco Project' },
    { id: 4, year: '2025', type: 'CAMP', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768344314/scouts_gallery/lwlaa6otqrviplveleic.jpg', title: 'Scout Gathering' },
    { id: 5, year: '2025', type: 'HIKE', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345790/scouts_gallery/suwowi2cp8gsjzulots8.jpg', title: 'Winter Trail' },
    { id: 6, year: '2024', type: 'PROJECT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345795/scouts_gallery/qi1gguz0ixsjy8plnhwf.jpg', title: 'Community Service' },
    { id: 7, year: '2024', type: 'CAMP', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345799/scouts_gallery/lgdufaxatpl96ya3o7mc.jpg', title: 'River Camp' },
    { id: 8, year: '2024', type: 'HIKE', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345804/scouts_gallery/idnuvxc76dalu7mxuwso.jpg', title: 'Forest Adventure' },
    { id: 9, year: '2024', type: 'PROJECT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345810/scouts_gallery/ne49f5mvrmqeqdoekqiw.jpg', title: 'Scout Workshop' },
    { id: 10, year: '2024', type: 'CAMP', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345815/scouts_gallery/sainsemc72f3ul9teb3l.jpg', title: 'Night Camp' },
    { id: 11, year: '2023', type: 'CAMP', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768656455/605735123_1262451279247602_1666760631671871991_n_el2kyc.jpg', title: 'Night Camp' },
    { id: 12, year: '2022', type: 'PROJECT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768656454/605634855_1262452119247518_1681845932750345038_n_rb0daq.jpg', title: 'Scout Event' },
    { id: 13, year: '2021', type: 'HIKE', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768656454/605546259_1262451275914269_7638445953210656403_n_ofeuok.jpg', title: 'Hiking Trip' },
    { id: 14, year: '2021', type: 'CAMP', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768656454/605779944_1262451235914273_8094537458807837207_n_on84ya.jpg', title: 'Summer Memories' },
    { id: 15, year: '2020', type: 'PROJECT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768656454/605595957_1262451302580933_7443430494405088376_n_srqd3i.jpg', title: 'Project Day' },
    { id: 16, year: '2019', type: 'CAMP', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768657029/606023501_1262451075914289_8549196380556588250_n_sxpnjn.jpg', title: 'Old Camp' },
    { id: 17, year: '2018', type: 'HIKE', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768657028/607210256_1262451145914282_804245334787542014_n_aiedin.jpg', title: 'Forest Walk' },
    { id: 18, year: '2017', type: 'PROJECT', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768657028/607712163_1262451169247613_115438784771902412_n_rxlof3.jpg', title: 'Community Work' },
    { id: 19, year: '2016', type: 'CAMP', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768657028/605719325_1262451069247623_2949206353101821358_n_nou34y.jpg', title: 'Gathering' },
    { id: 20, year: '2015', type: 'HIKE', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768657353/605473339_1262450345914362_5766854695694693243_n_stzm3q.jpg', title: 'Adventure' },
    { id: 21, year: '2014', type: 'CAMP', url: 'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768657353/605672417_1262450359247694_7351886922705524346_n_wdttxj.jpg', title: 'First Camp' }
];

const translations = {
    ka: {
        title: "საქართველოს სკაუტური მოძრაობის სამეგრელოს ორგანიზაცია",
        dev: "საიტი დეველოპმეტის პროცესშია",
        subtitle: "საქართველოს სკაუტური მოძრაობის სამეგრელოს ორგანიზაციის წევრთა სარეგისტრაციო ფორმა",
        join: "შემოგვიერთდი",
        region: "ჩვენი რეგიონი",
        location: "მდებარეობა", 
        locationText: "ჩვენი ოფისი მდებარეობს ინგირში, თავისუფლების ქუჩაზე ", 
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
        location: "Location", 
        locationText: "Our office is located in Intsiri, on Tavisupleba Street.",
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
        logoLine1: "Scouts",
        logoLine2: " Of Samegrelo"
    }
};

// --- NEW COMPONENT: FIXES THE BOTTOM-LAUNCH ISSUE ---
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

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

function FullGallery({ lang }) {
    const [selectedYear, setSelectedYear] = useState('All');
    const [currentIndex, setCurrentIndex] = useState(null);
    const t = translations[lang];

    const years = ['All', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014'];

    const filteredPhotos = selectedYear === 'All' 
        ? ALL_PHOTOS 
        : ALL_PHOTOS.filter(photo => photo.year === selectedYear);

    const showNext = (e) => {
        if (e) e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
    };

    const showPrev = (e) => {
        if (e) e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    };

    const selectedImg = currentIndex !== null ? filteredPhotos[currentIndex] : null;

    return (
        <div className="portfolio-app gallery-page-wrapper">
            <header className="archive-header">
                <h1>{t.fullGallery} {selectedYear !== 'All' ? `(${selectedYear})` : ''}</h1>
                <div className="filter-bar">
                    {years.map(year => (
                        <button 
                            key={year} 
                            className={selectedYear === year ? 'active' : ''} 
                            onClick={() => {
                                setSelectedYear(year);
                                setCurrentIndex(null); 
                            }}
                        >
                            {year}
                        </button>
                    ))}
                </div>
                <Link to="/" className="cta-btn" style={{marginTop: '30px'}}>{t.back}</Link>
            </header>

            <div className="masonry-grid">
                {filteredPhotos.map((img, index) => (
                    <div key={img.id} className="masonry-item" onClick={() => setCurrentIndex(index)}>
                        <img src={img.url} alt={img.title} loading="lazy" />
                        <div className="item-hover-overlay">
                            <div className="overlay-content">
                                <h2 className="overlay-type">{img.type}</h2>
                                <p className="overlay-year">{img.year}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImg && (
                <div className="lightbox" onClick={() => setCurrentIndex(null)}>
                    <button className="close-btn" onClick={() => setCurrentIndex(null)}>×</button>
                    <button className="nav-arrow left" onClick={showPrev}>❮</button>
                    <div className="lightbox-center" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImg.url} alt={selectedImg.title} className="lightbox-img" />
                        <div className="lightbox-caption">
                            <h3>{selectedImg.title}</h3>
                            <p>{selectedImg.year} - {selectedImg.type}</p>
                        </div>
                    </div>
                    <button className="nav-arrow right" onClick={showNext}>❯</button>
                </div>
            )}
        </div>
    );
}

function HomePage({ lang }) {
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

    const previewImages = ALL_PHOTOS.slice(0, 6); 

    const nextImg = (e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev + 1) % previewImages.length); };
    const prevImg = (e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length); };

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

            <section className="container" id="location">
                <div className="section-title"><h2>{t.location}</h2></div>
                <div className="centered-text">
                    <p>{t.locationText}</p>
                    <div className="map-container" style={{ marginTop: '20px' }}>
                        <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.140492091809!2d41.8297427!3d42.4977788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c2506c0f5b005%3A0xe6ae831db81149c0!2z4YOV4YOU4YOi4YOU4YO_4YOY4YOc4YOQ4YO_4YOYIC8gVmV0ZXJpbmFyaWFu!5e0!3m2!1sen!2sge!4v1705312345678" width="100%" height="450" style={{ border: 0, borderRadius: '12px' }} allowFullScreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </section>

            <section className="container donation-section" id="donation">
                <div className="section-title"><h2>{t.donationTitle}</h2></div>
                <div className="centered-text">
                    <p>{t.donationText}</p>
                    <button className="cta-btn" style={{marginTop: '20px'}}>{t.donateBtn}</button>
                </div>
            </section>

            <section className="gallery-container" id="gallery-section">
                <div className="section-title"><h2>{t.photos}</h2></div>
                <div className="masonry-grid">
                    {previewImages.map((img, index) => (
                        <div key={img.id} className="masonry-item" onClick={() => setSelectedIndex(index)}>
                            <img src={img.url} alt={img.title} loading="lazy" />
                            <div className="item-hover-overlay">
                                <div className="overlay-content">
                                    <h2 className="overlay-type">{img.type}</h2>
                                    <p className="overlay-year">{img.year}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Link to="/gallery" className="cta-btn">{t.viewAll}</Link>
                </div>
            </section>

            {selectedIndex !== null && (
                <div className="modal-overlay" onClick={() => setSelectedIndex(null)}>
                    <span className="close-modal" onClick={() => setSelectedIndex(null)}>×</span>
                    <button className="nav-btn prev" onClick={prevImg}>❮</button>
                    <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
                        <img className="modal-content" src={previewImages[selectedIndex].url} alt="Enlarged" />
                    </div>
                    <button className="nav-btn next" onClick={nextImg}>❯</button>
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

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lang, setLang] = useState('ka');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const t = translations[lang];

    useEffect(() => { setIsMenuOpen(false); }, [location]);

    // Updated scroll logic to handle both ID navigation and page top resets
    const scrollToSection = (e, id) => {
        if (e) e.preventDefault();
        setIsMenuOpen(false);
        
        const executeScroll = () => {
            if (id === 'top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const target = document.getElementById(id);
                target?.scrollIntoView({ behavior: 'smooth' });
            }
        };

        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(executeScroll, 150);
        } else {
            executeScroll();
        }
    };

    return (
        <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
            {/* THIS FIXES THE GALLERY SCROLL ISSUE */}
            <ScrollToTop />

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
                    <li><a href="#location" onClick={(e) => scrollToSection(e, 'location')}>{t.location}</a></li>
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
                <Route path="/" element={<HomePage lang={lang} />} />
                <Route path="/gallery" element={<FullGallery lang={lang} />} />
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