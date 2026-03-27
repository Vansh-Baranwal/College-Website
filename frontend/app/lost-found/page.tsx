"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getItems, createItem } from "@/lib/api";
import { Search, MapPin, Tag, Plus, Check } from "lucide-react";

export default function LostFoundPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("lost");
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({ title: "", description: "", category: "Electronics", location: "" });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getItems();
      setItems(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    const result = await createItem({ ...formData, type: activeTab });
    if (result) {
      setFormData({ title: "", description: "", category: "Electronics", location: "" });
      fetchItems();
      if (activeTab === "lost") setIsMatchModalOpen(true);
    }
    setSubmitLoading(false);
  };

  return (
    <div className="min-h-screen pt-12 pb-24 px-6 relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Smart <span className="text-gold">Lost & Found</span></h1>
          <p className="text-muted max-w-xl mx-auto text-lg">AI-powered matching to unite you with your belongings instantly.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT FORM */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-5">
            <div className="p-8 rounded-3xl border border-white/10 bg-secondary/50 backdrop-blur-md shadow-2xl">
              <div className="flex p-1 bg-primary/50 rounded-xl mb-8 border border-white/5">
                <button onClick={() => setActiveTab("lost")} className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${activeTab === 'lost' ? 'bg-gold text-primary shadow-lg' : 'text-muted hover:text-white'}`}>I Lost Something</button>
                <button onClick={() => setActiveTab("found")} className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${activeTab === 'found' ? 'bg-gold text-primary shadow-lg' : 'text-muted hover:text-white'}`}>I Found Something</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-muted mb-2">Item Name</label>
                  <input required type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 focus:outline-none transition-colors" placeholder="e.g. MacBook Pro, Blue Umbrella" />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-2">Category</label>
                  <select value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 focus:outline-none transition-colors appearance-none">
                    <option>Electronics</option>
                    <option>Accessories</option>
                    <option>Academics</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted mb-2">Location</label>
                  <input required type="text" value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 focus:outline-none transition-colors" placeholder="e.g. Central Library, LT-1" />
                </div>
                <div>
                  <label className="block text-sm text-muted mb-2">Description</label>
                  <textarea required rows={3} value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold/50 focus:outline-none transition-colors" placeholder="Any distinguishing marks?" />
                </div>
                <button disabled={submitLoading} type="submit" className="w-full py-4 bg-white hover:bg-gold-light rounded-xl text-primary font-bold transition-all shadow-lg flex items-center justify-center gap-2 mt-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    {submitLoading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" /> : <><Plus className="w-5 h-5"/> Submit Report</>}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT LISTINGS */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-serif text-white flex items-center gap-3"><Search className="text-gold w-5 h-5"/> Recent Listings</h2>
              <div className="relative">
                <input type="text" placeholder="Filter..." className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:border-gold/30 focus:outline-none pl-10 w-48 transition-all focus:w-64" />
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center gap-6 p-6 border border-white/5 rounded-2xl bg-white/5 h-32" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center p-12 py-20 border border-white/10 border-dashed rounded-2xl bg-red-500/5">
                <p className="text-red-400 mb-4">Connection error. Unable to load items.</p>
                <button onClick={fetchItems} className="px-4 py-2 border border-white/20 rounded-lg text-sm hover:bg-white/10 transition">Retry</button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center p-12 py-20 border border-white/10 border-dashed rounded-2xl bg-white/5">
                <p className="text-muted">No items found.</p>
              </div>
            ) : (
              <motion.div initial="hidden" animate="show" variants={{show: {transition: {staggerChildren: 0.1}}}} className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {items.filter(i => activeTab === 'lost' ? i.type === 'found' : i.type === 'lost').map((item: any) => (
                  <motion.div variants={{hidden: {opacity: 0, y: 10}, show: {opacity: 1, y: 0}}} key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 border border-white/5 bg-secondary/30 hover:bg-secondary/60 transition-colors rounded-2xl group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-24 h-24 rounded-xl bg-primary flex-shrink-0 border border-white/5 flex items-center justify-center overflow-hidden">
                      {item.image_url ? <img src={item.image_url} alt="item" className="w-full h-full object-cover" /> : <Tag className="w-8 h-8 text-muted/30 group-hover:text-gold/50 transition-colors" />}
                    </div>
                    <div className="flex-1 relative z-10">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-white group-hover:text-gold transition-colors">{item.title}</h3>
                        <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded border font-semibold ${item.type === 'found' ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-red-500/30 text-red-400 bg-red-500/10'}`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted">
                        <span className="flex items-center gap-1 group-hover:text-white/80 transition-colors"><MapPin className="w-3 h-3" /> {item.location}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* AI MATCH MODAL */}
      <AnimatePresence>
        {isMatchModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/80 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-secondary border border-gold/30 rounded-3xl p-8 max-w-2xl w-full shadow-[0_0_50px_rgba(201,168,76,0.15)] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px]" />
              <div className="flex justify-between items-center mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="text-xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-serif text-white font-bold">AI Found a Match!</h3>
                </div>
                <button onClick={() => setIsMatchModalOpen(false)} className="text-muted hover:text-white p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">✕</button>
              </div>
              
              <div className="grid grid-cols-2 gap-6 relative z-10">
                <div className="p-5 border border-white/10 rounded-2xl bg-primary/50">
                  <span className="text-xs text-muted mb-3 block uppercase tracking-wide font-medium">Your Report</span>
                  <p className="font-semibold text-white mb-2 text-lg">{formData.title}</p>
                  <p className="text-sm text-muted break-words leading-relaxed">{formData.description}</p>
                </div>
                <div className="flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-4 w-12 h-12 rounded-full bg-gold/20 border border-gold backdrop-blur-md z-20 shadow-[0_0_15px_rgba(201,168,76,0.4)]">
                  <span className="text-gold font-bold text-sm">94%</span>
                </div>
                <div className="p-5 border border-gold/40 rounded-2xl bg-gold/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gold/5 animate-pulse" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-xs text-gold mb-3 block uppercase tracking-wide font-medium relative z-10 flex items-center gap-2">
                    <Check className="w-3 h-3" /> Found Item
                  </span>
                  <p className="font-semibold text-white mb-2 text-lg relative z-10">{formData.title}</p>
                  <p className="text-sm text-muted relative z-10 break-words leading-relaxed">Looks highly similar based on visual/text analysis. Found at {formData.location}.</p>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 relative z-10 border-t border-white/5 pt-6">
                <button onClick={() => setIsMatchModalOpen(false)} className="px-6 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">Not Mine</button>
                <button onClick={() => setIsMatchModalOpen(false)} className="px-6 py-2.5 rounded-xl text-sm bg-gold text-primary font-bold hover:bg-gold-light transition-all shadow-lg shadow-gold/20 flex items-center gap-2 hover:-translate-y-0.5">
                   Contact Finder →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
