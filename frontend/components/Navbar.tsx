"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Academics",
    href: "#",
    subLinks: [
      { name: "Courses", href: "/courses" },
      { name: "Departments", href: "/departments" },
      { name: "Faculties", href: "/faculties" },
    ]
  },
  {
    name: "Campus",
    href: "#",
    subLinks: [
      { name: "Virtual Campus", href: "https://360-degree-nine.vercel.app/" },
      { name: "Events", href: "/events" },
      { name: "Mental Health", href: "/mental-health" },
      { name: "Lost & Found", href: "https://lost-and-found-ten-gamma.vercel.app/" },
    ]
  },
  { name: "COE", href: "/coe" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Digital ID", href: "/id" },
  {
    name: "Other",
    href: "#",
    subLinks: [
      { name: "Antiragging", href: "/antiragging" },
      { name: "Facilities", href: "/facilities" },
      { name: "Hostels", href: "/hostels" },
    ]
  },
];

export default function Navbar() {
  const { user, logout } = useAuth();
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
      className={`fixed top-0 w-full z-[90] transition-all duration-300 backdrop-blur-md border-b ${
        scrolled
          ? "bg-primary/80 border-white/10 py-2.5 shadow-lg"
          : "bg-primary/50 border-white/5 py-3.5"
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
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            // Hide private items if not logged in
            if (!user && (item.name === "Dashboard" || item.name === "Digital ID")) return null;
            
            let href = item.href;
            if (item.name === "Dashboard" && user?.role === 'faculty') {
                href = "/faculty-dashboard";
            }

            const isActive = pathname === href || (item.subLinks && item.subLinks.some(sub => pathname === sub.href));
            return (
              <div key={item.name} className="relative group/nav py-2 text-sm">
                <Link
                  href={href}
                  className="relative text-sm font-medium text-muted hover:text-white transition-colors flex items-center gap-1 group/link"
                >
                  {item.name}
                  {item.subLinks && <ChevronDown className="w-3 h-3 transition-transform group-hover/nav:rotate-180" />}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold/50 transition-all duration-300 group-hover/link:w-full" />
                </Link>

                {/* Dropdown Menu */}
                {item.subLinks && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto transition-all duration-300 z-[90]">
                    <div className="w-48 bg-secondary/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col gap-1 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gold/10 blur-xl rounded-full pointer-events-none" />
                      {item.subLinks.map(sub => {
                        const isExternal = sub.href.startsWith("http");
                        return (
                          <Link 
                            key={sub.name} 
                            href={sub.href} 
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors relative z-10"
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <Link
              href="/login"
              className="px-6 py-2 rounded-full text-sm font-medium text-white/70 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-4">
               <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border ${user.role === 'student' ? 'border-amber-500/30 bg-amber-500/10 text-amber-500' : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-500'} text-xs font-semibold`}>
                  <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${user.role === 'student' ? 'bg-amber-500' : 'bg-cyan-500'}`} />
                  {user.name.split(' ')[0]}
               </div>
               <button 
                onClick={logout}
                className="text-xs text-white/40 hover:text-rose-400 transition-colors font-medium"
               >
                 Logout
               </button>
            </div>
          )}
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gold to-orange-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <Link
              href="/chat"
              className="relative flex items-center justify-center bg-black/80 backdrop-blur-md px-6 py-2 rounded-full font-bold text-sm text-white group-hover:text-gold transition-colors shadow-xl"
            >
              AI Assistant
            </Link>
          </motion.div>
        </div>

      </div>
    </header>
  );
}
