"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Activity, Phone, MessageCircle, Calendar, Shield, Moon, Wind, Users, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const moodData = [
  { day: "Mon", score: 6 },
  { day: "Tue", score: 7 },
  { day: "Wed", score: 4 },
  { day: "Thu", score: 5 },
  { day: "Fri", score: 8 },
  { day: "Sat", score: 9 },
  { day: "Sun", score: 8 },
];

const emojis = [
  { emoji: "😭", score: 1, label: "Awful" },
  { emoji: "😔", score: 3, label: "Bad" },
  { emoji: "😐", score: 5, label: "Okay" },
  { emoji: "🙂", score: 7, label: "Good" },
  { emoji: "🤩", score: 10, label: "Great" },
];

export default function MentalHealthPage() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [showCrisis, setShowCrisis] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    if (selectedMood !== null && selectedMood <= 3) {
      setShowCrisis(true);
    }
  }, [selectedMood]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const cycleBreathing = () => {
      setBreathingPhase("in");
      timer = setTimeout(() => {
        setBreathingPhase("hold");
        timer = setTimeout(() => {
          setBreathingPhase("out");
          timer = setTimeout(cycleBreathing, 4000);
        }, 2000);
      }, 4000);
    };
    cycleBreathing();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 transition-colors duration-1000">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#a78bfa]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8b5cf6]/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 flex items-center gap-3">
              <Heart className="w-10 h-10 text-[#a78bfa]" /> Wellness Center
            </h1>
            <p className="text-[#a78bfa]/70 text-lg">Your safe space for mental health and support.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-md">
            <Shield className={`w-4 h-4 ${isAnonymous ? 'text-green-400' : 'text-white/40'}`} />
            <span className="text-sm font-medium text-white/80">Anonymous Mode</span>
            <button 
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`w-12 h-6 rounded-full transition-colors relative ${isAnonymous ? 'bg-green-500/20 border border-green-500/50' : 'bg-white/10 border border-white/20'}`}
            >
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform ${isAnonymous ? 'translate-x-6 bg-green-400' : 'translate-x-0 bg-white/50'}`} />
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COL - Tracker & AI */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#1a1428]/60 backdrop-blur-xl border border-[#a78bfa]/20 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#a78bfa]/10 blur-3xl rounded-full" />
              <h2 className="text-2xl font-serif text-white mb-6">How are you feeling today?</h2>
              
              <div className="flex justify-between items-center mb-10 gap-2">
                {emojis.map((em) => (
                  <button 
                    key={em.score}
                    onClick={() => setSelectedMood(em.score)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                      selectedMood === em.score 
                        ? 'bg-[#a78bfa]/20 scale-110 border border-[#a78bfa]/50 shadow-[0_0_20px_rgba(167,139,250,0.2)]' 
                        : 'hover:bg-white/5 hover:scale-105 border border-transparent'
                    }`}
                  >
                    <span className="text-4xl md:text-5xl filter transition-all">{em.emoji}</span>
                    <span className={`text-xs font-medium ${selectedMood === em.score ? 'text-[#a78bfa]' : 'text-white/50'}`}>{em.label}</span>
                  </button>
                ))}
              </div>

              <div className="h-48 mt-8 border-t border-[#a78bfa]/10 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-white/70">Weekly Tracker</h3>
                  <span className="text-xs text-[#a78bfa]">Avg: 6.7</span>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moodData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.5}/>
                        <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" stroke="#a78bfa80" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis domain={[0, 10]} hide />
                    <Tooltip contentStyle={{ backgroundColor: "#1a1428", borderColor: "#a78bfa50", borderRadius: "8px" }} />
                    <Area type="monotone" dataKey="score" stroke="#a78bfa" fillOpacity={1} fill="url(#colorMood)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="p-6 rounded-2xl bg-gradient-to-br from-[#a78bfa]/20 to-transparent border border-[#a78bfa]/30 hover:border-[#a78bfa] transition-all group text-left relative overflow-hidden">
                <div className="absolute inset-0 bg-[#a78bfa]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Calendar className="w-8 h-8 text-[#a78bfa] mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Book Counselor</h3>
                <p className="text-sm text-white/60">Schedule a 1-on-1 session with campus psychologists.</p>
              </button>
              <Link href="/chat" className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 hover:border-white/30 transition-all group text-left relative overflow-hidden block">
                 <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                 <MessageCircle className="w-8 h-8 text-white/80 mb-4" />
                 <h3 className="text-lg font-medium text-white mb-2">Chat with AI Support</h3>
                 <p className="text-sm text-white/60">Anonymous, 24/7 AI companion for immediate relief.</p>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COL - Resources & Breathing */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#1a1428]/60 backdrop-blur-xl border border-[#a78bfa]/20 rounded-3xl p-8 flex flex-col items-center text-center">
              <h3 className="text-lg font-medium text-white/80 mb-6">Breathing Exercise</h3>
              <div className="w-48 h-48 relative flex items-center justify-center mb-6">
                <motion.div 
                  className="absolute w-full h-full rounded-full border-2 border-[#a78bfa]/30 blur-[2px]"
                  animate={{ 
                    scale: breathingPhase === 'in' ? 1.5 : breathingPhase === 'hold' ? 1.5 : 1,
                    opacity: breathingPhase === 'in' ? 0.3 : breathingPhase === 'hold' ? 0.1 : 0.5
                  }}
                  transition={{ duration: breathingPhase === 'hold' ? 2 : 4, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute w-3/4 h-3/4 bg-[#a78bfa]/20 rounded-full blur-xl"
                  animate={{ 
                    scale: breathingPhase === 'in' ? 1.4 : breathingPhase === 'hold' ? 1.4 : 1,
                  }}
                  transition={{ duration: breathingPhase === 'hold' ? 2 : 4, ease: "easeInOut" }}
                />
                <div className="relative z-10 text-2xl font-serif text-[#a78bfa]">
                  {breathingPhase === 'in' ? 'Breathe In' : breathingPhase === 'hold' ? 'Hold' : 'Breathe Out'}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#1a1428]/60 backdrop-blur-xl border border-[#a78bfa]/20 rounded-3xl p-8">
              <h3 className="text-xl font-serif text-white mb-6">Curated Resources</h3>
              <div className="space-y-4">
                {[
                  { title: "Meditation Sounds", icon: Wind, color: "text-blue-400", bg: "bg-blue-400/10" },
                  { title: "Stress Relief Guide", icon: Activity, color: "text-rose-400", bg: "bg-rose-400/10" },
                  { title: "Sleep Stories", icon: Moon, color: "text-indigo-400", bg: "bg-indigo-400/10" },
                  { title: "Peer Support Group", icon: Users, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                ].map((res, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${res.bg}`}>
                      <res.icon className={`w-5 h-5 ${res.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium group-hover:text-[#a78bfa] transition-colors">{res.title}</h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-[#a78bfa]/20 group-hover:text-[#a78bfa] transition-colors">
                      →
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CRISIS DETECTION MODAL */}
      <AnimatePresence>
        {showCrisis && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-[#1a1428] border border-rose-500/30 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(244,63,94,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[80px]" />
              <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/30 mb-6 mx-auto">
                <AlertTriangle className="w-8 h-8 text-rose-400" />
              </div>
              <h3 className="text-2xl font-serif text-white font-bold text-center mb-2">You seem down. We're here for you.</h3>
              <p className="text-white/60 text-center mb-8">It's completely okay to not feel okay. Campus support is available 24/7 immediately.</p>
              
              <div className="space-y-3">
                 <button className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" /> 24/7 Helpline
                </button>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5 text-white/60" /> Book Urgent Session
                </button>
                <button onClick={() => setShowCrisis(false)} className="w-full py-2 text-white/40 hover:text-white/80 text-sm mt-4 transition-colors">
                  I'm just browsing, thanks
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
