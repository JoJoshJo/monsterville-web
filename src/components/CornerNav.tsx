"use client";

import { Calendar, Briefcase, ShoppingBag, Send } from "lucide-react";

/**
 * Corner navigation frame (DESIGN-DIRECTION.md Move 8).
 * Desktop: four quiet serif words pinned to the viewport corners — the nav
 * frames the artwork like a gallery mat instead of sitting in a header bar.
 * Mobile: collapses into a fixed bottom bar (solves IMPROVEMENTS.md B1).
 */

const ITEMS = [
  { label: "Work", id: "work", icon: Briefcase, corner: "top-0 left-0" },
  { label: "Book", id: "book", icon: Calendar, corner: "top-0 right-0 text-right" },
  { label: "Shop", id: "shop", icon: ShoppingBag, corner: "bottom-0 left-0" },
  { label: "Join", id: "join", icon: Send, corner: "bottom-0 right-0 text-right" },
];

export default function CornerNav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop: corner words */}
      {ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          className={`hidden md:block fixed z-[500] p-8 font-editorial text-xl text-white mix-blend-difference hover:italic hover:text-[#FF5A1F] transition-colors duration-300 ${item.corner}`}
        >
          {item.label}
        </button>
      ))}

      {/* Mobile: bottom bar */}
      <nav
        aria-label="Primary"
        className="md:hidden fixed bottom-0 inset-x-0 z-[500] bg-[#080808]/85 backdrop-blur-xl border-t border-white/10 flex justify-around pb-[env(safe-area-inset-bottom)]"
      >
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center gap-1 py-3 px-5 min-w-[64px] text-[#EDEDED]/70 active:text-[#FF5A1F]"
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              <span className="text-[10px] uppercase tracking-widest font-mono">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
