export const SITE_CONTENT_STORAGE_KEY = 'samegrelo-admin-content'
export const SITE_CONTENT_UPDATED_EVENT = 'site-content-updated'

export const defaultSiteContent = {
  hero: {
    title: 'იყავი მზად! გახდი სკაუტი! სკაუტებთან კარგია!',
    text: 'საქართველოს სკაუტური მოძრაობის სამეგრელოს ორგანიზაცია',
    button: 'გახდი სკაუტი',
  },
  donation: {
    iban: 'საბანკო ანგარიში (IBAN): GE09BG0000000601167751',
    text: 'გთხოვთ დანიშნულებაში მიუთითეთ: "შემოწირულობა"',
  },
  contact: {
    phone: '+995 557 28 88 95',
    email: 'scoutsofsamegrelo@gmail.com',
    website: 'scoutsofsamegrelo.com',
  },
  gallery: [
    { id: 1, src: '/assets/photos/chveni-fotoebi/1.jpeg', alt: 'Kintsvisi Monastery' },
    { id: 2, src: '/assets/photos/chveni-fotoebi/2.jpeg', alt: 'The Avatar Camp - Polar Express' },
    { id: 3, src: '/assets/photos/chveni-fotoebi/3.jpg', alt: 'The Avatar 2025' },
    { id: 4, src: '/assets/photos/chveni-fotoebi/4.jpeg', alt: 'Swiss - MOVA Camp' },
    { id: 5, src: '/assets/photos/chveni-fotoebi/5.jpeg', alt: 'The Avatar Camp - Polar Express' },
    { id: 6, src: '/assets/photos/chveni-fotoebi/6.jpg', alt: 'The Avatar Camp 2020' },
    { id: 7, src: '/assets/photos/chveni-fotoebi/8.jpeg', alt: 'Kolkheti National Park - The Avatar Camp 2020' },
    { id: 8, src: '/assets/photos/chveni-fotoebi/9.jpeg', alt: 'The Avatar Camp 2020' },
    { id: 9, src: '/assets/photos/chveni-fotoebi/10.jpg', alt: 'Temple of the Wise Thief, Dzhama Valley' },
    { id: 10, src: '/assets/photos/chveni-fotoebi/11.jpeg', alt: 'Tobavarchkhili hiking' },
    { id: 11, src: '/assets/photos/chveni-fotoebi/12.jpeg', alt: 'The Avatar Camp 2020' },
    { id: 12, src: '/assets/photos/chveni-fotoebi/13.jpeg', alt: 'The Avatar Camp 2020' },
    { id: 13, src: '/assets/photos/chveni-fotoebi/14.jpeg', alt: 'The Avatar Camp 2020' },
    { id: 14, src: '/assets/photos/chveni-fotoebi/15.jpeg', alt: 'Bateti Lake, Dzama Gorge' },
    { id: 15, src: '/assets/photos/chveni-fotoebi/7.jpeg', alt: 'The Avatar camp' },
    { id: 16, src: '/assets/photos/chveni-fotoebi/16.jpeg', alt: 'Tent City - Deja Vu' },
    { id: 17, src: '/assets/photos/chveni-fotoebi/17.jpeg', alt: 'Cub scouts camp' },
    { id: 18, src: '/assets/photos/dgis-banaki.jpg', alt: 'Camp of day' },
    { id: 19, src: '/assets/photos/firework.jpg', alt: 'Firework - The Avatar Camp 2020' },
    { id: 20, src: '/assets/photos/megzuri.jpg', alt: 'Megzuri (Guide)' },
    { id: 21, src: '/assets/photos/megzuri-logo.jfif', alt: 'Megzuri (Guide)' },
    { id: 22, src: '/assets/photos/dgis-banaki2.jfif', alt: 'The Day Of Camp' },
    { id: 23, src: '/assets/photos/scouts.jfif', alt: 'Joining the European Region' },
  ],
}

export function normalizeSiteContent(content) {
  const gallery = Array.isArray(content?.gallery)
    ? content.gallery.map((photo) => ({
        ...photo,
        id: photo.id ?? Date.now(),
        src: photo.src || photo.url || '',
        alt: photo.alt || photo.title || '',
      }))
    : defaultSiteContent.gallery

  return {
    ...defaultSiteContent,
    ...content,
    hero: {
      ...defaultSiteContent.hero,
      ...content?.hero,
    },
    donation: {
      ...defaultSiteContent.donation,
      ...content?.donation,
    },
    contact: {
      ...defaultSiteContent.contact,
      ...content?.contact,
    },
    gallery,
  }
}

export function loadSiteContent() {
  if (typeof window === 'undefined') {
    return defaultSiteContent
  }

  try {
    const savedContent = window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY)
    return savedContent
      ? normalizeSiteContent(JSON.parse(savedContent))
      : defaultSiteContent
  } catch {
    return defaultSiteContent
  }
}

export function saveSiteContent(content) {
  const normalizedContent = normalizeSiteContent(content)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(normalizedContent))
    window.dispatchEvent(new CustomEvent(SITE_CONTENT_UPDATED_EVENT, {
      detail: normalizedContent,
    }))
  }

  return normalizedContent
}
