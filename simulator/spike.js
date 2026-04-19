/**
 * Simulator Script for Demoing
 * Usage: node spike.js
 * Triggers a massive simulated crowd spike at Concourse 2 via the backend.
 */
const { io } = require("socket.io-client");
const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("Simulator connected to CrowdPulse Orchestrator.");
  console.log("Triggering Concourse 2 Spike...");
  
  socket.emit("TRIGGER_SPIKE");
  
  setTimeout(() => {
    console.log("Trigger successful. Exiting simulator.");
    process.exit(0);
  }, 1000);
});
