"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { verifyCertificate } from "@/lib/api";
import { Award, ShieldCheck, ShieldAlert, Key, Search, Loader2 } from "lucide-react";

export default function CertificatesPage() {
  const [certId, setCertId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setLoading(true);
    setResult(null);
    const res = await verifyCertificate(certId);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Blockchain <span className="text-gold">Verification</span></h1>
          <p className="text-muted text-lg max-w-xl mx-auto">Verify the authenticity of any IIT Delhi certificate instantly through our decentralized ledger.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
          
          <form onSubmit={handleVerify} className="relative z-10 max-w-2xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={certId}
                  onChange={e => setCertId(e.target.value)}
                  placeholder="Enter Certificate ID (e.g. IITD-2024-8A9C)" 
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 pl-12 text-white placeholder-muted focus:outline-none focus:border-gold/50 transition-colors uppercase tracking-widest text-sm"
                />
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="px-8 py-4 bg-gold hover:bg-gold-light text-primary font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 group"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5 group-hover:scale-110 transition-transform" /> Verify</>}
              </button>
            </div>
          </form>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 relative z-10"
              >
                {result.valid ? (
                  <div className="p-8 border border-green-500/30 bg-green-500/5 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none"><ShieldCheck className="w-32 h-32 text-green-500" /></div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50">
                        <ShieldCheck className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-400">Authentic Certificate</h3>
                        <p className="text-sm text-green-500/70">Verified on blockchain</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                        <span className="text-xs text-muted uppercase tracking-wider block mb-1">Issuer</span>
                        <p className="text-white font-medium">{result.issuer}</p>
                      </div>
                      <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                        <span className="text-xs text-muted uppercase tracking-wider block mb-1">Timestamp</span>
                        <p className="text-white font-medium">{new Date(result.timestamp).toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-black/20 rounded-xl border border-white/5 md:col-span-2">
                        <span className="text-xs text-muted uppercase tracking-wider block mb-1">Transaction Hash</span>
                        <p className="text-gold font-mono text-sm break-all">{result.hash}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 border border-red-500/30 bg-red-500/5 rounded-2xl flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50 mb-4">
                      <ShieldAlert className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-red-400 mb-2">Invalid Certificate</h3>
                    <p className="text-muted text-sm max-w-md">The ID you entered does not exist in our tamper-proof ledger. Please check for typos and try again.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Placeholder UI for typical certificate */}
        <div className="py-12 border-t border-white/10">
            <h3 className="text-2xl font-serif text-white mb-8 text-center bg-clip-text">Your Recent Certificates</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2].map(i => (
                    <motion.div key={i} whileHover={{ y: -5 }} className="group p-6 rounded-2xl border border-gold/20 bg-gradient-to-br from-primary to-secondary relative overflow-hidden backdrop-blur-sm cursor-pointer shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Award className="w-10 h-10 text-gold mb-4 opacity-70" />
                        <h4 className="text-lg font-bold text-white mb-1">B.Tech Degree</h4>
                        <p className="text-sm text-muted mb-4">Computer Science • Class of 2024</p>
                        <div className="flex justify-between items-center text-xs">
                            <span className="font-mono text-gold/60">ID: IITD-2024-XXXX</span>
                            <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded">Verified</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
