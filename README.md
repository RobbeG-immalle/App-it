# App-it 💡

A mobile-first app idea tracker built with React, Vite, and Capacitor. Capture, organize, and prioritize your app ideas with rich metadata, priority scoring, and status tracking.

---

## Tech Stack

- **React 18** — UI with hooks and context
- **Vite 5** — Fast dev server and bundler
- **Capacitor 5** — Native iOS & Android wrapper
- **localStorage** — Zero-config persistence
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

### Build for Production

```bash
npm run build
npm run preview
```

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
- ✅ **Persistence** — all data saved to localStorage automatically
- ✅ **Responsive** — works great on mobile and desktop

---

## Screenshots

_Coming soon_

---

## License

MIT
