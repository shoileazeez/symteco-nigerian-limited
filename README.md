# Symteco Nigerian Limited - Corporate Website

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Official corporate website for **Symteco Nigerian Limited**, a leading electrical and mechanical contracting company based in Lagos, Nigeria. This modern, responsive website showcases our industrial electrical installations, mechanical systems, switchgear fabrication, and general contracting services.

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

- ✨ Modern, responsive design optimized for all devices
- 🎨 Beautiful UI components using shadcn-ui
- ⚡ Fast performance with Next.js server-side rendering
- 📱 Mobile-first approach with Tailwind CSS
- 📧 Integrated contact form with Mailjet email service
- 🎯 Project portfolio showcase
- 💼 Service pages with detailed offerings
- 🗺️ Interactive company location map
- 📊 Company statistics and testimonials
- 🔒 Type-safe with TypeScript

## 📁 Repository Structure

```
symteco-nigerian-limited/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── layout/     # Header, Footer
│   │   │   ├── sections/   # Hero, Services, Projects, etc.
│   │   │   └── ui/         # shadcn-ui components
│   │   ├── pages/          # Main page components
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Index.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Services.tsx
│   │   └── types/          # TypeScript type definitions
│   ├── pages/              # Next.js pages and API routes
│   │   ├── api/           # API endpoints
│   │   │   └── contact.ts # Contact form handler
│   │   ├── index.tsx
│   │   ├── about.tsx
│   │   ├── projects.tsx
│   │   └── services.tsx
│   ├── public/            # Static assets
│   │   ├── hero-industrial.jpg
│   │   └── services-*.jpg
│   ├── package.json       # Dependencies and scripts
│   ├── tsconfig.json      # TypeScript configuration
│   └── tailwind.config.ts # Tailwind CSS configuration
└── README.md             # This file
```

## 🛠️ Technology Stack

### Frontend Framework
- **[Next.js](https://nextjs.org/)** (v15.5.4) - React framework for production
- **[React](https://reactjs.org/)** (v18.3.1) - UI library
- **[TypeScript](https://www.typescriptlang.org/)** (v5.8.3) - Type safety

### Styling
- **[Tailwind CSS](https://tailwindcss.com/)** (v3.4.17) - Utility-first CSS framework
- **[shadcn-ui](https://ui.shadcn.com/)** - High-quality React components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Icon library

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** (v7.61.1) - Form management
- **[Zod](https://zod.dev/)** (v3.25.76) - Schema validation

### Data Fetching
- **[TanStack Query](https://tanstack.com/query)** (v5.83.0) - Data synchronization

### Email Service
- **[Mailjet](https://www.mailjet.com/)** - Email delivery service

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS transformation
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - CSS vendor prefixing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **bun** (optional, faster alternative)
- **Git** - [Download](https://git-scm.com/)

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
# Mailjet API credentials for contact form
MJ_APIKEY_PUBLIC=your_mailjet_public_key
MJ_APIKEY_PRIVATE=your_mailjet_private_key
MJ_SENDER_EMAIL=your_sender_email@example.com
MJ_RECEIVER_EMAIL=your_receiver_email@example.com
```

> **Note:** Get your Mailjet API keys by signing up at [mailjet.com](https://www.mailjet.com/)

### 4. Run Development Server

```bash
npm run dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## 📜 Available Scripts

Navigate to the `frontend` directory and run:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on `http://localhost:3000` |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint to check code quality |

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

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a production URL like `https://your-project.vercel.app`

5. **Custom Domain (Optional):**
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

Edit `frontend/src/components/sections/ProjectsSection.tsx` to showcase your projects.

### Styling

- **Colors:** Modify `frontend/tailwind.config.ts` to change theme colors
- **Fonts:** Update `frontend/src/app/globals.css` or `styles/globals.css`
- **Components:** shadcn-ui components are in `frontend/src/components/ui/`

## 📧 Contact Form Setup

The contact form uses Mailjet for email delivery. To set it up:

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

## 🧪 Testing Contact Form

To test the contact form locally:

1. Set up Mailjet credentials in `.env.local`
2. Start development server: `npm run dev`
3. Navigate to the Contact page
4. Fill out and submit the form
5. Check the receiver email inbox

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
- **[Vercel](https://vercel.com/)** - Deployment platform
- **[Mailjet](https://www.mailjet.com/)** - Email service provider

---

**Built with ❤️ for Symteco Nigerian Limited**

*Powering Nigeria's industrial future with expert electrical and mechanical solutions*
