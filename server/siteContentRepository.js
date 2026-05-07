import { MongoClient } from 'mongodb'
import { defaultSiteContent, normalizeSiteContent } from '../src/Content/siteContentSchema.js'

const CONTENT_ID = 'primary'
const COLLECTION_NAME = 'site_content'

let clientPromise

function getMongoUri() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Missing MONGODB_URI in .env')
  }

  return process.env.MONGODB_URI
}

function getDatabaseName() {
  return process.env.MONGODB_DB || 'samegrelo-scout'
}

async function getCollection() {
  if (!clientPromise) {
    const client = new MongoClient(getMongoUri())
    clientPromise = client.connect()
  }

  const client = await clientPromise
  return client.db(getDatabaseName()).collection(COLLECTION_NAME)
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
  const collection = await getCollection()
  const existingDocument = await collection.findOne({ _id: CONTENT_ID })

  if (existingDocument) {
    return fromDocument(existingDocument)
  }

  const nextDocument = toDocument(defaultSiteContent)
  await collection.insertOne(nextDocument)
  return fromDocument(nextDocument)
}

export async function saveSiteContent(content) {
  const collection = await getCollection()
  const nextDocument = toDocument(content)

  await collection.updateOne(
    { _id: CONTENT_ID },
    { $set: nextDocument },
    { upsert: true },
  )

  return fromDocument(nextDocument)
}
