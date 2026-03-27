"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Mail, Globe, Award, GraduationCap, Filter } from "lucide-react";

const faculty = [
  { name: "Prof. Subhashis Banerjee", department: "Computer Science", designation: "Professor", specialization: "Computer Vision, Machine Learning", email: "suban@cse.iitd.ac.in", publications: 180, awards: 5 },
  { name: "Prof. Aaditeshwar Seth", department: "Computer Science", designation: "Associate Professor", specialization: "ICT for Development, Social Media", email: "aseth@cse.iitd.ac.in", publications: 95, awards: 3 },
  { name: "Prof. Bhim Singh", department: "Electrical Engineering", designation: "Professor", specialization: "Power Electronics, Drives", email: "bhim@ee.iitd.ac.in", publications: 650, awards: 12 },
  { name: "Prof. Naveen Garg", department: "Computer Science", designation: "Professor", specialization: "Algorithms, Combinatorics", email: "naveen@cse.iitd.ac.in", publications: 120, awards: 4 },
  { name: "Prof. S. Jayanth", department: "Mechanical Engineering", designation: "Professor", specialization: "Micro/Nano Manufacturing, MEMS", email: "sjayanth@mech.iitd.ac.in", publications: 200, awards: 6 },
  { name: "Prof. Reetika Khera", department: "Humanities & Social Sciences", designation: "Associate Professor", specialization: "Development Economics, Social Policy", email: "rkhera@hss.iitd.ac.in", publications: 75, awards: 2 },
  { name: "Prof. Amlan Chakrabarti", department: "Physics", designation: "Professor", specialization: "Quantum Computing, Condensed Matter", email: "amlan@phy.iitd.ac.in", publications: 150, awards: 3 },
  { name: "Prof. Anurag Rathore", department: "Chemical Engineering", designation: "Professor", specialization: "Bioprocessing, Biopharmaceuticals", email: "arathore@che.iitd.ac.in", publications: 250, awards: 8 },
];

export default function FacultyPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const allDepts = ["All", ...Array.from(new Set(faculty.map(f => f.department)))];
  const filtered = faculty
    .filter(f => deptFilter === "All" || f.department === deptFilter)
    .filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.specialization.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Our <span className="text-gold">Faculty</span></h1>
          <p className="text-muted text-lg max-w-xl mx-auto">World-class researchers and educators shaping the future.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <div className="relative w-full max-w-sm">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search faculty..." className="w-full bg-secondary/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors" />
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            {allDepts.map(dept => (
              <button key={dept} onClick={() => setDeptFilter(dept)} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border whitespace-nowrap ${deptFilter === dept ? 'bg-gold/20 text-gold border-gold/50' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}>
                {dept === "All" ? "All Departments" : dept}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((prof, i) => (
            <motion.div
              key={prof.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="p-6 rounded-2xl border border-white/10 bg-secondary/40 backdrop-blur-xl hover:border-gold/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex gap-4 items-start">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-7 h-7 text-gold/70" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors">{prof.name}</h3>
                  <p className="text-xs text-gold/60 font-medium">{prof.designation}</p>
                  <p className="text-sm text-muted mt-0.5">{prof.department}</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-black/20 rounded-xl border border-white/5">
                <p className="text-xs text-muted uppercase tracking-widest font-bold mb-1">Specialization</p>
                <p className="text-sm text-white/80">{prof.specialization}</p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{prof.publications} Papers</span>
                  <span className="flex items-center gap-1"><Award className="w-3 h-3 text-gold" />{prof.awards} Awards</span>
                </div>
                <a href={`mailto:${prof.email}`} className="flex items-center gap-1 hover:text-gold transition-colors">
                  <Mail className="w-3 h-3" />{prof.email.split('@')[0]}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
