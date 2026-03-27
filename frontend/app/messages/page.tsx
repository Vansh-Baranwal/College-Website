"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Paperclip, Search, Star, Clock, User, Users } from "lucide-react";

const threads = [
  { id: 1, sender: "Academic Section", subject: "Semester Registration Confirmation", preview: "Your registration for Spring 2026 has been confirmed...", time: "10:32 AM", unread: true, starred: true },
  { id: 2, sender: "Prof. S. Banerjee", subject: "RE: Project Submission Deadline", preview: "The deadline has been extended to April 5th...", time: "Yesterday", unread: true, starred: false },
  { id: 3, sender: "Hostel Office", subject: "Room Allotment Notice", preview: "Your room for the upcoming session is Jwalamukhi A-204...", time: "Mar 25", unread: false, starred: false },
  { id: 4, sender: "Placement Cell", subject: "Google — Interview Schedule", preview: "Your interview is scheduled for March 30 at 2:00 PM...", time: "Mar 24", unread: false, starred: true },
  { id: 5, sender: "Library", subject: "Book Return Reminder", preview: "The following book is due for return: 'Intro to Algorithms'...", time: "Mar 22", unread: false, starred: false },
  { id: 6, sender: "Dean of Students", subject: "Annual Sports Day Registration", preview: "Register for the annual sports day before March 28...", time: "Mar 20", unread: false, starred: false },
];

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = threads.find(t => t.id === selectedId);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-5xl mx-auto space-y-8 relative z-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <MessageSquare className="w-7 h-7 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">Messages</h1>
            <p className="text-muted text-sm mt-0.5">{threads.filter(t => t.unread).length} unread messages</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 min-h-[60vh]">
          {/* Thread List */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-white/5">
              <div className="relative">
                <input type="text" placeholder="Search messages..." className="w-full bg-black/20 border border-white/5 rounded-xl py-2.5 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors" />
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {threads.map((thread, i) => (
                <motion.div
                  key={thread.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelectedId(thread.id)}
                  className={`px-4 py-4 border-b border-white/5 cursor-pointer transition-all group ${selectedId === thread.id ? 'bg-gold/10 border-l-2 border-l-gold' : 'hover:bg-white/5'}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm font-semibold truncate ${thread.unread ? 'text-white' : 'text-white/70'}`}>{thread.sender}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      {thread.starred && <Star className="w-3 h-3 text-gold fill-gold" />}
                      <span className="text-[10px] text-muted">{thread.time}</span>
                    </div>
                  </div>
                  <p className={`text-xs truncate ${thread.unread ? 'text-white/80 font-medium' : 'text-muted'}`}>{thread.subject}</p>
                  <p className="text-[11px] text-muted truncate mt-0.5">{thread.preview}</p>
                  {thread.unread && <div className="w-2 h-2 bg-blue-400 rounded-full absolute right-4 top-1/2 -translate-y-1/2" />}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Message Detail */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
            {selected ? (
              <>
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">{selected.subject}</h2>
                      <p className="text-sm text-gold">{selected.sender}</p>
                      <p className="text-xs text-muted mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{selected.time}</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-white/10 transition-colors"><Star className={`w-5 h-5 ${selected.starred ? 'text-gold fill-gold' : 'text-muted'}`} /></button>
                  </div>
                  <div className="bg-black/20 rounded-2xl p-6 border border-white/5 text-white/80 leading-relaxed text-sm">
                    <p className="mb-4">Dear Student,</p>
                    <p className="mb-4">{selected.preview} This is a detailed message from {selected.sender} regarding the above subject. Please take note of the required actions and deadlines mentioned.</p>
                    <p className="mb-4">For any queries, please don&apos;t hesitate to reach out to the concerned department during working hours.</p>
                    <p>Best regards,<br /><span className="text-gold">{selected.sender}</span><br />IIT Delhi</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <input type="text" placeholder="Type a reply..." className="flex-1 bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors" />
                  <button className="px-4 py-3 bg-gold/20 border border-gold/30 rounded-xl hover:bg-gold hover:text-primary transition-colors"><Send className="w-5 h-5 text-gold" /></button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageSquare className="w-16 h-16 text-white/10 mb-4" />
                <p className="text-muted text-lg">Select a message to read</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
