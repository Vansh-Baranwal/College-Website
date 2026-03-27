"use client";

import { motion } from "framer-motion";
import { User, Mail, GraduationCap, Calendar, Shield, Edit, Settings, LogOut, QrCode, Award, BookOpen, Activity } from "lucide-react";

export default function UsersPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-white">My <span className="text-gold">Profile</span></h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden relative">
          <div className="h-32 bg-gradient-to-r from-gold/20 via-orange-500/10 to-purple/20 relative">
            <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          </div>
          <div className="px-8 pb-8 -mt-16 relative z-10">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
              <div className="w-28 h-28 rounded-2xl bg-primary border-4 border-secondary shadow-xl overflow-hidden relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-24 bg-white/10 rounded-t-full" />
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-14 h-14 bg-white/20 rounded-full" />
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-primary flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">Aditya Sharma</h2>
                <p className="text-gold text-sm font-medium">B.Tech Computer Science & Engineering — Class of 2025</p>
                <p className="text-muted text-xs font-mono mt-1">2021CS10115</p>
              </div>
              <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-medium hover:bg-white/10 transition-colors flex items-center gap-2 shrink-0">
                <Edit className="w-4 h-4" /> Edit Profile
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "CGPA", value: "9.12", icon: Award, color: "text-gold" },
            { label: "Credits Earned", value: "156", icon: BookOpen, color: "text-blue-400" },
            { label: "Semester", value: "7th", icon: Calendar, color: "text-green-400" },
            { label: "Attendance", value: "92%", icon: Activity, color: "text-purple" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-5 rounded-2xl border border-white/10 bg-secondary/40 backdrop-blur-xl text-center"
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-serif text-white font-bold mb-2">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3 text-white/70"><Mail className="w-4 h-4 text-gold shrink-0" /><div><p className="text-xs text-muted">Email</p><p className="text-white">aditya.sharma@iitd.ac.in</p></div></div>
            <div className="flex items-center gap-3 text-white/70"><GraduationCap className="w-4 h-4 text-gold shrink-0" /><div><p className="text-xs text-muted">Department</p><p className="text-white">Computer Science & Engineering</p></div></div>
            <div className="flex items-center gap-3 text-white/70"><Calendar className="w-4 h-4 text-gold shrink-0" /><div><p className="text-xs text-muted">Admission Year</p><p className="text-white">2021</p></div></div>
            <div className="flex items-center gap-3 text-white/70"><Shield className="w-4 h-4 text-gold shrink-0" /><div><p className="text-xs text-muted">Hostel</p><p className="text-white">Jwalamukhi - A Block, Room 204</p></div></div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Digital ID", href: "/id", icon: QrCode, color: "text-gold" },
            { label: "Settings", href: "#", icon: Settings, color: "text-blue-400" },
            { label: "Logout", href: "#", icon: LogOut, color: "text-red-400" },
          ].map(action => (
            <a key={action.label} href={action.href} className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-3 group">
              <action.icon className={`w-5 h-5 ${action.color}`} />
              <span className="text-white font-medium text-sm group-hover:text-gold transition-colors">{action.label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
