"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldAlert, Scale, Gavel, UserX, Building2, PhoneCall, AlertTriangle, Info, Clock, ExternalLink } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const cardStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

function SectionHeader({ title, subtitle, icon: Icon }: SectionHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp as any}
      className="mb-12"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20">
          <Icon className="w-8 h-8 text-rose-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">{title}</h2>
      </div>
      <p className="text-slate-200 text-lg border-l-2 border-rose-500/30 pl-6 max-w-3xl">{subtitle}</p>
    </motion.div>
  );
}

export default function AntiraggingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-black/40">
      {/* Background Accents */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-0 left-0 w-full h-[150vh] pointer-events-none z-0"
      >
        <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-rose-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] -right-[10%] w-[600px] h-[600px] bg-red-600/5 blur-[150px] rounded-full" />
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-rose-900/5 blur-[200px] rounded-full" />
      </motion.div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 z-20">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <ShieldAlert className="w-4 h-4" />
            Zero Tolerance Policy
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 tracking-tighter"
          >
            Menace of <span className="text-rose-600 italic">Ragging</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-slate-200 text-xl max-w-2xl mx-auto mb-12"
          >
            IIT Delhi enforces a strict Zero Tolerance Policy. Every act of physical, mental, or emotional abuse is heavily punishable by law.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-6"
          >
             <div className="flex flex-col items-center">
               <div className="text-rose-500 font-mono text-3xl font-bold">1800-180-5522</div>
               <div className="text-slate-500 text-xs uppercase tracking-widest mt-1">National Helpline</div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="container mx-auto max-w-6xl px-6 pb-32 space-y-40 relative z-20">
        
        {/* Section 1: UGC Regulations */}
        <section>
          <SectionHeader 
            title="1. UGC Anti-Ragging Regulations" 
            subtitle="The primary law governing India's Higher Educational Institutions since 2009."
            icon={Scale}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <motion.div 
               whileHover={{ y: -5 }}
               className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden group"
             >
                <div className="absolute top-0 left-0 w-2 h-full bg-rose-500 opacity-50" />
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-rose-500" />
                  Key Definitions
                </h3>
                <p className="text-slate-200 mb-6 leading-relaxed">
                  Ragging includes any act of physical, mental, emotional, or sexual abuse, including:
                </p>
                <ul className="space-y-4">
                   {[
                     "Teasing, bullying, or humiliation",
                     "Forcing juniors to perform embarrassing acts",
                     "Verbal abuse or threats of physical violence",
                     "Applies to all campuses, hostels, and online spaces"
                   ].map((item, i) => (
                     <li key={i} className="flex gap-4 text-sm text-white/90">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5" />
                        {item}
                     </li>
                   ))}
                </ul>
             </motion.div>

             <motion.div 
               whileHover={{ y: -5 }}
               className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-xl relative overflow-hidden group"
             >
                <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500 opacity-50" />
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-cyan-500" />
                  Mandatory Rules
                </h3>
                <ul className="space-y-4">
                   {[
                     "Anti-ragging committees & squads are mandatory",
                     "Affidavits from students + parents at intake",
                     "Intensive monitoring of freshers' hostels",
                     "Compulsory FIR filing for serious cases"
                   ].map((item, i) => (
                     <li key={i} className="flex gap-4 text-sm text-white/90">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5" />
                        {item}
                     </li>
                   ))}
                </ul>
             </motion.div>
          </div>
        </section>

        {/* Section 2: Supreme Court Directives */}
        <section>
          <SectionHeader 
            title="2. Supreme Court Directives" 
            subtitle="The judiciary's hard stance that forced national institutional compliance."
            icon={Gavel}
          />
          <div className="relative p-10 rounded-[3rem] bg-gradient-to-br from-rose-950/20 to-black/40 border border-rose-500/10 overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/10 blur-3xl rounded-full" />
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                   <div className="text-rose-500 font-serif text-3xl font-bold mb-2">1999</div>
                   <p className="text-xs text-white/60 uppercase tracking-widest mb-4">Vishwa Jagriti Case</p>
                   <p className="text-sm text-slate-200">First major stance by SCO taking strong measures against institutional negligence.</p>
                </div>
                <div>
                   <div className="text-rose-500 font-serif text-3xl font-bold mb-2">2001-07</div>
                   <p className="text-xs text-white/60 uppercase tracking-widest mb-4">Guidelines Issued</p>
                   <p className="text-sm text-slate-200">Multiple comprehensive guidelines forcing colleges to take immediate, non-negotiable action.</p>
                </div>
                <div>
                   <div className="text-rose-500 font-serif text-3xl font-bold mb-2">2009+</div>
                   <p className="text-xs text-white/60 uppercase tracking-widest mb-4">Strict Enforcement</p>
                   <p className="text-sm text-slate-200">Failure by institutional heads to manage ragging became a punishable departmental offense.</p>
                </div>
             </div>
          </div>
        </section>

        {/* Section 3: Criminal Laws */}
        <section>
          <SectionHeader 
            title="3. Criminal Laws (IPC Sections)" 
            subtitle="Understand that ragging isn't just a 'campus issue.' It's a criminal offense."
            icon={AlertTriangle}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {[
               { code: "IPC 294", label: "Obscene acts", desc: "Using vulgar gestures or songs." },
               { code: "IPC 323", label: "Causing hurt", desc: "Physical assault or violence." },
               { code: "IPC 341", label: "Wrongful restraint", desc: "Blocking free movement." },
               { code: "IPC 354", label: "Assault on Women", desc: "Gender-based harassment." },
               { code: "IPC 506", label: "Intimidation", desc: "Threatening life or safety." },
               { code: "IPC 306", label: "Abetment", desc: "Pushing to extreme measures." },
             ].map((ipc, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ scale: 1.05, backgroundColor: "rgba(225, 29, 72, 0.1)" }}
                 className="p-6 rounded-3xl border border-white/20 bg-black/60 backdrop-blur-md flex flex-col items-center text-center group transition-colors"
               >
                  <div className="text-rose-500 font-bold mb-1">{ipc.code}</div>
                  <div className="text-white text-sm font-medium mb-3">{ipc.label}</div>
                  <div className="text-xs text-slate-200">{ipc.desc}</div>
               </motion.div>
             ))}
          </div>
        </section>

        {/* Section 4 & 5: Punishments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <section>
              <div className="flex items-center gap-3 mb-8">
                 <UserX className="w-6 h-6 text-rose-500" />
                 <h3 className="text-2xl font-serif font-bold text-white">For Students</h3>
              </div>
              <div className="space-y-4">
                 {["Immediate Suspension from classes", "Expulsion from the Institution", "Debarment from taking examinations", "Rustication for a specific period", "Hostel expulsion & scholarship cancellation", "Police FIR filing & Immediate Arrest"].map((p, i) => (
                   <motion.div key={i} whileHover={{ x: 10 }} className="flex gap-4 p-4 rounded-2xl bg-black/40 border border-white/10 text-sm text-slate-200 group hover:border-rose-500/30 transition-all">
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                      {p}
                   </motion.div>
                 ))}
              </div>
           </section>

           <section>
              <div className="flex items-center gap-3 mb-8">
                 <Building2 className="w-6 h-6 text-rose-500" />
                 <h3 className="text-2xl font-serif font-bold text-white">For Institutions</h3>
              </div>
              <div className="p-8 rounded-[2rem] border border-rose-500/20 bg-rose-500/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl" />
                 <p className="text-slate-200 mb-8 font-medium">If the college fails to act or ignores a report:</p>
                 <div className="space-y-6">
                    <div className="flex gap-5">
                       <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
                          <DollarSign className="w-6 h-6 text-rose-500" />
                       </div>
                       <div>
                          <h4 className="text-white font-bold">UGC Funding Halt</h4>
                          <p className="text-xs text-slate-500">Categorical cut in research & development funds.</p>
                       </div>
                    </div>
                    <div className="flex gap-5">
                       <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
                          <Building2 className="w-6 h-6 text-rose-500" />
                       </div>
                       <div>
                          <h4 className="text-white font-bold">Affiliation Withdrawal</h4>
                          <p className="text-xs text-slate-500">Removal of recognition by regulatory boards.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </section>
        </div>

        {/* Section 6: Helpline Banner */}
        <section className="relative">
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="p-12 rounded-[3.5rem] bg-gradient-to-r from-rose-600 to-rose-700 text-white text-center shadow-[0_40px_100px_rgba(225,29,72,0.3)] relative overflow-hidden"
           >
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
              <PhoneCall className="w-16 h-16 mx-auto mb-8 animate-bounce" />
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">National Anti-Ragging Helpline</h2>
              <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">Available 24/7. Your call can be anonymous. Immediate action guaranteed within institutions.</p>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                 <div className="px-10 py-5 bg-white text-rose-600 rounded-3xl text-3xl font-bold font-mono">
                    1800-180-5522
                 </div>
                 <a href="https://www.antiragging.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white font-bold hover:underline">
                    Report Online <ExternalLink className="w-4 h-4" />
                 </a>
              </div>
           </motion.div>
        </section>

      </div>
    </div>
  );
}

function DollarSign(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
}
