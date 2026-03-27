"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { 
  Trophy, 
  MapPin, 
  Users, 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  TrendingUp, 
  Clock, 
  Compass, 
  Target 
} from "lucide-react";

// --- COUNTING NUMBER ANIMATION ---
function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useTransform(useScroll().scrollYProgress, [0, 1], [0, 1]); // Simplified for example

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [target]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-black/40 pb-32">
      {/* Background Gradients */}
      <div className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] -left-[10%] w-[600px] h-[600px] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 z-20 text-center">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-gold/40 bg-gold/10 text-gold text-sm font-bold uppercase tracking-[0.2em] mb-12"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
            Institute of Eminence
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-serif font-bold text-white mb-8 tracking-tighter"
          >
            Legacy of <br/> <span className="text-gold italic">Excelence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-xl max-w-2xl mx-auto leading-relaxed border-l-2 border-gold/30 pl-8 text-left italic"
          >
            Consistently leading the global technical educational landscape as one of India&apos;s most prestigious research and engineering hubs.
          </motion.p>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 text-slate-500 uppercase tracking-widest text-[10px] font-bold"
        >
          Discover Platform
        </motion.div>
      </section>

      {/* Rankings Section */}
      <section className="relative z-20 py-40">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "NIRF Engineering", rank: 2, icon: Trophy, suffix: "nd" },
              { label: "Research Rank (India)", rank: 2, icon: TrendingUp, suffix: "nd" },
              { label: "QS World Rank", rank: 150, icon: GraduationCap, suffix: "" },
              { label: "Global Employer Rep", rank: 44, icon: Users, suffix: "th" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[3rem] bg-black/50 border border-white/10 backdrop-blur-xl group hover:border-gold/30 transition-colors text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-gold/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-gold" />
                </div>
                <div className="text-5xl font-bold text-white mb-2">
                   #{stat.rank}{stat.suffix}
                </div>
                <div className="text-slate-500 text-xs uppercase tracking-widest font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions & Campus */}
      <section className="relative z-20 py-20 px-6">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-12"
           >
              <div className="space-y-4">
                 <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">Admissions <span className="text-gold italic">Pathway</span></h2>
                 <p className="text-slate-400 text-lg max-w-lg">Entrance to IIT Delhi is an elite milestone achieved only by the top academic percentile of the nation.</p>
              </div>

              <div className="space-y-6">
                 {[
                   { program: "B.Tech", pathway: "JEE Advanced (via-JEE Main Qualification)", icon: Target },
                   { program: "M.Tech", pathway: "GATE Scorecard & National Counseling", icon: Compass },
                   { program: "M.Sc", pathway: "JAM (Joint Admission test for Masters)", icon: BookOpen },
                   { program: "MBA", pathway: "CAT (Common Admission Test)", icon: Clock }
                 ].map((adm, i) => (
                   <motion.div 
                     key={i} 
                     whileHover={{ x: 10 }}
                     className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 group hover:border-gold/20 transition-all"
                   >
                      <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                         <adm.icon className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                         <h4 className="text-white font-bold text-lg">{adm.program}</h4>
                         <p className="text-slate-500 text-sm">{adm.pathway}</p>
                      </div>
                   </motion.div>
                 ))}
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative p-12 rounded-[4rem] border border-gold/10 bg-gold/[0.03] overflow-hidden"
           >
              <div className="absolute top-0 right-0 p-8">
                 <MapPin className="w-12 h-12 text-gold opacity-30" />
              </div>
              <h3 className="text-3xl font-serif font-bold text-white mb-8">Infrastructure <br/><span className="text-gold italic">& Geography</span></h3>
              <div className="space-y-8">
                 <div>
                    <div className="text-5xl font-bold text-white mb-1">325+</div>
                    <div className="text-gold text-xs uppercase tracking-widest font-bold">Acres of Intellectual Hub in Hauz Khas</div>
                 </div>
                 <p className="text-slate-400 leading-relaxed italic border-l-2 border-gold/20 pl-6">
                   &quot;A lush, sprawling ecosystem in South Delhi serving as a landmark for innovation, research brilliance, and sustainable development since 1961.&quot;
                 </p>
                 <div className="flex gap-4">
                    <div className="px-6 py-4 rounded-3xl bg-black/40 border border-white/10 flex-1">
                       <div className="text-white font-bold text-xl">16</div>
                       <div className="text-slate-600 text-[10px] uppercase font-bold tracking-tight">Academic Depts</div>
                    </div>
                    <div className="px-6 py-4 rounded-3xl bg-black/40 border border-white/10 flex-1">
                       <div className="text-white font-bold text-xl">30+</div>
                       <div className="text-slate-600 text-[10px] uppercase font-bold tracking-tight">Research Centres</div>
                    </div>
                 </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gold/5 blur-3xl rounded-full" />
           </motion.div>
        </div>
      </section>
    </div>
  );
}
