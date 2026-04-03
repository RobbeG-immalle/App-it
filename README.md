# App-it 💡

A mobile-first app idea tracker built with React, Vite, and Capacitor. Capture, organize, and prioritize your app ideas with rich metadata, priority scoring, and status tracking.

---

## Tech Stack

- **React 18** — UI with hooks and context
- **Vite 5** — Fast dev server and bundler
- **Capacitor 5** — Native iOS & Android wrapper
- **Supabase** — Cloud Postgres database (falls back to localStorage if not configured)
- **Pure CSS** — No UI framework, custom purple/blue theme

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> The app works without Supabase — it falls back to **localStorage** automatically. You'll see a yellow banner at the top if running in local-only mode.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Supabase Setup

Supabase is used to store your ideas in the cloud so they persist across devices and won't be lost if you clear your browser cache.

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in (free tier is fine)
2. Click **New project** and fill in the details
3. Wait for the project to be ready (~1 minute)

### 2. Run the SQL migration

1. In your Supabase project, go to the **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy and paste the contents of [`supabase/migration.sql`](./supabase/migration.sql)
4. Click **Run**

This creates the `ideas` table with all required fields and a permissive Row Level Security policy (no auth needed for a single-user setup).

### 3. Get your API credentials

1. In your Supabase project, go to **Settings → API**
2. Copy the **Project URL** (e.g. `https://xyzabc.supabase.co`)
3. Copy the **anon / public** key (safe to use client-side)

### 4. Set up environment variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Then fill in your values:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Restart the dev server (`npm run dev`) and the yellow local-mode banner will disappear — your ideas are now saved to Supabase! 🎉

---

## Capacitor (iOS / Android)

### Prerequisites

- For iOS: macOS + Xcode 14+
- For Android: Android Studio (latest)

### Setup

```bash
# Install Capacitor CLI globally (optional)
npm install -g @capacitor/cli

# Build the web app first
npm run build

# Add platforms
npx cap add ios
npx cap add android

# Sync web assets to native projects
npx cap sync
```

### Open in IDE

```bash
# Open in Xcode
npx cap open ios

# Open in Android Studio
npx cap open android
```

After opening, run the app on a simulator/device directly from the IDE.

---

## Features

- ✅ **Full idea capture** — title, description, problem solved, target audience, monetization, pricing, tech stack, dependencies
- ✅ **Priority scoring** — Impact, Effort, Interest each rated 1–5 with visual dot indicators
- ✅ **Status lifecycle** — 💡 Idea → 🔍 Validating → 🛠 Building → 🚀 Launched → ❌ Dropped
- ✅ **Complexity tagging** — Low / Medium / High with color coding
- ✅ **Custom tags** — free-form tags with predefined suggestions
- ✅ **Search** — instant full-text search across title, description, tags
- ✅ **Filtering** — filter by status and complexity
- ✅ **Sorting** — sort by Impact, Effort, Interest, Date, or Title
- ✅ **Cloud persistence** — ideas saved to Supabase (falls back to localStorage)
- ✅ **Responsive** — works great on mobile and desktop

---

## Screenshots

_Coming soon_

---

## License

MIT
