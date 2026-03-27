"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Bell, Book, Users, Microscope, Calendar, DollarSign, GraduationCap, FileText, Award, Clock, Video } from "lucide-react";

// --- DATA ---
const facultyGrantData = [
  { year: "2020", amount: 15 },
  { year: "2021", amount: 22 },
  { year: "2022", amount: 18 },
  { year: "2023", amount: 35 },
  { year: "2024", amount: 42 },
];

export default function FacultyDashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== 'faculty') {
        router.push("/dashboard"); // Redirect students back to their dashboard
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'faculty') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

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
            Welcome back, <span className="text-cyan-400 capitalize">{user.name.split(' ')[0]}</span>
          </motion.h1>
          <p className="text-[#8a9bb5] mt-2 text-lg">
            Senior Professor • Department of Computer Science
          </p>
        </div>
        <button className="p-3 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition relative group">
          <Bell className="w-6 h-6 text-white/40 group-hover:text-cyan-400 transition-colors" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0a0a0b]" />
        </button>
      </div>

      <div className="space-y-10">
        {/* KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Active Grants", value: "₹ 1.2 Cr", icon: DollarSign, delta: "3 Projects", color: "text-emerald-400" },
            { label: "PhD Students", value: "8", icon: GraduationCap, delta: "2 Viva Soon", color: "text-blue-400" },
            { label: "Publications", value: "45", icon: FileText, delta: "12 this year", color: "text-purple-400" },
            { label: "Dept. Rank", value: "#4", icon: Award, delta: "Top 5%", color: "text-cyan-400" },
          ].map((stat, i) => (
            <DashboardStatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Schedule & Meetings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-[2rem] border border-cyan-500/10 bg-secondary/30 backdrop-blur-xl hover:border-cyan-500/20 transition-all">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-serif text-white">Today's Routine & Classes</h3>
              <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">Today</div>
            </div>
            <div className="space-y-4">
              {[
                { time: "09:00 AM", duration: "1.5h", title: "COL106: Data Structures", type: "Lecture", room: "LT-1", color: "bg-blue-500" },
                { time: "11:30 AM", duration: "1h", title: "Faculty Board Meeting", type: "Admin", room: "Senate Room", color: "bg-rose-500" },
                { time: "02:00 PM", duration: "2h", title: "COP290: Design Practices", type: "Lab", room: "Hardware Lab 3", color: "bg-emerald-500" },
                { time: "04:30 PM", duration: "1h", title: "Office Hours", type: "Student Interaction", room: "Room 412", color: "bg-purple-500" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors relative overflow-hidden group">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.color} opacity-80 group-hover:w-2 transition-all`} />
                  <div className="min-w-[80px]">
                    <div className="text-sm font-bold text-white">{item.time}</div>
                    <div className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {item.duration}</div>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-white group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                    <p className="text-xs text-muted mt-1 tracking-wide">{item.type} • {item.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-[2rem] border border-cyan-500/10 bg-secondary/30 backdrop-blur-xl hover:border-cyan-500/20 transition-all">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-serif text-white">Scheduled Meetings</h3>
              <button className="text-xs text-cyan-400 hover:text-cyan-300 font-medium">View Calendar</button>
            </div>
            <div className="space-y-4">
              {[
                { name: "Rahul Sharma", role: "PhD Candidate", topic: "Thesis Review Chapter 4", time: "Tomorrow, 10:00 AM", method: "In Person" },
                { name: "Dr. Anjali Gupta", role: "HOD CSE", topic: "Curriculum Revision 2024", time: "Wed, 2:30 PM", method: "Google Meet" },
                { name: "Project Team Alpha", role: "B.Tech Students", topic: "Capstone Mid-Evaluation", time: "Thu, 11:00 AM", method: "Lab 2" },
              ].map((meeting, i) => (
                <div key={i} className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-cyan-500/30 transition-all">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{meeting.topic}</h4>
                    <span className="text-xs text-muted-foreground">{meeting.name} ({meeting.role})</span>
                    <div className="flex items-center gap-3 mt-1 text-[10px] font-medium text-white/40">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {meeting.time}</span>
                      <span className="flex items-center gap-1"><Video className="w-3 h-3" /> {meeting.method}</span>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-colors shrink-0">
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics & Research */}
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
                  <Bar dataKey="amount" fill="#22d3ee" radius={[4, 4, 0, 0]} barSize={40} />
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
                <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors">
                  <box.icon className="w-5 h-5 text-cyan-400 mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{box.value}</div>
                  <div className="text-xs text-white/50 font-medium uppercase tracking-widest">{box.title}</div>
                  <div className="text-[10px] text-muted mt-1">{box.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
}

function DashboardStatCard({ stat, index }: { stat: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-[2rem] border border-white/5 bg-secondary/40 backdrop-blur-md relative overflow-hidden group hover:border-cyan-500/20 transition-all duration-300"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-10 transition-opacity bg-cyan-500`} />
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
