# TenantTrails (React frontend)

The TenantTrails web app for CSCI 4177/5709. As of Lab 6 it talks to the
Express API instead of mock data: real login/signup over an httpOnly cookie,
real apartments, reviews, edit, and delete.

## Setup

```bash
npm install
cp .env.example .env     # sets VITE_API_URL=http://localhost:3000
```

## Run (needs the API running too)

```bash
# terminal 1 - the API
cd ../tenanttrails-api && npm run dev      # http://localhost:3000

# terminal 2 - this app
npm run dev                                # http://localhost:5173
```

Open http://localhost:5173, sign up, browse apartments, add/edit/delete reviews.

## Environment

| Key | Purpose |
|-----|---------|
| `VITE_API_URL` | Base URL of the backend API (default `http://localhost:3000`) |

## How auth works (Lab 6)

`AuthContext` calls the API with `credentials: 'include'`. On login the server
sets an httpOnly cookie the browser stores and re-sends automatically; on load
the app calls `/api/auth/me` to restore the session after a refresh.
`ProtectedRoute` waits for that check, then gates on the user.

## Tests

```bash
npm test
```
