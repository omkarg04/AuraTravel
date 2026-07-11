# AuraTravel ✈️

**An AI-powered trip planning application that generates personalized travel itineraries in seconds.**

AuraTravel takes a destination and a set of preferences, and uses Google's Gemini 2.5 Flash model to generate a complete, personalized itinerary — enriched with real destination imagery and backed by a real-time Firebase data layer.

---

## 🚀 Why This Project

Planning a trip usually means juggling a dozen browser tabs — blogs, maps, reviews, budget spreadsheets. AuraTravel collapses that into a single conversational flow: tell it what you want, and it builds the itinerary for you, powered by a large language model rather than static templates.

This project was built to explore how generative AI can be embedded meaningfully into a real product experience — not as a chatbot bolted onto the side, but as the core engine driving the app's primary feature.

---

## ✨ Features

- **AI-Generated Itineraries** — Personalized day-by-day travel plans generated via Gemini 2.5 Flash based on user preferences (destination, duration, interests, budget)
- **Real-Time Data Sync** — User trips and preferences are stored and synced in real time using Firebase
- **Dynamic Destination Imagery** — Automatically pulls relevant, high-quality images for each destination via the Unsplash API
- **Clean, Component-Driven UI** — Built with shadcn/ui and Tailwind CSS for a fast, responsive, accessible interface
- **Authentication** — Firebase Auth for secure user sign-in and trip history

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite) |
| Styling | Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express |
| AI / LLM | Google Gemini 2.5 Flash |
| Database / Auth | Firebase (Firestore + Auth) |
| Imagery | Unsplash API |

---

## 🏗️ Architecture Overview

```
User Input (preferences, destination, dates)
        │
        ▼
   React Client (Vite + shadcn/ui + Tailwind CSS)
        │
        ▼
   Express Server (Node.js) ──► Orchestrates requests
        │                              │
        ▼                              ▼
 Gemini 2.5 Flash API          Firebase (Firestore + Auth)
 (generates itinerary)          (persists trip + user data)
        │
        ▼
 Unsplash API ──► Fetches destination imagery
        │
        ▼
   Rendered Itinerary UI
```

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or later)
- A Firebase project with Firestore + Authentication enabled
- A Google AI Studio API key (Gemini)
- An Unsplash API access key

### Installation

```bash
# Clone the repository
git clone https://github.com/omkarg04/auratravel.git
cd auratravel
```

**Set up the Client:**

```bash
cd Client
npm install
cp .env.example .env.local
```

Add your keys to `Client/.env.local`:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

```bash
npm run dev
```

**Set up the Server:**

```bash
cd Server
npm install
```

```bash
node index.js
```

The client will be available at `http://localhost:5173`, with the API server running separately (check `Server/index.js` for the configured port).

---

## 📁 Project Structure

```
auratravel/
├── Client/
│   ├── src/
│   │   ├── assets/                # Static assets
│   │   ├── components/
│   │   │   ├── custom/            # App-specific components
│   │   │   └── ui/                 # Shared UI components (Footer, Hotels,
│   │   │                           # InfoSection, PlaceCard, PlacesToVisit, etc.)
│   │   ├── constants/              # App-wide constants
│   │   ├── create-trip/            # Trip creation flow
│   │   ├── lib/                    # Firebase config, API clients, utilities
│   │   ├── my-trips/                # Saved trips view
│   │   ├── services/                # API service layer
│   │   ├── viewTrip/tripId/         # Individual trip detail view
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── vite.config.js
│   └── package.json
├── Server/
│   ├── app.js
│   ├── index.js
│   └── package.json
└── README.md
```

---

## 🎯 Key Engineering Decisions

- **Gemini 2.5 Flash over larger models** — chosen for low-latency itinerary generation without sacrificing output quality, keeping the app feel responsive rather than making users wait on a slow generation step.
- **Express server as an orchestration layer** — keeps API keys (Gemini, Unsplash) off the client and centralizes request handling between the frontend, the LLM, and Firebase, rather than calling third-party APIs directly from the browser.
- **Firebase for data + auth** — enabled real-time sync and authentication without building a full custom database layer, letting more of the engineering effort go into the AI integration and frontend experience.
- **shadcn/ui + Tailwind** — component-level control over styling without the overhead of a heavier design system, keeping the UI both fast and easy to customize.

---

## 🔭 Roadmap / Future Improvements

- [ ] Collaborative trip planning (multi-user editing on a single itinerary)
- [ ] Budget tracking and cost estimation per itinerary
- [ ] Export itinerary to PDF / calendar
- [ ] Offline support for saved trips

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋 About

Built by **Omkar Gaikwad** — a full-stack developer exploring how generative AI can be integrated meaningfully into real applications.

- GitHub: [github.com/omkarg04](https://github.com/omkarg04)
- Email: gaikwadoa554@gmail.com
