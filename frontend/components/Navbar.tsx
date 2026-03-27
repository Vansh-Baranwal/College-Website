"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { name: "Academics", href: "#academics" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Campus", href: "/campus" },
  { name: "Placements", href: "/placement" },
  { name: "Events", href: "/events" },
  { name: "Alumni", href: "/alumni" },
  { name: "Digital ID", href: "/id" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/70 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12">
            <img 
              src="/logo.png" 
              alt="IIT Delhi Logo" 
              className="w-full h-full object-contain filter brightness-0 invert" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-tight text-white leading-tight">
              IIT <span className="text-gold">Delhi</span>
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-sans -mt-1 font-medium group-hover:text-gold transition-colors">
              Campus OS
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-muted hover:text-white transition-colors group"
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold/50 transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/chat"
          className="hidden md:flex items-center justify-center bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 px-5 py-2 rounded-full font-medium text-sm transition-all shadow-[0_0_15px_rgba(201,168,76,0.15)] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:-translate-y-0.5"
        >
          AI Assistant
        </Link>
      </div>
    </header>
  );
}
