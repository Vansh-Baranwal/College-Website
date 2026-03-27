"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { QrCode, Download, Wallet, AlertOctagon, Fingerprint, ChevronRight } from "lucide-react";

export default function DigitalIDPage() {
  const [qrKey, setQrKey] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setQrKey(k => k + 1);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Digital <span className="text-gold">Campus ID</span></h1>
          <p className="text-muted text-lg max-w-xl mx-auto">Your secure, dynamic identification for library access, dining halls, and exams.</p>
        </motion.div>

        <div className="w-full max-w-md perspective-1000">
          <motion.div 
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(201,168,76,0.15)] relative transform-style-3d group"
          >
            {/* Card Background Layer */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d1530] to-[#0a0f1e] z-0" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[url('/grid.svg')] opacity-20 z-0 pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-gold/20 blur-3xl rounded-full z-0" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gold/10 blur-3xl rounded-full z-0" />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out z-20 pointer-events-none" />

            {/* Border glow */}
            <div className="absolute inset-0 rounded-3xl border border-gold/30 z-20 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent z-20" />

            <div className="relative z-10 p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative">
                      <img 
                        src="/logo.png" 
                        alt="IITD Logo" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gold uppercase tracking-widest font-bold">IIT Delhi</p>
                      <p className="text-[10px] text-muted">Student ID</p>
                    </div>
                  </div>
                 <Fingerprint className="w-8 h-8 text-white/20" />
              </div>

              {/* Profile */}
              <div className="flex gap-6 items-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-secondary border-2 border-gold/40 overflow-hidden shadow-lg p-1">
                    <div className="w-full h-full bg-primary rounded-xl overflow-hidden relative">
                      {/* Fake Photo Placeholder */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-20 bg-white/10 rounded-t-full" />
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-white/20 rounded-full" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Aditya Sharma</h2>
                  <p className="text-gold/80 text-sm font-medium mb-1">B.Tech Computer Science</p>
                  <p className="text-muted text-xs font-mono">2021CS10115</p>
                  <div className="mt-2 inline-block px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-[10px] text-blue-300 font-bold uppercase">
                    Valid till 2025
                  </div>
                </div>
              </div>

              {/* Dynamic QR */}
              <div className="bg-white p-4 rounded-xl flex items-center justify-between gap-4 shadow-inner relative overflow-hidden">
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg p-1">
                  <motion.div 
                    key={qrKey}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=IITD-SECURE-ID-9283928392')] bg-contain bg-no-repeat bg-center"
                  />
                  {/* Fake scanner line */}
                  <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: 96 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_10px_red]"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <QrCode className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold text-primary tracking-wide">SECURE SCAN</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mb-2 leading-tight">Present this code at secure checkpoints.</p>
                  <div className="bg-gray-100 rounded-full h-1.5 w-full overflow-hidden">
                    <motion.div 
                      key={`progress-${qrKey}`}
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 10, ease: "linear" }}
                      className="h-full bg-gold"
                    />
                  </div>
                  <p className="text-[9px] text-gray-400 mt-1 mt-1 text-right">Rotates in {timeLeft}s</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 space-y-3"
          >
            <button className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 rounded-xl transition-all group">
              <div className="flex items-center gap-3 text-white">
                <Wallet className="w-5 h-5 text-gold" />
                <span className="font-medium">Add to Apple Wallet</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted group-hover:text-gold transition-colors group-hover:translate-x-1" />
            </button>
            <button className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 rounded-xl transition-all group">
              <div className="flex items-center gap-3 text-white">
                <Download className="w-5 h-5 text-gold" />
                <span className="font-medium">Download PDF Format</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted group-hover:text-gold transition-colors group-hover:translate-x-1" />
            </button>
            <button className="w-full flex items-center gap-3 px-6 py-4 bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 rounded-xl transition-all text-red-400 font-medium justify-center mt-6">
              <AlertOctagon className="w-5 h-5" />
              Report Lost or Stolen
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
