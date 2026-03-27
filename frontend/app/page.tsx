"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";

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
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.5 + 0.2,
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
            background: `radial-gradient(circle, rgba(201,168,76,${p.opacity}) 0%, transparent 70%)`,
            boxShadow: `0 0 ${p.size * 3}px rgba(201,168,76,${p.opacity * 0.5})`,
            filter: `blur(${p.size > 2.5 ? 1 : 0}px)`,
          }}
          initial={{ y: `${p.y + 10}vh`, opacity: 0 }}
          animate={{
            y: [`${p.y + 10}vh`, `-5vh`],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// ─── ANIMATED WORD COMPONENT ───
function AnimatedWords({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span variants={staggerContainer} initial="hidden" animate="visible" className={`inline-flex flex-wrap justify-center gap-x-[0.3em] ${className}`}>
      {text.split(" ").map((word, i) => (
        <motion.span key={i} variants={wordVariant} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─── GOLD SHIMMER TEXT ───
function ShimmerText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-[length:200%_100%] text-transparent bg-clip-text animate-shimmer">
        {children}
      </span>
    </span>
  );
}

// ─── MAIN PAGE ───
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed parallax transforms
  const springConfig = { stiffness: 50, damping: 30 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax layers: content moves opposite to mouse
  const contentX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const contentY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const btnX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const btnY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden">

        {/* ── LAYER 1: Vignette Edges ── */}
        <div className="absolute inset-0 z-[15] pointer-events-none"
          style={{ boxShadow: "inset 0 0 150px 60px rgba(10,15,30,0.95)" }} />

        {/* ── LAYER 2: Gradient Overlays ── */}
        <div className="absolute inset-0 z-[12] pointer-events-none bg-gradient-to-b from-primary/80 via-transparent to-primary" />
        <div className="absolute inset-0 z-[11] pointer-events-none bg-gradient-to-t from-primary via-transparent to-transparent" />

        {/* ── LAYER 3: Grid Overlay ── */}
        <div className="absolute inset-0 z-[11] pointer-events-none opacity-[0.07]"
          style={{ backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

        {/* ── PARTICLES ── */}
        <ParticleField />

        {/* ── HERO CONTENT ── */}
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4"
          style={{ x: contentX, y: contentY }}
        >
          {/* 1. Badge */}
          <motion.div
            variants={fadeInUp} custom={0.2} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-md text-gold text-sm font-medium mb-8 shadow-[0_0_20px_rgba(201,168,76,0.1)]"
          >
            <Sparkles className="w-4 h-4" />
            Ranked #1 in India — NIRF 2024
          </motion.div>

          {/* 2. Logo */}
          <motion.div
            variants={scaleIn} custom={0.3} initial="hidden" animate="visible"
            className="mb-8 relative"
          >
            <motion.div
              className="absolute inset-0 bg-gold/30 blur-3xl rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <img
              src="/logo.png"
              alt="IIT Delhi Seal"
              className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10 filter brightness-0 invert opacity-90 drop-shadow-[0_0_30px_rgba(201,168,76,0.4)]"
            />
          </motion.div>

          {/* 3. Heading with word-by-word animation */}
          <motion.h1
            className="font-serif text-5xl md:text-7xl font-bold mb-4 tracking-tight leading-tight"
          >
            <span className="text-white block mb-3 drop-shadow-lg">
              <AnimatedWords text="Indian Institute of" />
            </span>
            <motion.span
              variants={staggerContainer} initial="hidden" animate="visible"
              className="inline-flex flex-wrap justify-center gap-x-[0.3em]"
            >
              {["Technology", "Delhi"].map((word, i) => (
                <motion.span key={i} variants={wordVariant}>
                  <ShimmerText className="drop-shadow-lg">{word}</ShimmerText>
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          {/* 4. Subtext */}
          <motion.p
            variants={fadeInUp} custom={0.7} initial="hidden" animate="visible"
            className="text-muted text-lg md:text-xl max-w-2xl mt-4 mb-12 drop-shadow-md"
          >
            A complete, production-ready frontend university platform. Experience the future of campus OS.
          </motion.p>

          {/* 5. Search Bar */}
          <motion.div
            variants={fadeInUp} custom={0.9} initial="hidden" animate="visible"
            className="w-full max-w-xl mx-auto mb-14 relative"
          >
            <motion.div
              animate={{
                boxShadow: searchFocused
                  ? "0 0 40px 8px rgba(201,168,76,0.25), 0 0 80px 15px rgba(201,168,76,0.1)"
                  : "0 0 15px 2px rgba(201,168,76,0.08)",
                scale: searchFocused ? 1.02 : 1,
              }}
              transition={{ duration: 0.4 }}
              className="rounded-full"
            >
              <form action="/chat" className="relative group">
                <input
                  type="text"
                  name="q"
                  placeholder="Ask AI anything about the campus..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full bg-white/5 border border-white/15 rounded-full py-4 pl-6 pr-14 text-white placeholder-white/35 focus:outline-none focus:border-gold/60 focus:bg-white/10 transition-all duration-500 backdrop-blur-md shadow-xl"
                />
                <motion.button
                  title="Search" type="submit"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-gold/20 text-gold rounded-full hover:bg-gold hover:text-primary transition-colors duration-300"
                >
                  <Search className="w-5 h-5" />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* 6. Buttons */}
          <motion.div
            style={{ x: btnX, y: btnY }}
            className="flex flex-col sm:flex-row gap-6"
          >
            {/* Explore Campus Button */}
            <motion.div
              variants={buttonSpring} custom={1.1} initial="hidden" animate="visible"
              whileHover={{ scale: 1.07, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-gold via-yellow-500 to-orange-500 rounded-full blur-lg"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <Link href="/campus" className="relative flex items-center justify-center px-10 py-4 bg-black/90 rounded-full leading-none overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gold/40 to-orange-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <span className="relative text-gold font-bold text-lg tracking-wider group-hover:text-white transition-colors duration-300">EXPLORE CAMPUS</span>
                <motion.div
                  className="absolute inset-0 border-2 border-gold/40 rounded-full"
                  animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Link>
            </motion.div>

            {/* Student Portal Button */}
            <motion.div
              variants={buttonSpring} custom={1.2} initial="hidden" animate="visible"
              whileHover={{ scale: 1.07, y: -4, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <motion.div
                className="absolute -inset-1 rounded-full blur-lg"
                style={{ background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #6366f1, #3b82f6)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-1 rounded-full blur-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle, rgba(129,140,248,0.6) 0%, transparent 70%)" }}
              />
              <Link href="/dashboard" className="relative flex items-center justify-center px-10 py-4 bg-[#0a0f1e] rounded-full leading-none overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                <span className="relative text-white font-bold text-lg tracking-wider">STUDENT PORTAL</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── SCROLL INDICATOR ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium"
          >
            Scroll
          </motion.span>
          <div className="w-[1.5px] h-20 bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="w-full bg-gradient-to-b from-gold to-transparent"
              style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
              animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </section>

      {/* STATS STRIP & FEATURES GRID */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* placeholder */}
        </div>
      </section>
    </div>
  );
}
