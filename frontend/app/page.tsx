"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { Search, Sparkles, GraduationCap, Users, Trophy, BookOpen, Building, Brain, Calendar, Shield, ArrowRight } from "lucide-react";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";

// ─── ANIMATION VARIANTS ───
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const }
  })
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: (delay: number) => ({
    opacity: 1, scale: 1,
    transition: { duration: 1, delay, type: "spring" as const, stiffness: 120, damping: 14 }
  })
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.5 } }
};

const wordVariant = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: "easeOut" as const } }
};

const buttonSpring = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: (delay: number) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { delay, type: "spring" as const, stiffness: 200, damping: 15 }
  })
};

// ─── PARTICLE SYSTEM ───
function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.6 + 0.3,
      hue: Math.random() > 0.7 ? '34,211,238' : '245,158,11', // cyan or amber
    })), []);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(${p.hue},${p.opacity}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${p.size * 4}px rgba(${p.hue},${p.opacity * 0.5})`,
            filter: `blur(${p.size > 3 ? 1 : 0}px)`,
          }}
          initial={{ y: `${p.y + 10}vh`, opacity: 0 }}
          animate={{
            y: [`${p.y + 10}vh`, `-5vh`],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

// ─── ANIMATED WORDS ───
function AnimatedWords({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span variants={staggerContainer} initial="hidden" animate="visible" className={`inline-flex flex-wrap justify-center gap-x-[0.3em] ${className}`}>
      {text.split(" ").map((word, i) => (
        <motion.span key={i} variants={wordVariant} className="inline-block">{word}</motion.span>
      ))}
    </motion.span>
  );
}

// ─── COUNTING NUMBER ANIMATION ───
function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── MAGNETIC BUTTON ───
function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(px * 0.3);
    y.set(py * 0.3);
  }, [x, y]);

  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const isExternal = href.startsWith("http");
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={reset} className={className}>
      <Link 
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    </motion.div>
  );
}

// ─── TILT CARD ───
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const srx = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const sry = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -15);
    rotateY.set(px * 15);
  }, [rotateX, rotateY]);

  const reset = useCallback(() => { rotateX.set(0); rotateY.set(0); }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`${className} transform-gpu`}
    >
      {children}
    </motion.div>
  );
}

// ─── MAIN PAGE ───
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 50, damping: 30 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const contentX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const contentY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const btnX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const btnY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  // Scroll-driven background
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const [searchFocused, setSearchFocused] = useState(false);

  const stats = [
    { value: 950, suffix: "+", label: "Faculty Members", icon: Users },
    { value: 12000, suffix: "+", label: "Students", icon: GraduationCap },
    { value: 95, suffix: "%", label: "Placement Rate", icon: Trophy },
    { value: 300, suffix: "+", label: "Research Papers / yr", icon: BookOpen },
  ];

  const features = [
    { title: "Virtual Tour", desc: "Experience the campus in 360° from your browser", icon: Building, href: "https://360-degree-nine.vercel.app/", gradient: "from-blue-500/20 to-indigo-500/20" },
    { title: "AI Chat Assistant", desc: "Ask anything about campus, courses, or events", icon: Brain, href: "/chat", gradient: "from-gold/20 to-orange-500/20" },
    { title: "Events Hub", desc: "Rendezvous, Tryst, hackathons, and 100+ events yearly", icon: Calendar, href: "/events", gradient: "from-green-500/20 to-emerald-500/20" },
    { title: "Digital ID", desc: "Secure QR-based campus ID with rotating codes", icon: Shield, href: "/id", gradient: "from-purple/20 to-violet-500/20" },
    { title: "Course Catalog", desc: "Browse 300+ courses across all departments", icon: BookOpen, href: "/courses", gradient: "from-red-500/20 to-rose-500/20" },
    { title: "Placements", desc: "Avg package ₹22L — top recruiters from FAANG+", icon: Trophy, href: "/placement", gradient: "from-cyan-500/20 to-teal-500/20" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* ═══════ HERO SECTION ═══════ */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
        {/* Vignette */}
        <motion.div className="absolute inset-0 z-[15] pointer-events-none" style={{ opacity: bgOpacity, boxShadow: "inset 0 0 100px 40px rgba(3,7,18,0.7)" }} />
        {/* Gradient overlays — soft fade at bottom, no hard cutoff */}
        <div className="absolute inset-0 z-[12] pointer-events-none bg-gradient-to-b from-primary/60 via-transparent to-primary/70" />
        <div className="absolute inset-0 z-[11] pointer-events-none bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
        {/* Grid */}
        <div className="absolute inset-0 z-[11] pointer-events-none opacity-[0.07]"
          style={{ backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

        {/* Morphing Blobs */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] z-[9] pointer-events-none opacity-40">
          <div className="w-full h-full bg-gradient-to-br from-amber-500/30 to-orange-600/20 rounded-full blur-[80px] animate-blob" />
        </div>
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] z-[9] pointer-events-none opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-cyan-500/25 to-blue-600/15 rounded-full blur-[80px] animate-blob2" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] z-[8] pointer-events-none opacity-15">
          <div className="w-full h-full bg-gradient-to-br from-emerald-500/30 to-teal-500/20 rounded-full blur-[100px] animate-blob" />
        </div>

        <ParticleField />

        {/* Hero Content */}
        <motion.div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4" style={{ x: contentX, y: contentY }}>
          {/* Badge */}
          <motion.div variants={fadeInUp} custom={0.2} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-amber-400 text-sm font-medium mb-8 shadow-[0_0_25px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-4 h-4" />
            Ranked #1 in India — NIRF 2024
          </motion.div>

          {/* Logo */}
          <motion.div variants={scaleIn} custom={0.3} initial="hidden" animate="visible" className="mb-6 relative">
            <motion.div className="absolute -inset-6 bg-amber-500/15 blur-3xl rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
            <img src="/logo.png" alt="IIT Delhi Seal" className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10 filter brightness-0 invert drop-shadow-[0_0_25px_rgba(245,158,11,0.5)]" />
          </motion.div>

          {/* Heading */}
          <motion.h1 className="font-sans text-5xl md:text-8xl font-bold mb-6 tracking-tighter leading-[1.05]">
            <span className="text-white block mb-1" style={{ textShadow: "0 0 60px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.5)" }}>
              <AnimatedWords text="Indian Institute of" />
            </span>
            <motion.span variants={staggerContainer} initial="hidden" animate="visible" className="inline-flex flex-wrap justify-center gap-x-[0.25em]">
              {["Technology", "Delhi"].map((word, i) => (
                <motion.span key={i} variants={wordVariant}>
                  <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-[length:200%_100%] text-transparent bg-clip-text animate-shimmer">{word}</span>
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          {/* Search Bar */}
          <motion.div variants={fadeInUp} custom={0.9} initial="hidden" animate="visible" className="w-full max-w-xl mx-auto mb-14 mt-6 relative">
            <motion.div
              animate={{ boxShadow: searchFocused ? "0 0 40px 8px rgba(245,158,11,0.2), 0 0 80px 20px rgba(34,211,238,0.08)" : "0 0 20px 4px rgba(245,158,11,0.06)", scale: searchFocused ? 1.02 : 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl"
            >
              <form action="/chat" className="relative group">
                <input type="text" name="q" placeholder="Ask AI anything about the campus..."
                  onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
                  className="w-full bg-white/[0.06] border border-white/[0.12] rounded-2xl py-4 pl-6 pr-14 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.1] transition-all duration-500 backdrop-blur-xl shadow-2xl text-base" />
                <motion.button title="Search" type="submit" whileHover={{ scale: 1.15, backgroundColor: "#f59e0b" }} whileTap={{ scale: 0.9 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-amber-500/20 text-amber-400 rounded-xl hover:text-black transition-colors duration-300 shadow-lg">
                  <Search className="w-5 h-5" />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Buttons */}
          <motion.div style={{ x: btnX, y: btnY }} className="flex flex-col sm:flex-row gap-5">
            <MagneticButton href="https://360-degree-nine.vercel.app/" className="relative group">
              <motion.div variants={buttonSpring} custom={1.1} initial="hidden" animate="visible">
                <motion.div className="absolute -inset-[2px] rounded-2xl blur-md opacity-70" style={{ background: "conic-gradient(from 0deg, #f59e0b, #fbbf24, #f97316, #f59e0b)" }} animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
                <div className="relative flex items-center justify-center px-10 py-4 bg-[#0a0f1c] rounded-2xl leading-none overflow-hidden border border-amber-500/20">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <span className="relative text-amber-400 font-semibold text-sm tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">Explore Campus</span>
                </div>
              </motion.div>
            </MagneticButton>

            <MagneticButton href="/dashboard" className="relative group">
              <motion.div variants={buttonSpring} custom={1.2} initial="hidden" animate="visible">
                <motion.div className="absolute -inset-[2px] rounded-2xl blur-md opacity-70" style={{ background: "conic-gradient(from 0deg, #22d3ee, #818cf8, #a78bfa, #22d3ee)" }} animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />
                <div className="relative flex items-center justify-center px-10 py-4 bg-[#0a0f1c] rounded-2xl leading-none overflow-hidden border border-cyan-500/20">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                  <span className="relative text-cyan-400 font-semibold text-sm tracking-[0.2em] uppercase group-hover:text-white transition-colors duration-300">Student Portal</span>
                </div>
              </motion.div>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Scroll</motion.span>
          <div className="w-[1.5px] h-20 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div className="w-full bg-gradient-to-b from-gold to-transparent absolute top-0 left-0" style={{ width: "100%" }}
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          </div>
        </div>
      </section>

      {/* ═══════ SCROLL PROGRESS BAR ═══════ */}
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-amber-500 z-[100] origin-left" style={{ scaleX: scrollYProgress }} />

      {/* ═══════ STATS SECTION ═══════ */}
      <section className="relative py-24 -mt-20 overflow-hidden">
        {/* Morphing blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-10">
          <div className="w-full h-full bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full blur-[100px] animate-blob" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-sans font-bold text-white mb-4 tracking-tight">
              The Numbers <span className="bg-gradient-to-r from-amber-400 to-yellow-300 text-transparent bg-clip-text">Speak</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-lg mx-auto">India&apos;s premier institution, producing world-class talent since 1961.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <TiltCard key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative group p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl text-center hover:border-amber-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.08)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-4 relative z-10" />
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono relative z-10">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-slate-500 text-sm relative z-10">{stat.label}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FEATURES GRID ═══════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-15">
          <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full blur-[100px] animate-blob2" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-sans font-bold text-white mb-4 tracking-tight">
              Explore <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Campus OS</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-lg mx-auto">Every tool a student needs, in one premium platform.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <TiltCard key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={feature.href} 
                    target={feature.href.startsWith("http") ? "_blank" : undefined}
                    rel={feature.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="block relative group p-8 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl hover:border-amber-500/20 transition-all duration-500 hover:shadow-[0_0_40px_rgba(245,158,11,0.06)] overflow-hidden h-full"
                  >
                    {/* Hover reveal gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-5 group-hover:border-amber-500/30 group-hover:bg-amber-500/10 transition-all duration-500">
                        <feature.icon className="w-7 h-7 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">{feature.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4">{feature.desc}</p>
                      
                      {/* Hover reveal arrow */}
                      <div className="flex items-center gap-2 text-amber-400 text-sm font-medium opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Explore <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DIRECTOR SECTION ═══════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gold/10 blur-2xl rounded-[3rem] animate-pulse" />
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-square md:aspect-auto md:h-[500px] group shadow-2xl">
                <img 
                  src="/director.png" 
                  alt="Professor RANGAN BANERJEE" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                  <p className="text-gold font-mono text-xs uppercase tracking-[0.3em] font-bold mb-1">Director, IIT Delhi</p>
                  <h3 className="text-white text-2xl font-bold tracking-tight">Prof. Rangan Banerjee</h3>
                </div>
              </div>
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hidden md:block"
              >
                <div className="text-gold font-bold text-lg mb-1">Expert in</div>
                <div className="text-white/60 text-xs uppercase tracking-widest font-medium leading-none">Energy Systems</div>
              </motion.div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-sans font-bold text-white tracking-tighter leading-tight">
                  Message from the <br/>
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-300 text-transparent bg-clip-text">Director</span>
                </h2>
                <div className="w-20 h-1 bg-gold rounded-full" />
              </div>

              <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light italic">
                <p>
                  &quot;Innovation at IIT Delhi is not just about technology; it&apos;s about creating a sustainable future and empowering the next generation of global leaders.&quot;
                </p>
                <p className="not-italic text-slate-400 text-base">
                  Professor Rangan Banerjee is a world-renowned expert in Energy Systems and has been a driving force in renewable energy research and policy integration in India. Under his leadership, IIT Delhi continues to scale new heights in global research rankings and industry collaborations.
                </p>
              </div>

              <div className="pt-4">
                <div className="flex flex-wrap gap-4">
                  {["Energy Systems", "Policy Planning", "Sustainable Dev", "R&D Strategy"].map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] uppercase tracking-widest font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA SECTION ═══════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.03] to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] to-cyan-500/[0.02]" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight">
                Ready to experience <br/>
                <span className="bg-gradient-to-r from-amber-400 to-cyan-400 text-transparent bg-clip-text animate-gradient">Campus OS</span>?
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">Login to your dashboard and explore the future of campus life.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton href="/dashboard" className="relative group">
                  <div className="px-10 py-4 bg-amber-500 rounded-2xl font-bold text-black text-base hover:bg-amber-400 transition-colors shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] tracking-wide">
                    Open Dashboard
                  </div>
                </MagneticButton>
                <MagneticButton href="/chat" className="relative group">
                  <div className="px-10 py-4 border border-white/[0.15] rounded-2xl font-bold text-white text-base hover:bg-white/10 transition-colors backdrop-blur-sm tracking-wide">
                    Try AI Chat
                  </div>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

