# Fire Fit (Netlify + Firebase Starter)

A super simple starter you can deploy on Netlify and connect to Firebase.

## Quick Start (No Terminal Expertise Needed)
1) Create a **new site** on Netlify and connect this folder (or GitHub repo).
2) In Netlify → **Site settings → Build & deploy → Environment**, add these variables from your Firebase project:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID` (optional)
3) Netlify will run `npm run build` automatically and publish from `dist`.
4) Visit your site URL. Log in with Google on the **Login** page. Enjoy!

## Local Dev (Optional)
- Install Node.js (LTS), then:
  ```bash
  npm install
  npm run dev
  ```

## What's Inside
- React + Vite
- Firebase (Auth + Firestore ready)
- React Router
- Tailwind via CDN
- Protected routes (Dashboard and Weekly Challenge require login)