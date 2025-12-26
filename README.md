# E-commerce React

A modern e-commerce application built with React, TypeScript, and shadcn/ui.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite 5** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router v6** - Routing
- **Zustand** - State management
- **TanStack Query** - Server state
- **React Hook Form + Zod** - Forms & validation
- **Firebase v10** - Backend (Auth, Firestore, Storage)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/chandrashekar19/ecommerce-react.git
cd ecommerce-react
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` with your Firebase configuration.

4. Start the development server
```bash
npm run dev
```

The app will be available at http://localhost:3000

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## Project Structure

```
src/
├── app/                # App configuration (router, providers)
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Header, Footer, etc.
│   └── shared/         # Shared components
├── features/           # Feature modules
│   ├── auth/           # Authentication
│   ├── cart/           # Shopping cart
│   └── products/       # Products
├── hooks/              # Custom React hooks
├── lib/
│   └── firebase/       # Firebase services
├── pages/              # Route pages
├── types/              # TypeScript types
├── constants/          # App constants
└── styles/             # Global styles
```

## SOLID Principles

This project follows SOLID principles:

- **Single Responsibility**: Each feature module handles one domain
- **Open/Closed**: Components use composition for extensibility
- **Liskov Substitution**: Consistent interfaces across components
- **Interface Segregation**: Small, focused type interfaces
- **Dependency Inversion**: Services abstracted behind interfaces

## License

MIT
