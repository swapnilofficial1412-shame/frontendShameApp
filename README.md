# Frontend Shame App

Frontend web application built with Next.js, TypeScript, TailwindCSS, TanStack React Query, and Axios.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **TanStack React Query** - Data fetching and state management
- **Axios** - HTTP client

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and update the `NEXT_PUBLIC_API_URL` if your backend runs on a different port:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000` (or the port shown in the terminal).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint

## Project Structure

```
frontendShameApp/
├── app/
│   ├── layout.tsx              # Root layout with header and navigation
│   ├── page.tsx                 # Home/Dashboard page
│   ├── globals.css              # Global styles with Tailwind directives
│   ├── submit-promise/
│   │   └── page.tsx             # Submit Promise page
│   └── about/
│       └── page.tsx             # About page
├── providers/
│   └── QueryProvider.tsx        # React Query provider wrapper
├── lib/
│   └── axios.ts                 # Axios instance configuration
├── .env.example                 # Environment variables template
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # TailwindCSS configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.js            # PostCSS configuration
└── package.json
```

## Features

- **App Router**: Uses Next.js 14 App Router (not Pages Router)
- **TypeScript**: Full type safety throughout the application
- **TailwindCSS**: Configured and ready to use
- **React Query**: Provider configured for data fetching
- **Axios**: Base instance configured with environment variables
- **Responsive Design**: Mobile-friendly layout with dark mode support
- **Navigation**: Global header with navigation links

## Pages

- **Home** (`/`) - Dashboard placeholder
- **Submit Promise** (`/submit-promise`) - Promise submission placeholder
- **About** (`/about`) - About page placeholder

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: `http://localhost:3000`)

## Next Steps

- Implement API integration using the configured Axios instance
- Add React Query hooks for data fetching
- Build out the dashboard functionality
- Create the promise submission form
- Add authentication if needed

