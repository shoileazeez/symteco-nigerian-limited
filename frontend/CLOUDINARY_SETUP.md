# Cloudinary Setup Guide

Cloudinary is a free cloud service for image storage and management. Here's how to set it up:

## 1. Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com/)
2. Sign up for a free account
3. You get 25GB of storage and 25GB of monthly bandwidth for free

## 2. Get Your Credentials

After signing up:
1. Go to your Dashboard
2. You'll see your credentials:
   - **Cloud Name**: Your unique cloud name
   - **API Key**: Your API key
   - **API Secret**: Your API secret (click the eye icon to reveal)

## 3. Update Environment Variables

Add these to your `.env` file (replace with your actual values):

```bash
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

**Example:**
```bash
CLOUDINARY_CLOUD_NAME=symteco-projects
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

## 4. Features Included

✅ **Drag & Drop Upload**: Users can drag images directly into the upload area
✅ **Multiple Images**: Upload up to 5 images per project
✅ **Image Optimization**: Automatically resized to 1200x800 with quality optimization
✅ **Organization**: Images stored in `symteco-projects` folder
✅ **Validation**: Only image files, max 5MB each
✅ **Preview**: See uploaded images before saving
✅ **Main Image**: First uploaded image becomes the main project image

## 5. Folder Structure

Your images will be organized in Cloudinary as:
```
symteco-projects/
├── image1.jpg
├── image2.jpg
└── image3.jpg
```

## 6. Testing

1. Restart your development server after adding env variables
2. Go to `/admin/projects/add`
3. Try uploading some images
4. Check your Cloudinary dashboard to see the uploaded images

## 7. Free Tier Limits

- **Storage**: 25GB
- **Bandwidth**: 25GB/month
- **Transformations**: 25,000/month
- **Images/Videos**: Unlimited

This is more than enough for most business websites!

## 8. Alternative Free Solutions

If you prefer other solutions, here are alternatives:

### Supabase Storage
```bash
npm install @supabase/supabase-js
```

### Firebase Storage
```bash
npm install firebase
```

### AWS S3 (with free tier)
```bash
npm install aws-sdk
```

## 9. Benefits of Cloudinary

- ✅ **Free tier** with generous limits
- ✅ **Automatic optimization** (WebP, compression)
- ✅ **CDN delivery** for fast loading
- ✅ **Image transformations** (resize, crop, etc.)
- ✅ **Easy integration** with the current setup
- ✅ **Reliable** and widely used

## 10. Security Notes

- Never commit your API secret to Git
- The API secret should only be in your `.env` file
- In production, use environment variables on your hosting platform

## Need Help?

If you encounter any issues:
1. Double-check your credentials in Cloudinary dashboard
2. Make sure environment variables are set correctly
3. Restart your development server
4. Check the browser console for any errors