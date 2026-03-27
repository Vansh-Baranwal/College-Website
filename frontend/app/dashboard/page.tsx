"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";
import { Bell, Book, TrendingUp, AlertCircle, Users, GraduationCap, Microscope, DollarSign, FileText, Award, Calendar } from "lucide-react";

// --- DATA ---
const studentCgpaData = [
  { sem: "Sem 1", cgpa: 8.5 },
  { sem: "Sem 2", cgpa: 8.8 },
  { sem: "Sem 3", cgpa: 9.1 },
  { sem: "Sem 4", cgpa: 8.9 },
  { sem: "Sem 5", cgpa: 9.2 },
];

const facultyGrantData = [
  { year: "2020", amount: 15 },
  { year: "2021", amount: 22 },
  { year: "2022", amount: 18 },
  { year: "2023", amount: 35 },
  { year: "2024", amount: 42 },
];

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 pt-24">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-white/10 pb-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-serif text-white font-bold"
          >
            Welcome back, <span className="text-gold capitalize">{user.name.split(' ')[0]}</span>
          </motion.h1>
          <p className="text-[#8a9bb5] mt-2 text-lg">
            {user.role === 'student' 
              ? "B.Tech Computer Science Engineering • Year III" 
              : "Senior Professor • Department of Computer Science"}
          </p>
        </div>
        <button className="p-3 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition relative group">
          <Bell className="w-6 h-6 text-white/40 group-hover:text-gold transition-colors" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0a0a0b]" />
        </button>
      </div>

      {user.role === 'student' ? <StudentDashboard /> : <FacultyDashboard />}
    </div>
  );
}

// --- SUB-COMPONENTS ---

function StudentDashboard() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Current CGPA", value: "9.2", icon: TrendingUp, delta: "+0.3", color: "text-gold" },
          { label: "Active Courses", value: "6", icon: Book, delta: "18 credits", color: "text-blue-400" },
          { label: "Upcoming Deadlines", value: "4", icon: AlertCircle, delta: "Next: OS Lab", color: "text-rose-400" },
        ].map((stat, i) => (
          <DashboardStatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-8 rounded-[2rem] border border-white/5 bg-secondary/30 backdrop-blur-xl">
          <h3 className="text-xl font-serif text-white mb-8">Academic Performance History</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={studentCgpaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCgpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#c9a84c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="sem" stroke="#8a9bb5" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[7, 10]} stroke="#8a9bb5" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0d1530", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
                  itemStyle={{ color: "#c9a84c", fontWeight: "bold" }}
                  labelStyle={{ color: "#8a9bb5", marginBottom: "4px" }}
                />
                <Area type="monotone" dataKey="cgpa" stroke="#c9a84c" fillOpacity={1} fill="url(#colorCgpa)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] border border-white/5 bg-secondary/30 backdrop-blur-xl">
          <h3 className="text-xl font-serif text-white mb-8">Daily Schedule</h3>
          <div className="space-y-5">
            {[
              { time: "09:00 AM", title: "Compiler Design", room: "LT-2", type: "Lecture", color: "bg-blue-500/20" },
              { time: "11:00 AM", title: "Operating Systems", room: "LT-4", type: "Lecture", color: "bg-purple-500/20" },
              { time: "02:00 PM", title: "OS Lab", room: "Lab Block 2", type: "Practical", color: "bg-emerald-500/20" },
            ].map((cls, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] transition-all group cursor-default">
                <div className={`w-1 origin-top scale-y-0 group-hover:scale-y-100 transition-transform ${cls.color.replace('/20', '')}`} />
                <div className="text-xs text-muted pt-1 w-16">{cls.time}</div>
                <div>
                  <h4 className="text-base font-medium text-white group-hover:text-gold transition-colors">{cls.title}</h4>
                  <p className="text-xs text-muted mt-1 uppercase tracking-wider">{cls.room} • {cls.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FacultyDashboard() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Grants", value: "₹ 1.2 Cr", icon: DollarSign, delta: "3 Projects", color: "text-emerald-400" },
          { label: "PhD Students", value: "8", icon: GraduationCap, delta: "2 Viva Soon", color: "text-blue-400" },
          { label: "Publications", value: "45", icon: FileText, delta: "12 this year", color: "text-purple-400" },
          { label: "Dept. Rank", value: "#4", icon: Award, delta: "Top 5%", color: "text-gold" },
        ].map((stat, i) => (
          <DashboardStatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-[2rem] border border-white/5 bg-secondary/30 backdrop-blur-xl">
          <h3 className="text-xl font-serif text-white mb-8">Research Funding Growth (Lakhs)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facultyGrantData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="year" stroke="#8a9bb5" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#8a9bb5" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ backgroundColor: "#0d1530", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                />
                <Bar dataKey="amount" fill="#c9a84c" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] border border-white/5 bg-secondary/30 backdrop-blur-xl">
          <h3 className="text-xl font-serif text-white mb-8">Administrative Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Attendance", value: "88%", desc: "B.Tech CSE Avg.", icon: Users },
              { title: "Syllabus", value: "65%", desc: "COL106 Progress", icon: Book },
              { title: "Lab Status", value: "Active", desc: "All systems functional", icon: Microscope },
              { title: "Exams", value: "12 Oct", desc: "Mid Sem Start", icon: Calendar },
            ].map((box, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold/30 transition-colors">
                <box.icon className="w-5 h-5 text-gold mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{box.value}</div>
                <div className="text-xs text-white/50 font-medium uppercase tracking-widest">{box.title}</div>
                <div className="text-[10px] text-muted mt-1">{box.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardStatCard({ stat, index }: { stat: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-[2rem] border border-white/5 bg-secondary/40 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-all duration-300"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-10 transition-opacity bg-gold`} />
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        <stat.icon className={`w-6 h-6 ${stat.color}`} />
      </div>
      <p className="text-[#8a9bb5] text-sm font-medium">{stat.label}</p>
      <div className="flex items-baseline gap-3 mt-1 relative z-10">
        <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
        <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">{stat.delta}</span>
      </div>
    </motion.div>
  );
}

