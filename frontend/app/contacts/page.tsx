"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Globe, Clock, ExternalLink, Search } from "lucide-react";

const contacts = [
  { name: "Director's Office", phone: "+91-11-2659-1701", email: "director@iitd.ac.in", location: "Main Building, 1st Floor", hours: "Mon-Fri 9:00 AM - 5:00 PM", type: "Administration" },
  { name: "Dean of Students", phone: "+91-11-2659-1710", email: "deanstudents@iitd.ac.in", location: "Student Activity Centre", hours: "Mon-Fri 10:00 AM - 5:00 PM", type: "Administration" },
  { name: "Academic Section", phone: "+91-11-2659-1715", email: "academics@iitd.ac.in", location: "Main Building, Ground Floor", hours: "Mon-Fri 9:30 AM - 5:30 PM", type: "Academic" },
  { name: "IT Services Helpdesk", phone: "+91-11-2659-1800", email: "ithelp@iitd.ac.in", location: "Computer Services Centre", hours: "24/7 (Phone) | Mon-Sat 9-6 (Walk-in)", type: "IT" },
  { name: "Central Library", phone: "+91-11-2659-1750", email: "library@iitd.ac.in", location: "Central Library Building", hours: "Mon-Sat 8:00 AM - 12:00 AM", type: "Facilities" },
  { name: "Health Centre", phone: "+91-11-2659-1770", email: "healthcentre@iitd.ac.in", location: "Near Nilgiri Hostel", hours: "24/7 Emergency", type: "Health" },
  { name: "Placement Cell", phone: "+91-11-2659-1900", email: "placement@iitd.ac.in", location: "Bharti Building, 2nd Floor", hours: "Mon-Fri 10:00 AM - 6:00 PM", type: "Career" },
  { name: "Hostel Administration", phone: "+91-11-2659-1720", email: "hostel@iitd.ac.in", location: "Main Building, Ground Floor", hours: "Mon-Fri 9:30 AM - 5:00 PM", type: "Facilities" },
];

const typeColors: Record<string, string> = {
  Administration: "from-blue-500/20 to-indigo-500/20",
  Academic: "from-green-500/20 to-emerald-500/20",
  IT: "from-purple-500/20 to-violet-500/20",
  Facilities: "from-orange-500/20 to-amber-500/20",
  Health: "from-red-500/20 to-rose-500/20",
  Career: "from-gold/20 to-yellow-500/20",
};

export default function ContactsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Campus <span className="text-gold">Directory</span></h1>
          <p className="text-muted text-lg max-w-xl mx-auto">Find contact information for all departments and services at IIT Delhi.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="max-w-md mx-auto relative">
          <input type="text" placeholder="Search contacts..." className="w-full bg-secondary/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors" />
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="p-6 rounded-2xl border border-white/10 bg-secondary/40 backdrop-blur-xl hover:border-gold/30 transition-all group relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${typeColors[c.type] || "from-white/10 to-white/5"}`} />
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{c.name}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-muted font-bold mt-1 inline-block">{c.type}</span>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-white/70"><Phone className="w-4 h-4 text-gold shrink-0" /><span>{c.phone}</span></div>
                <div className="flex items-center gap-3 text-white/70"><Mail className="w-4 h-4 text-gold shrink-0" /><a href={`mailto:${c.email}`} className="hover:text-gold transition-colors">{c.email}</a></div>
                <div className="flex items-center gap-3 text-white/70"><MapPin className="w-4 h-4 text-gold shrink-0" /><span>{c.location}</span></div>
                <div className="flex items-center gap-3 text-white/70"><Clock className="w-4 h-4 text-gold shrink-0" /><span>{c.hours}</span></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
