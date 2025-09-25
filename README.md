
# Fire Fit (Pro v8) — CSV Export + Master Standards + Mentor Tools

## New in v8
- **Export → fire-fit-results.csv** with all members, standards, and attempts (timestamp, value, pass/fail, notes).

## Core features
- Master standards at `config/standards_master` (assign to all; auto-assign on new signups).
- Members page: assign mentor, assign master list to one or ALL.
- Mentor Log: record attempts per standard with history.
- Weekly Admin, Leaderboard, Tier Check-off (optional view).
- Netlify build (`npm run build`) + `firestore.rules` for mentor permissions.

## Firebase env vars (Netlify → Site settings → Environment variables)
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
