"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, Users, Star, ChevronDown, Filter } from "lucide-react";

const MOCK = [
  { code: "CSL100", name: "Introduction to Computer Science", department: "Computer Science", credits: 4, semester: "Autumn", level: "UG", enrolled: 450, rating: 4.8 },
  { code: "MTL106", name: "Probability & Stochastic Processes", department: "Mathematics", credits: 4, semester: "Spring", level: "UG", enrolled: 320, rating: 4.2 },
  { code: "ELL201", name: "Digital Electronics", department: "Electrical Engineering", credits: 4, semester: "Autumn", level: "UG", enrolled: 280, rating: 4.5 },
  { code: "COL774", name: "Machine Learning", department: "Computer Science", credits: 4, semester: "Autumn", level: "PG", enrolled: 180, rating: 4.9 },
  { code: "PHL101", name: "Classical Mechanics", department: "Physics", credits: 4, semester: "Spring", level: "UG", enrolled: 350, rating: 4.3 },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(MOCK);
  const [levelFilter, setLevelFilter] = useState("All");

  useEffect(() => {
    import("@/lib/api").then(({ getCourses }) =>
      getCourses().then(data => { if (data?.length) setCourses(data); }).catch(() => {})
    );
  }, []);

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

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course, i) => (
            <CourseCard key={course.code} course={course} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, index }: { course: any; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className="group relative p-6 rounded-3xl border border-white/10 bg-secondary/40 backdrop-blur-md hover:border-gold/40 transition-all duration-300 flex flex-col justify-between"
      >
        <div className="absolute top-0 right-0 p-4">
          <span className="text-[10px] font-mono font-bold text-gold/40 group-hover:text-gold/80 transition-colors uppercase tracking-widest">{course.code}</span>
        </div>

        <div>
          <div className="mb-4">
            <div className="inline-block px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-muted font-bold uppercase tracking-wider mb-3">
              {course.department}
            </div>
            <h3 className="text-xl font-bold text-white leading-tight group-hover:text-gold transition-colors">{course.name}</h3>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <Clock className="w-3.5 h-3.5 text-gold/60" />
              <span>{course.credits} Credits</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <Star className="w-3.5 h-3.5 text-gold/80 fill-gold/20" />
              <span>{course.rating} Rating</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsOpen(true)}
          className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-gold hover:text-primary hover:border-gold transition-all duration-300"
        >
          Know More
        </button>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0d1530] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl z-10"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold to-transparent" />
              
              <div className="p-8 sm:p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-gold font-mono text-sm font-bold mb-1">{course.code}</div>
                    <h2 className="text-3xl font-serif font-bold text-white">{course.name}</h2>
                    <p className="text-muted mt-1">{course.department} • {course.level} Level</p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                  >
                    <ChevronDown className="w-6 h-6 rotate-180" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs uppercase font-bold text-gold tracking-widest mb-3">Course Instructor</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-gold" />
                        </div>
                        <span className="text-white font-medium">{course.faculty || "Senior Professor"}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-bold text-gold tracking-widest mb-3">Enrolment Statistics</h4>
                      <div className="text-2xl font-bold text-white">{course.enrolled} <span className="text-sm font-normal text-muted">Students currently enrolled</span></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold text-gold tracking-widest mb-3">Description</h4>
                    <p className="text-sm text-white/70 leading-relaxed italic">
                      "{course.intro || course.description || 'An intensive course covering foundational concepts and advanced applications.'}"
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 pt-8 border-t border-white/10">
                   <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                      <div className="text-gold font-bold text-xl">{course.credits}</div>
                      <div className="text-[10px] text-muted uppercase font-bold">Credits</div>
                   </div>
                   <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                      <div className="text-gold font-bold text-xl">{course.semester}</div>
                      <div className="text-[10px] text-muted uppercase font-bold">Semester</div>
                   </div>
                   <div className="flex-1 p-4 rounded-2xl bg-white/5 border border-white/5 text-center">
                      <div className="text-gold font-bold text-xl">{course.rating}</div>
                      <div className="text-[10px] text-muted uppercase font-bold">Rating</div>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

