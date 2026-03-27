"use client";

import { motion } from "framer-motion";
import { 
  Home, 
  Users, 
  Wifi, 
  Coffee, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  ArrowRight,
  Wind,
  Droplets,
  Activity
} from "lucide-react";

const boyHostels = [
  "Aravali", "Girnar", "Jwalamukhi", "Karakoram", "Kumaon", 
  "Nilgiri", "Shivalik", "Satpura", "Udaigiri", "Vindhyachal", "Zanskar"
];

const girlHostels = [
  "Kailash", "Himadri", "Sahyadri (ESTD 2023)"
];

const facilities = [
  { icon: Coffee, title: "Mess Facilities", desc: "Healthy vegetarian standard meals with optional non-veg separate units." },
  { icon: Wifi, title: "Connectivity", desc: "High-speed Wi-Fi and LAN available in every room, 24/7." },
  { icon: ShieldCheck, title: "24/7 Security", desc: "Monitored premises with regulated entry/exit for student safety." },
  { icon: Activity, title: "Recreation", desc: "Gyms, badminton courts, and common rooms with indoor games." },
  { icon: Droplets, title: "Laundry", desc: "Dedicated washing machines and drying areas in all hostels." },
  { icon: Home, title: "Furnished Rooms", desc: "Equipped with beds, study tables, chairs, and spacious almirahs." },
];

export default function HostelsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest"
          >
            <Home className="w-3 h-3" />
            Residential Life at IIT Delhi
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white font-bold tracking-tight"
          >
            Your Home Away <br /> <span className="text-gold">From Home</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            IIT Delhi provides high-quality on-campus accommodation through 13 Boys' and 3 Girls' hostels, 
            designed to foster community, excellence, and security.
          </motion.p>
        </div>

        {/* Hostel List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Boys' Hostels */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2.5rem] border border-white/5 bg-secondary/30 backdrop-blur-xl relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-gold/10 transition-colors" />
            <h3 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center text-gold">👨‍🎓</span>
              Boys' Hostels
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {boyHostels.map((h, i) => (
                <motion.div 
                  key={h}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-300 text-sm font-medium hover:border-gold/30 hover:text-gold transition-all cursor-default"
                >
                  {h}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Girls' Hostels */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-[2.5rem] border border-white/5 bg-secondary/30 backdrop-blur-xl relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/10 transition-colors" />
            <h3 className="text-2xl font-serif text-white mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">👩‍🎓</span>
              Girls' Hostels
            </h3>
            <div className="space-y-3">
              {girlHostels.map((h, i) => (
                <motion.div 
                  key={h}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-slate-300 text-lg font-medium hover:border-pink-500/30 hover:text-pink-400 transition-all cursor-default flex justify-between items-center"
                >
                  {h}
                  <ArrowRight className="w-5 h-5 text-slate-600" />
                </motion.div>
              ))}
              <div className="pt-4 mt-4 border-t border-white/5">
                <p className="text-xs text-muted uppercase tracking-widest font-bold mb-3">PG & Special Accommodation</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold">Dronagiri (PG)</span>
                  <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold">Saptagiri (Co-ed/PG)</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Features & Amenities */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-white font-bold">Unparalleled Facilities</h2>
            <p className="text-slate-500 mt-2">Comprehensive support systems for a seamless academic journey.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((f, i) => (
              <motion.div 
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-3xl border border-white/5 bg-secondary/20 hover:border-gold/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gold/10 group-hover:border-gold/20 transition-all">
                  <f.icon className="w-6 h-6 text-gold/60 group-hover:text-gold transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{f.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Details & Tenure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="space-y-8"
           >
              <h3 className="text-3xl font-serif text-white font-bold">Key Enrollment Details</h3>
              <div className="space-y-6">
                 {[
                   { label: "Accommodation Tenure", value: "8 Semesters (UG) / 10 Semesters (Integrated)", icon: Calendar },
                   { label: "Room Configuration", value: "Multi-seater (Initial), Single (Senior Years)", icon: Users },
                   { label: "Access Security", value: "24-Hour Regulated Entry with RFID support", icon: ShieldCheck },
                   { label: "Break Policies", rooms: "Storage available during vacation periods", icon: Zap },
                 ].map((detail, i) => (
                   <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] transition-all">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                         <detail.icon className="w-5 h-5 text-gold/60" />
                      </div>
                      <div>
                         <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">{detail.label}</p>
                         <p className="text-white font-medium mt-1">{detail.value || detail.rooms}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </motion.div>

           {/* Financial Overview */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="p-10 rounded-[3rem] border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-3xl relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-3xl font-serif text-white font-bold mb-8 flex items-center gap-3">
                 <CreditCard className="w-8 h-8 text-emerald-400" />
                 Fee Structure
              </h3>
              
              <div className="space-y-8 relative z-10">
                 <div className="flex justify-between items-end border-b border-white/10 pb-6">
                    <div>
                       <p className="text-sm text-emerald-400/80 uppercase font-bold tracking-widest">Semester Rent</p>
                       <p className="text-4xl font-bold text-white mt-2">₹ 8,600 — 23,600</p>
                    </div>
                    <span className="text-xs text-muted leading-relaxed text-right max-w-[120px]">Depending on Old/New Hostel Blocks</span>
                 </div>

                 <div className="flex justify-between items-end border-b border-white/10 pb-6">
                    <div>
                       <p className="text-sm text-cyan-400/80 uppercase font-bold tracking-widest">Mess Charges</p>
                       <p className="text-4xl font-bold text-white mt-2">≈ ₹ 36,000</p>
                    </div>
                    <span className="text-xs text-muted leading-relaxed text-right max-w-[120px]">Standard Semester Boarding</span>
                 </div>

                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                       "Total per-semester expenditure typically ranges from ₹ 40,000 to ₹ 60,000. 
                       Final fees are subject to revision by the Board of Hostel Management (BHM) - IIT Delhi."
                    </p>
                 </div>
              </div>
           </motion.div>
        </div>

      </div>
    </div>
  );
}
