import { contentSource } from './ContentSource.js'

export const SITE_CONTENT_UPDATED_EVENT = 'site-content-updated'

export const defaultSiteContent = contentSource

export function looksLikeHtml(value) {
  return typeof value === 'string' && /<[a-z][^>]*>/i.test(value)
}

export function isHtmlField(key) {
  const defaultKa = defaultSiteContent.translations?.ka?.[key]
  const defaultEn = defaultSiteContent.translations?.en?.[key]
  return looksLikeHtml(defaultKa) || looksLikeHtml(defaultEn)
}

export function unwrapSingleParagraph(value) {
  if (typeof value !== 'string') {
    return value
  }

  const match = value.trim().match(/^<p[^>]*>([\s\S]*?)<\/p>$/i)

  if (!match || /<[a-z]/i.test(match[1])) {
    return value
  }

  return match[1].trim()
}

function cleanTranslationsForStorage(translations) {
  const cleaned = { ka: {}, en: {} }

  for (const lang of ['ka', 'en']) {
    const source = translations[lang] ?? {}
    for (const key of Object.keys(source)) {
      const value = source[key]

      if (typeof value !== 'string' || isHtmlField(key)) {
        cleaned[lang][key] = value
        continue
      }

      cleaned[lang][key] = unwrapSingleParagraph(value)
    }
  }

  return cleaned
}

function normalizeGalleryPhoto(photo, fallbackId) {
  return {
    ...photo,
    id: photo?.id ?? fallbackId,
    src: photo?.src || photo?.url || '',
    alt: photo?.alt || photo?.title || '',
    year: photo?.year || '',
    type: photo?.type || '',
  }
}

export function normalizeSiteContent(content) {
  const source = content ?? {}
  const translationSource = source.translations ?? {}
  const gallery = Array.isArray(source.gallery)
    ? source.gallery.map((photo, index) => normalizeGalleryPhoto(photo, Date.now() + index))
    : []

  const rawTranslations = {
    ka: translationSource.ka && typeof translationSource.ka === 'object'
      ? { ...translationSource.ka }
      : {},
    en: translationSource.en && typeof translationSource.en === 'object'
      ? { ...translationSource.en }
      : {},
  }

  return {
    ...defaultSiteContent,
    ...source,
    hero: {
      ...defaultSiteContent.hero,
      ...source.hero,
    },
    donation: {
      ...defaultSiteContent.donation,
      ...source.donation,
    },
    contact: {
      ...defaultSiteContent.contact,
      ...source.contact,
    },
    translations: cleanTranslationsForStorage(rawTranslations),
    gallery,
  }
}

export function stringifyTranslationValue(value) {
  if (typeof value === 'string') {
    return value
  }

  return JSON.stringify(value, null, 2)
}

export function parseTranslationValue(rawValue, previousValue) {
  const trimmedValue = rawValue.trim()

  if (!trimmedValue) {
    return ''
  }

  const looksStructured = /^[[{]/.test(trimmedValue)
    || Array.isArray(previousValue)
    || (previousValue && typeof previousValue === 'object')

  if (!looksStructured) {
    return rawValue
  }

  return JSON.parse(trimmedValue)
}

export function buildTranslationDrafts(translations) {
  const drafts = {}
  const mergedTranslations = normalizeSiteContent({ translations }).translations
  const keys = new Set([
    ...Object.keys(mergedTranslations.ka),
    ...Object.keys(mergedTranslations.en),
  ])

  for (const key of keys) {
    drafts[`ka:${key}`] = stringifyTranslationValue(mergedTranslations.ka[key] ?? '')
    drafts[`en:${key}`] = stringifyTranslationValue(mergedTranslations.en[key] ?? '')
  }

  return drafts
}
