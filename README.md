# CrowdPulse 🎵🏟️

> A smart crowd management and attendee experience platform for large stadiums and concerts.

**CrowdPulse** is a powerful hackathon MVP that makes venues safer, faster, and more enjoyable for fans while providing real-time crowd intelligence and command capabilities to admins.

![CrowdPulse Demo](https://via.placeholder.com/1200x600.png?text=CrowdPulse+Dark+Mode+UI)

## 🌟 The Goal
Reduce entry/exit queues, prevent gate crowding, optimize footfall navigation, and support emergency evacuation flows. Built with a premium, glowing glassmorphism design system to instantly wow judges and provide a modern, futuristic UX. 

## 🚀 Features Prioritized for Demo
### Attendee App (Fan-First)
- **Live Heatmap:** Pulsing heatmap overlays for high-density zones.
- **Smart Gate Routing:** Fastest gate suggestion based on live queue times.
- **Dynamic Pathing:** Fastest route to seat, food, or exit (density-weighted).
- **Emergency Takeover:** Flashing red SOS/emergency mode overriding standard views.
- **Gamification:** Rewards (CrowdCoins & Flow Hero badges) for using uncrowded routes.

### Admin Dashboard (Live Command)
- **Live Stadium Overlook:** Moving, animated data blocks simulating crowd flow.
- **Gate Leaderboard:** Live queue wait times and processing rates.
- **Alert Broadcast:** Push dynamic event reroutes or emergency states instantly to all connected attendees.
- **Anomaly Detection:** Early warnings for crowd surges and bottleneck risks.

## 🏗️ Architecture & Tech Stack

- **Frontend (Attendee & Admin):** Next.js (App Router), React, Tailwind CSS, shadcn/ui, Framer Motion, Leaflet
- **Backend/Simulator:** Node.js, Express, Socket.IO
- **Design Language:** Dark mode, glassmorphism, neon accents (Green/Yellow/Red severity), modern typography.

## 📁 Repository Structure
```
/frontend-admin      - Next.js Admin Dashboard
/frontend-attendee   - Next.js Fan User Mobile Web App
/backend             - Node.js/Express + Socket.IO server & data mock
/ai-service          - Python/Flask stubs for prediction & anomaly AI
/simulator           - Scripts to trigger crowd spikes/emergencies for demo
/data                - Mock JSON schemas (CCTV, WiFi density, Ticket scans)
/docs                - Architecture diagrams, Demo script, APIs
/infra               - Docker compose and deployment configs
```

## 🏁 Setup & Run Instructions

You will need Node.js (v18+) installed. For the best demo experience, launch the backend and both frontends concurrently.

### 1. Start the Backend (WebSockets + Data Simulation)
```bash
cd backend
npm install
npm run dev
```
*(Runs on port 4000. Handles the live continuous tick of data & Socket rooms)*

### 2. Start the Attendee App
```bash
cd frontend-attendee
npm install
npm run dev
```
*(Runs on port 3000. Mobile-first responsive view).*

### 3. Start the Admin Dashboard
```bash
cd frontend-admin
npm install
npm run dev
```
*(Runs on port 3001. Desktop optimized view).*

## 💡 How to Demo Live (2-Minute Script)
1. **Show the Admin Dashboard (0:00 - 0:30):** Point out the live updating queue times (using simulated data) and the glowing map. Highlight the anomaly risk score.
2. **Show the Attendee App (0:30 - 1:00):** Show the mobile view onboarding via Ticket QR. Show "Fastest Gate Now" and the interactive map with heatmap overlay.
3. **Trigger the Spike (1:00 - 1:20):** Open the `simulator` script or click "Trigger Surge" in the Admin Dashboard. Watch the attendee app dynamically reroute the user to Gate B instead of Gate A.
4. **Emergency Evac (1:20 - 1:50):** Hit the Admin "Emergency Toggle." Watch the Attendee app visually flash red and lock down to "Evacuation Route" mode.
5. **Close (1:50 - 2:00):** Explain the tech stack, the scalability, and the monetization (sponsored fast routes, white-label SaaS, analytics).

## 🧪 Simulation Requirements (Mock Data)
All components use a simulated timeline driven by the single `backend` WebSocket. It mocks:
- Gate wait fluctuations
- Stadium zone density 
- Emergency broadcasts
