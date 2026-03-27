"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Pin, Clock, ChevronRight, AlertTriangle, Info, Star, Megaphone } from "lucide-react";

const announcements = [
  { id: 1, title: "Mid-Semester Examination Schedule Released", body: "The mid-semester examination for all UG and PG programmes will commence from April 14, 2026. Students are advised to check their respective department portals for the detailed timetable.", category: "Academic", pinned: true, date: "2026-03-25", priority: "high" },
  { id: 2, title: "Campus Wi-Fi Upgrade — Maintenance Window", body: "The campus-wide Wi-Fi infrastructure will undergo a planned upgrade on March 30, 2026 from 2:00 AM to 6:00 AM. Expect intermittent connectivity during this window.", category: "IT Services", pinned: false, date: "2026-03-24", priority: "medium" },
  { id: 3, title: "Rendezvous 2026 — Volunteer Registration Open", body: "The annual cultural festival Rendezvous is looking for enthusiastic volunteers. Register on the student portal before April 1, 2026.", category: "Events", pinned: true, date: "2026-03-23", priority: "low" },
  { id: 4, title: "New Research Grant for AI & ML Lab", body: "The Department of Computer Science has secured a ₹15 Cr research grant from SERB for advanced AI/ML research. Interested faculty and PhD scholars may apply.", category: "Research", pinned: false, date: "2026-03-22", priority: "high" },
  { id: 5, title: "Library Extended Hours During Exam Season", body: "The Central Library will remain open 24/7 from April 10 to April 30 to support students during the examination period.", category: "Facilities", pinned: false, date: "2026-03-20", priority: "low" },
  { id: 6, title: "Hostel Allotment for 2026-27 Session", body: "Hostel allotment for the upcoming academic session is now available on the student portal. Confirm your preferences before March 31.", category: "Administration", pinned: false, date: "2026-03-18", priority: "medium" },
];

const priorityConfig = {
  high: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", icon: AlertTriangle },
  medium: { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30", icon: Info },
  low: { color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30", icon: Star },
};

export default function AnnouncementsPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...Array.from(new Set(announcements.map(a => a.category)))];
  const filtered = filter === "All" ? announcements : announcements.filter(a => a.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Megaphone className="w-7 h-7 text-red-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">Announcements</h1>
              <p className="text-muted text-sm mt-1">{announcements.length} active announcements</p>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Chips */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${filter === cat ? 'bg-gold/20 text-gold border-gold/50' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'}`}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Announcements List */}
        <div className="space-y-4">
          {filtered.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)).map((ann, i) => {
            const prio = priorityConfig[ann.priority as keyof typeof priorityConfig];
            const PrioIcon = prio.icon;
            return (
              <motion.div
                key={ann.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(selected === ann.id ? null : ann.id)}
                className={`p-6 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all group ${selected === ann.id ? 'bg-white/10 border-gold/30 shadow-[0_0_30px_rgba(201,168,76,0.1)]' : 'bg-secondary/40 border-white/10 hover:border-white/20'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${prio.bg} border ${prio.border} flex items-center justify-center shrink-0 mt-1`}>
                    <PrioIcon className={`w-5 h-5 ${prio.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {ann.pinned && <Pin className="w-3 h-3 text-gold" />}
                      <span className="text-[10px] uppercase tracking-widest text-muted font-bold">{ann.category}</span>
                      <span className="text-[10px] text-muted flex items-center gap-1"><Clock className="w-3 h-3" />{ann.date}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors">{ann.title}</h3>

                    <AnimatePresence>
                      {selected === ann.id && (
                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-sm text-white/70 mt-3 leading-relaxed overflow-hidden">
                          {ann.body}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-muted shrink-0 transition-transform ${selected === ann.id ? 'rotate-90' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
