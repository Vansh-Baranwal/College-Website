"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building, Users, BookOpen, ExternalLink, ChevronRight } from "lucide-react";

const STATIC_DEPTS = [
  { name: "Computer Science & Engineering", code: "CSE", hod: "Prof. S. Arun Kumar", faculty: 52, students: 1200, programs: ["B.Tech", "M.Tech", "PhD"], color: "from-blue-500 to-indigo-600" },
  { name: "Electrical Engineering", code: "EE", hod: "Prof. Bhim Singh", faculty: 48, students: 1050, programs: ["B.Tech", "M.Tech", "PhD"], color: "from-yellow-500 to-orange-600" },
  { name: "Mechanical Engineering", code: "ME", hod: "Prof. P. M. Pandey", faculty: 45, students: 980, programs: ["B.Tech", "M.Tech", "PhD"], color: "from-red-500 to-rose-600" },
  { name: "Civil Engineering", code: "CE", hod: "Prof. A. K. Nema", faculty: 38, students: 800, programs: ["B.Tech", "M.Tech", "PhD"], color: "from-green-500 to-emerald-600" },
  { name: "Chemical Engineering", code: "ChE", hod: "Prof. Anurag Rathore", faculty: 30, students: 620, programs: ["B.Tech", "M.Tech", "PhD"], color: "from-purple-500 to-violet-600" },
  { name: "Physics", code: "PH", hod: "Prof. H. S. Mani", faculty: 35, students: 450, programs: ["M.Sc", "PhD"], color: "from-cyan-500 to-teal-600" },
  { name: "Mathematics", code: "MA", hod: "Prof. A. Ramadevi", faculty: 32, students: 400, programs: ["M.Sc", "PhD"], color: "from-pink-500 to-fuchsia-600" },
  { name: "Humanities & Social Sciences", code: "HSS", hod: "Prof. G. Arunima", faculty: 40, students: 300, programs: ["M.A", "PhD"], color: "from-amber-500 to-yellow-600" },
];

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState(STATIC_DEPTS);

  useEffect(() => {
    import("@/lib/api").then(({ getDepartments }) =>
      getDepartments().then(data => { if (data?.length) setDepartments(data); }).catch(() => {})
    );
  }, []);
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto space-y-10 relative z-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">Academic <span className="text-gold">Departments</span></h1>
          <p className="text-muted text-lg max-w-xl mx-auto">{departments.length} departments driving world-class research and education.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept, i) => (
            <motion.div
              key={dept.code}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-3xl border border-white/10 bg-secondary/40 backdrop-blur-xl overflow-hidden group hover:border-white/20 transition-all relative cursor-pointer"
            >
              <div className={`h-2 bg-gradient-to-r ${dept.color}`} />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">{dept.name}</h3>
                    <span className="text-xs font-mono text-gold/70 mt-1 inline-block">{dept.code}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0" />
                </div>

                <p className="text-sm text-muted mb-5">Head of Department: <span className="text-white/80">{dept.hod}</span></p>

                <div className="flex gap-4 mb-5">
                  <div className="flex items-center gap-2 text-sm text-white/70"><Users className="w-4 h-4 text-gold" /><span>{dept.faculty} Faculty</span></div>
                  <div className="flex items-center gap-2 text-sm text-white/70"><BookOpen className="w-4 h-4 text-gold" /><span>{dept.students} Students</span></div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {dept.programs.map(p => (
                    <span key={p} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-white/70 font-medium">{p}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
