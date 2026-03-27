"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid, Cell } from "recharts";
import { Briefcase, Building, TrendingUp, ArrowUpRight, Award, Globe, DollarSign } from "lucide-react";

const salaryData = [
  { year: "2020", avg: 16.5, max: 120 },
  { year: "2021", avg: 18.2, max: 150 },
  { year: "2022", avg: 21.4, max: 190 },
  { year: "2023", avg: 24.5, max: 220 },
  { year: "2024", avg: 25.8, max: 240 },
];

const companiesData = [
  { name: "Google", hires: 45 },
  { name: "Microsoft", hires: 60 },
  { name: "Jane Street", hires: 12 },
  { name: "Amazon", hires: 85 },
  { name: "Tower Research", hires: 15 },
  { name: "BCG", hires: 32 },
];

const topCompanies = [
  "Google", "Microsoft", "Apple", "Meta", "Amazon", "Netflix", 
  "Jane Street", "Optiver", "Tower Research", "McKinsey", "BCG", "Bain"
];

export default function PlacementPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Placement <span className="text-gold">Intelligence</span></h1>
            <p className="text-muted text-lg max-w-xl">Real-time statistics and historical data of IIT Delhi placements.</p>
          </div>
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition flex items-center gap-2 text-sm text-white font-medium group">
            <Briefcase className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
            Download Brochure 2024
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Overall Placement", value: "94.5%", icon: TrendingUp, detail: "+2.1% from last year" },
            { label: "Highest Package", value: "₹ 2.4 Cr", icon: ArrowUpRight, detail: "International Offer" },
            { label: "Average Package", value: "₹ 25.8 LPA", icon: DollarSign, detail: "Across all branches" },
            { label: "Recruiting Partners", value: "450+", icon: Building, detail: "Fortune 500 included" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/10 bg-secondary/40 backdrop-blur-md relative overflow-hidden group hover:border-gold/30 transition-colors"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-primary/80 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-gold" />
              </div>
              <p className="text-muted text-sm mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-xs text-green-400 font-medium">{stat.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="p-8 rounded-3xl border border-white/10 bg-secondary/40 backdrop-blur-md hover:border-white/20 transition-colors">
            <h3 className="text-xl font-serif text-white mb-6">Average Package Trends (LPA)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salaryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a84c" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#c9a84c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="year" stroke="#8a9bb5" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#8a9bb5" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: "#0d1530", borderColor: "#ffffff10", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}
                    itemStyle={{ color: "#c9a84c", fontWeight: "bold" }}
                  />
                  <Area type="monotone" dataKey="avg" stroke="#c9a84c" fillOpacity={1} fill="url(#colorAvg)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="p-8 rounded-3xl border border-white/10 bg-secondary/40 backdrop-blur-md hover:border-white/20 transition-colors">
            <h3 className="text-xl font-serif text-white mb-6">Top Recruiters (Offers Made)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={companiesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} layout="vertical">
                   <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="#8a9bb5" fontSize={12} tickLine={false} axisLine={false} hide />
                  <YAxis dataKey="name" type="category" stroke="#fff" fontSize={12} tickLine={false} axisLine={false} width={100} />
                  <RechartsTooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: "#0d1530", borderColor: "#ffffff10", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}
                    itemStyle={{ color: "#fff", fontWeight: "bold" }}
                  />
                  <Bar dataKey="hires" fill="#c9a84c" radius={[0, 4, 4, 0]}>
                    {companiesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#c9a84c' : '#a78bfa'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="pt-8">
            <h3 className="text-lg font-medium text-white mb-6 text-center">Past Recruiters</h3>
            <div className="flex flex-wrap justify-center gap-3">
                {topCompanies.map((company) => (
                    <motion.div 
                        key={company}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-gold/50 hover:bg-gold/10 transition-all cursor-default text-sm shadow-lg backdrop-blur-sm"
                    >
                        {company}
                    </motion.div>
                ))}
            </div>
        </motion.div>
      </div>
    </div>
  );
}
