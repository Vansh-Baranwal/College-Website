"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, FileText, CheckCircle, Search, User, CreditCard, Award, Heart } from "lucide-react";

const navGroups = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Timetable", href: "/dashboard/timetable", icon: Calendar },
      { name: "Assignments", href: "/dashboard/assignments", icon: FileText },
      { name: "Grades", href: "/dashboard/grades", icon: CheckCircle },
    ]
  },
  {
    title: "Campus",
    items: [
      { name: "Lost & Found", href: "/lost-found", icon: Search },
      { name: "Mental Health", href: "/mental-health", icon: Heart },
      { name: "Events", href: "/events", icon: Calendar },
    ]
  },
  {
    title: "Profile",
    items: [
      { name: "Digital ID", href: "/id", icon: CreditCard },
      { name: "Certificates", href: "/certificates", icon: Award },
      { name: "Settings", href: "/dashboard/settings", icon: User },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/5 bg-secondary/30 backdrop-blur-xl h-full fixed hidden lg:flex flex-col overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-serif font-semibold text-white mb-2">Portal</h2>
        <p className="text-muted text-xs">Student Interface</p>
      </div>

      <nav className="flex-1 px-4 space-y-8 pb-8">
        {navGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4 px-2">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-gold/10 text-gold font-medium border border-gold/20"
                          : "text-muted hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
