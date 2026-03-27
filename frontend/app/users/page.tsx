"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, GraduationCap, Calendar, Shield, Edit, Settings, LogOut, QrCode, Award, BookOpen, Activity, Microscope, FileText, UserCircle } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/10 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  const isStudent = user.role === "student";
  const themeText = isStudent ? "text-gold" : "text-cyan-400";
  const themeBorder = isStudent ? "border-gold/30" : "border-cyan-500/30";
  const themeBadge = isStudent ? "bg-amber-500/10 text-gold border-amber-500/20" : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";

  const stats = isStudent ? [
    { label: "CGPA", value: "9.12", icon: Award, color: "text-gold" },
    { label: "Credits Earned", value: "156", icon: BookOpen, color: "text-blue-400" },
    { label: "Semester", value: "7th", icon: Calendar, color: "text-green-400" },
    { label: "Attendance", value: "92%", icon: Activity, color: "text-purple" },
  ] : [
    { label: "Publications", value: "45+", icon: FileText, color: "text-cyan-400" },
    { label: "Research Grants", value: "₹ 1.2 Cr", icon: Microscope, color: "text-emerald-400" },
    { label: "PhD Scholars", value: "8", icon: GraduationCap, color: "text-purple-400" },
    { label: "Dept. Rank", value: "#4", icon: Award, color: "text-gold" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className={`absolute top-0 right-0 w-[400px] h-[400px] ${isStudent ? 'bg-gold/5' : 'bg-cyan-500/5'} blur-[120px] rounded-full pointer-events-none`} />
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-white">My <span className={themeText}>Profile</span></h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden relative">
          <div className={`h-32 bg-gradient-to-r ${isStudent ? 'from-gold/20 via-orange-500/10' : 'from-cyan-500/20 via-blue-500/10'} to-purple/20 relative`}>
             <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          </div>
          <div className="px-8 pb-8 -mt-16 relative z-10">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
              <div className="w-32 h-32 rounded-3xl bg-primary border-4 border-secondary shadow-2xl overflow-hidden relative flex items-center justify-center">
                 <UserCircle className={`w-full h-full p-2 ${isStudent ? 'text-gold/20' : 'text-cyan-500/20'}`} />
                 <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent`} />
                 <div className={`absolute -bottom-1 -right-1 w-8 h-8 ${isStudent ? 'bg-green-500' : 'bg-blue-500'} rounded-full border-2 border-primary flex items-center justify-center`}>
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                 </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white tracking-tight">{user.name}</h2>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mt-2 ${themeBadge}`}>
                   {isStudent ? <GraduationCap className="w-3.5 h-3.5" /> : <Microscope className="w-3.5 h-3.5" />}
                   {isStudent ? "Student — Class of 2025" : "Senior Professor — Dept. of CSE"}
                </div>
                <p className="text-muted text-xs font-mono mt-3 uppercase tracking-widest">
                   UID: {isStudent ? "2021CS101" : "FAC-CS-88"}92
                </p>
              </div>
              <button className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-sm text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2 shrink-0">
                <Edit className={`w-4 h-4 ${isStudent ? 'text-gold' : 'text-cyan-400'}`} /> Edit Profile
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-6 rounded-3xl border border-white/5 bg-secondary/40 backdrop-blur-xl text-center group hover:border-white/20 transition-all"
            >
              <stat.icon className={`w-7 h-7 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-muted mt-1 uppercase tracking-widest font-bold">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Details and Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 space-y-6">
            <h3 className="text-xl font-serif text-white font-bold mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
              <div className="flex items-center gap-4 text-white/70">
                 <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${isStudent ? 'text-gold' : 'text-cyan-400'}`}>
                    <Mail className="w-5 h-5" />
                 </div>
                 <div><p className="text-xs text-muted uppercase font-bold tracking-wider">Email</p><p className="text-white font-medium">{user.email}</p></div>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                 <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${isStudent ? 'text-gold' : 'text-cyan-400'}`}>
                    <GraduationCap className="w-5 h-5" />
                 </div>
                 <div><p className="text-xs text-muted uppercase font-bold tracking-wider">Department</p><p className="text-white font-medium">Computer Science & Engineering</p></div>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                 <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${isStudent ? 'text-gold' : 'text-cyan-400'}`}>
                    <Calendar className="w-5 h-5" />
                 </div>
                 <div><p className="text-xs text-muted uppercase font-bold tracking-wider">{isStudent ? 'Admission' : 'Joined'} Year</p><p className="text-white font-medium">{isStudent ? '2021' : '2015'}</p></div>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                 <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${isStudent ? 'text-gold' : 'text-cyan-400'}`}>
                    <Shield className="w-5 h-5" />
                 </div>
                 <div><p className="text-xs text-muted uppercase font-bold tracking-wider">{isStudent ? 'Hostel' : 'Office'}</p><p className="text-white font-medium">{isStudent ? 'Jwalamukhi - A Block, 204' : 'Bharti Building, Room 402'}</p></div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col gap-4">
            {[
              { label: "Digital ID", href: "/id", icon: QrCode, color: isStudent ? "text-gold" : "text-cyan-400" },
              { label: "Account Settings", href: "#", icon: Settings, color: "text-blue-400" },
              { label: "Logout Session", onClick: logout, icon: LogOut, color: "text-rose-400" },
            ].map(action => (
              action.onClick ? (
                <button key={action.label} onClick={action.onClick} className="p-5 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-rose-500/10 hover:border-rose-500/30 transition-all flex items-center gap-4 group text-left">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-white font-bold text-sm tracking-wide">{action.label}</span>
                </button>
              ) : (
                <a key={action.label} href={action.href} className="p-5 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all flex items-center gap-4 group">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-white font-bold text-sm tracking-wide">{action.label}</span>
                </a>
              )
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

