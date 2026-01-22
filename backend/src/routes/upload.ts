import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const router = express.Router();

// Cloudinary Configuration
console.log("Current Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
cloudinary.config({
  cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME),
  api_key: String(process.env.CLOUDINARY_API_KEY),
  api_secret: String(process.env.CLOUDINARY_API_SECRET),
});

// Setup Multer to handle the file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// The Upload Route
router.post('/', upload.single('image'), async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { title, year, type } = req.body;

    // Convert buffer to Base64 for Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'scouts_gallery',
    });

    // Create photo object
    const photoData = {
      id: Date.now(),
      url: result.secure_url,
      title: title || 'Untitled',
      year: year || new Date().getFullYear().toString(),
      type: type || 'photo'
    };

    // Path to photos.jsx
    const photosPath = path.join(process.cwd(), '../src/photos.jsx');
    
    // Read current photos.jsx
    let photosContent = fs.readFileSync(photosPath, 'utf-8');
    
    // Add the new photo to the ALL_PHOTOS array
    const photoEntry = `    { id: ${photoData.id}, year: '${photoData.year}', type: '${photoData.type}', url: '${photoData.url}', title: '${photoData.title}' },\n`;
    const insertPoint = photosContent.indexOf('[') + 1;
    photosContent = photosContent.slice(0, insertPoint) + '\n' + photoEntry + photosContent.slice(insertPoint);
    
    // Write updated content back
    fs.writeFileSync(photosPath, photosContent);

    // Return the link and photo data
    res.json({ 
      url: result.secure_url,
      photoData: photoData,
      message: 'Photo uploaded and added to gallery successfully!'
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

export default router;