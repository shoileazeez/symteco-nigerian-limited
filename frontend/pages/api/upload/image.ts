import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { promisify } from 'util';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

const uploadMiddleware = promisify(upload.single('image'));

// Disable Next.js body parser for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check authentication
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Check Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({ 
        success: false, 
        error: 'Cloudinary configuration missing. Please set up your Cloudinary credentials.' 
      });
    }

    // Parse the multipart form data
    await uploadMiddleware(req as any, res as any);

    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ success: false, error: 'No image file provided' });
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'symteco-projects', // Organize uploads in a folder
          transformation: [
            { width: 1200, height: 800, crop: 'fill', quality: 'auto' }, // Optimize image
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(file.buffer);
    });

    const result = uploadResult as any;

    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });

  } catch (error: any) {
    console.error('Image upload error:', error);
    
    if (error.message === 'Only image files are allowed') {
      return res.status(400).json({ success: false, error: 'Only image files are allowed' });
    }
    
    if (error.message.includes('File too large')) {
      return res.status(400).json({ success: false, error: 'File size too large. Maximum 5MB allowed.' });
    }

    return res.status(500).json({ 
      success: false, 
      error: 'Failed to upload image',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}