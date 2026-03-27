"use client";

import { motion } from "framer-motion";
import { Compass, MapPin, Search } from "lucide-react";

export default function CampusPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-0 overflow-hidden relative">
      {/* 360 Viewer Container */}
      <div className="w-full h-[calc(100vh-80px)] bg-black relative overflow-hidden group border-y border-white/10 mt-[-24px]">
        <iframe 
          src="/proxied-tour/screen1/" 
          className="w-full h-full border-none"
          title="Virtual Campus Tour"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}

