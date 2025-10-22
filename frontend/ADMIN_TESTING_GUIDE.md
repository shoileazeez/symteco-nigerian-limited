# Admin Testing Guide

This guide will help you test the admin functionality locally.

## Prerequisites

1. **Node.js** (version 18 or higher)
2. **Database access** (PostgreSQL - already configured in `.env`)
3. **Environment variables** (already set up in `.env`)

## Setup Steps

### 1. Install Dependencies
```bash
cd frontend
npm install
# or
pnpm install
# or
yarn install
```

### 2. Set up Database
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations (if needed)
npx prisma db push
```

### 3. Create Initial Admin Account
Run this command to create the first admin user:

```bash
curl -X POST http://localhost:3000/api/admin/create-initial \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@symtecoltd.com",
    "password": "admin123",
    "name": "Admin User"
  }'
```

Or create a simple script to do this:

```javascript
// create-admin.js
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@symtecoltd.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
      },
    });
    
    console.log('Admin created:', admin);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
```

Run with: `node create-admin.js`

### 4. Start Development Server
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

## Testing Admin Features

### 1. Admin Login
- Visit: `http://localhost:3000/admin/login`
- Email: `admin@symtecoltd.com`
- Password: `admin123`

### 2. Admin Dashboard
- After login, you'll be redirected to: `http://localhost:3000/admin/dashboard`
- You can see stats and quick actions

### 3. Project Management
- **View Projects**: `http://localhost:3000/admin/projects`
- **Add Project**: `http://localhost:3000/admin/projects/add`
- **Edit Project**: Click edit on any project in the list

### 4. Message Management
- **View Messages**: `http://localhost:3000/admin/messages`
- **Generate Test Messages**: 
  ```bash
  curl -X POST http://localhost:3000/api/test/generate-messages
  ```
- **Test Webhook** (simulate incoming email):
  ```bash
  curl -X POST http://localhost:3000/api/webhooks/mailjet \
    -H "Content-Type: application/json" \
    -d '{
      "event": "parse",
      "From": "test@example.com",
      "To": "info@symtecoltd.com",
      "Subject": "Quote request for electrical work",
      "Text-part": "Hello, I need a quote for electrical installation in my building.",
      "Html-part": "<p>Hello, I need a quote for electrical installation in my building.</p>"
    }'
  ```

## API Endpoints for Testing

### Projects API
- **GET** `/api/projects` - Get all projects
- **GET** `/api/projects?featured=true` - Get featured projects
- **POST** `/api/projects` - Create project (requires admin auth)
- **GET** `/api/projects/[id]` - Get single project
- **PUT** `/api/projects/[id]` - Update project (requires admin auth)
- **DELETE** `/api/projects/[id]` - Delete project (requires admin auth)

### Messages API
- **GET** `/api/admin/messages` - Get all messages (requires admin auth)
- **PUT** `/api/admin/messages` - Update message status (requires admin auth)
- **POST** `/api/admin/reply` - Send reply to message (requires admin auth)

### Test Endpoints
- **POST** `/api/test/generate-messages` - Generate test messages
- **POST** `/api/webhooks/mailjet` - Mailjet webhook receiver

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure your DATABASE_URL in `.env` is correct
   - Run `npx prisma db push` to sync the schema

2. **NextAuth Issues**
   - Make sure NEXTAUTH_URL and NEXTAUTH_SECRET are set in `.env`
   - For production, change NEXTAUTH_SECRET to a secure random string

3. **Image Issues**
   - Place your project images in the `public/` folder
   - Use `/image-name.jpg` format for the image URLs
   - Fallback placeholder is available at `/project-placeholder.svg`

4. **Email Issues**
   - Mailjet credentials are already set in `.env`
   - Test email sending through the admin reply interface

### Testing Checklist

- [ ] Can access admin login page
- [ ] Can login with admin credentials
- [ ] Can view admin dashboard
- [ ] Can view/add/edit/delete projects
- [ ] Can view messages (after generating test data)
- [ ] Can reply to messages
- [ ] Projects display correctly on homepage
- [ ] Projects display correctly on projects page
- [ ] Images load correctly (with fallback)

## Sample Data

### Create Test Project via API
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie-here" \
  -d '{
    "title": "Test Substation Project",
    "description": "A test project for electrical substation construction",
    "category": "Substation Construction",
    "location": "Lagos, Nigeria",
    "year": "2024",
    "images": ["/project-abeokuta-substation-construction.jpg"],
    "tags": ["33kV", "Construction", "Industrial"],
    "status": "Completed",
    "featured": true,
    "client": "Test Client Ltd",
    "duration": "6 months",
    "value": "₦50 million"
  }'
```

## Security Notes

- Change default admin password after first login
- Use strong passwords in production
- Keep environment variables secure
- The admin routes are protected by NextAuth authentication

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Check the terminal/server logs
3. Ensure all environment variables are set
4. Verify database connectivity
5. Make sure all dependencies are installed