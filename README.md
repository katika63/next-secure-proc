# Cybersecurity Website - Next.js Migration

This is a Next.js application migrated from a static HTML cybersecurity website with AI chat functionality.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page
├── globals.css        # Global styles
├── components/        # Reusable components
│   ├── ui/           # UI components
│   └── layout/       # Layout components
└── lib/
    └── services/     # Service layer

```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Tech Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Linting:** ESLint
- **AI Integration:** Google Gemini API
- **Database:** Supabase