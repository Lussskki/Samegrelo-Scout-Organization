import { MongoClient, ServerApiVersion } from 'mongodb'
import {
  defaultSiteContent,
  normalizeSiteContent,
} from '../src/Content/siteContentSchema.js'

const CONTENT_ID = 'primary'
const COLLECTION_NAME = 'site_content'

let clientPromise

function getMongoUri() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI in .env')
  }

  return process.env.MONGODB_URI.trim()
}

function getDatabaseName() {
  return process.env.MONGODB_DB || 'samegrelo-scout'
}

async function getCollection() {
  if (!clientPromise) {
    const client = new MongoClient(getMongoUri(), {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 5,

      serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: false,
      },

      // FIX:
      // Removed forced tls:true because Atlas already handles TLS automatically
      // and forcing it can trigger OpenSSL handshake errors on newer Node versions.
    })

    clientPromise = client.connect()
  }

  const client = await clientPromise

  return client
    .db(getDatabaseName())
    .collection(COLLECTION_NAME)
}

function toDocument(content) {
  return {
    _id: CONTENT_ID,
    ...normalizeSiteContent(content),
    updatedAt: new Date().toISOString(),
  }
}

function fromDocument(document) {
  if (!document) {
    return null
  }

  const content = { ...document }

  delete content._id
  delete content.updatedAt

  return normalizeSiteContent(content)
}

export async function getSiteContent() {
  try {
    const collection = await getCollection()

    const existingDocument = await collection.findOne({
      _id: CONTENT_ID,
    })

    if (existingDocument) {
      return fromDocument(existingDocument)
    }

    const nextDocument = toDocument(defaultSiteContent)

    await collection.insertOne(nextDocument)

    return fromDocument(nextDocument)
  } catch (error) {
    console.error('MongoDB getSiteContent error:', error)
    throw new Error(`Database connection failed: ${error.message}`)
  }
}

export async function saveSiteContent(content) {
  try {
    const collection = await getCollection()

    const nextDocument = toDocument(content)

    await collection.updateOne(
      { _id: CONTENT_ID },
      { $set: nextDocument },
      { upsert: true },
    )

    return fromDocument(nextDocument)
  } catch (error) {
    console.error('MongoDB saveSiteContent error:', error)
    throw new Error(`Database save failed: ${error.message}`)
  }
}