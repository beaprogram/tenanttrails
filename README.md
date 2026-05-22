# TenantTrails

Landing page for the TenantTrails apartment review platform. Built with React + Vite for CSCI 4177/5709 Lab 1.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for production

```bash
npm run build
```

The optimized output is in `dist/`. This is the folder Netlify and Vercel deploy.

## Project structure

```
src/
├── main.jsx              Entry point; renders App into #root
├── App.jsx               Composes the landing page
├── App.css               App-level layout
├── index.css             Global resets + body font
└── components/
    ├── Header.jsx        Logo + Sign In + Get Started
    ├── Hero.jsx          Badge, headline, CTAs
    └── Features.jsx      Three feature cards
```
