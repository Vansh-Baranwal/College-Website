"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { GraduationCap, BookOpen, Eye, EyeOff, ArrowRight, Mail, Lock, User, Sparkles } from "lucide-react";

type Role = "student" | "faculty";
type Mode = "login" | "signup";

export default function LoginPage() {
  const { login, signup } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<Role | null>(null);
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password, role);
      } else {
        await signup(name, email, password, role);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background accents */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-medium mb-6"
          >
            <Sparkles className="w-3 h-3" />
            Campus OS Authentication
          </motion.div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-slate-400 text-sm">
            {role ? `Signing in as ${role}` : "Select your role to continue"}
          </p>
        </div>

        {/* Role Selection */}
        <AnimatePresence mode="wait">
          {!role ? (
            <motion.div
              key="role-select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <button
                onClick={() => setRole("student")}
                className="w-full group relative p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl hover:border-amber-500/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-8 h-8 text-amber-400" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">Student Login</h3>
                    <p className="text-xs text-slate-500 mt-1">Access your dashboard, courses, timetable & more</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
              </button>

              <button
                onClick={() => setRole("faculty")}
                className="w-full group relative p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">Faculty Login</h3>
                    <p className="text-xs text-slate-500 mt-1">Manage courses, grades, announcements & research</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Role badge */}
              <div className="flex items-center justify-between mb-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${role === "student" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30"}`}>
                  {role === "student" ? <GraduationCap className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                  {role === "student" ? "Student" : "Faculty"}
                </div>
                <button onClick={() => { setRole(null); setError(""); }} className="text-xs text-slate-500 hover:text-white transition-colors">
                  ← Change role
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text" value={name} onChange={e => setName(e.target.value)} required
                      placeholder="Full Name"
                      className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors text-sm"
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    placeholder="Email address"
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors text-sm"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                    placeholder="Password"
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl py-3.5 pl-11 pr-11 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors text-sm"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {error && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit" disabled={loading}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                    role === "student"
                      ? "bg-amber-500 text-black hover:bg-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                      : "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                  }`}
                >
                  {loading ? "Authenticating..." : mode === "login" ? "Sign In" : "Create Account"}
                </button>
              </form>

              <p className="text-center text-xs text-slate-500 mt-6">
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }} className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  {mode === "login" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
