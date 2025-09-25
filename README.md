# Fire Fit — Netlify + Firebase starter

A clean, modern React (Vite + Tailwind) starter wired for Firebase Auth & Firestore,
ready to deploy on Netlify.

## 1) Setup locally
```bash
npm install
cp .env.example .env
# paste your Firebase web app keys into .env
npm run dev
```

## 2) Firebase (once)
- Create a Firebase project.
- Add a Web app to get keys (enable Email/Password and/or Google sign‑in).
- Create Firestore in **Production** mode.
- Deploy rules (optional now): you can paste `firestore.rules` in the console Rules tab.

## 3) Netlify deploy (zero config)
- Push this folder to GitHub (or drag & drop the repo zip into Netlify).
- On Netlify, set build command: `npm run build` and publish dir: `dist`.
- Add the **same** env vars from `.env` to Netlify site settings (prefix `VITE_...`).
- Netlify will auto-detect Vite and deploy.
- SPA routing works via `netlify.toml` redirect to `/index.html`.

## 4) What’s included
- `/login` email/password + Google sign-in
- `/dashboard` basic user profile doc creation
- `/weekly` minimal goal and progress entries (Firestore collection `entries`)
- `/standards` sample standards copy
- `/logbook` placeholder

## 5) Rename and customize
- Edit texts in `src/pages/*`.
- Extend Firestore data model as you like.
- Add your brand colors via Tailwind.

## Troubleshooting
- Blank page on Netlify: confirm env vars are set in Netlify and start a new deploy.
- Auth popup blocked: allow popups or use email/password.
- Firestore permission errors: check you are signed in and rules allow your path.
