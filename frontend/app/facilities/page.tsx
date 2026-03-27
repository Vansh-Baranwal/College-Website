"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Stethoscope, 
  Coffee, 
  ShieldCheck, 
  CreditCard,
  MapPin,
  Clock,
  Phone
} from "lucide-react";

const facilities = [
  {
    id: "sbi",
    title: "State Bank of India (IIT Branch)",
    desc: "A full-service SBI branch located right on campus, providing exclusive banking services to students, faculty, and staff. Equipped with multiple 24/7 ATMs and dedicated counters for educational loans and digital banking support.",
    image: "/screenshots/sbi-bank.jpg",
    icon: CreditCard,
    details: [
      { icon: Clock, text: "Mon-Sat: 10:00 AM - 4:00 PM" },
      { icon: MapPin, text: "Near Main Administrative Block" },
      { icon: ShieldCheck, text: "Secure Institutional Banking" }
    ],
    color: "gold"
  },
  {
    id: "healthcare",
    title: "IIT Delhi Hospital",
    desc: "A comprehensive healthcare facility providing 24/7 medical services. The hospital includes specialized OPDs, emergency care, a pharmacy, and diagnostic labs to ensure the well-being of the entire campus community.",
    image: "/screenshots/healthcare.png",
    icon: Stethoscope,
    details: [
      { icon: Clock, text: "24/7 Emergency Services" },
      { icon: Phone, text: "Emergency: 011-26591000" },
      { icon: ShieldCheck, text: "Dedicated Student Wellness" }
    ],
    color: "blue"
  },
  {
    id: "dining",
    title: "Premium Dining & Cafeterias",
    desc: "Modern, aesthetic dining spaces and cafeterias offering a wide range of cuisines. From quick snacks to full-course meals, our campus hosts multiple high-end cafes (including FIKA) designed for both nutrition and social interaction.",
    image: "/screenshots/dining.jpg",
    icon: Coffee,
    details: [
      { icon: Clock, text: "Open: 8:00 AM - 11:00 PM" },
      { icon: MapPin, text: "Multiple Locations across Campus" },
      { icon: Building2, text: "High-end Guest House Dining" }
    ],
    color: "orange"
  }
];

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Hero Header */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest"
          >
            <Building2 className="w-3 h-3" />
            Campus Infrastructure
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-white font-bold tracking-tight"
          >
            Essential <span className="text-gold">Campus Facilities</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Ensuring a seamless and comfortable life at IIT Delhi through modern banking, 
            premium healthcare, and high-end dining infrastructure.
          </motion.p>
        </div>

        {/* Facilities Sections */}
        <div className="space-y-32">
          {facilities.map((fac, idx) => (
            <motion.div 
              key={fac.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Container */}
              <div className="flex-1 w-full lg:w-1/2 group">
                <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-secondary/30 backdrop-blur-xl shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <motion.img 
                    src={fac.image} 
                    alt={fac.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <fac.icon className="w-10 h-10 text-gold mb-2" />
                    <p className="text-white text-lg font-bold">{fac.title}</p>
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
                    {fac.title}
                  </h2>
                  <div className="h-1 w-20 bg-gold rounded-full" />
                  <p className="text-slate-400 text-lg leading-relaxed">
                    {fac.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fac.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/20 hover:bg-white/10 transition-all group">
                       <detail.icon className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors" />
                       <span className="text-sm text-slate-300 font-medium">{detail.text}</span>
                    </div>
                  ))}
                </div>

                <motion.button 
                  whileHover={{ x: 10 }}
                  className="inline-flex items-center gap-2 text-gold font-bold uppercase tracking-wider text-xs border-b border-gold/30 pb-1 hover:border-gold transition-all"
                >
                  Learn More About Our Services
                  <Building2 className="w-3 h-3" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
