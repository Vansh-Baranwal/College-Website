"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Users, Star, ChevronDown, Filter } from "lucide-react";

const courses = [
  { code: "CSL100", name: "Introduction to Computer Science", department: "Computer Science", credits: 4, semester: "Autumn", level: "UG", enrolled: 450, rating: 4.8 },
  { code: "MTL106", name: "Probability & Stochastic Processes", department: "Mathematics", credits: 4, semester: "Spring", level: "UG", enrolled: 320, rating: 4.2 },
  { code: "ELL201", name: "Digital Electronics", department: "Electrical Engineering", credits: 4, semester: "Autumn", level: "UG", enrolled: 280, rating: 4.5 },
  { code: "COL774", name: "Machine Learning", department: "Computer Science", credits: 4, semester: "Autumn", level: "PG", enrolled: 180, rating: 4.9 },
  { code: "PHL101", name: "Classical Mechanics", department: "Physics", credits: 4, semester: "Spring", level: "UG", enrolled: 350, rating: 4.3 },
  { code: "CHL101", name: "Introduction to Chemical Engineering", department: "Chemical Engineering", credits: 3, semester: "Autumn", level: "UG", enrolled: 150, rating: 4.0 },
  { code: "COL380", name: "Parallel Programming", department: "Computer Science", credits: 3, semester: "Spring", level: "UG", enrolled: 120, rating: 4.6 },
  { code: "HUL256", name: "Creative Writing", department: "Humanities", credits: 3, semester: "Spring", level: "UG", enrolled: 90, rating: 4.7 },
];

export default function CoursesPage() {
  const [levelFilter, setLevelFilter] = useState("All");
  const filtered = levelFilter === "All" ? courses : courses.filter(c => c.level === levelFilter);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Course <span className="text-gold">Catalog</span></h1>
            <p className="text-muted text-lg">{courses.length} courses across all departments</p>
          </div>
          <div className="flex gap-2">
            {["All", "UG", "PG"].map(level => (
              <button key={level} onClick={() => setLevelFilter(level)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${levelFilter === level ? 'bg-gold/20 text-gold border-gold/50' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}>
                {level}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Course Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-4 text-xs uppercase tracking-widest text-muted font-bold">Code</th>
                <th className="py-4 px-4 text-xs uppercase tracking-widest text-muted font-bold">Course</th>
                <th className="py-4 px-4 text-xs uppercase tracking-widest text-muted font-bold hidden md:table-cell">Department</th>
                <th className="py-4 px-4 text-xs uppercase tracking-widest text-muted font-bold hidden lg:table-cell">Credits</th>
                <th className="py-4 px-4 text-xs uppercase tracking-widest text-muted font-bold hidden lg:table-cell">Enrolled</th>
                <th className="py-4 px-4 text-xs uppercase tracking-widest text-muted font-bold">Rating</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((course, i) => (
                <motion.tr
                  key={course.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-4 font-mono text-sm text-gold font-bold">{course.code}</td>
                  <td className="py-4 px-4">
                    <div className="text-white font-medium group-hover:text-gold transition-colors">{course.name}</div>
                    <div className="text-xs text-muted mt-0.5 md:hidden">{course.department}</div>
                  </td>
                  <td className="py-4 px-4 text-sm text-white/70 hidden md:table-cell">{course.department}</td>
                  <td className="py-4 px-4 text-sm text-white/70 hidden lg:table-cell">
                    <span className="px-2 py-0.5 bg-white/5 rounded text-xs border border-white/10">{course.credits}</span>
                  </td>
                  <td className="py-4 px-4 text-sm text-white/70 hidden lg:table-cell">
                    <div className="flex items-center gap-1"><Users className="w-3 h-3 text-muted" />{course.enrolled}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-sm font-bold text-white">{course.rating}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
