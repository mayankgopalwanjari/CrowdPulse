# CrowdPulse 🎵🏟️

> A smart crowd management and attendee experience platform for large stadiums and concerts.

**CrowdPulse** is a powerful hackathon MVP that makes venues safer, faster, and more enjoyable for fans while providing real-time crowd intelligence and command capabilities to admins.

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
- Gate wait fluctuations
- Stadium zone density 
- Emergency broadcasts
