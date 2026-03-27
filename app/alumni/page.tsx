"use client";

import { motion } from "framer-motion";
import { Search, Filter, MapPin, Building2, GraduationCap, Linkedin, Award } from "lucide-react";

const alumni = [
  { name: "Sundar Pichai", batch: "1989", branch: "Metallurgical Engineering", company: "Google", role: "CEO", location: "California, USA", color: "from-blue-500/20 to-green-500/20" },
  { name: "Sachin Bansal", batch: "2005", branch: "Computer Science", company: "Navi / Flipkart", role: "Founder", location: "Bengaluru, India", color: "from-yellow-500/20 to-orange-500/20" },
  { name: "Vinod Khosla", batch: "1976", branch: "Electrical Engineering", company: "Khosla Ventures", role: "Founder", location: "California, USA", color: "from-purple-500/20 to-pink-500/20" },
  { name: "Raghuram Rajan", batch: "1985", branch: "Electrical Engineering", company: "University of Chicago", role: "Professor", location: "Chicago, USA", color: "from-teal-500/20 to-emerald-500/20" },
  { name: "Kiran Bedi", batch: "1970", branch: "Social Sciences", company: "Indian Police Service", role: "Retd. IPS Officer", location: "New Delhi, India", color: "from-gray-500/20 to-zinc-500/20" },
  { name: "Chetan Bhagat", batch: "1995", branch: "Mechanical Engineering", company: "Author", role: "Author/Columnist", location: "Mumbai, India", color: "from-red-500/20 to-rose-500/20" },
];

export default function AlumniPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">Alumni <span className="text-gold">Network</span></h1>
                <p className="text-muted text-lg max-w-xl">Connect with the brilliant minds who walked these halls before you.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                    <input type="text" placeholder="Search alumni..." className="w-full bg-secondary/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors" />
                    <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-sm text-white">
                    <Filter className="w-4 h-4" /> <span className="hidden sm:inline">Filters</span>
                </button>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumni.map((alum, i) => (
                <motion.div 
                    key={alum.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative group overflow-hidden hover:border-white/20 transition-colors"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex gap-4 items-center mb-6 relative">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${alum.color} border border-white/10 flex items-center justify-center shadow-lg`}>
                            <Award className="w-8 h-8 text-white/50" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{alum.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-muted font-medium mt-1 uppercase tracking-wider">
                                <GraduationCap className="w-3 h-3" /> Class of {alum.batch}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 relative">
                        <div className="p-4 bg-black/20 rounded-2xl border border-white/5 space-y-3">
                            <div className="flex items-start gap-3">
                                <Building2 className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-white">{alum.role}</p>
                                    <p className="text-xs text-muted mt-0.5">{alum.company}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <GraduationCap className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-white">{alum.branch}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-sm text-white">{alum.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center relative">
                        <button className="flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors">
                            <Linkedin className="w-4 h-4" /> Connect
                        </button>
                        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white hover:bg-gold hover:text-primary hover:border-gold transition-colors">
                            View Profile
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
