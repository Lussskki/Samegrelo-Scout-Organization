import { useState, useEffect } from 'react'

// განხორიელებული პროექტები
import movaLogo from '/assets/MOVA.jpg' 
import avatarLogo from '/assets/AVATAR2020.jpg'
import redCrossLogo from '/assets/REDCROSS.png'
import scoutLearnLogo from '/assets/SCOUTLEARN.png'
import energyLogo from '/assets/photos/nexus.jfif'
import nexusLogo from '/assets/NEXUS.png'
import koreaLogo from '/assets/KOREA.png'
import charityLogo from '/assets/CHARITY.png'
// მიმდინარე პროექტები
import currentLogo from '/assets/CURRENT.png'
import interCampLogo from '/assets/Intercamp.png'
import campOfToday from '/assets/photos/dgis-banaki2.jfif'
import guide from '/assets/photos/megzuri-logo.jfif'
// ჩვენს შესახებ
import aboutUsLogo from '/assets/ABOUTUS.png'
// სერვისები
import servicesLogo from '/assets/SERVICES.png'


import './App.css'

// Gallery
const galleryPhotos = [
{ id: 1, src: '/assets/photos/chveni-fotoebi/1.jpeg', alt: 'Kintsvisi Monastery' },
{ id: 2, src: '/assets/photos/chveni-fotoebi/2.jpeg', alt: 'The Avatar Camp - Polar Express' },
{ id: 3, src: '/assets/photos/chveni-fotoebi/3.jpg', alt: 'The Avatar 2025' },
{ id: 4, src: '/assets/photos/chveni-fotoebi/4.jpeg', alt: 'Swiss - MOVA Camp' },
{ id: 5, src: '/assets/photos/chveni-fotoebi/5.jpeg', alt: 'The Avatar Camp - Polar Express' },
{ id: 6, src: '/assets/photos/chveni-fotoebi/6.jpg', alt: 'The Avatar Camp 2020' },
{ id: 7, src: '/assets/photos/chveni-fotoebi/8.jpeg', alt: 'Colchis National Park - The Avatar Camp 2020' },
{ id: 8, src: '/assets/photos/chveni-fotoebi/9.jpeg', alt: 'The Avatar Camp 2020' },
{ id: 9, src: '/assets/photos/chveni-fotoebi/10.jpg', alt: 'Temple of the Wise Thief, Dzhama Valley' },
{ id: 10, src: '/assets/photos/chveni-fotoebi/11.jpeg', alt: 'Tobavarchkhili hiking' },
{ id: 11, src: '/assets/photos/chveni-fotoebi/12.jpeg', alt: 'The Avatar Camp 2020' },
{ id: 12, src: '/assets/photos/chveni-fotoebi/13.jpeg', alt: 'The Avatar Camp 2020' },
{ id: 13, src: '/assets/photos/chveni-fotoebi/14.jpeg', alt: 'The Avatar Camp 2020' },
{ id: 14, src: '/assets/photos/chveni-fotoebi/15.jpeg', alt: 'Bateti Lake, Dzama Gorge' },
{ id: 15, src: '/assets/photos/chveni-fotoebi/7.jpeg', alt: 'The Avatar camp' },
{ id: 16, src: '/assets/photos/chveni-fotoebi/16.jpeg', alt: 'Tent City - Deja Vu' },
{ id: 17, src: '/assets/photos/chveni-fotoebi/17.jpeg', alt: 'The Avatar camp' },
{ id: 18, src: '/assets/photos/dgis-banaki.jpg', alt: 'Camp of day' },
{ id: 19, src: '/assets/photos/firework.jpg', alt: 'Firework - The Avatar Camp 2020' },
{ id: 20, src: '/assets/photos/megzuri.jpg', alt: 'Megzuri (Guide)' },
{ id: 21, src: '/assets/photos/megzuri-logo.jfif', alt: 'Megzuri (Guide)' },
{ id: 22, src: '/assets/photos/dgis-banaki2.jfif', alt: 'The Day Of Camp' },
{ id: 23, src: '/assets/photos/scouts.jfif', alt: 'Joining the European Region' }
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
      heroButton: 'გახდი სკაუტი',
      // ელექტრონული წიგნები - Books
      bookTitle: 'ელექტრონული ბიბლიოთეკა',
      bookSubTitle: 'აქ არის სკაუტური წიგნების ჩამონათვალი, რომელიც შეგიძლიათ ჩამოტვირთოთ და გაეცნოთ',
      books: [
        {
          id: 1,
          title: ' იყავი მზად სკაუტური ცხოვრებისთვის',
          cover: '/assets/books/2.png',
          link: '/assets/books/იყავი მზად სკაუტური ცხოვრებისთვის.წიგნი.pdf' 
        },
        {
          id: 2,
          title: 'სამაგისტრო ნაშრომი  ილიას სახელმწიფო უნივერსიტეტი 30.06.2025',
          cover: '/assets/books/3.jpg',
          link: '/assets/books/სამაგისტრო-ნაშრომი-საბოლოო-ვერსია-30.06.2025.pdf'
        },
        {
          id: 3,
          title: 'გზამკვლევი პროფორიენტაცია',
          cover: '/assets/books/4.png',
          link: '/assets/books/გზამკვლევი.პროფორიენტაცია2.pdf'
        }
      ],

      // განხორციელებული პროექტები -  Completed projects
      eduTitle: 'განხორციელებული პროექტები',
      eduSubtitle: 'საზოგადოების მსახურებიდან გარემოს დაცვამდე, ეს ის ინიციატივებია, რომლებიც ჩვენ განვახორციელეთ. გაეცანით ჩვენს ლიდერობის, გუნდური მუშაობისა და ადგილობრივი გავლენის გზას.',
      eduCard1T: 'სკაუტები COVID-19 ის წინააღმდეგ',
      eduCard1D: <p>
                  წითელ ჯვართან პარტნიორობის ფარგლებში, ჩვენი გუნდი პანდემიის დროს წინა ხაზზე იდგა,
                  რათა დახმარებოდა ყველაზე მოწყვლად ჯგუფებს.
                  <br /><br />
                  ჩვენ წამოვიწყეთ ცნობიერების ამაღლებისა და საქველმოქმედო კამპანიაები.
                  <br /><br />
                  სკაუტები კრიზისის საწყის ეტაპზე ყველაზე ცხელ წერტილებში ვიდექით.
                  <br /><br />
                  სკაუტის მოვალეობაა იყოს სარგებლიანი და დაეხმაროს სხვას!
                </p>,
      eduCard2T: 'სკაუტური ბანაკი ავატარი',
      eduCard2D: <p>
                  სკაუტური ბანაკი ავატარი სამეგრელოს სკაუტების საიმიჯო ღონისძიებაა, რომელიც 2020 წლიდან დღემდე ტარდება წელიწადში 2-ჯერ, ზაფხულში და ზამთარში.
                  <br /><br />
                  ბანაკი დატვირთულია სათავგადასავლო და შემეცნებითი აქტივობებით.
                  <br /><br />
                  ღონისძიების ბოლოს კი ტრადიციულად ტარდება გასკაუტების ცერემონია, სადაც ახალბედა სკაუტებს პირველი ყელსახვევები გადაეცემათ.
                </p>,
      eduCard3T: 'MOVA-ს საერთაშორისო ჯამბორი შვეიცარიაში',
      eduCard3D: <p>
                  2022 წელს შვეიცარიაში ნაციონალური ჯამბორი ჩატარდა, სადაც მონაწილეობდა 33 000 ევროპელი სკაუტი.
                  <br /><br />
                  ჩვენი ლიდერები 15 დღის განმავლობაში აღნიშნული ბანაკის უსაფრთხოდ და ხარისხიანად ჩატარებისთვის თავდაუზოგავად შრომობდნენ.
                  <br /><br />
                  აღნიშნული ღონისძიება 14 წელიწადში ერთხელ ტარდება შვეიცარიაში. ეს მსოფლიო სკაუტების უსაყვარლესი ბანაკია!
                </p>,
      eduCard4T: 'სკაუტი მასწავლებელი',
      eduCard4D: <p>
                  მასწავლებელი უკეთესი სამყაროსთვის!
                  <br /><br />
                  პროექტის ფარგლებში 40 მასწავლებელი გადავამზადეთ არაფორმალური განათლების მეთოდებზე დაყრდნობილი აქტივობების მიხედვით.
                  <br /><br />
                  მასწავლებლებმა მონაწილეობა ზამთრის სკაუტურ ბანაკშიც მიიღეს.
                </p>,
      eduCard5T: 'ენერგოეფექტურობის შესახებ ცნობიერების ამაღლების კამპანია',
      eduCard5D: <p>
                  გახდი ენერგოეფექტურობის სპეციალისტი – სამეგრელოს სკაუტური მოძრაობის ორგანიზაციის წარმატებული პროექტი! ⚡🌱
                  <br /><br />
                  პროექტის მიზანი საზოგადოებაში ენერგოეფექტურობის პრინციპებზე ცნობიერების ამაღლება და ენერგიის დაზოგვის პრაქტიკული ჩვევების დაუფლება იყო.
                </p>, 
      eduCard6T: 'Nexus- ევროპის სკაუტური რეგიონის საგანმანათლებლო პროგრამის აპრობირება საქართველოში',
      eduCard6D: <p>
                  საქართველოს სკაუტური მოძრაობის ორგანიზაცია 1997 წლიდან მსოფლიო სკაუტური ორგანიზაციის ევრაზიის რეგიონის წევრი იყო.
                  <br /><br />
                  ქართველი სკაუტების ძალისხმევის შედეგად 2023 წელს ევროპის რეგიონში გავწევრიანდით.
                  <br /><br />
                  Nexus ევროპის სკაუტური რეგიონის ახალი ახალგაზრდული პროგრამის საქართველოში აპრობირების პირველი ეტაპი იყო.
                  <br /><br />
                  რომლის ფარგლებში ორგანიზაციის ათეულობით მონაწილემ და ლიდერმა ევროპის წამყვან ქვეყნებში გაიარეს გადამზადება.
                </p>,
      eduCard7T: 'მსოფლიო სკაუტური ჯამბორი 2023',
      eduCard7D: <p>
                  ჯემბორი საერთაშორისო ბანაკია, რომელიც ტრადიციას 1920 წლიდან იღებს და 4 წელიწადში ერთხელ მსოფლიოს სხვადასხვა კონტინენტზე ტარდება.
                  <br /><br />
                  ქართველი სკაუტები ტრადიციას არ ღალატობენ და გამონაკლისი არც 25-ე სკაუტური ჯამბორი იყო, რომელიც 2023 წელს კორეაში ჩატარდა.
                </p>,
      eduCard8T: 'საქველმოქმედო ღონისძიებები',
      eduCard8D: <p>
                  ჩვენი მასშტაბური ბანაკების გარდა, ჩვენ კვლავ ერთგულები ვრჩებით საზოგადოების მუდმივ სამსახურს.
                  <br /><br />
                  სხვადასხვა ადგილობრივი საქველმოქმედო ღონისძიებების მეშვეობით, ჩვენი სკაუტები ავლენენ თანაგრძნობასა და ლიდერობას, ორგანიზებენ საქველმოქმედო აქციებს და მხარს უჭერენ ჩვენს სამეზობლოში მცხოვრებ გაჭირვებულებს.
                </p>,
      // სერვისები
      services: 'სერვისები',
      service1: 'სკაუტური სკოლა',
      service1D: `საკვირაო სკოლაში რეგისტაცია შეუძლიათ 6-დან 18 წლამდე ასაკის ახალგაზრდებს.<br><br>
                  კურსის ხანგრძლივობა: 3 თვე (12 გაკვეთილი).<br><br>
                  საწევრო გადასახადი: 60 ლარი.<br><br><br>
                  <a href="https://forms.gle/7NJ5KFZpbnMAD4Wy7" style="color: yellow; font-weight: bold; text-decoration: underline;">რეგისტრაცია და დამატებითი ინფორმაცია</a>`,
      service2: 'ახალგაზრდული ბანაკები',
      service2D: `რეგიონალური და ნაციონალური ბანაკები წელიწადში 2-ჯერ ტარდება.<br><br>
                  გარდა დიდი ბანაკებისა, ჩვენ ვატარებთ თემატურ ბანაკებს წელიწადის სხვადასხვა დროს (მეთევზეთა ბანაკი, პროფესიული ორიენტაციის ბანაკი, სამშენებლო, აგრო და ეკო ბანაკები...).<br><br>
                  <a href="https://forms.gle/7NJ5KFZpbnMAD4Wy7" style="color: yellow; font-weight: bold; text-decoration: underline;">რეგისტრაცია და დამატებითი ინფორმაცია</a>`,
      service3: 'შეთავაზება სკოლებს',
      service3D: `სკოლებს ვთავაზობთ საგანმანათლებლო და სასკოლო ტურიზმის ინოვაციურ პაკეტებს: ვიზიტი სკაუტურ სოფელში, ვორქშოფები სკოლის ბაზაზე, სასკოლო ექსკურსიების დაგეგმვა და ორგანიზება, მინი ბანაკები.<br><br><br>
                  <a href="https://forms.gle/7NJ5KFZpbnMAD4Wy7" style="color: yellow; font-weight: bold; text-decoration: underline;">რეგისტრაცია და დამატებითი ინფორმაცია</a>`,
      service4: 'ეკოტურები და ლაშქრობები',
      service4D: 'იმოგზაურე სკაუტებთან ერთად ! ჩვენი ერთ-ერთი წარმატებული პროექტია, რომლის ფარგლებშიც ვაწყობთ ტურებს მთელი საქართველოს მასშტაბით, აღნიშნული სერვისით სარგებლობა ყველა მსურველს შეუძლია. <a href="https://forms.gle/7NJ5KFZpbnMAD4Wy7" style="color: yellow ; font-weight: bold; text-decoration: underline;">რეგისტრაცია და დამატებითი ინფორმაცია</a> ',
      service5: 'ადგილი ღონისძიებისთვის',
      service5D: 'DÉJÀ VU hostel & camping sector ყველა ასაკის ადამიანისთვის უსაყვარლესი სივრცეა. სახლი მდინარე ენგურის ნაპირზე მდებარეობს, აქ თქვენ დაგხვდებათ ყველაფერი რაც მეგობრებთან ერთად დროის სასიამოვნოდ გატარებისთვის გჭირდებათ. <br><br> <a href="https://forms.gle/7NJ5KFZpbnMAD4Wy7" style="color: yellow ; font-weight: bold; text-decoration: underline;">რეგისტრაცია და დამატებითი ინფორმაცია</a> ',
      service6: 'სკაუტური ჰოსტელი ',
      service6D: 'DÉJÀ VU HOSTEL ბიუჯეტური ტიპის სასტუმროა ენგურის პირას, ეს არის ხის სახლი სადაც სიძველე და თანამედროვეობა ერთამეთს ოსტატურად ერწყმის, ჰოსტელში 10 -12  ადამიანის განთავსებაა შესაძლებელი. <br><br> <a href="https://forms.gle/7NJ5KFZpbnMAD4Wy7" style="color: yellow ; font-weight: bold; text-decoration: underline;">რეგისტრაცია და დამატებითი ინფორმაცია</a>  ',
      service7: 'ღონისძიებების მენეჯმენტი',
      service7D: 'თუ გსურთ თქვენი ღონისძიება გაამრავალფეროვნოთ სკაუტების გუნდი თემატურ ვორქშოფებსა და გუნდურ თამაშებს გთავაზობენ. თითოეული თამაში და აქტივობა განიხილება, როგორც თქვენი ორგანიზაციული მიზნების მიღწევის საშუალება.<br><br> <a href="https://forms.gle/7NJ5KFZpbnMAD4Wy7" style="color: yellow ; font-weight: bold; text-decoration: underline;">რეგისტრაცია და დამატებითი ინფორმაცია</a>  ',
      service8: 'საერთაშორისო აქტივობები',
      service8D: 'მსოფლიო სკაუტური ჯემბორი, ევროპის ჯემბორი, INTERCAMP და სხვა უამრავი საერთაშორისო შესაძლებლობა გელოდება შენ ! <br><br> <a href="https://forms.gle/7NJ5KFZpbnMAD4Wy7" style="color: yellow ; font-weight: bold; text-decoration: underline;">რეგისტრაცია და დამატებითი ინფორმაცია</a>',
      // ჩვენს შესახებ
      aboutTitle: 'ჩვენს შესახებ',
      aboutSubtitle: 'სამეგრელოს სკაუტური ცენტრი არის ახალგაზრდული სივრცე, რომელიც აერთიანებს განათლებას, ბუნებასა და ლიდერობას.',
      whoTitle: 'ვინ ვართ ჩვენ',
      whoText: <p>
                მსოფლიო სკაუტური მოძრაობის ორგანიზაცია (WOSM) არის დამოუკიდებელი, მსოფლიო, არაკომერციული და არაპოლიტიკური ორგანიზაცია, რომელიც ემსახურება სკაუტურ მოძრაობას.
                <br /><br />
                მოძრაობა აერთიანებს 176 ქვეყანას და 60 მილიონ წევრს მსოფლიოს მასშტაბით. WOSM დაყოფილია ხუთ რეგიონად: აფრიკა, არაბეთი, აზია-წყნარი ოკეანე, ევროპა და ინტერამერიკა.
                <br /><br />
                საქართველოს სკაუტური მოძრაობის ორგანიზაცია ევროპის რეგიონის წევრია. მოძრაობა საქართველოში 1993 წელს დაარსდა და აერთიანებს 6 რეგიონალურ ორგანიზაციას: თბილისი, იმერეთი, სამეგრელო, აჭარა, ქვემო ქართლი და შიდა ქართლი.
                <br /><br />
                სამეგრელოში სკაუტური ორგანიზაცია 2014 წელს ჩამოყალიბდა.
              </p>,
      histTitle: 'სკაუტინგის ისტორია',
      histText: <p>
                  შეგიძლია წარმოიდგინო მსოფლიო სკაუტინგის გარეშე?
                  <br /><br />
                  ეს მოძრაობა 1907 წელს ინგლისში რობერტ ბადენ-პაუელმა დააფუძნა. ის, რაც ბრაუნსის კუნძულზე ერთი პატარა ბანაკით დაიწყო, დღეს 60 მილიონი ადამიანის საერთო იდეად იქცა.
                  <br /><br />
                  სკაუტინგი მრავალფეროვან გარემოში დამოუკიდებლად ცხოვრების უნარებსა და ლიდერობას ასწავლის.
                  <br /><br />
                  ამ თავგადასავლის ნაწილი იყვნენ ისეთი პიროვნებები, როგორებიც არიან: ელისაბედ II, ნელსონ მანდელა, ჯონ კენედი და ნილ არმსტრონგი.
                  <br /><br />
                  ეს არის საუკუნოვანი ტრადიცია, რომელიც დღემდე აერთიანებს ახალგაზრდებს მთელი მსოფლიოდან.
                </p>,
      missTitle: 'მიზანი • მისია • ხედვა',
      missText: (
        <>
          <p>• სკაუტინგი ახალგაზრდების პროგრესული თვით-განვითარების მოძრაობაა.</p>
          <p>• ჩვენ ვფიქრობთ, რომ თითოეული ადამიანი იბადება უნიკალური პოტენციალით, რომელიც კონსტრუქციული მიმართულებით შეიძლება განვითარდეს. </p>
          <p>• ამ პოტენციალის რეალობად გადაქცევისთვის საჭიროა ადამიანის ყველა ასპექტის განვითარება - ფიზიკური, ინტელექტუალური, ემოციური, სოციალური და სულიერი.</p>
          <p>• ეს ხორციელდება ორგანიზებული სასწავლო გარემოს უზრუნველყოფით, რომელიც ახდენს თითოეული ახალგაზრდის სტიმულირებას მისი განვითარების პერიოდში. </p>
        </>
      ),
      howTitle: 'როგორ გავხდე სკაუტი',
      howText: 'დარეგისტრირდით. ჩაერთეთ. იხელმძღვანელეთ. თქვენი სკაუტად გახდომის გზა იწყება იმ მომენტიდან, როდესაც შეწყვეტთ ყურებას და დაიწყებთ მოქმედებას.',
      // მიმდინარე პროექტები - Current project
      youthTitle: 'მიმდინარე პროექტები',
      // youthSubtitle: 'ჩვენი მოგზაურობა გრძელდება! ეს განყოფილება მოიცავს ამჟამად შემუშავების პროცესში მყოფ პროექტებს. ეს ინიციატივები საშუალებას აძლევს ჩვენს ახალგაზრდა წევრებს, ისწავლონ პრაქტიკით, უმკლავდებიან რეალურ გამოწვევებს და უჭერენ მხარს ჩვენს ადგილობრივ საზოგადოებას პრაქტიკული მსახურებით.',
      youthCard1T: 'Intercamp 2026',
      youthCard1D: `  საერთაშორისო სკაუტური ბანაკია რომელიც 1967 წლიდან დღემდე უწყვეტად ტარდება ევროპის სხვადსახვა ქვეყანაში. <br><br>
                     წელს ბანაკს ჩეხეთი მასპინძლობს!  <br><br><a href="https://intercamp.info/upcoming-camp/" style="color: yellow ; font-weight: bold; text-decoration: underline;">ვებსაიტი და დამატებითი ინფორმაცია</a>`,
      youthCard2T: 'დღის ბანაკები',
      youthCard2D: `🌲 გაატარე ერთი დღე სკაუტურ ბანაკში!<br/><br/>
                  🌊 დღის ბანაკები ტარდება ანაკლიაში, ჩვენს სკაუტურ სოფელში.<br/>
                  ✨ ახალი თავგადასავლები და სახალისო აქტივობები გელოდება შენ!<br/><br/>
                  🤝 მონაწილეობის მიღება შეუძლია ყველას:<br/>
                  ✅ ბაღებსა და სკოლებს<br/>
                  ✅ უნივერსიტეტებს<br/>
                  ✅ სამეგობრო და ოჯახურ წრეებს<br/>
                  ✅ კომპანიებს
                  <br/><br/>
                  <a href="#" class="open-dgis-banaki-photo"
                    style="color: yellow; font-weight: bold; text-decoration: underline;">
                    იხილე ფოტო
                  </a>`,
      youthCard3T: 'მეგზური',
      youthCard3D: `<p>
                      ⚜️ სამეგრელოს სკაუტური მოძრაობის ორგანიზაცია Action Against Hunger South Caucasus-თან და ზუგდიდის LAG-თან თანამშრომლობით მასშტაბური პროექტის განხორციელებას იწყებს!
                      <br /><br />
                      🥾 „მეგზური“ სკაუტების ინიციატივაა, რომელიც მიზნად ზუგდიდის მუნიციპალიტეტში არსებული ტურისტული შესაძლებლობების გამოვლენასა და გაძლიერებას ისახავს. 🌲
                      <br /><br />
                      🇬🇪🇦🇹 ინიციატივა მხარდაჭერილია პროექტ „FORWARD“-ის ფარგლებში, ავსტრიის განვითარების სააგენტოს მიერ, ავსტრიის განვითარების თანამშრომლობის ფინანსური მხარდაჭერით.
                    </p>
      <br/><br/>
      <a href="#" class="open-megzuri-photo"
        style="color: yellow; font-weight: bold; text-decoration: underline;">
        იხილე ფოტო
      </a>`,
      youthCard4T: 'სკაუტური სკოლა',
      youthCard4D: 'გარე განათლების საკვირაო სკოლა 6 წლიდან 18 წლამდე ასაკის მოზარდებისთვის.',
      // youthCard5T: 'ენერგოეფექტურობის შესახებ ცნობიერების ამაღლების კამპანია',
      // youthCard5D: 'ლიდერული უნარების განვითარება პრაქტიკული აქტივობებით და გუნდურ გარემოში.',
      // youthCard6T: 'Nexus- ევროპის სკაუტური რეგიონის საგანმანათლებლო პროგრამის აპრობირება საქართველოში',
      // youthCard6D: 'ლიდერული უნარების განვითარება პრაქტიკული აქტივობებით და გუნდურ გარემოში.',
      // youthCard7T: 'მსოფლიო სკაუტური ჯამბორი 2023',
      // youthCard7D: 'ლიდერული უნარების განვითარება პრაქტიკული აქტივობებით და გუნდურ გარემოში.',
      // youthCard8T: 'საქველმოქმედო ღონისძიებები',
      // youthCard8D: 'ლიდერული უნარების განვითარება პრაქტიკული აქტივობებით და გუნდურ გარემოში.',
      // ფუტერი
      socialMedia: 'სოციალური მედია',
      location: 'ადგილმდებარობა',
      partner: 'პარტნიორები',
      contact: 'კონტაქტი',
      register: 'რეგისტრაცია',
      registerSubtitle: 'შემოგვიერთდი და გახდი სკაუტური მოძრაობის ნაწილი',
      bankTransfer: 'საბანკო გადარიცხვა',
      recipient: 'მიმღები: სამეგრელოს სკაუტური ორგანიზაცია',
      donation: 'დონაცია',
      accountNum: 'საბანკო ანგარიში (IBAN): GE09BG0000000601167751',
      donationText: ' გთხოვთ დანიშნულებაში მიუთითეთ: "შემოწირულობა" ',
      developer: 'დეველოპერი',
      developerTitle: 'საიტის დეველოპერი',
      developerName: 'ლუკა გულედანი',
      developerText: 'მე ვარ ამ პროექტის დეველოპერი და 2014 წლიდან სამეგრელოს სკაუტების წევრი. ჩემი გატაცება ტექნოლოგიები, თამაშების შექმნა და პროგრამირებაა. ეს ვებსაიტი ჩემი და ჩვენი ლიდერების ერთობლივი შრომის პირველი ვერსიაა, რომელიც სკაუტურ სულსა და თანამედროვე ტექნოლოგიებს აერთიანებს.',
      developerContact: 'დამიკავშირდი'
    },
    'ENG': {
      title: 'Samegrelo Organization Scouts',
      home: 'Home',
      about: 'About Ingiri Center',
      join: 'About Us',
      sponsors: 'Gallery',
      heroTitle: 'Be ready! Become a scout! It`s good to be with the scouts!',
      heroText: 'Samegrelo Organization of the Scout Movement of Georgia',
      heroButton: 'Become Scout',
      // El.Books 
      bookTitle: 'E-Library',
      bookSubTitle: 'Here is a list of Scouting books that you can download and read.',
      books: [
        {
          id: 1,
          title: ' Be prepeared for scout life',
          cover: '/assets/books/2.png',
          link: '/assets/books/იყავი მზად სკაუტური ცხოვრებისთვის.წიგნი.pdf' 
        },
        {
          id: 2,
          title: 'Master`s thesis Ilia State University 30.06.2025',
          cover: '/assets/books/3.jpg',
          link: '/assets/books/სამაგისტრო-ნაშრომი-საბოლოო-ვერსია-30.06.2025.pdf'
        },
        {
          id: 3,
          title: 'Career Guidance Guide',
          cover: '/assets/books/4.png',
          link: '/assets/books/გზამკვლევი.პროფორიენტაცია2.pdf'
        }
      ],      
      // Completed projects - განხორციელებული პროექტები
      eduTitle: 'Completed Projects',
      eduSubtitle: 'From community service to environmental conservation, these are the initiatives we`ve brought to life. Explore our journey of leadership, teamwork, and local impact.',
      eduCard1T: 'Scouts against Covid-19',
      eduCard1D: <p>
                  In partnership with the Red Cross, our team stood on the front lines during the pandemic to support the most vulnerable groups.
                  <br /><br />
                  We launched awareness-raising and charitable campaigns.
                  <br /><br />
                  Scouts were present in the most critical areas during the early stages of the crisis.
                  <br /><br />
                  A scout’s duty is to be useful and to help others!
                </p>,
      eduCard2T: 'Scout Camp Avatar',
      eduCard2D: <p>
                  Camp “Avatar” is a signature event of the Samegrelo Scouts, held twice a year since 2020 — in summer and winter.
                  <br /><br />
                  The camp is filled with adventurous and educational activities.
                  <br /><br />
                  At the end of the event, a traditional Scout investiture ceremony is held, where new scouts receive their first neckerchiefs.
                </p>,
      eduCard3T: 'MOVA International Jamboree in Swiss',
      eduCard3D: <p>
                  In 2022, the National Jamboree was held in Switzerland, bringing together 33,000 European scouts.
                  <br /><br />
                  For 15 days, our leaders worked tirelessly to ensure the camp was conducted safely and at the highest quality.
                  <br /><br />
                  This event is held once every 14 years in Switzerland. It is one of the most beloved camps among scouts worldwide!
                </p>,
      eduCard4T: 'Scout teacher',
      eduCard4D: <p>
                    A Teacher for a Better World!
                    <br /><br />
                    Within the framework of the project, we trained 40 teachers in activities based on non-formal education methods.
                    <br /><br />
                    The teachers also participated in the winter scout camp.
                  </p>,
      eduCard5T: 'Energy Efficiency Awareness Campaign',
      eduCard5D: <p>
                  Become an Energy Efficiency Specialist – a successful project of the Samegrelo Scout Movement Organization! ⚡🌱
                  <br /><br />
                  The project aimed to raise awareness in society about the principles of energy efficiency and to develop practical habits for saving energy.
                </p>,
      eduCard6T: 'Nexus - Testing the European Scout Region Educational Program in Georgia',
      eduCard6D: <p>
                  The Scout Movement of Georgia had been a member of the Eurasia Region of the World Organization of the Scout Movement since 1997.
                  <br /><br />
                  As a result of the efforts of Georgian scouts, we joined the European Region in 2023.
                  <br /><br />
                  Nexus was the first phase of piloting the new youth program of the European Scout Region in Georgia.
                  <br /><br />
                  Within its framework, dozens of participants and leaders from the organization received training in leading European countries.
                </p>,      
      eduCard7T: 'World Scout Jamboree 2023',
      eduCard7D: <p>
                  The Jamboree is an international camp with a tradition dating back to 1920, held every four years on different continents around the world.
                  <br /><br />
                  Georgian scouts proudly uphold this tradition, and the 25th Scout Jamboree, held in Korea in 2023, was no exception.
                </p>,
      eduCard8T: 'Charity events',
      eduCard8D: <p>
                  Beyond our large-scale camps, we remain dedicated to consistent community service.
                  <br /><br />
                  Through various local charity events, our scouts practice empathy and leadership by organizing fundraisers and support drives for those in need within our own neighborhoods.
                </p>,
      // Services
      services: 'Services',
      service1: 'Scout School',
      service1D: '<p>Sunday school is open to youth ages 6 to 18.<p/> <p>The course duration is 3 months (12 lessons). <p/> <p>Membership fee is 60 GEL.</p> <a href="https://forms.google.com" style="color: yellow ; font-weight: bold; text-decoration: underline;">Registration and additional information</a>',
      service2: 'Youth Camps',
      service2D: '<p>Regional and national camps are held twice a year.</p> <p>In addition to large camps, we also hold thematic camps at different times of the year (fishing camp, professional orientation camp, construction, agro, eco camps...).</p> <a href="https://forms.google.com" style="color: yellow ; font-weight: bold; text-decoration: underline;">Registration and additional information</a>',
      service3: 'Offer for Schools',
      service3D: '<p>We offer innovative educational and school tourism packages to schools: visits to a scout village, workshops at the school, planning and organizing school excursions, mini-camps.</p> <a href="https://forms.google.com" style="color: yellow ; font-weight: bold; text-decoration: underline;">Registration and additional information</a>',
      service4: 'Eco-tours & Hiking',
      service4D: '<p>Travel with the Scouts! is one of our successful projects, within the framework of which we organize tours throughout Georgia. This service can be used by everyone.</p> <a href="https://forms.google.com" style="color: yellow ; font-weight: bold; text-decoration: underline;">Registration and additional information</a>',
      service5: 'Event Venue',
      service5D: '<p>DÉJÀ VU hostel & camping sector is a favorite place for people of all ages.</p> <p>The house is located on the banks of the Enguri River; here you will find everything you need to have a pleasant time with friends.</p>  <br> <a href="https://forms.google.com" style="color: yellow ; font-weight: bold; text-decoration: underline;">Registration and additional information</a> ',
      service6: 'Scout Hostel',
      service6D: '<p>DÉJÀ VU HOSTEL is a budget hotel on the banks of the Enguri River.</p> <p>It is a wooden house where antiquity and modernity are skillfully combined.</p> <p>The hostel can accommodate 10-12 people.</p> <br><a href="https://forms.google.com" style="color: yellow ; font-weight: bold; text-decoration: underline;">Registration and additional information</a>',
      service7: 'Event Management',
      service7D: 'If you want to diversify your event, the Scout team offers themed workshops and team games. Each game and activity is considered a means to achieve your organizational goals. <br> <br><br> <a href="https://forms.google.com" style="color: yellow ; font-weight: bold; text-decoration: underline;">Registration and additional information</a>',
      service8: 'International activities',
      service8D: '<p>World Scout Jamboree, European Jamboree, INTERCAMP and many other international opportunities await you!</p> <a href="https://forms.google.com" style="color: yellow ; font-weight: bold; text-decoration: underline;">Registration and additional information</a>',
      // About us
      aboutTitle: 'About Us',
      aboutSubtitle: 'Samegrelo Scout Center is a youth space uniting education, nature, and leadership.',
      whoTitle: 'Who We Are',
      whoText:<p>
              The World Organization of the Scout Movement (WOSM) is an independent, worldwide, non-profit and non-political organization that serves the Scout Movement.
              <br /><br />
              The Movement brings together 176 countries and 60 million members worldwide. WOSM is divided into five regions: Africa, Arab, Asia-Pacific, Europe, and Interamerica.
              <br /><br />
              The Scout Movement of Georgia is a member of the European Region. The movement was founded in Georgia in 1993 and unites six regional organizations: Tbilisi, Imereti, Samegrelo, Adjara, Kvemo Kartli, and Shida Kartli.
              <br /><br />
              The Scout organization in Samegrelo was established in 2014.
            </p>,      
      histTitle: 'Scouting History',
      histText: <p>
                  Can you imagine a world without Scouting? What started in 1907 as a single camp on Brownsea Island has evolved into a global force of 60 million members united by a single vision.
                  <br /><br />
                  Founded by Lord Robert Baden-Powell, Scouting redefined education by bringing it into the great outdoors. By teaching self-reliance, leadership, and community service, the movement quickly transcended borders. From the first World Scout Jamboree in 1920 to the present day, it has shaped the lives of iconic world leaders, including Queen Elizabeth II, Nelson Mandela, John F. Kennedy, and Neil Armstrong.
                  <br /><br />
                  Scouting is more than a tradition; it is a global commitment to developing the leaders of tomorrow.
                </p>, 
      missTitle: 'Goal • Mission • Vision',
      missText: (
        <>
          <p>• Scouting is a progressive self-development movement for young people.</p>
          <p>• We believe that every person is born with a unique potential that can be developed constructively.</p>
          <p>• To turn this potential into reality, it is necessary to develop all aspects of a person – physical, intellectual, emotional, social, and spiritual.</p>
          <p>• This is achieved by providing an organized learning environment that stimulates each young person during their period of development.</p>
        </>
      ),
      howTitle: 'How to Become a Scout',
      howText: 'Register. Engage. Lead. Your journey to becoming a Scout starts the moment you stop watching and start doing.',
      // Current project
      youthTitle: 'Current projects',
      // youthSubtitle: 'Our journey continues! This section features the projects currently in development. These initiatives allow our youth members to learn by doing, as they tackle real-world challenges and support our local community through hands-on service.',
      youthCard1T: 'Intercamp 2026',
      youthCard1D: `It is an international scout camp that has been held continuously since 1967 in various European countries. <br><br>
                    This year, the camp is hosted by the Czech Republic! <br><br> <a href="https://intercamp.info/upcoming-camp/" style="color: yellow ; font-weight: bold; text-decoration: underline;">Website and Additional information</a>`,
      youthCard2T: 'Camp of day',
      youthCard2D: `🌲 Spend a day at the Scout Camp!<br/><br/>
                    🌊 Day camps are held in Anaklia, at our Scout Village.<br/>
                    ✨ New adventures and fun activities are waiting for you!<br/><br/>
                    🤝 Anyone can participate:<br/>
                    ✅ Kindergartens and Schools<br/>
                    ✅ Universities<br/>
                    ✅ Friend and Family groups<br/>
                    ✅ Companies
                    <br><br>
                    <a href="#" class="open-dgis-banaki-photo"
                    style="color: yellow; font-weight: bold; text-decoration: underline;">
                    View Photo
                  </a>`,
      youthCard3T: 'Megzuri (Guide)',
      youthCard3D: ` <p>
                      ⚜️ The Samegrelo Scout Movement Organization, in cooperation with Action Against Hunger South Caucasus and Zugdidi LAG, is launching the implementation of a large-scale project!
                      <br /><br />
                      🥾 “Megzuri” is an initiative of the Scouts aimed at identifying and strengthening the existing tourism opportunities in the Zugdidi Municipality 🌲
                      <br /><br />
                      🇬🇪🇦🇹 The initiative is supported within the framework of the project “FORWARD” by the Austrian Development Agency, with financial support from Austrian Development Cooperation.
                    </p>
                  <br/><br/>

                  <a href="#" class="open-megzuri-photo"
                    style="color: yellow; font-weight: bold; text-decoration: underline;">
                    View Photo
                  </a>`,     
      youthCard4T: 'Scout School',
      youthCard4D: 'Outdoor Education Sunday School for children and teenagers from 6 to 18 years old.',
      // Footer
      socialMedia: 'Social Media',
      location: 'Location',
      partner: 'Partners',
      contact: 'Contact',
      register: 'Register',
      registerSubtitle: 'Join us and become part of the Scout movement.',
      recipient: 'Recipient: Samegrelo Scout Organization',
      donation: 'Donation',
      donationText: 'Please indicate in the purpose/description: "Donation"',
      accountNum: 'Bank Account (IBAN): GE09BG0000000601167751',
      developer: 'Developer',
      developerTitle: 'Website Developer',
      developerName: 'Luka Guledani',
      developerText: 'I am the lead developer of this project and a member of Scouts Samegrelo since 2014. My passion lies in technology, game development, and programming. This website is the first version of a collaboration between myself and our leaders, merging the scouting spirit with modern tech.',
      developerContact: 'Contact with me'
    }
  };

  const langContent = content[lang];
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);


  const scrollCarousel = (direction, id) => {
    const container = document.getElementById(id)
    const scrollAmount = 300

    if (!container) return

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }



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
                <a href="#books" onClick={() => { setMenuOpen(false); setAboutOpen(false); }}>{langContent.bookTitle}</a>
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
                  href="#donation"
                  onClick={() => {
                    setMenuOpen(false);
                    setContactOpen(false);
                  }}
                >
                  {langContent.donation}
                  
                </a>                

                <a
                  href="#developer"
                  onClick={() => {
                    setMenuOpen(false);
                    setContactOpen(false);
                  }}
                >
                  {langContent.developer}
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
                <p>{langContent.heroText}</p>
                <h1>{langContent.heroTitle}</h1>
                <a href="#register" className="hero-btn">
                  {langContent.heroButton}
                </a>
              </div>
            </section>

            {/* მიმდინარე პროექტები - Current project */}
            <section id="target" className="youth-projects-section">
              <h2 className="section-title">{langContent.youthTitle}</h2>
              <p className="section-subtitle">{langContent.youthSubtitle}</p>

              <div className="carousel-container">
                <button
                  className="carousel-btn left"
                  onClick={() => scrollCarousel('left', 'youth-carousel')}
                >
                  &#10094;
                </button>

                <div className="youth-projects-grid" id="youth-carousel">
                  {Array.from({ length: 4 }).map((_, i) => {
                    const cardData = langContent[`youthCard${i + 1}D`];
                    return (
                      <div className="youth-card" key={i}>
                        <div className="icon-wrapper logo-crop">
                          <img
                            src={
                              i === 0
                                ? interCampLogo
                                : i === 1
                                ? campOfToday
                                : i === 2
                                ? guide
                                : currentLogo
                            }
                            alt={`Project ${i + 1}`}
                            className="mova-icon"
                          />
                        </div>
                        <h3>{langContent[`youthCard${i + 1}T`]}</h3>
                          <p
                            style={{ whiteSpace: 'normal', textAlign: 'left' }}
                            dangerouslySetInnerHTML={{
                              __html: typeof cardData === 'string'
                                ? cardData
                                : "მონაცემები მუშავდება..."
                            }}
                            onClick={(e) => {
                              // megzuri.jpg
                              if (e.target.classList.contains("open-megzuri-photo")) {
                                e.preventDefault();
                                setSelectedImgIndex(20); 
                              }

                              // dgis-banaki.jpg 
                              if (e.target.classList.contains("open-dgis-banaki-photo")) {
                                e.preventDefault();
                                setSelectedImgIndex(21); 
                              }
                            }}
                          ></p>

                          
                      </div>
                      
                      
                    );
                  })}
                </div>

                <button
                  className="carousel-btn right"
                  onClick={() => scrollCarousel('right', 'youth-carousel')}
                >
                  &#10095;
                </button>
              </div>
            </section>
      {/* PHOTO DIVIDER */}
      <section className="section-photo">
        <img 
          src="/assets/photos/chveni-fotoebi/ch.jpeg" 
          alt="Scouts activity" 
        />
      </section> 

      {/* Completed projects - განხორციელებული პროექტები*/}
      <section id="education" className="edu-projects-section">
        <h2 className="section-title">{langContent.eduTitle}</h2>
        <p className="section-subtitle">{langContent.eduSubtitle}</p>

        <div className="carousel-container">
          <button className="carousel-btn left" onClick={() => scrollCarousel('left', 'edu-carousel')}>
            &#10094;
          </button>

          <div className="edu-projects-grid" id="edu-carousel">
            <div className="edu-card">
              <div className="icon-wrapper logo-crop">
                <img src={redCrossLogo} alt="Red cross" className="mova-icon" />
              </div>
              <h3>{langContent.eduCard1T}</h3>
              <p>{langContent.eduCard1D}</p>
            </div>

            <div className="edu-card">
              <div className="icon-wrapper logo-crop">
                <img src={avatarLogo} alt="Scout camp 2020 avatar" className="mova-icon" />
              </div>
              <h3>{langContent.eduCard2T}</h3>
              <p>{langContent.eduCard2D}</p>
            </div>

            <div className="edu-card">
              <div className="icon-wrapper logo-crop">
                <img src={movaLogo} alt="MOVA Switzerland Scouting" className="mova-icon" />
              </div>
              <h3>{langContent.eduCard3T}</h3>
              <p>{langContent.eduCard3D}</p>
            </div>

            <div className="edu-card">
              <div className="icon-wrapper logo-crop">
                <img src={scoutLearnLogo} alt="Scout teacher" className="mova-icon" />
              </div>
              <h3>{langContent.eduCard4T}</h3>
              <p>{langContent.eduCard4D}</p>
            </div>

            <div className="edu-card">
              <div className="icon-wrapper logo-crop">
                <img src={energyLogo} alt="Energy" className="mova-icon" />
              </div>
              <h3>{langContent.eduCard5T}</h3>
              <p>{langContent.eduCard5D}</p>
            </div>

            <div className="edu-card">
              <div className="icon-wrapper logo-crop">
                <img src={nexusLogo} alt="Nexus" className="mova-icon" />
              </div>
              <h3>{langContent.eduCard6T}</h3>
              <p>{langContent.eduCard6D}</p>
            </div>

            <div className="edu-card">
              <div className="icon-wrapper logo-crop">
                <img src={koreaLogo} alt="Korea" className="mova-icon" />
              </div>
              <h3>{langContent.eduCard7T}</h3>
              <p>{langContent.eduCard7D}</p>
            </div>

            <div className="edu-card">
              <div className="icon-wrapper logo-crop">
                <img src={charityLogo} alt="Charity" className="mova-icon" />
              </div>
              <h3>{langContent.eduCard8T}</h3>
              <p>{langContent.eduCard8D}</p>
            </div>
          </div>

          <button className="carousel-btn right" onClick={() => scrollCarousel('right', 'edu-carousel')}>
            &#10095;
          </button>
        </div>
      </section>
      {/* SERVICES SECTION - სერვისების სექცია */}
      <section id="services" className="services-section">
        <h2 className="section-title">{langContent.services}</h2>

        <div className="carousel-container">
          <button className="carousel-btn left" onClick={() => scrollCarousel('left', 'services-carousel')}>
            &#10094;
          </button>

          <div className="services-grid" id="services-carousel">
            <div id="service-school" className="service-card">
              <div className="icon-wrapper logo-crop">
                <img src={servicesLogo} alt="Service" className="service-icon" />
              </div>
              <h3>{langContent.service1}</h3>
              <p dangerouslySetInnerHTML={{ __html: langContent.service1D }}></p>
            </div>

            <div id="service-camps" className="service-card">
              <div className="icon-wrapper logo-crop">
                <img src={servicesLogo} alt="Service" className="service-icon" />
              </div>
              <h3>{langContent.service2}</h3>
              <p dangerouslySetInnerHTML={{ __html: langContent.service2D }}></p>
            </div>

            <div id="service-schools" className="service-card">
              <div className="icon-wrapper logo-crop">
                <img src={servicesLogo} alt="Service" className="service-icon" />
              </div>
              <h3>{langContent.service3}</h3>
              <p dangerouslySetInnerHTML={{ __html: langContent.service3D }}></p>
            </div>

            <div id="service-eco" className="service-card">
              <div className="icon-wrapper logo-crop">
                <img src={servicesLogo} alt="Service" className="service-icon" />
              </div>
              <h3>{langContent.service4}</h3>
              <p dangerouslySetInnerHTML={{ __html: langContent.service4D }}></p>
            </div>

            <div id="service-venue" className="service-card">
              <div className="icon-wrapper logo-crop">
                <img src={servicesLogo} alt="Service" className="service-icon" />
              </div>
              <h3>{langContent.service5}</h3>
              <p dangerouslySetInnerHTML={{ __html: langContent.service5D }}></p>
            </div>

            <div id="service-event" className="service-card">
              <div className="icon-wrapper logo-crop">
                <img src={servicesLogo} alt="Service" className="service-icon" />
              </div>
              <h3>{langContent.service6}</h3>
              <p dangerouslySetInnerHTML={{ __html: langContent.service6D }}></p>
            </div>

            <div id="service-international" className="service-card">
              <div className="icon-wrapper logo-crop">
                <img src={servicesLogo} alt="Service" className="service-icon" />
              </div>
              <h3>{langContent.service7}</h3>
              <p dangerouslySetInnerHTML={{ __html: langContent.service7D }}></p>
            </div>

            <div id="service-extra" className="service-card">
              <div className="icon-wrapper logo-crop">
                <img src={servicesLogo} alt="Service" className="service-icon" />
              </div>
              <h3>{langContent.service8}</h3>
              <p dangerouslySetInnerHTML={{ __html: langContent.service8D }}></p>
            </div>
          </div> 

          <button className="carousel-btn right" onClick={() => scrollCarousel('right', 'services-carousel')}>
            &#10095;
          </button>
        </div> 
      </section> 

      {/* PHOTO DIVIDER */}
      <section className="section-photo">
        <img 
          src="/assets/photos/chveni-fotoebi/ch2.jpeg" 
          alt="Scouts activity" 
        />
      </section>        

      {/* ABOUT US - ჩვენს შესახებ */}
      <section id="about" className="about-section">
        <h2 className="section-title">{langContent.aboutTitle}</h2>
        <p className="section-subtitle">{langContent.aboutSubtitle}</p>

        <div className="carousel-container">
          <button className="carousel-btn left" onClick={() => scrollCarousel('left', 'about-carousel')}>
            &#10094;
          </button>

          <div className="about-content" id="about-carousel">
            <section id="who" className="about-block">
              <div className="icon-wrapper logo-crop">
                <img src={aboutUsLogo} alt="About us" className="service-icon" />
              </div>
              <h3>{langContent.whoTitle}</h3>
              <p>{langContent.whoText}</p>
            </section>

            <section id="history" className="about-block">
              <div className="icon-wrapper logo-crop">
                <img src={aboutUsLogo} alt="About us" className="service-icon" />
              </div>
              <h3>{langContent.histTitle}</h3>
              <p>{langContent.histText}</p>
            </section>

            <section id="mission" className="about-block">
              <div className="icon-wrapper logo-crop">
                <img src={aboutUsLogo} alt="About us" className="service-icon" />
              </div>
              <h3>{langContent.missTitle}</h3>
              <p>{langContent.missText}</p>
            </section>

            <section id="become" className="about-block">
              <div className="icon-wrapper logo-crop">
                <img src={aboutUsLogo} alt="About us" className="service-icon" />
              </div>
              <h3>{langContent.howTitle}</h3>
              <p>{langContent.howText}</p>
            </section>
          </div>

          <button className="carousel-btn right" onClick={() => scrollCarousel('right', 'about-carousel')}>
            &#10095;
          </button>
        </div>
      </section>

      {/* PHOTO DIVIDER */}
      <section className="section-photo">
        <img 
          src="/assets/photos/chveni-fotoebi/tent-city.jfif" 
          alt="Scouts activity" 
        />
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
                href="https://forms.gle/7NJ5KFZpbnMAD4Wy7"
                target="_blank"
                rel="noopener noreferrer"
                className="register-btn"
              >
                {langContent.register}
              </a>
            </div>
          </section>
          {/* El.Books - ელექტრონული წიგნები */}
          <section id="books" className="books-section">
            <h1 className="section-title">{langContent.bookTitle}</h1>
            <h2 className='section-subtitle'>{langContent.bookSubTitle}</h2>
            <div className="books-container">
              {langContent.books.map((book) => (
                <div 
                  key={book.id} 
                  className="book-card" 
                  onClick={() => window.open(book.link, '_blank')}
                >
                  <div className="cover-wrapper">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="book-cover"
                      onError={(e) => { e.target.src = 'fallback-image-path.png'; }} // Add a placeholder if image fails
                    />
                  </div>
                  <p className="book-title">{book.title}</p>
                </div>
              ))}
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
              <p className="iban-text">{langContent.donationText} </p>
              <button 
                className="copy-btn-simple" 
                onClick={() => {
                  navigator.clipboard.writeText('GE09BG0000000601167751');
                  alert('Copied!');
                }}
              >
                Copy IBAN
              </button>
            </div>
          </section>
          {/* Developer */}
          <section id="developer" className="developer-section">
            <div className="developer-card">
              <div className="developer-header">
                <img 
                  src="/assets/photos/developer.jpg" 
                  alt="Developer" 
                  className="developer-photo" 
                />           
                <div className="developer-text">
                  <h2 className="section-title">{langContent.developerTitle}</h2>
                  <h3>{langContent.developerName}</h3>
                  <p>{langContent.developerText}</p>   
                </div>
              </div>

              {/* Contact and Socials Section */}
              <div className="developer-contact">
                <div className="phone-number">
                  <i className="fas fa-phone-alt"></i> 
                  <span>+995 557 463 444</span>
                </div>
                
                <div className="social-links">
                  <span>{langContent.developerContact}</span>
                  <div className="icons">
                    <a href="https://www.linkedin.com/in/lukaguledani/"><i className="fab fa-linkedin https://www.linkedin.com/in/lukaguledani/"></i></a>
                    <a href="https://x.com/UnknownPass7"><i className="fab fa-twitter "></i></a>
                    <a href="https://github.com/Lussskki "><i className="fab fa-github"></i></a>
                  </div>
                </div>
              </div>
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
            <a href="https://www.tiktok.com/@scoutsofsamegrelo" target="_blank" rel="noopener noreferrer">
              <img src="assets/tik-tok.png" alt="Tiktok" className="logo-third-img-camp" />
            </a>
          </div>
          <div className="contact-details">
            <p><a href="tel:+ 995 557 28 88 95"><img src="assets/phone.png" alt="Phone" className="contact-icon-small" /> + 995 557 28 88 95</a></p>
            <p><a href="mailto:scoutsofsamegrelo@gmail.com"><img src="assets/mail.png" alt="Email" className="contact-icon-small" /> scoutsofsamegrelo@gmail.com</a></p>
            <p><a href="https://scoutsofsamegrelo.com" target="_blank" rel="noreferrer"><img src="assets/web.png" alt="Web" className="contact-icon-small" /> scoutsofsamegrelo.com</a></p>
          </div>
        </div>

        <div className="footer-col" id="location">
          <h4>{langContent.location}</h4>
          <div className="map-container" >
            <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.140492091809!2d41.8297427!3d42.4977788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c2506c0f5b005%3A0xe6ae831db81149c0!2z4YOV4YOU4YOi4YOU4YO_4YOY4YOc4YOQ4YO_4YOYIC8gVmV0ZXJpbmFyaWFu!5e0!3m2!1sen!2sge!4v1705312345678" width="100%" height="300" style={{ border: 0, borderRadius: '12px' }} allowFullScreen="" loading="lazy"></iframe>
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