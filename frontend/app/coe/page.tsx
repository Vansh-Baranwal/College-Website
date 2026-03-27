"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Building, 
  Stethoscope, 
  Zap, 
  CloudRain, 
  Leaf, 
  Accessibility, 
  Cpu, 
  Layers, 
  Search, 
  FlaskConical, 
  ShieldCheck, 
  ExternalLink 
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0, 
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" }
  })
};

const coeData = [
  {
    title: "AI in Healthcare",
    established: "June 2025",
    desc: "A joint initiative with AIIMS Delhi focusing on AI-based solutions for national health programs, including cancer care and maternal health.",
    icon: Stethoscope,
    color: "rose"
  },
  {
    title: "Regulatory Affairs (Power)",
    established: "January 2026",
    desc: "Launched by the Ministry of Power, this CoE acts as a national hub for regulatory research and capacity building in the energy sector.",
    icon: Zap,
    color: "amber"
  },
  {
    title: "Climate & Air Pollution",
    established: "Arun Duggal CoE",
    desc: "Focuses on monitoring and researching air quality and climate patterns to provide data-driven policy recommendations.",
    icon: CloudRain,
    color: "blue"
  },
  {
    title: "Energy and Environment",
    established: "ReNew CoE",
    desc: "Works on clean energy solutions, including EV charging infrastructure and grid strengthening for renewable integration.",
    icon: Leaf,
    color: "emerald"
  },
  {
    title: "Disability Tech (CARE-DAT)",
    established: "Joint with AIIMS",
    desc: "Funded by ICMR to design technological and therapeutic solutions for neurorehabilitation and assistive devices.",
    icon: Accessibility,
    color: "purple"
  },
  {
    title: "Quantum Technology",
    established: "Govt. Supported",
    desc: "Focusing on advancements in quantum computing, cryptography, and related disruptive technologies.",
    icon: Cpu,
    color: "cyan"
  },
  {
    title: "Smart Textiles",
    established: "SMITA Lab",
    desc: "Serves as a CoE for developing functional and next-generation smart textile materials.",
    icon: Layers,
    color: "indigo"
  }
];

const researchHubs = [
  {
    name: "Applied Research in Electronics (CARE)",
    specialty: "Microelectronics, RF devices, and signal processing.",
    icon: Search
  },
  {
    name: "Research and Innovation Park",
    specialty: "Dedicated facility bridging campus projects with industry (DRDO, ICMR).",
    icon: Building
  },
  {
    name: "Cyber Security Hub",
    specialty: "Hosts national initiatives like eRaksha Hackathon for secure digital ecosystems.",
    icon: ShieldCheck
  }
];

function CoECard({ coe, index }: { coe: any; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp as any}
      whileHover={{ y: -10 }}
      className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-xl group relative overflow-hidden h-full flex flex-col"
    >
      <div className={`p-4 rounded-2xl bg-${coe.color}-500/10 border border-${coe.color}-500/20 w-fit mb-6 transition-colors group-hover:bg-${coe.color}-500/20`}>
        <coe.icon className={`w-8 h-8 text-${coe.color}-500`} />
      </div>
      <div className="flex-1">
        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-2">{coe.established}</div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold transition-colors">{coe.title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed">{coe.desc}</p>
      </div>
      <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
        <button className="text-slate-500 hover:text-white transition-colors">
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>
      <div className={`absolute top-0 right-0 w-24 h-24 bg-${coe.color}-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
    </motion.div>
  );
}

export default function CoEPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black/40 pb-32">
      {/* Background Blobs */}
      <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 z-20">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest mb-8"
          >
            <FlaskConical className="w-4 h-4" />
            Research Excellence 2026
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tighter"
          >
            Centres of <span className="text-gold italic">Excellence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 text-xl max-w-3xl mx-auto leading-relaxed"
          >
            IIT Delhi hosts over 30 specialized centres driving the frontiers of global research and national innovation.
          </motion.p>
        </div>
      </section>

      {/* COE Grid */}
      <section className="relative z-20 mt-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coeData.map((coe, i) => (
              <CoECard key={coe.title} coe={coe} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Other Research Hubs */}
      <section className="relative z-20 mt-40">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Other Key <span className="text-gold italic">Research Hubs</span></h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {researchHubs.map((hub, i) => (
              <motion.div
                key={hub.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.05)" }}
                className="p-8 rounded-[2rem] border border-white/10 bg-black/30 backdrop-blur-md group transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <hub.icon className="w-6 h-6 text-slate-400 group-hover:text-gold" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{hub.name}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{hub.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
