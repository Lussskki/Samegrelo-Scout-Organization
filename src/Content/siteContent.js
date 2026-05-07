import {
  defaultSiteContent,
  normalizeSiteContent,
  SITE_CONTENT_UPDATED_EVENT,
} from './siteContentSchema'

async function parseResponse(response) {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }

  return response.json()
}

export function loadSiteContent() {
  return normalizeSiteContent(defaultSiteContent)
}

export async function fetchSiteContent({ fallbackToDefault = true } = {}) {
  try {
    const response = await fetch('/api/site-content')
    const content = await parseResponse(response)
    return normalizeSiteContent(content)
  } catch (error) {
    if (!fallbackToDefault) {
      throw error
    }

    return normalizeSiteContent(defaultSiteContent)
  }
}

export async function saveSiteContent(content) {
  const response = await fetch('/api/site-content', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(normalizeSiteContent(content)),
  })

  const savedContent = normalizeSiteContent(await parseResponse(response))

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SITE_CONTENT_UPDATED_EVENT, {
      detail: savedContent,
    }))
  }

  return savedContent
}

export async function uploadSiteImage(file) {
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result))
    reader.addEventListener('error', () => reject(reader.error))
    reader.readAsDataURL(file)
  })

  const response = await fetch('/api/uploads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      dataUrl,
      fileName: file.name,
      type: file.type,
    }),
  })

  return parseResponse(response)
}

export { defaultSiteContent, normalizeSiteContent, SITE_CONTENT_UPDATED_EVENT }
