// MongoDB connection is temporarily hidden for local development.
// The app currently runs without MONGODB_URI in .env, and trying to connect
// to the database makes /api/site-content fail with a 500 error on page load.
// Restore this import and the getCollection-based logic below when MongoDB is configured again.
// import { MongoClient, ServerApiVersion } from 'mongodb'

import {
  defaultSiteContent,
  normalizeSiteContent,
} from '../src/Content/siteContentSchema.js'

// const CONTENT_ID = 'primary'
// const COLLECTION_NAME = 'site_content'
//
// let clientPromise
// let localSiteContent = normalizeSiteContent(defaultSiteContent)
//
// function getMongoUri() {
//   if (!process.env.MONGODB_URI) {
//     throw new Error('Missing MONGODB_URI in .env')
//   }
//
//   return process.env.MONGODB_URI.trim()
// }
//
// function getDatabaseName() {
//   return process.env.MONGODB_DB || 'samegrelo-scout'
// }
//
// async function getCollection() {
//   if (!clientPromise) {
//     const client = new MongoClient(getMongoUri(), {
//       connectTimeoutMS: 10000,
//       serverSelectionTimeoutMS: 10000,
//       maxPoolSize: 5,
//
//       serverApi: {
//         version: ServerApiVersion.v1,
//         strict: false,
//         deprecationErrors: false,
//       },
//     })
//
//     clientPromise = client.connect()
//   }
//
//   const client = await clientPromise
//
//   return client
//     .db(getDatabaseName())
//     .collection(COLLECTION_NAME)
// }
//
// function toDocument(content) {
//   return {
//     _id: CONTENT_ID,
//     ...normalizeSiteContent(content),
//     updatedAt: new Date().toISOString(),
//   }
// }
//
// function fromDocument(document) {
//   if (!document) {
//     return null
//   }
//
//   const content = { ...document }
//
//   delete content._id
//   delete content.updatedAt
//
//   return normalizeSiteContent(content)
// }

let localSiteContent = normalizeSiteContent(defaultSiteContent)

export async function getSiteContent() {
  return localSiteContent
}

export async function saveSiteContent(content) {
  localSiteContent = normalizeSiteContent(content)

  return localSiteContent
}
