# TenantTrails

Apartment review platform for CSCI 4177/5709. Built with React + Vite + React Router.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Demo login

- Email: `alex@dal.ca`
- Password: `password123`

Or use the Sign Up page to create any account.

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Netlify serves this folder.

## Routes

| Path         | Page       | Notes                          |
|--------------|------------|--------------------------------|
| `/`          | Landing    | Public marketing page          |
| `/login`     | Login      | Form with validation           |
| `/signup`    | Signup     | Form with validation           |
| `/dashboard` | Dashboard  | Protected — requires login     |

## Structure

```
src/
├── pages/        Landing, Login, Signup, Dashboard
├── components/   Header, Hero, Features, ApartmentCard, ProtectedRoute
├── context/      AuthContext (shared auth state)
├── data/         mockData.js (apartments + demo user)
├── App.jsx       Routing + providers
├── main.jsx      Entry point
└── index.css     Global styles
```

## Features (Lab 2)

- **State management** — useState/useMemo in Dashboard for search/filter/sort
- **Routing** — React Router with BrowserRouter, Link, useNavigate
- **Shared state** — AuthContext via Context API + custom useAuth hook
- **Forms & validation** — controlled inputs with per-field error messages
- **Protected routes** — ProtectedRoute redirects to /login when no user
