import { useState, useEffect } from 'react'
import './App.css'

// Gallery
const galleryPhotos = [
{ id: 1, src: '/assets/photos/chveni-fotoebi/1.jpg', alt: 'Scouts Camp' },
{ id: 2, src: '/assets/photos/chveni-fotoebi/2.jpg', alt: 'Workspace of anaklia' },
{ id: 3, src: '/assets/photos/chveni-fotoebi/3.jpg', alt: 'Event' },
// { id: 4, src: '/assets/photos/chveni-fotoebi/4.jpg', alt: 'The Avatar camp' },
{ id: 5, src: '/assets/photos/chveni-fotoebi/5.jpg', alt: 'Samegrelo Nature' },
{ id: 6, src: '/assets/photos/chveni-fotoebi/6.jpg', alt: 'The Avatar camp' },
];
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('ქარ'); // ქარ / ENG
  const [theme, setTheme] = useState('day'); // day / night
  const [selectedImgIndex, setSelectedImgIndex] = useState(null);

  // Carousel Logic
  const nextPhoto = (e) => {
    e.stopPropagation();
    setSelectedImgIndex((prev) => (prev + 1) % galleryPhotos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setSelectedImgIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  // Close lightbox on Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setSelectedImgIndex(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  // day/night
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
      heroTitle: 'იყავი მზად! გახდი სკაუტი! სკაუტებთან კარგია!',
      heroText: 'საქართველოს სკაუტური მოძრაობის სამეგრელოს ორგანიზაცია',
      // განხორციელებული პროექტები -  Completed projects
      eduTitle: 'განხორციელებული პროექტები',
      eduSubtitle: 'საზოგადოების მსახურებიდან გარემოს დაცვამდე, ეს ის ინიციატივებია, რომლებიც ჩვენ განვახორციელეთ. გაეცანით ჩვენს ლიდერობის, გუნდური მუშაობისა და ადგილობრივი გავლენის გზას.',
      eduCard1T: 'სკაუტები COVID-19 ის წინააღმდეგ',
      eduCard1D: 'წითელ ჯვართან სასიცოცხლოდ მნიშვნელოვანი პარტნიორობის ფარგლებში, ჩვენი გუნდი პანდემიის დროს წინა ხაზზე იდგა, რათა დახმარებოდა ყველაზე მეტად გაჭირვებულებს. ჩვენ მთელი ქვეყნის მასშტაბით ვიმოგზაურეთ აუცილებელი მარაგების გადასატანად, რათა გლობალური კრიზისის დროს დაუცველი ოჯახებისთვის მიეღოთ სიცოცხლის გადარჩენის მედიკამენტები, საკვები და ძირითადი საჭიროებები.',
      eduCard2T: 'სკაუტური ბანაკი ავატარი',
      eduCard2D: '2020 წლის მნიშვნელოვანი ეტაპი იყო „ავატარის ბანაკი“, რომელიც ჩვენი ორგანიზაციის პირველი ოფიციალური ბანაკი იყო. ეს იყო გრანდიოზული წარმატება, რომელმაც თავგადასავალი ლიდერობის ტრენინგთან გააერთიანა, ჩვენი ჯგუფისთვის საფუძველი ჩაუყარა და დაამტკიცა, რომ ჩვენს სკაუტებს შეუძლიათ ხედვა დაუვიწყარ გარე გამოცდილებად აქციონ.',
      eduCard3T: 'MOVA-ს საერთაშორისო ჯამბორი',
      eduCard3D: 'ჩვენმა სკაუტებმა მსოფლიო მასშტაბით გაიცნეს თავი MOVA-ს მასშტაბურ ეროვნულ ჯამბორიში მონაწილეობით. 30 000 საერთაშორისო მონაწილესთან ერთად, ჩვენ ჩავერთეთ მსოფლიო დონის სკაუტურ გამოცდილებაში, რომელიც ორიენტირებული იყო კულტურულ გაცვლასა და მაღალი დონის გარე უნარებზე, რითაც წარმოვადგინეთ ჩვენი ორგანიზაცია მსოფლიო სკაუტური ხელოვნების უდიდეს სცენაზე.',
      eduCard4T: 'სკაუტი მასწავლებელი',
      eduCard4D: 'სკაუტური ძირითადი ფილოსოფიის - „სწავლა კეთებით“ - მიჰყვება, ეს პროგრამა ახალგაზრდებს თამაშისა და პრაქტიკული ჩართულობის გზით აძლიერებს. ის განათლებას აქტიურ გამოცდილებად აქცევს, რაც მონაწილეებს საშუალებას აძლევს, ახალი უნარები შეიძინონ პრაქტიკული ჩართულობით და არა მხოლოდ თეორიული ცდებით.',
      eduCard5T: 'ენერგოეფექტურობის შესახებ ცნობიერების ამაღლების კამპანია',
      eduCard5D: 'უფრო მწვანე მომავლისთვის ბრძოლის ინიციატივით, ეს კამპანია მდგრადი განვითარების ძალაზე იყო ორიენტირებული. ჩვენ ჩვენს საზოგადოებას ენერგიის დაზოგვის მნიშვნელობაზე გავაცანი ინფორმაცია, ვასწავლეთ პრაქტიკული გზები, თუ როგორ შევამციროთ ნახშირბადის კვალი და ეფექტურად ვმართოთ რესურსები პლანეტისთვის.',
      eduCard6T: 'Nexus- ევროპის სკაუტური რეგიონის საგანმანათლებლო პროგრამის აპრობირება საქართველოში',
      eduCard6D: 'ჩვენ ვამაყობთ, რომ ევროპის სკაუტური რეგიონის საგანმანათლებლო პროგრამის სატესტო პლატფორმას წარმოვადგენდით საქართველოში. ამ პროექტმა ადგილობრივ ახალგაზრდობასა და საერთაშორისო სტანდარტებს შორის დამაკავშირებელი ხიდის როლი შეასრულა და თანამედროვე საგანმანათლებლო ინსტრუმენტები დანერგა სოციალური ინოვატორების მომავალი თაობის განვითარების მიზნით.',
      eduCard7T: 'მსოფლიო სკაუტური ჯამბორი 2023',
      eduCard7D: 'ჩვენი ქვეყნის წარმომადგენლად მსოფლიო ასპარეზზე, ჩვენი სკაუტები დაესწრნენ მსოფლიო სკაუტურ ჯამბორის. ამ მასშტაბურმა შეკრებამ ჩვენს წევრებს საშუალება მისცა, გაუზიარონ ერთმანეთს კულტურა და იდეები მსოფლიოს ყველა კუთხიდან ჩამოსულ სკაუტებთან, რამაც გააძლიერა ჩვენი კავშირი მსოფლიო სკაუტურ მოძრაობასთან.',
      eduCard8T: 'საქველმოქმედო ღონისძიებები',
      eduCard8D: 'ჩვენი მასშტაბური ბანაკების გარდა, ჩვენ კვლავ ერთგულები ვრჩებით საზოგადოების მუდმივი სამსახურის. სხვადასხვა ადგილობრივი საქველმოქმედო ღონისძიებების მეშვეობით, ჩვენი სკაუტები ავლენენ თანაგრძნობას და ლიდერობას, ორგანიზებით აწყობენ საქველმოქმედო აქციებს და მხარს უჭერენ ჩვენს სამეზობლოში მცხოვრებ გაჭირვებულებს.',
    
      services: 'სერვისები',
      service1: '',
      service1D: 'ლიდერობის, გუნდურობისა და სკაუტური უნარების განვითარება.',
      service2: 'მიმდინარე პროექტები',
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
      // მიმდინარე პროექტები - Current project
      youthTitle: 'მიმდინარე პროექტები',
      youthSubtitle: 'ჩვენი მოგზაურობა გრძელდება! ეს განყოფილება მოიცავს ამჟამად შემუშავების პროცესში მყოფ პროექტებს. ეს ინიციატივები საშუალებას აძლევს ჩვენს ახალგაზრდა წევრებს, ისწავლონ პრაქტიკით, უმკლავდებიან რეალურ გამოწვევებს და უჭერენ მხარს ჩვენს ადგილობრივ საზოგადოებას პრაქტიკული მსახურებით.',
      youthCard1T: '',
      youthCard1D: 'ლიდერული უნარების განვითარება პრაქტიკული აქტივობებით და გუნდურ გარემოში.',
      youthCard2T: '',
      youthCard2D: 'მოხალისეობა, საზოგადოებრივი პროექტები და აქტიური მოქალაქეობის მხარდაჭერა.',
      youthCard3T: '',
      youthCard3D: 'სპორტი, ლაშქრობები და კულტურული ღონისძიებები ჯანსაღი ცხოვრების სტილისთვის.',
      youthCard4T: '',
      youthCard4D: 'გაცვლითი პროგრამები, საერთაშორისო ბანაკები და მეგობრობა საზღვრებს გარეთ.',
      youthCard5T: 'ენერგოეფექტურობის შესახებ ცნობიერების ამაღლების კამპანია',
      youthCard5D: 'ლიდერული უნარების განვითარება პრაქტიკული აქტივობებით და გუნდურ გარემოში.',
      youthCard6T: 'Nexus- ევროპის სკაუტური რეგიონის საგანმანათლებლო პროგრამის აპრობირება საქართველოში',
      youthCard6D: 'ლიდერული უნარების განვითარება პრაქტიკული აქტივობებით და გუნდურ გარემოში.',
      youthCard7T: 'მსოფლიო სკაუტური ჯამბორი 2023',
      youthCard7D: 'ლიდერული უნარების განვითარება პრაქტიკული აქტივობებით და გუნდურ გარემოში.',
      youthCard8T: 'საქველმოქმედო ღონისძიებები',
      youthCard8D: 'ლიდერული უნარების განვითარება პრაქტიკული აქტივობებით და გუნდურ გარემოში.',

      socialMedia: 'სოციალური მედია',
      location: 'ადგილმდებარობა',
      partner: 'პარტნიორი',
      contact: 'კონტაქტი',
      register: 'რეგისტრაცია',
      registerSubtitle: 'შემოგვიერთდი და გახდი სკაუტური მოძრაობის ნაწილი',
      bankTransfer: 'საბანკო გადარიცხვა',
      accountNumber: 'გიორგი ჭეჟიას ანგარიშის ნომერი (IBAN): GE00TB0000000000000000',
      recipient: 'მიმღები: სამეგრელოს სკაუტური ორგანიზაცია',
      donation: 'დონაცია',
      accountNum: 'საბანკო ანგარიში (IBAN): GE00TB0000000000000000',
    },
    'ENG': {
      title: 'Samegrelo Organization Scouts',
      home: 'Home',
      about: 'About Ingiri Center',
      join: 'About Us',
      sponsors: 'Gallery',
      heroTitle: 'Be ready! Become a scout! It`s good to be with the scouts!',
      heroText: 'Samegrelo Organization of the Scout Movement of Georgia',
      // Completed projects - განხორციელებული პროექტები
      eduTitle: 'Completed Projects',
      eduSubtitle: 'From community service to environmental conservation, these are the initiatives we`ve brought to life. Explore our journey of leadership, teamwork, and local impact.',
      eduCard1T: 'Scouts against Covid-19',
      eduCard1D: 'In a vital partnership with the Red Cross, our team took to the front lines during the pandemic to support those most in need. We traveled across the country to deliver essential supplies, ensuring that vulnerable families received life-saving medicine, food, and basic necessities during a time of global crisis.',
      eduCard2T: 'Scout Camp Avatar',
      eduCard2D: 'Marking a major milestone in 2020, Camp Avatar was our organization’s very first official camp. It was a landmark success that combined adventure with leadership training, creating a foundation for our group and proving that our Scouts could turn a vision into an unforgettable outdoor experience.',
      eduCard3T: 'MOVA International Jamboree',
      eduCard3D: 'Our Scouts went global by participating in the massive MOVA National Jamboree. Joining 30,000 international participants, we immersed ourselves in a world-class scouting experience centered on cultural exchange and high-level outdoor skills, representing our organization on the grandest stage of world scouting.',
      eduCard4T: 'Scout teacher',
      eduCard4D: 'Following the core scouting philosophy of "learning by doing," this program empowers youth through play and practical engagement. It turns education into an active experience, allowing participants to gain new skills through hands-on involvement rather than just theory.',
      eduCard5T: 'Energy Efficiency Awareness Campaign',
      eduCard5D: 'Leading the charge for a greener future, this campaign focused on the power of sustainability. We educated our community on the importance of energy conservation, teaching practical ways to reduce our carbon footprint and manage resources effectively for the planet.',
      eduCard6T: 'Nexus - Testing the European Scout Region Educational Program in Georgia',
      eduCard6D: 'We are proud to have served as the testing ground for the European Scout Region’s Educational Program in Georgia. This project acted as a bridge between local youth and international standards, implementing modern educational tools to develop the next generation of social innovators.',
      eduCard7T: 'World Scout Jamboree 2023',
      eduCard7D: 'Representing our country on the ultimate global stage, our scouts attended the World Scout Jamboree. This massive gathering allowed our members to exchange culture and ideas with scouts from every corner of the globe, strengthening our connection to the worldwide scouting movement.',
      eduCard8T: 'Charity events',
      eduCard8D: 'Beyond our large-scale camps, we remain dedicated to consistent community service. Through various local charity events, our scouts practice empathy and leadership by organizing fundraisers and support drives for those in need within our own neighborhoods.',
      
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
      youthTitle: 'Current projects',
      youthSubtitle: 'Our journey continues! This section features the projects currently in development. These initiatives allow our youth members to learn by doing, as they tackle real-world challenges and support our local community through hands-on service.',
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
      register: 'Register',
      registerSubtitle: 'Join us and become part of the Scout movement.',
      recipient: 'Recipient: Samegrelo Scout Organization',
      donation: 'Donation',
      accountNum: 'Bank Account (IBAN): GE00TB0000000000000000',
    }
  };

  const langContent = content[lang];
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);



  return (
    <div className="container">
      {/* HEADER - ჰედერი*/}
      <header className="header">
        <div className="logo-group">
          <a href="#hero" onClick={() => setMenuOpen(false)}>
            <img src="/assets/icon.ico" alt="Logo" className="logo-img" />
            <img src="assets/mountain-logo.ico" className='logo-sec-img' />
          </a>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </div>

        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="#hero" onClick={() => setMenuOpen(false)}>
            {langContent.home}
          </a>
          {/* ABOUT US DROPDOWN - ჩვენს შესახებ სქროლი */}
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

          {/* SERVICES DROPDOWN - სერვისების სქროლი*/}
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


          {/* მიმდინარე პროექტები 1 - განხორციელებული პროექტები 2 */}
          <a href="#target" onClick={() => setMenuOpen(false)}>{langContent.youthTitle}</a>
          <a href="#education" onClick={() => setMenuOpen(false)}>{langContent.eduTitle}</a>  

            {/* გალერეა - დონაცია - კონტაქტი */}
          <a href="#gallery" onClick={() => setMenuOpen(false)}>{langContent.sponsors}</a>
          <a href="#donation" onClick={() => setMenuOpen(false)}>{langContent.donation}</a>
            {/* CONTACT DROPDOWN - კონტაქტები */}
          <div className={`nav-dropdown ${contactOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="nav-link"
              onClick={(e) => {
                e.stopPropagation();
                setContactOpen(prev => !prev);
              }}
            >
              {langContent.contact}
              <span className={`dropdown-arrow ${contactOpen ? 'rotate' : ''}`}>▾</span>
            </button>

            {contactOpen && (
              <div className="dropdown-panel">
                <a
                  href="#contact"
                  onClick={() => {
                    setMenuOpen(false);
                    setContactOpen(false);
                  }}
                >
                  {langContent.socialMedia}
                </a>

                <a
                  href="#location"
                  onClick={() => {
                    setMenuOpen(false);
                    setContactOpen(false);
                  }}
                >
                  {langContent.location}
                </a>

                <a
                  href="#register"
                  onClick={() => {
                    setMenuOpen(false);
                    setContactOpen(false);
                  }}
                >
                  {langContent.register}
                </a>

                <a
                  href="#partner"
                  onClick={() => {
                    setMenuOpen(false);
                    setContactOpen(false);
                  }}
                >
                  {langContent.partner}
                </a>
              </div>
            )}
          </div>




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
        <img src="/assets/photos/first.jpg" alt="Scouts" className="hero-img-tag" />
        <div className="hero-content">
          <h1>{langContent.heroTitle}</h1>
          <p>{langContent.heroText}</p>
        </div>
      </section>

      {/* Completed projects - განხორციელებული პროექტები*/}
      <section id="education" className="edu-projects-section">
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
          <div className="edu-card">
            <h3>{langContent.eduCard5T}</h3>
            <p>{langContent.eduCard5D}</p>
          </div>
          <div className="edu-card">
            <h3>{langContent.eduCard6T}</h3>
            <p>{langContent.eduCard6D}</p>
          </div>
          <div className="edu-card">
            <h3>{langContent.eduCard7T}</h3>
            <p>{langContent.eduCard7D}</p>
          </div>
          <div className="edu-card">
            <h3>{langContent.eduCard8T}</h3>
            <p>{langContent.eduCard8D}</p>
          </div>                                        
        </div>
      </section>

      {/* SERVICES SECTION -სერვისების სექცია */}
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

      {/* ABOUT US - ჩვენს შესახებ*/}
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

            {/* მიმდინარე პროექტები - Current project */}
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
                <div className="youth-card">
                  <h3>{langContent.youthCard5T}</h3>
                  <p>{langContent.youthCard5D}</p>
                </div>
                <div className="youth-card">
                  <h3>{langContent.youthCard6T}</h3>
                  <p>{langContent.youthCard6D}</p>
                </div>
                <div className="youth-card">
                  <h3>{langContent.youthCard7T}</h3>
                  <p>{langContent.youthCard7D}</p>
                </div>
                <div className="youth-card">
                  <h3>{langContent.youthCard8T}</h3>
                  <p>{langContent.youthCard8D}</p>
                </div>
              </div>
            </section>
            
          {/* REGISTER SECTION */}
          <section id="register" className="register-section">
            <h2 className="section-title">
              {langContent.register}
            </h2>

            <p className="section-subtitle">
              {langContent.registerSubtitle}
            </p>

            <div className="register-content">
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="register-btn"
              >
                {langContent.register}
              </a>
            </div>
          </section>
          {/* Gallery - გალერეა */}
          <section id="gallery" className="gallery-section">
            <h2 className="section-title">{langContent.sponsors}</h2>
            <div className="masonry-wrapper">
              <div className="masonry-grid">
                {galleryPhotos.map((photo, index) => (
                  <div 
                    key={photo.id} 
                    className="masonry-item" 
                    onClick={() => setSelectedImgIndex(index)} // Open lightbox
                  >
                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                    <div className="masonry-overlay">
                      <span>{photo.alt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LIGHTBOX MODAL */}
          {selectedImgIndex !== null && (
            <div className="lightbox" onClick={() => setSelectedImgIndex(null)}>
              <button className="close-btn">&times;</button>
              
              <button className="nav-btn prev" onClick={prevPhoto}>&#10094;</button>
              
              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img src={galleryPhotos[selectedImgIndex].src} alt="Selected" />
                <p className="caption">{galleryPhotos[selectedImgIndex].alt}</p>
              </div>

              <button className="nav-btn next" onClick={nextPhoto}>&#10095;</button>
            </div>
          )}

              {/* Donation */}
          <section id="donation" className="donation-simple">
            <h2 className="section-title">{langContent.donation}</h2>
            <div className="account-container">
              <p className="iban-text">{langContent.accountNum}</p>
              <button 
                className="copy-btn-simple" 
                onClick={() => {
                  navigator.clipboard.writeText('GE00TB0000000000000000');
                  alert('Copied!');
                }}
              >
                Copy IBAN
              </button>
            </div>
          </section>              


      {/* FOOTER - ფუტერი */}
      <footer className="footer">
        <div className="footer-col" id="contact">
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

        <div className="footer-col" id="partner">
          <h4>{langContent.partner}</h4>
          <div className="partner-logos">
            <img src="assets/deja-vu.jpg" alt="DEJA VU" className='dejavu'/>
          </div>
        </div>
      </footer>
    </div>
  );
}