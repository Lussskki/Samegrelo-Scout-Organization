import { contentSource } from './ContentSource.js'

export const SITE_CONTENT_UPDATED_EVENT = 'site-content-updated'

export const defaultSiteContent = contentSource

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
    translations: {
      ka: translationSource.ka && typeof translationSource.ka === 'object'
        ? { ...translationSource.ka }
        : {},
      en: translationSource.en && typeof translationSource.en === 'object'
        ? { ...translationSource.en }
        : {},
    },
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
