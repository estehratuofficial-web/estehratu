# Es Teh Ratu Website

A modern, responsive website for the Es Teh Ratu brand. Includes:

- Sticky header, hero, highlights, menu, testimonials (Google Maps style), story, franchise CTA, and footer
- WhatsApp integrations for order and franchise inquiries
- Local Node static server for local development (`server.js`), not required for Vercel

## Project Structure

- `index.html`, `styles.css`, `script.js`
- `about.html`, `about.css`, `about.js`
- `franchise.html`, `franchise.css`, `franchise.js`
- `Assets/` images
- `server.js` local static server for development
- `vercel.json` config for static hosting

## Run Locally

```bash
# Option A: Using Node local server (development only)
set PORT=8001 && node server.js
# Open http://localhost:8001
```

> Note: Vercel will serve this as a static site. `server.js` is not used in production.

## Deploy

### GitHub

1. Create a new repo on GitHub (e.g., `es-teh-ratu`).
2. Initialize and push:

```bash
git init -b main
git add .
git commit -m "Initial commit: Es Teh Ratu website"
git remote add origin <YOUR_REPO_SSH_OR_HTTPS_URL>
git push -u origin main
```

Or with GitHub CLI:

```bash
gh repo create es-teh-ratu --public --source . --remote origin --push
```

### Vercel (recommended via GitHub)

- Connect your GitHub repo on https://vercel.com > New Project > Import the repo
- Framework preset: "Other"
- Output directory: `.` (root)
- No build command necessary (static)

Or with Vercel CLI:

```bash
vercel --prod
```

## Configuration

- `vercel.json`: configures caching headers and clean URLs for a static site.
- Ensure asset paths use URL-encoded spaces (already handled).

## Contact

- WhatsApp: +62 859 3612 7055 (Es Teh Ratu Official)
- Address: Jl. Pindahan No.I, Pancoran Mas, Kec. Pancoran Mas, Kota Depok, Jawa Barat 16436
