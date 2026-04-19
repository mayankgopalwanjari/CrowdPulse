"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, AlertTriangle, ShieldAlert, Award, Clock, ArrowRight } from 'lucide-react';

export default function AttendeeHome() {
  const [activeTab, setActiveTab] = useState('home');
  const [emergency, setEmergency] = useState(false);
  const [waitTimes, setWaitTimes] = useState({ gateA: 15, gateB: 5, gateC: 22 });
  const [crowdSpike, setCrowdSpike] = useState(false);

  // Mock WebSocket receiving events
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random fluctuations
      setWaitTimes({
        gateA: 15 + Math.floor(Math.random() * 5),
        gateB: 3 + Math.floor(Math.random() * 4),
        gateC: 22 + Math.floor(Math.random() * 10),
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const triggerMockSpike = () => {
    setCrowdSpike(true);
    setTimeout(() => setCrowdSpike(false), 8000);
  };

  const triggerEmergency = () => {
    setEmergency(!emergency);
  };

  if (emergency) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
        className="min-h-screen bg-red-900 flex flex-col items-center justify-center p-6 text-center animate-pulse"
      >
        <ShieldAlert className="w-24 h-24 text-white mb-6 animate-bounce" />
        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-widest">Emergency</h1>
        <p className="text-xl text-red-100 font-semibold mb-8">Follow staff instructions & proceed to GATE C</p>
        <button onClick={triggerEmergency} className="px-6 py-3 bg-red-950 text-white font-bold rounded-lg opacity-50">
          (Admin override reset)
        </button>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-dark overflow-hidden pb-20 relative">
      {/* Header */}
      <header className="p-6 pt-12 flex justify-between items-center z-10 glass-card rounded-b-3xl">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-green">CrowdPulse</h1>
          <p className="text-sm text-gray-400">Sector 4 • Row G • Seat 12</p>
        </div>
        <div className="flex gap-2">
          <button onClick={triggerEmergency} className="bg-red-500/20 text-red-400 p-2 rounded-full border border-red-500/30 hover:bg-red-500/40 transition">
            <AlertTriangle className="w-5 h-5" />
          </button>
          <button onClick={triggerMockSpike} className="bg-primary/20 text-primary p-2 rounded-full border border-primary/30 hover:bg-primary/40 transition">
            <Navigation className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col gap-6 z-10 overflow-y-auto">
        
        {/* Smart Suggestion Context Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card rounded-2xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-200">Recommended Gate</h2>
              <h3 className="text-4xl font-black text-primary mt-1 neon-primary">Gate B</h3>
            </div>
            <div className="bg-green/20 border border-green/30 text-green px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <Clock className="w-4 h-4" /> {waitTimes.gateB} mins
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">Save ~{(waitTimes.gateC - waitTimes.gateB)} mins by taking the North approach.</p>
          <button className="w-full bg-gradient-to-r from-primary to-blue-500 text-dark font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
            Navigate Now <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Live Heatmap Stub */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-4 h-64 relative flex flex-col font-bold overflow-hidden"
        >
           <h3 className="text-gray-300 mb-2 z-10 flex items-center gap-2"><MapPin className="w-4 h-4"/> Live Density Router</h3>
           <div className="absolute inset-0 top-10 bg-[url('https://pub-e7d6928e18fd48c087dcaddc9dc3599b.r2.dev/mock-stadium.svg')] bg-cover bg-center opacity-40 mix-blend-screen" />
           
           {/* Mock paths and dots */}
           <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
              <svg width="100%" height="100%" className="absolute inset-0 drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
                 <path d="M 50 200 Q 150 50 250 150 T 350 50" fill="none" stroke={crowdSpike ? "#FF3366" : "#00E5FF"} strokeWidth="4" strokeDasharray="8 8" className="animate-[pulse-fast_linear_infinite]" />
              </svg>
              {crowdSpike && (
                <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-red-500/40 text-red-500 border border-red-500 rounded-full flex items-center justify-center animate-ping text-xs">
                  Spike!
                </div>
              )}
           </div>
        </motion.div>

        {/* Other Gates list */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="glass-card p-4 rounded-xl flex flex-col items-center">
             <span className="text-gray-400 text-sm">Gate A</span>
             <span className="text-2xl font-bold text-yellow">{waitTimes.gateA}m</span>
          </div>
          <div className="glass-card p-4 rounded-xl flex flex-col items-center">
             <span className="text-gray-400 text-sm">Gate C</span>
             <span className="text-2xl font-bold text-red">{waitTimes.gateC}m</span>
          </div>
        </motion.div>

        {/* Gamification */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="glass-card rounded-2xl p-4 flex items-center gap-4 bg-gradient-to-r from-gray-900 to-indigo-900/40"
        >
            <div className="w-12 h-12 rounded-full bg-yellow/20 flex items-center justify-center border border-yellow/50">
              <Award className="text-yellow w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-200">Flow Hero Badge</h4>
              <p className="text-xs text-gray-400">Use Gate B today to earn +50 CrowdCoins.</p>
            </div>
        </motion.div>

      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full glass-card border-t border-white/10 flex justify-around p-4 z-50">
         <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center transition ${activeTab === 'home' ? 'text-primary' : 'text-gray-500'}`}>
            <Navigation className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">Route</span>
         </button>
         <button onClick={() => setActiveTab('alert')} className={`flex flex-col items-center transition ${activeTab === 'alert' ? 'text-primary' : 'text-gray-500'}`}>
            <AlertTriangle className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">SOS</span>
         </button>
         <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center transition ${activeTab === 'profile' ? 'text-primary' : 'text-gray-500'}`}>
            <Award className="w-6 h-6 mb-1" />
            <span className="text-xs font-semibold">Rewards</span>
         </button>
      </nav>
    </div>
  );
}
