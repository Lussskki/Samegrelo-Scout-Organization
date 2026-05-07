import {
  getSiteContent,
  saveSiteContent,
} from '../server/siteContentRepository.js'

function sendJson(response, statusCode, body) {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(body))
}

function readRequestBody(request) {
  if (request.body) {
    return Promise.resolve(request.body)
  }

  return new Promise((resolve, reject) => {
    let rawBody = ''

    request.on('data', (chunk) => {
      rawBody += chunk
    })

    request.on('end', () => {
      try {
        resolve(rawBody ? JSON.parse(rawBody) : {})
      } catch (error) {
        reject(error)
      }
    })

    request.on('error', reject)
  })
}

export default async function handler(request, response) {
  try {
    if (request.method === 'GET') {
      sendJson(response, 200, await getSiteContent())
      return
    }

    if (request.method === 'PUT') {
      const content = await readRequestBody(request)
      sendJson(response, 200, await saveSiteContent(content))
      return
    }

    response.setHeader('Allow', 'GET, PUT')
    sendJson(response, 405, { message: 'Method not allowed' })
  } catch (error) {
    sendJson(response, 500, { message: error.message })
  }
}
