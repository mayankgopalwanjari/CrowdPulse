const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// Simulation State
let mockState = {
  gates: {
    A: { waitMs: 15, temp: 'moderate', flowRate: 450 },
    B: { waitMs: 5, temp: 'low', flowRate: 120 },
    C: { waitMs: 22, temp: 'high', flowRate: 800 }
  },
  emergency: false
};

io.on('connection', (socket) => {
  console.log(`Node connected: ${socket.id}`);
  
  // Initial sync
  socket.emit('SYNC_STATE', mockState);

  socket.on('TRIGGER_SPIKE', () => {
    mockState.gates.C = { waitMs: 45, temp: 'high', flowRate: 1500 };
    io.emit('SYNC_STATE', mockState);
    io.emit('ALERT', { type: 'spike', text: 'Gate C anomaly detected' });
  });

  socket.on('TOGGLE_EMERGENCY', () => {
    mockState.emergency = !mockState.emergency;
    io.emit('SYNC_STATE', mockState);
    io.emit('ALERT', { type: 'emergency', text: 'Evacuation protocol override' });
  });
});

// Continuous Tick Simulator
setInterval(() => {
  // Random small fluctuations
  Object.keys(mockState.gates).forEach(key => {
    const gate = mockState.gates[key];
    gate.waitMs = Math.max(1, gate.waitMs + (Math.random() > 0.5 ? 1 : -1));
  });
  io.emit('TICK_UPDATE', mockState);
}, 3000);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`CrowdPulse Orchestrator running on port ${PORT}`);
});
