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

      {/* 360 Viewer Container */}
      <div className="w-full h-[calc(100vh-80px)] bg-black relative overflow-hidden group border-y border-white/10">
        <iframe 
          src="https://360-degree-nine.vercel.app/" 
          className="w-full h-full border-none"
          title="Virtual Campus Tour"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
        
        {/* Overlay for branding and control help */}
        <div className="absolute bottom-12 left-8 z-20 pointer-events-none sm:block hidden">
           <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-[10px] text-white/60 tracking-widest uppercase font-bold">
             Drag to look around • Use wheel to zoom
           </div>
        </div>
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

