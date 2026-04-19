"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, AlertCircle, Radio, Clock, ShieldAlert, ArrowUpRight, Zap } from 'lucide-react';

export default function AdminDashboard() {
  const [emergency, setEmergency] = useState(false);
  const [gates, setGates] = useState([
    { id: 'A', wait: 15, temp: 'moderate', flow: 450 },
    { id: 'B', wait: 5, temp: 'low', flow: 120 },
    { id: 'C', wait: 22, temp: 'high', flow: 800 },
    { id: 'D', wait: 12, temp: 'moderate', flow: 320 }
  ]);
  const [spike, setSpike] = useState(false);

  // Simulation clock
  useEffect(() => {
    const timer = setInterval(() => {
      setGates(prev => prev.map(g => ({
        ...g,
        wait: Math.max(1, g.wait + (Math.random() > 0.5 ? 1 : -1)),
        flow: Math.max(50, g.flow + Math.floor(Math.random() * 40 - 20))
      })));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const triggerSpike = () => {
    setSpike(true);
    setGates(prev => prev.map(g => g.id === 'C' ? { ...g, wait: 45, flow: 1500, temp: 'high' } : g));
    setTimeout(() => setSpike(false), 10000);
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-500 flex flex-col ${emergency ? 'bg-red-950/40' : 'bg-dark'}`}>
      
      {/* Header */}
      <header className="glass-card rounded-2xl p-6 mb-6 flex justify-between items-center z-10 border-l-4 border-l-primary">
        <div className="flex items-center gap-3">
          <Activity className="text-primary w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-wider">CROWD<span className="text-primary">PULSE</span> COMMAND</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-green font-mono bg-green/10 px-3 py-1 rounded-full border border-green/20">
            <Radio className="w-4 h-4 animate-pulse" /> LIVE TELEMETRY
          </div>
          <button 
            onClick={() => setEmergency(!emergency)}
            className={`px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition ${emergency ? 'bg-red-500 text-white animate-pulse' : 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/40'}`}
          >
            <ShieldAlert className="w-5 h-5" />
            {emergency ? 'EMERGENCY ACTIVE - DISABLE' : 'TRIGGER EVACUATION'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 flex-1">
        
        {/* Left Sidebar - Key Metrics */}
        <div className="col-span-3 flex flex-col gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm font-semibold mb-2">Total Attendance</h3>
            <div className="text-4xl font-black mb-1">42,891</div>
            <div className="text-green text-sm flex items-center gap-1"><ArrowUpRight className="w-4 h-4" /> +1,204 past hour</div>
          </div>
          
          <div className={`glass-card p-6 rounded-2xl transition border ${spike ? 'border-red-500 shadow-[0_0_20px_rgba(255,51,102,0.5)]' : 'border-white/10'}`}>
            <h3 className="text-gray-400 text-sm font-semibold mb-2 flex items-center justify-between">
              AI Risk Score {spike && <AlertCircle className="w-4 h-4 text-red animate-ping" />}
            </h3>
            <div className={`text-5xl font-black ${spike ? 'text-red' : 'text-primary'}`}>
               {spike ? '92' : '24'}
            </div>
            <div className="text-xs text-gray-400 mt-2">Probability of critical bottleneck in next 15m</div>
          </div>

          <div className="glass-card p-6 rounded-2xl flex-1 flex flex-col">
            <h3 className="text-gray-400 text-sm font-semibold mb-4">Gate Queues</h3>
            <div className="flex flex-col gap-4">
              {gates.map(gate => (
                <div key={gate.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold">{gate.id}</div>
                    <div className="text-sm font-semibold">{gate.flow} pax/hr</div>
                  </div>
                  <div className={`font-mono font-bold ${gate.wait > 20 ? 'text-red' : gate.wait > 10 ? 'text-yellow' : 'text-green'}`}>
                    {gate.wait}m
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Live Map */}
        <div className="col-span-6 glass-card rounded-2xl relative overflow-hidden flex flex-col border border-white/5">
          <div className="p-4 bg-black/40 flex justify-between items-center z-10 backdrop-blur-md">
             <div className="font-semibold flex items-center gap-2"><MapPin className="text-primary w-5 h-5"/> Venue Density Map</div>
             <button onClick={triggerSpike} className="text-xs bg-primary/20 text-primary px-3 py-1 rounded border border-primary/30 flex items-center gap-1 hover:bg-primary/30">
               <Zap className="w-3 h-3" /> Simulate Spike
             </button>
          </div>
          <div className="flex-1 relative bg-[url('https://pub-e7d6928e18fd48c087dcaddc9dc3599b.r2.dev/mock-stadium.svg')] bg-cover bg-center mix-blend-screen opacity-60">
             
             {/* Heatmap Overlays */}
             <div className={`absolute top-[40%] left-[30%] w-32 h-32 rounded-full blur-[40px] transition-all duration-1000 ${spike ? 'bg-red-500/80 scale-150' : 'bg-primary/30'}`} />
             <div className="absolute top-[60%] left-[60%] w-48 h-48 rounded-full blur-[50px] bg-yellow/20" />
             <div className="absolute top-[20%] left-[70%] w-24 h-24 rounded-full blur-[30px] bg-green/40" />
             
             {/* Dynamic Agents (Dots) */}
             <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
                {Array.from({length: 40}).map((_, i) => (
                  <circle 
                    key={i}
                    cx={`${30 + Math.random() * 40}%`} 
                    cy={`${30 + Math.random() * 40}%`} 
                    r="2" 
                    fill="#00E5FF"
                    className="animate-pulse"
                    style={{ animationDuration: `${1 + Math.random() * 2}s`, animationDelay: `${Math.random()}s` }}
                  />
                ))}
             </svg>
             {emergency && (
               <div className="absolute inset-0 bg-red-500/20 mix-blend-multiply flex items-center justify-center pointer-events-none">
                  <div className="text-red-500 font-black text-6xl opacity-50 rotate-[-15deg] tracking-widest border-4 border-red-500 p-4">EVACUATE</div>
               </div>
             )}
          </div>
        </div>

        {/* Right Sidebar - Alerts */}
        <div className="col-span-3 glass-card rounded-2xl p-6 flex flex-col gap-4">
           <h3 className="text-gray-400 text-sm font-semibold flex items-center gap-2"><Activity className="w-4 h-4"/> System Events</h3>
           <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {spike && (
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-red-500/10 border border-red-500/30 p-3 rounded-lg">
                  <div className="text-red-400 text-xs font-bold mb-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> CRITICAL ANOMALY</div>
                  <div className="text-sm">Gate C concourse flow exceeded 1500 pax/hr. Predicted stampede risk. Auto-rerouting attendees to Gate B.</div>
                </motion.div>
              )}
              {emergency && (
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-red-900/50 border border-red-500 p-3 rounded-lg animate-pulse">
                  <div className="text-red text-xs font-bold mb-1 flex items-center gap-1"><ShieldAlert className="w-3 h-3"/> EVACUATION</div>
                  <div className="text-sm">Global override active. All mobile devices locked to nearest exit paths.</div>
                </motion.div>
              )}
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <div className="text-primary text-xs font-bold mb-1">ROUTING UPDATE</div>
                <div className="text-sm">Smart path Engine actively rebalancing 340 users away from Sector 2 corridors.</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <div className="text-gray-400 text-xs font-bold mb-1">CCTV INGEST</div>
                <div className="text-sm">Camera Node 14 (Concourse North) processing stable at 30 fps.</div>
              </div>
           </div>
           <button className="w-full bg-primary/20 text-primary text-sm font-bold py-3 rounded-xl border border-primary/30 hover:bg-primary/30 transition">
             Broadcast Push Message
           </button>
        </div>

      </div>
    </div>
  );
}

// Inline fallback icon imports if missing
const MapPin = ({className}: {className?: string}) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
