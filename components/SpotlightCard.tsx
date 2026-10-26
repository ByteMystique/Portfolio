"use client";

import { useRef } from "react";

/** Card whose border-glow follows the pointer (see .spot in globals.css). */
export default function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onPointerMove={move} className={`spot rounded-2xl border border-line bg-surface ${className}`}>
      {children}
    </div>
  );
}
