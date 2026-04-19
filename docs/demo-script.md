# 🎤 CrowdPulse Demo Script (2 Minutes)

## Pre-requisites
1. Have `frontend-admin` open on a second monitor or separate window (Left).
2. Have `frontend-attendee` open in a mobile emulator view (DevTools -> iPhone 14 Pro) on the primary window (Right).
3. Ensure the `backend` is running.

## Script

**[0:00] Intro & The Problem**
*"Hi judges! We built CrowdPulse. Anyone who has been to a major concert or stadium match knows the pain: massive queues at getting in, bottlenecked concourses, and safety concerns during exits. Venues have the data (CCTV, Scans), but it never reaches the fans. CrowdPulse changes that."*

**[0:20] Admin Dashboard Walkthrough**
*(Point to the Admin screen)*
*"This is the live admin command center. We are simulating a live concert with 5 gates and 10 zones. You can see the heatmaps pulsing, queue times updating in real-time. Our AI engine detects flow anomalies—for instance, Gate A is processing 30% slower than expected."*

**[0:40] Attendee Experience**
*(Point to Attendee screen)*
*"But the real magic is fan-facing. As an attendee, I link my ticket and load the app. Instead of walking blindly to the main gate, CrowdPulse acts as a 'Waze for Venues'. It suggests Gate B, saving me 15 minutes. It uses real-time density data to draw the fastest path to my seat, skipping crowded corridors."*

**[1:00] Live Simulation: Anomaly & Rerouting**
*"Let's see it react. I'm going to simulate a sudden crowd spike at Concourse 2..."*
*(Click "Simulate Spike" on Admin dashboard)*
*(Watch the Attendee screen dynamically reroute the path from blue to red, then draw a new green path).*
*"Instantly, the app reroutes the user dynamically to avoid the stampede risk. The user gets 'CrowdCoins' for taking the less congested route, incentivizing good flow."*

**[1:30] Emergency Mode**
*"Safety is paramount. In an emergency..."*
*(Toggle 'Emergency Evacuation' on Admin)*
*(Attendee screen flashes red and overrides to 'EVACUATE TO NEAREST EXIT: GATE C')*
*"The admin can lock down the stadium and push hyper-local evacuation routes to every user instantly. No more confusion."*

**[1:50] Conclusion**
*"CrowdPulse is not just a concept. It's built on a real-time socket architecture, monetizable through fast-lane sponsorships, and ready to make the next SuperBowl safer and faster. Thank you!"*
