import dotenv from 'dotenv'
import express from 'express'
import fs from 'node:fs/promises'
import { createServer as createHttpServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer as createViteServer } from 'vite'
import {
  getSiteContent,
  saveSiteContent,
} from './siteContentRepository.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const isProduction = process.env.NODE_ENV === 'production'
const port = Number(process.env.PORT || 5173)
const uploadDir = path.resolve(rootDir, 'public', 'assets', 'uploads')
const allowedImageTypes = new Map([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/gif', 'gif'],
])

const app = express()

app.use(express.json({ limit: '12mb' }))
app.use('/assets/uploads', express.static(uploadDir))

function slugifyFileName(fileName) {
  return path
    .basename(fileName, path.extname(fileName))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'photo'
}

app.get('/api/site-content', async (_request, response) => {
  try {
    response.set('Cache-Control', 'no-store, max-age=0')
    response.json(await getSiteContent())
  } catch (error) {
    response.status(500).send(error.message)
  }
})

app.put('/api/site-content', async (request, response) => {
  try {
    response.set('Cache-Control', 'no-store, max-age=0')
    response.json(await saveSiteContent(request.body))
  } catch (error) {
    response.status(500).send(error.message)
  }
})

app.post('/api/uploads', async (request, response) => {
  try {
    const { dataUrl, fileName, type } = request.body ?? {}
    const extension = allowedImageTypes.get(type)

    if (!dataUrl || !fileName || !extension) {
      response.status(400).send('Only jpg, png, webp and gif images can be uploaded')
      return
    }

    const base64Data = dataUrl.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, '')
    const imageBuffer = Buffer.from(base64Data, 'base64')
    const savedFileName = `${Date.now()}-${slugifyFileName(fileName)}.${extension}`
    const savedPath = path.join(uploadDir, savedFileName)

    await fs.mkdir(uploadDir, { recursive: true })
    await fs.writeFile(savedPath, imageBuffer)

    response.json({ src: `/assets/uploads/${savedFileName}` })
  } catch (error) {
    response.status(500).send(error.message)
  }
})

async function start() {
  const httpServer = createHttpServer(app)

  if (isProduction) {
    const distPath = path.resolve(rootDir, 'dist')
    app.use(express.static(distPath))
    app.use((_request, response) => {
      response.sendFile(path.join(distPath, 'index.html'))
    })
  } else {
    const vite = await createViteServer({
      root: rootDir,
      appType: 'custom',
      server: {
        middlewareMode: true,
        hmr: {
          server: httpServer,
        },
      },
    })

    app.use(vite.middlewares)

    app.use(async (request, response, next) => {
      try {
        const indexPath = path.resolve(rootDir, 'index.html')
        const template = await fs.readFile(indexPath, 'utf8')
        const html = await vite.transformIndexHtml(request.originalUrl, template)
        response.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (error) {
        vite.ssrFixStacktrace(error)
        next(error)
      }
    })
  }

  httpServer.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Stop the existing dev server or set a different PORT in .env.`)
      process.exit(1)
    }

    throw error
  })

  httpServer.listen(port, () => {
    console.log(`Samegrelo app is running on http://localhost:${port}`)
  })
}

start()
