"use client";

import { motion } from "framer-motion";
import { Compass, MapPin, Search } from "lucide-react";

export default function CampusPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-0 overflow-hidden relative">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center w-full px-4">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 drop-shadow-xl mt-[80px]">
          Virtual <span className="text-gold">Campus</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/80 max-w-lg mx-auto drop-shadow-md text-lg">
          Explore IIT Delhi in immersive 360° view
        </motion.p>
      </div>

      <div className="absolute top-32 right-8 z-20">
        <div className="relative group">
          <input type="text" placeholder="Search location..." className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-transparent placeholder-transparent focus:w-64 focus:px-4 focus:py-2 focus:placeholder-white/50 focus:text-white transition-all outline-none" />
          <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none group-focus-within:left-4 group-focus-within:translate-x-0 transition-all" />
        </div>
      </div>

      <div className="absolute bottom-28 right-8 lg:bottom-12 lg:right-12 z-20 w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-gold/30 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.2)]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="w-full h-full absolute inset-0 rounded-full border border-dashed border-gold/50" />
        <Compass className="w-8 h-8 lg:w-10 lg:h-10 text-gold" />
        <div className="absolute -top-2 text-[10px] lg:text-xs font-bold text-gold">N</div>
        <div className="absolute -bottom-2 text-[10px] lg:text-xs font-bold text-gold">S</div>
        <div className="absolute -left-2 text-[10px] lg:text-xs font-bold text-gold">W</div>
        <div className="absolute -right-2 text-[10px] lg:text-xs font-bold text-gold">E</div>
      </div>

      {/* Panorama Container Placeholder */}
      <div className="w-full h-[calc(100vh-80px)] bg-primary relative overflow-hidden group border-y border-white/10">
        {/* Fake 3D environment using background image and parallax */}
        <div className="absolute inset-0 bg-[url('/campus.jpg')] bg-cover bg-center md:bg-[length:120%_auto] transition-transform duration-[20s] ease-linear group-hover:scale-110 opacity-40 blur-[2px]" />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-transparent to-primary/80 pointer-events-none" />
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <span className="px-6 py-3 bg-black/60 backdrop-blur-md rounded-full text-sm text-white font-medium border border-white/20 shadow-xl">
                {/* TODO: Replace with ReactPannellum */}
                Interactive 360° Viewer Loaded
            </span>
        </div>

        {/* Hotspots */}
        <Hotspot top="30%" left="20%" label="Central Library" isNew />
        <Hotspot top="60%" left="50%" label="Main Building" />
        <Hotspot top="45%" left="80%" label="Hostel Avenue" />
        <Hotspot top="70%" left="25%" label="Sports Complex" />
      </div>
      
      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4 w-full justify-center overflow-x-auto px-4 pb-2 pb-0 custom-scrollbar">
        {['Main Campus', 'Sonipat Campus', 'Jhajjar Campus'].map((camp, i) => (
            <button key={i} className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium backdrop-blur-md border transition-colors ${i === 0 ? 'bg-gold/20 text-gold border-gold/50 shadow-[0_0_15px_rgba(201,168,76,0.2)]' : 'bg-black/60 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'}`}>
                {camp}
            </button>
        ))}
      </div>
    </div>
  );
}

function Hotspot({ top, left, label, isNew = false }: { top: string, left: string, label: string, isNew?: boolean }) {
    return (
        <motion.div 
            className="absolute z-20 cursor-pointer group"
            style={{ top, left }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: Math.random() }}
        >
            <div className="relative">
                <div className="w-12 h-12 bg-gold/20 rounded-full animate-ping absolute -top-3 -left-3" />
                <div className="w-6 h-6 bg-gold rounded-full border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.8)] relative z-10 transition-transform group-hover:scale-125">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                </div>
            </div>
            
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex flex-col items-center">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/80" />
                <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-xs font-medium text-white shadow-xl flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-gold" />
                    {label}
                    {isNew && <span className="bg-red-500 text-[9px] px-1 py-0.5 rounded text-white ml-1 font-bold">NEW</span>}
                </div>
            </div>
        </motion.div>
    );
}
