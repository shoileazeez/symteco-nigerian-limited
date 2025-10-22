#!/usr/bin/env node
// Upload all images in the public/ folder to Cloudinary and write mapping JSON
// Usage: node scripts/upload-public-to-cloudinary.js

const fs = require('fs');
const path = require('path');
const { v2: cloudinary } = require('cloudinary');

// Load env vars from frontend/.env if present (development convenience)
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const OUT_DIR = path.resolve(__dirname, '../tmp');
const OUT_FILE = path.join(OUT_DIR, 'cloudinary-mapping.json');

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Missing Cloudinary environment variables. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env');
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function isImageFile(filename) {
  const lower = filename.toLowerCase();
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(path.extname(lower));
}

async function uploadFile(localPath, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(localPath, { public_id: publicId, folder: 'symteco-projects' }, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

(async () => {
  try {
    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

    const files = fs.readdirSync(PUBLIC_DIR);
    const mapping = {};

    console.log('Scanning public directory for project-* images...');
    
    for (const file of files) {
      const full = path.join(PUBLIC_DIR, file);
      const stat = fs.statSync(full);
      
      if (stat.isFile() && isImageFile(file)) {
        if (file.startsWith('project-')) {
          console.log('Uploading', file);
          const publicId = path.parse(file).name + '-' + Date.now();
          const res = await uploadFile(full, publicId);
          mapping['/' + file] = res.secure_url;
          console.log('Uploaded:', file, '->', res.secure_url);
        } else {
          console.log('Skipping (not project-*):', file);
        }
      }
    }

    fs.writeFileSync(OUT_FILE, JSON.stringify(mapping, null, 2));
    console.log('Wrote mapping to', OUT_FILE);
  } catch (err) {
    console.error('Error uploading images:', err);
    process.exit(1);
  }
})();
