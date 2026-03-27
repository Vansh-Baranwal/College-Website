"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden">
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
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full" />
            <img 
              src="/logo.png" 
              alt="IIT Delhi Seal" 
              className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10 filter brightness-0 invert opacity-80" 
            />
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
            className="flex flex-col sm:flex-row gap-6 perspective-1000 mt-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-gold via-yellow-500 to-red-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <Link href="/campus" className="relative flex items-center justify-center px-10 py-4 bg-black rounded-full leading-none truncate overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold/50 to-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                <span className="relative text-gold font-bold text-lg tracking-wider group-hover:text-white transition-colors mix-blend-screen">EXPLORE CAMPUS</span>
                <div className="absolute inset-0 border-2 border-gold/50 rounded-full scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"></div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotateX: -10, rotateY: -10 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              <Link href="/dashboard" className="relative flex items-center justify-center px-10 py-4 bg-[#0a0f1e] rounded-full leading-none overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></span>
                <span className="relative text-white font-bold text-lg tracking-wider">STUDENT PORTAL</span>
                <div className="absolute inset-0 border-2 border-blue-400/50 rounded-full scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"></div>
              </Link>
            </motion.div>
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
