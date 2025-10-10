
# Symteco Nigerian Limited Website

This is the official website for Symteco Nigerian Limited, built with Next.js, TypeScript, Tailwind CSS, and shadcn-ui components.

## Project Structure

- **Next.js** for server-side rendering and routing
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn-ui** for UI components
- **React Query** for data fetching

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun

### Installation

Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd symteco-nigerian-limited/frontend
```

Install dependencies:
```bash
npm install
# or
bun install
```

Start the development server:
```bash
npm run dev
# or
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site locally.

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com/):

1. Push your code to GitHub.
2. Import your repository into Vercel.
3. Vercel will automatically detect Next.js and deploy your site.

### Custom Domain
You can add a custom domain in your Vercel dashboard after deployment.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Environment Variables

For contact form functionality, set these variables in your Vercel dashboard or `.env.local`:

- `MJ_APIKEY_PUBLIC`
- `MJ_APIKEY_PRIVATE`
- `MJ_SENDER_EMAIL`
- `MJ_RECEIVER_EMAIL`

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- shadcn-ui
- React Query

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
