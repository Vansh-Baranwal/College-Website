"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Bell, Book, TrendingUp, AlertCircle } from "lucide-react";

const cgpaData = [
  { sem: "Sem 1", cgpa: 8.5 },
  { sem: "Sem 2", cgpa: 8.8 },
  { sem: "Sem 3", cgpa: 9.1 },
  { sem: "Sem 4", cgpa: 8.9 },
  { sem: "Sem 5", cgpa: 9.2 },
];

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-serif text-white font-bold"
          >
            Welcome back, <span className="text-gold">Aditya</span>
          </motion.h1>
          <p className="text-muted mt-2 text-sm">B.Tech Computer Science Engineering, III Year</p>
        </div>
        <button className="p-2 border border-white/10 rounded-full hover:bg-white/5 transition relative">
          <Bell className="w-5 h-5 text-muted hover:text-white transition-colors" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-primary"></span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Current CGPA", value: "9.2", icon: TrendingUp, delta: "+0.3" },
          { label: "Active Courses", value: "6", icon: Book, delta: "18 credits" },
          { label: "Upcoming Deadlines", value: "4", icon: AlertCircle, delta: "Next: OS Lab" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-white/5 bg-secondary/50 backdrop-blur-md relative overflow-hidden group hover:border-gold/30 transition-colors"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <stat.icon className="w-6 h-6 text-gold mb-4" />
            <p className="text-muted text-sm">{stat.label}</p>
            <div className="flex items-baseline gap-3 mt-1 relative z-10">
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
              <span className="text-xs text-green-400">{stat.delta}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 p-6 rounded-2xl border border-white/5 bg-secondary/50 backdrop-blur-md"
        >
          <h3 className="text-lg font-medium text-white mb-6">CGPA Trajectory</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cgpaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCgpa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#c9a84c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="sem" stroke="#8a9bb5" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[7, 10]} stroke="#8a9bb5" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0d1530", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px" }}
                  itemStyle={{ color: "#c9a84c", fontWeight: "bold" }}
                  labelStyle={{ color: "#8a9bb5", marginBottom: "4px" }}
                />
                <Area type="monotone" dataKey="cgpa" stroke="#c9a84c" fillOpacity={1} fill="url(#colorCgpa)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl border border-white/5 bg-secondary/50 backdrop-blur-md"
        >
          <h3 className="text-lg font-medium text-white mb-6">Today's Timetable</h3>
          <div className="space-y-4">
            {[
              { time: "09:00 AM", title: "Compiler Design", room: "LT-2", type: "Lecture" },
              { time: "11:00 AM", title: "Operating Systems", room: "LT-4", type: "Lecture" },
              { time: "02:00 PM", title: "OS Lab", room: "Lab Block 2", type: "Practical" },
            ].map((cls, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] transition-colors relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold/50 scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                <div className="text-xs text-muted pt-1 w-16">{cls.time}</div>
                <div>
                  <h4 className="text-sm font-medium text-white group-hover:text-gold transition-colors">{cls.title}</h4>
                  <p className="text-xs text-muted mt-1">{cls.room} • {cls.type}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
