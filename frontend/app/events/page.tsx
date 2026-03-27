"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ArrowRight, Zap } from "lucide-react";

const events = [
  { id: "1", title: "Rendezvous 2024", date: new Date(Date.now() + 86400000 * 12).toISOString(), location: "OAT, IIT Delhi", type: "Cultural Fest", expected: "10k+", image: "bg-gradient-to-br from-pink-500/20 to-orange-500/20" },
  { id: "2", title: "Tryst 2024", date: new Date(Date.now() + 86400000 * 45).toISOString(), location: "Lecture Hall Complex", type: "Tech Fest", expected: "5k+", image: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20" },
  { id: "3", title: "Alumni Meet & Gala", date: new Date(Date.now() + 86400000 * 60).toISOString(), location: "Dogra Hall", type: "Networking", expected: "500+", image: "bg-gradient-to-br from-gold/20 to-yellow-600/20" },
];

export default function EventsPage() {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: { d: number, h: number, m: number, s: number } }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: any = {};
      events.forEach(ev => {
        const target = new Date(ev.date).getTime();
        const now = new Date().getTime();
        const diff = target - now;
        if (diff > 0) {
          newTimeLeft[ev.id] = {
            d: Math.floor(diff / (1000 * 60 * 60 * 24)),
            h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            s: Math.floor((diff % (1000 * 60)) / 1000)
          };
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Campus <span className="text-gold">Events</span></h1>
          <p className="text-muted text-lg max-w-xl mx-auto">Discover and engage with the pulse of IIT Delhi. Never miss an important moment.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((ev, i) => (
            <motion.div 
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group cursor-pointer shadow-xl relative"
            >
              <div className={`h-48 w-full ${ev.image} flex items-center justify-center relative border-b border-white/5`}>
                 <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                 <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <Zap className="w-8 h-8 text-white" />
                 </div>
                 <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/20">
                    {ev.type}
                 </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold transition-colors">{ev.title}</h3>
                
                <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-muted">
                        <Calendar className="w-4 h-4 text-gold" />
                        <span>{new Date(ev.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted">
                        <MapPin className="w-4 h-4 text-gold" />
                        <span>{ev.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted">
                        <Users className="w-4 h-4 text-gold" />
                        <span>{ev.expected} Expected Attendees</span>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="bg-black/30 rounded-2xl p-4 border border-white/5 mb-6">
                    <p className="text-xs text-white/50 mb-2 uppercase tracking-widest font-semibold text-center">Event Starts In</p>
                    {timeLeft[ev.id] ? (
                        <div className="flex justify-between px-2">
                            <div className="text-center"><span className="block text-xl font-bold text-white font-mono">{String(timeLeft[ev.id].d).padStart(2, '0')}</span><span className="text-[10px] text-muted uppercase">Days</span></div>
                            <span className="text-xl font-bold text-white/20">:</span>
                            <div className="text-center"><span className="block text-xl font-bold text-white font-mono">{String(timeLeft[ev.id].h).padStart(2, '0')}</span><span className="text-[10px] text-muted uppercase">Hrs</span></div>
                            <span className="text-xl font-bold text-white/20">:</span>
                            <div className="text-center"><span className="block text-xl font-bold text-white font-mono">{String(timeLeft[ev.id].m).padStart(2, '0')}</span><span className="text-[10px] text-muted uppercase">Min</span></div>
                            <span className="text-xl font-bold text-white/20">:</span>
                            <div className="text-center"><span className="block text-xl font-bold text-gold font-mono">{String(timeLeft[ev.id].s).padStart(2, '0')}</span><span className="text-[10px] text-gold uppercase">Sec</span></div>
                        </div>
                    ) : (
                        <div className="text-center font-bold text-gold py-1">Started!</div>
                    )}
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium hover:bg-gold hover:text-primary hover:border-gold transition-colors group/btn">
                    Register Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
