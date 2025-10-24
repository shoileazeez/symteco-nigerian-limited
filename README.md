# Symteco Nigerian Limited - Corporate Website & Admin Portal

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22.0-2D3748)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Official corporate website and admin management portal for **Symteco Nigerian Limited**, a leading electrical and mechanical contracting company based in Lagos, Nigeria. This comprehensive platform features a modern responsive website with an integrated admin dashboard for managing projects, messages, and business operations.

## 🏢 About Symteco Nigerian Limited

Symteco Nigerian Limited is an engineering company specializing in:
- **Industrial Electrical Installation** - High & low voltage systems, power distribution
- **Mechanical Installation** - HVAC, piping, industrial machinery setup
- **Switchgear & Panel Fabrication** - Custom control panels and motor control centers
- **Low & Medium Voltage Systems** - Specialized LV/MV installations
- **Maintenance & Support** - 24/7 support and preventive maintenance
- **General Contracting** - Full-scale project management and facility construction

**Company Details:**
- **Established:** April 13, 2012
- **Registration No:** RC 1025558
- **Location:** Suite 11, LSDPC Phase 1 Shopping Complex, Oba Ogunji Road, Pen-Cinema, Agege, Lagos, Nigeria
- **Contact:** 08058244486, 08087865823
- **Email:** ibrotech144@gmail.com

## 🚀 Features

### 🌐 Public Website
- ✨ Modern, responsive design optimized for all devices
- 🎨 Beautiful UI components using shadcn-ui
- ⚡ Fast performance with Next.js server-side rendering
- 📱 Mobile-first approach with Tailwind CSS
- � Service pages with detailed offerings
- 🎯 Project portfolio showcase
- 🗺️ Interactive company location map
- 📊 Company statistics and testimonials
- 🔒 Type-safe with TypeScript

### 📧 Contact & Quote Management
- 📋 **Smart Contact Forms** - Separate contact and quote forms with intelligent classification
- 🎯 **Automatic Message Typing** - Explicit origin detection for accurate contact vs quote categorization
- ✉️ **Email Integration** - Mailjet-powered email delivery with professional templates
- 💾 **Database Storage** - All messages saved to PostgreSQL with structured data
- 🔄 **Real-time Processing** - Instant email notifications with database backup

### 🏗️ Admin Dashboard
- 🛡️ **Secure Authentication** - JWT-based admin login with session management
- 📊 **Professional Dashboard** - Overview of projects, messages, and business metrics
- � **Message Center** - Complete inbox management for contacts and quotes
- 🎯 **Project Management** - Add, edit, and manage company projects with image uploads
- 📱 **Responsive Design** - Fully responsive admin interface with mobile optimization

### 🎛️ Admin Features
- **Message Management:**
  - 📥 View all contact forms and quote requests
  - 🏷️ Filter by type (quotes, contacts, read/unread)
  - 👁️ Mark as read/unread functionality
  - 🗑️ Delete unwanted messages
  - � **Gmail Reply Integration** - One-click Gmail compose with professional templates
  - 📋 View structured message data (name, email, phone, company, project details)

- **Project Management:**
  - ➕ Add new projects with detailed information
  - ✏️ Edit existing project details
  - 🖼️ **Single Image Upload** - Cloudinary integration for project images
  - 📷 Preview and manage project photos
  - � View Cloudinary URLs in edit mode

- **Enhanced UI/UX:**
  - 🎨 **Modern Icons** - Lucide React icons throughout admin interface
  - ✨ **Smooth Animations** - Hardware-accelerated transitions and hover effects
  - 📱 **Mobile User Panel** - Slide-up user info panel for mobile devices
  - � **Collapsible Sidebar** - Desktop sidebar with persistent collapse state
  - 🎭 **Professional Styling** - Gradient backgrounds and modern card designs

## 📁 Repository Structure

```
symteco-nigerian-limited/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── admin/      # Admin dashboard components
│   │   │   │   └── AdminLayout.tsx
│   │   │   ├── layout/     # Header, Footer
│   │   │   ├── sections/   # Hero, Services, Projects, Contact, Quote
│   │   │   └── ui/         # shadcn-ui components
│   │   ├── pages/          # Main page components
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Index.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Services.tsx
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── use-auth.tsx
│   │   │   └── use-toast.ts
│   │   └── types/          # TypeScript type definitions
│   ├── pages/              # Next.js pages and API routes
│   │   ├── api/           # API endpoints
│   │   │   ├── contact.ts # Contact/Quote form handler
│   │   │   ├── admin/     # Admin API routes
│   │   │   │   ├── messages.ts
│   │   │   │   ├── conversations/
│   │   │   │   └── messages/
│   │   │   ├── auth/      # Authentication endpoints
│   │   │   │   ├── login.ts
│   │   │   │   ├── logout.ts
│   │   │   │   └── refresh.ts
│   │   │   ├── projects/  # Project management API
│   │   │   └── upload/    # Image upload handling
│   │   ├── admin/         # Admin dashboard pages
│   │   │   ├── dashboard.tsx
│   │   │   ├── login.tsx
│   │   │   ├── projects/
│   │   │   │   ├── index.tsx
│   │   │   │   └── add.tsx
│   │   │   └── messages/
│   │   │       └── index.tsx
│   │   ├── index.tsx      # Public homepage
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   └── services.tsx
│   ├── prisma/            # Database schema and migrations
│   │   ├── schema.prisma  # Database models
│   │   ├── seed.ts       # Database seeding
│   │   └── migrations/   # Database migration files
│   ├── lib/              # Utility libraries
│   │   ├── jwt.ts       # JWT authentication
│   │   ├── prisma.ts    # Database client
│   │   └── zoho-mail.ts # Email utilities
│   ├── scripts/          # Maintenance scripts
│   │   ├── delete-old-messages.js
│   │   └── upload-public-to-cloudinary.js
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies and scripts
│   ├── tsconfig.json     # TypeScript configuration
│   └── tailwind.config.ts # Tailwind CSS configuration
└── README.md             # This file
```

## 🛠️ Technology Stack

### Frontend Framework
- **[Next.js](https://nextjs.org/)** (v15.5.4) - React framework for production
- **[React](https://reactjs.org/)** (v18.3.1) - UI library
- **[TypeScript](https://www.typescriptlang.org/)** (v5.8.3) - Type safety

### Database & Backend
- **[Prisma](https://www.prisma.io/)** (v5.22.0) - Modern database toolkit
- **[PostgreSQL](https://www.postgresql.org/)** - Production database
- **[JWT](https://jwt.io/)** - Secure authentication tokens

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** (v3.4.17) - Utility-first CSS framework
- **[shadcn-ui](https://ui.shadcn.com/)** - High-quality React components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Modern icon library

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** (v7.61.1) - Form management
- **[Zod](https://zod.dev/)** (v3.25.76) - Schema validation

### File Upload & Storage
- **[Cloudinary](https://cloudinary.com/)** - Image upload and management
- **[Multer](https://github.com/expressjs/multer)** - File upload handling

### Email & Communication
- **[Mailjet](https://www.mailjet.com/)** - Professional email delivery
- **Gmail Integration** - One-click reply functionality

### Data Fetching
- **[TanStack Query](https://tanstack.com/query)** (v5.83.0) - Data synchronization
- **[Axios](https://axios-http.com/)** - HTTP client

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS transformation
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - CSS vendor prefixing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **bun** (optional, faster alternative)
- **Git** - [Download](https://git-scm.com/)
- **PostgreSQL** (v14.0 or higher) - [Download](https://www.postgresql.org/download/)

### Required Accounts & Services
- **[Mailjet](https://www.mailjet.com/)** - For email delivery (free tier available)
- **[Cloudinary](https://cloudinary.com/)** - For image upload and management (free tier available)
- **PostgreSQL Database** - Local or cloud instance (PostgreSQL, PlanetScale, Railway, etc.)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/HARLAHBEST/symteco-nigerian-limited.git
cd symteco-nigerian-limited/frontend
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using bun (faster):
```bash
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/symteco_db"

# JWT Authentication
JWT_SECRET="your-super-secure-jwt-secret-key-here"
JWT_REFRESH_SECRET="your-super-secure-refresh-secret-key-here"

# Mailjet API credentials for contact form
MJ_APIKEY_PUBLIC="your_mailjet_public_key"
MJ_APIKEY_PRIVATE="your_mailjet_private_key"
MJ_SENDER_EMAIL="your_sender_email@example.com"
MJ_RECEIVER_EMAIL="your_receiver_email@example.com"

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# Admin Configuration
ADMIN_EMAIL="admin@symteco.com"
ADMIN_PASSWORD="secure_admin_password"
```

### 4. Database Setup

Initialize the database and run migrations:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with initial data
npx prisma db seed
```

### 5. Admin Account Setup

Create the initial admin account:

```bash
# Run the admin creation script
node create-admin.js
```

Or manually create an admin user by visiting `/api/admin/create-initial` once in development.

### 6. Run Development Server

```bash
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

**Admin Access:**
- Public Website: `http://localhost:3000`
- Admin Dashboard: `http://localhost:3000/admin/login`

## 📜 Available Scripts

Navigate to the `frontend` directory and run:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on `http://localhost:3000` |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint to check code quality |
| `npx prisma studio` | Open Prisma Studio database browser |
| `npx prisma migrate dev` | Create and apply new database migration |
| `npx prisma db seed` | Seed database with initial data |
| `node scripts/delete-old-messages.js` | Clean up old messages from database |

## 🌐 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com/):

1. **Push your code to GitHub** (if you haven't already)

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com/)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js configuration

3. **Configure Environment Variables:**
   - In your Vercel project dashboard, go to Settings → Environment Variables
   - Add all variables from your `.env.local` file
   - **Important:** Set `DATABASE_URL` to your production database connection string

4. **Database Setup:**
   - Set up a production PostgreSQL database (PlanetScale, Railway, Supabase, etc.)
   - Run migrations: `npx prisma migrate deploy`
   - Seed initial data if needed

6. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a production URL like `https://your-project.vercel.app`

7. **Post-Deployment:**
   - Create initial admin account via `/api/admin/create-initial`
   - Test contact forms and admin functionality
   - Configure custom domain if needed

8. **Custom Domain (Optional):**
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain and follow DNS configuration instructions

### Other Deployment Options

- **Netlify:** Similar process to Vercel, supports Next.js
- **AWS Amplify:** Supports Next.js SSR applications
- **Digital Ocean App Platform:** Node.js application hosting
- **Self-hosted:** Build with `npm run build` and deploy to any Node.js server

## 🎨 Customization

### Updating Company Information

Edit the following files to update company details:
- `frontend/src/pages/About.tsx` - Company objective, mission, vision
- `frontend/src/components/layout/Footer.tsx` - Footer contact information
- `frontend/src/components/sections/ContactSection.tsx` - Contact form details

### Adding New Services

Edit `frontend/src/components/sections/ServicesSection.tsx` to add or modify services.

### Adding Projects

- **Via Admin Dashboard:** Log into `/admin/projects/add` to add projects with images
- **Programmatically:** Edit `frontend/src/components/sections/ProjectsSection.tsx`

### Styling

- **Colors:** Modify `frontend/tailwind.config.ts` to change theme colors
- **Fonts:** Update `frontend/src/app/globals.css` or `styles/globals.css`
- **Components:** shadcn-ui components are in `frontend/src/components/ui/`

## 🔐 Admin Dashboard Guide

### Accessing the Admin Panel
1. Navigate to `/admin/login`
2. Enter admin credentials
3. Access dashboard at `/admin/dashboard`

### Dashboard Features

#### **📊 Dashboard Overview**
- View message statistics (total, unread, quotes, contacts)
- Quick access to recent messages and projects
- Business metrics and KPIs

#### **💬 Message Management**
- **View Messages:** All contact forms and quote requests in one place
- **Filter & Search:** Filter by type (quotes/contacts), read status
- **Message Details:** View complete structured data including:
  - Contact information (name, email, phone, company)
  - Project details (location, timeline, budget)
  - Service requirements and detailed descriptions
- **Gmail Integration:** One-click reply with professional email templates
- **Actions:** Mark as read/unread, delete messages

#### **🏗️ Project Management**
- **Add Projects:** Create new project entries with descriptions and images
- **Edit Projects:** Update existing project information
- **Image Upload:** Cloudinary integration for high-quality project photos
- **Project Portfolio:** Automatically displayed on public website

### Admin Best Practices
- **Regular Monitoring:** Check messages daily for new inquiries
- **Quick Response:** Use Gmail integration for faster customer response
- **Project Updates:** Keep project portfolio current with latest work
- **Data Cleanup:** Use delete functionality to remove spam or test messages

## 📧 Contact & Quote System Setup

### Message Classification System
The platform features intelligent message classification:

- **Contact Forms:** General inquiries, sent with `origin: "contact"`
- **Quote Requests:** Detailed project requests, sent with `origin: "quote"`
- **Automatic Detection:** Fallback classification based on content analysis
- **Database Storage:** All messages stored with structured data fields

### Email Integration Setup

#### Mailjet Configuration
1. **Sign up for Mailjet:**
   - Visit [mailjet.com](https://www.mailjet.com/)
   - Create a free account

2. **Get API credentials:**
   - Go to Account Settings → API Keys
   - Copy your Public and Private API keys

3. **Configure environment variables:**
   - Add credentials to `.env.local` (development)
   - Add to Vercel Environment Variables (production)

4. **Verify sender email:**
   - Mailjet requires sender email verification
   - Check your email and verify the sender address

#### Gmail Reply Integration
- **One-Click Replies:** Admin dashboard provides Gmail compose links
- **Professional Templates:** Pre-filled email templates for quotes and contacts
- **Contact Information:** Templates include company details and next steps
- **Response Tracking:** 2-hour response commitment for business hours

### Cloudinary Image Upload Setup

1. **Create Cloudinary Account:**
   - Sign up at [cloudinary.com](https://cloudinary.com/)
   - Note your cloud name, API key, and API secret

2. **Configure Environment Variables:**
   ```env
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   ```

3. **Upload Configuration:**
   - Single image upload for projects
   - Automatic optimization and formatting
   - Direct URL generation for easy management

## 🧪 Testing

### Contact Form Testing
To test the contact and quote forms:

1. **Setup Development Environment:**
   - Configure Mailjet credentials in `.env.local`
   - Set up database connection
   - Start development server: `npm run dev`

2. **Test Contact Form:**
   - Navigate to the Contact page (`/contact`)
   - Fill out and submit the form
   - Check receiver email inbox for contact notification
   - Verify message appears in admin dashboard (`/admin/messages`)
   - Confirm message type is classified as "contact"

3. **Test Quote Request:**
   - Use the "Get Quote" button on any service page
   - Fill out the quote modal with project details
   - Verify email notification with quote request template
   - Check admin dashboard for message with "quote" classification
   - Test Gmail reply integration from message details

### Admin Dashboard Testing
1. **Authentication:**
   - Test login at `/admin/login`
   - Verify JWT token persistence
   - Test logout functionality

2. **Message Management:**
   - Test message filtering (all, quotes, contacts, unread)
   - Verify mark as read/unread functionality
   - Test message deletion
   - Check Gmail compose link generation

3. **Project Management:**
   - Test project creation with image upload
   - Verify Cloudinary integration
   - Test project editing and image preview
   - Confirm projects appear on public website

### Database Testing
```bash
# View database in browser
npx prisma studio

# Test database seeding
npx prisma db seed

# Check message cleanup script
node scripts/delete-old-messages.js --dry-run
```

## 🤝 Contributing

We welcome contributions! To contribute:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes and commit:**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to your branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation if needed

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

For questions or support regarding this website:

**Symteco Nigerian Limited**
- 📍 Suite 11, LSDPC Phase 1 Shopping Complex, Oba Ogunji Road, Pen-Cinema, Agege, Lagos, Nigeria
- 📞 08058244486, 08087865823
- 📧 ibrotech144@gmail.com

For technical issues with the website code:
- Open an issue on [GitHub Issues](https://github.com/HARLAHBEST/symteco-nigerian-limited/issues)

## 🙏 Acknowledgments

- **[Next.js](https://nextjs.org/)** - The React Framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn-ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Prisma](https://www.prisma.io/)** - Modern database toolkit
- **[Vercel](https://vercel.com/)** - Deployment platform
- **[Mailjet](https://www.mailjet.com/)** - Email service provider
- **[Cloudinary](https://cloudinary.com/)** - Image management platform
- **[Lucide](https://lucide.dev/)** - Beautiful icon library

---

**Built with ❤️ for Symteco Nigerian Limited**

*Powering Nigeria's industrial future with expert electrical and mechanical solutions*

### 🔗 Quick Links
- **Public Website:** [https://symteco.com](https://symteco.com)
- **Admin Dashboard:** [https://symteco.com/admin](https://symteco.com/admin/login)
- **Project Portfolio:** [https://symteco.com/projects](https://symteco.com/projects)
- **Contact Us:** [https://symteco.com/contact](https://symteco.com/contact)
