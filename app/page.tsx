"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover hidden md:block"
          poster="/campus.jpg"
        >
          <source src="/campus-tour.mp4" type="video/mp4" />
        </video>
        
        {/* Mobile Fallback Background */}
        <div className="absolute w-full h-full bg-[url('/campus.jpg')] bg-cover bg-center md:hidden" />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-primary/55 z-10" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 z-10 opacity-20" 
             style={{ backgroundImage: "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
        />
        
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm text-gold text-sm font-medium mb-6"
          >
            Ranked #1 in India — NIRF 2024
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            <span className="text-white block mb-2 drop-shadow-lg">Indian Institute of</span>
            <span className="bg-gradient-to-r from-gold to-gold-light text-transparent bg-clip-text drop-shadow-lg">Technology Delhi</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted text-lg md:text-xl max-w-2xl mt-4 mb-10 drop-shadow-md"
          >
            A complete, production-ready frontend university platform. Experience the future of campus OS.
          </motion.p>
          
          {/* AI Search Bar */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-full max-w-xl mx-auto mb-12 relative"
          >
            <form action="/chat" className="relative group">
              <input 
                type="text" 
                name="q"
                placeholder="Ask AI anything about the campus..." 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 focus:bg-white/10 transition-all backdrop-blur-md shadow-xl"
              />
              <button title="Search" type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gold/20 text-gold rounded-full hover:bg-gold hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/campus" className="px-8 py-3 rounded-full bg-gold text-primary font-medium hover:bg-gold-light transition-colors shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_25px_rgba(201,168,76,0.4)]">
              Explore Campus
            </Link>
            <Link href="/dashboard" className="px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 backdrop-blur-sm transition-colors">
              Student Portal
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className="w-[1px] h-16 bg-white/20 overflow-hidden">
              <motion.div 
                  className="w-full h-1/2 bg-gold"
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
          </div>
        </div>
      </section>

      {/* STATS STRIP & FEATURES GRID TO BE IMPLEMENTED NEXT */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
            {/* Just a placeholder for the next step */}
        </div>
      </section>
    </div>
  );
}
