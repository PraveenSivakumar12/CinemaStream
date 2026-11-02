# 🎬 Cinema-Stream

> A modern, production-ready Cinema Discovery & Streaming Companion built with **React 19**, **Vite**, **TMDB API**, and **React Router v7**.

---

## ✨ Key Features

- **🎭 Cinematic Trailer Theater Modal**:
  - Click on any movie card or carousel slide to open an interactive trailer overlay with **blurred backdrop (`backdrop-filter: blur(14px)`)**.
  - Fetches and plays official YouTube trailers via TMDB `/videos` API.
  - Complete synopsis, TMDB rating, release year, runtime, and genre tags.

- **⚡ Direct OTT Platform Streaming Navigation**:
  - One-click deep links directly to leading streaming platforms:
    - 🔴 **Netflix**
    - 🔵 **Amazon Prime Video**
    - 🟦 **Disney+ Hotstar**
    - 🍏 **Apple TV+**
    - ▶️ **YouTube Movies**
  - Compact streaming badges appear directly below every movie description and inside the trailer modal.

- **❤️ Interactive Watchlist & Animations**:
  - Heart icon pop and multi-particle burst animation when adding to favorites.
  - Toast notification banner alerts users on addition / removal.
  - Dynamic pulse badge on the Navbar favorite counter.
  - Persistent watchlist storage using `localStorage`.

- **📺 Dedicated TV Shows Page**:
  - Full-featured TV series browsing (`tv/popular`, `tv/top_rated`, `tv/on_the_air`).
  - Seamless trailer playback and OTT navigation for television shows.

- **🔍 Live Movie Search with Instant Previews**:
  - Debounced real-time TMDB search with click-to-play trailer preview.

- **💎 Subscription & VIP Membership Flow**:
  - Interactive Basic and Premium VIP plan selection.
  - Functional plan activation that updates user subscription status and unlocks the protected `/premium` collection.

- **🔐 Demo Authentication & Protected Routes**:
  - 1-click Quick Demo Sign-In for interview evaluation:
    - **Praveen (VIP Premium)**: `praveen@cinemastream.com` / `praveen123`
    - **Demo User (Free)**: `demo@cinemastream.com` / `demo123`
  - Route guards for `/my-list` (authentication required) and `/premium` (active subscription required).

- **🚀 Production Ready**:
  - Responsive mobile drawer navigation.
  - `vercel.json` SPA rewrite configuration for zero-404 client-side routing on Vercel.
  - Clean Oxlint & Vite production build with zero errors.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router DOM v7
- **Bundler**: Vite
- **Form Management & Validation**: Formik, Yup
- **Styling**: Modern CSS with CSS Grid, Flexbox, Keyframe Animations, Glassmorphism
- **API**: The Movie Database (TMDB v3 API)
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PraveenSivakumar12/CinemaStream.git
   cd CinemaStream
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Run linter:
   ```bash
   npm run lint
   ```

---

## 🔑 Demo Credentials

| User | Email | Password | Plan |
| :--- | :--- | :--- | :--- |
| **Praveen** | `praveen@cinemastream.com` | `praveen123` | **Premium VIP** |
| **Demo User** | `demo@cinemastream.com` | `demo123` | Free Standard |

*(Or simply use the 1-click demo buttons on the Login page)*

---

## 📄 License

This project is open-source under the MIT License for educational and interview demonstration purposes.
