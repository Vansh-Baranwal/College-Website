"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Bell, Book, TrendingUp, AlertCircle } from "lucide-react";

// --- DATA ---
const studentCgpaData = [
  { sem: "Sem 1", cgpa: 8.5 },
  { sem: "Sem 2", cgpa: 8.8 },
  { sem: "Sem 3", cgpa: 9.1 },
  { sem: "Sem 4", cgpa: 8.9 },
  { sem: "Sem 5", cgpa: 9.2 },
];

const mockGrades = [
  { course: "Operating Systems", code: "COL331", grade: "A-", credits: 4, status: "Current" },
  { course: "Compiler Design", code: "COL702", grade: "A", credits: 4, status: "Current" },
  { course: "Computer Networks", code: "COL334", grade: "B+", credits: 4, status: "Current" },
  { course: "Artificial Intelligence", code: "COL333", grade: "A", credits: 4, status: "Current" },
];

const mockAssignments = [
  { title: "Lab 3: System Calls", subject: "Operating Systems", due: "Tomorrow", status: "Pending", priority: "High" },
  { title: "Symbol Table Impl", subject: "Compiler Design", due: "28 Mar", status: "Submitted", priority: "Medium" },
  { title: "TCP Congestion Study", subject: "Computer Networks", due: "30 Mar", status: "In Progress", priority: "Medium" },
  { title: "A* Search Alg", subject: "Artif. Intelligence", due: "02 Apr", status: "Pending", priority: "Low" },
];

const mockRoutine = [
  { time: "09:00 AM", title: "Compiler Design", room: "LT-2", type: "Lecture", color: "bg-blue-500/20" },
  { time: "11:00 AM", title: "Operating Systems", room: "LT-4", type: "Lecture", color: "bg-purple-500/20" },
  { time: "01:00 PM", title: "Lunch Break", room: "Hostel Mess", type: "Break", color: "bg-amber-500/20" },
  { time: "02:00 PM", title: "OS Lab", room: "Lab Block 2", type: "Practical", color: "bg-emerald-500/20" },
  { time: "04:00 PM", title: "AI Seminar", room: "Srinivasan Hall", type: "Extra", color: "bg-cyan-500/20" },
];

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (user.role === 'faculty') {
        router.push("/faculty-dashboard");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-10 pt-24 pb-32">
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
            B.Tech Computer Science Engineering • Year III
          </p>
        </div>
        <button className="p-3 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition relative group">
          <Bell className="w-6 h-6 text-white/40 group-hover:text-gold transition-colors" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0a0a0b]" />
        </button>
      </div>

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

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Performance Chart */}
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

          {/* Daily Schedule */}
          <div className="p-8 rounded-[2rem] border border-white/5 bg-secondary/30 backdrop-blur-xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-serif text-white">Daily Schedule</h3>
              <span className="text-xs text-gold font-bold uppercase tracking-wider">Today</span>
            </div>
            <div className="space-y-4">
              {mockRoutine.map((cls, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] transition-all group cursor-default">
                  <div className={`w-1 origin-top scale-y-0 group-hover:scale-y-100 transition-transform ${cls.color.replace('/20', '')}`} />
                  <div className="text-[10px] text-muted pt-1 w-16">{cls.time}</div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-gold transition-colors">{cls.title}</h4>
                    <p className="text-[10px] text-muted mt-1 uppercase tracking-wider">{cls.room} • {cls.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Grades */}
          <div className="lg:col-span-2 p-8 rounded-[2rem] border border-white/5 bg-secondary/30 backdrop-blur-xl">
             <h3 className="text-xl font-serif text-white mb-8">Course Grades (Current Sem)</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="pb-4 text-xs font-bold text-muted uppercase tracking-widest">Course Code</th>
                      <th className="pb-4 text-xs font-bold text-muted uppercase tracking-widest text-center">Current Grade</th>
                      <th className="pb-4 text-xs font-bold text-muted uppercase tracking-widest text-right">Credits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {mockGrades.map((g, i) => (
                      <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-5">
                          <div className="text-white font-bold">{g.code}</div>
                          <div className="text-xs text-muted">{g.course}</div>
                        </td>
                        <td className="py-5 text-center">
                          <span className="px-3 py-1 rounded-lg bg-gold/10 text-gold font-bold">{g.grade}</span>
                        </td>
                        <td className="py-5 text-right text-white/60">{g.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>

          {/* Assignments */}
          <div className="p-8 rounded-[2rem] border border-white/5 bg-secondary/30 backdrop-blur-xl">
             <h3 className="text-xl font-serif text-white mb-8">Upcoming Assignments</h3>
             <div className="space-y-4">
                {mockAssignments.map((asgn, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-white/5 bg-black/20 group hover:border-gold/30 transition-all">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-sm font-bold text-white">{asgn.title}</h4>
                       <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                         asgn.priority === 'High' ? 'bg-rose-500/20 text-rose-400' : 
                         asgn.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                       }`}>
                         {asgn.priority}
                       </span>
                    </div>
                    <p className="text-xs text-muted mb-3">{asgn.subject}</p>
                    <div className="flex justify-between items-center text-[10px]">
                       <span className="text-white/40 font-mono">Due: {asgn.due}</span>
                       <span className={`font-bold ${asgn.status === 'Submitted' ? 'text-emerald-400' : 'text-gold'}`}>{asgn.status}</span>
                    </div>
                  </div>
                ))}
             </div>
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

