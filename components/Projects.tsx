"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Reveal from "./Reveal";
import { projects } from "@/lib/data";

/** Generated gradient "poster" used until real screenshots exist. */
export function Poster({ hue, title, className = "" }: { hue: number; title: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at 25% 20%, hsl(${hue} 90% 60% / .55), transparent 55%), radial-gradient(circle at 80% 85%, hsl(${hue + 60} 80% 55% / .45), transparent 55%), #121214`,
      }}
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <span className="absolute bottom-3 left-4 font-serif text-3xl italic text-white/90">{title}</span>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<string | null>(null);
  const [fine, setFine] = useState(false);
  // Preview card trails the cursor with a spring while a row is hovered
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 24 });
  const sy = useSpring(y, { stiffness: 200, damping: 24 });

  useEffect(() => {
    setFine(matchMedia("(pointer: fine)").matches);
  }, []);

  const move = (e: React.PointerEvent) => {
    x.set(e.clientX + 24);
    y.set(e.clientY - 120);
  };

  const current = projects.find((p) => p.slug === active);

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-6xl px-6 py-32" onPointerMove={fine ? move : undefined}>
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">/ builds</p>
      <h2 className="mb-16 text-4xl font-semibold tracking-tight md:text-6xl">
        Recent <span className="font-serif font-normal italic">builds</span>
      </h2>

      <ul className="border-b border-line">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Reveal delay={i * 0.06}>
              <Link
                href={`/projects/${p.slug}`}
                onPointerEnter={() => setActive(p.slug)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(p.slug)}
                onBlur={() => setActive(null)}
                className="group flex flex-col gap-3 border-t border-line py-8 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-sm text-mute">0{i + 1}</span>
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight transition-all duration-300 group-hover:translate-x-3 group-hover:text-accent md:text-5xl">
                      {p.title}
                      {p.featured && <span className="ml-3 align-middle font-mono text-xs font-normal text-accent">★ featured</span>}
                    </h3>
                    <p className="mt-2 max-w-xl text-mute md:hidden">{p.summary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 font-mono text-sm text-mute">
                  <span>{p.kind}</span>
                  {p.year && <span>{p.year}</span>}
                  <span className="text-xl transition-transform duration-300 group-hover:-rotate-45 group-hover:text-accent">→</span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {fine && current && (
          <motion.div
            key={current.slug}
            aria-hidden
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none fixed left-0 top-0 z-40 w-72 overflow-hidden rounded-xl border border-line shadow-2xl"
          >
            <Poster hue={current.hue} title={current.title} className="h-44" />
            <div className="bg-surface p-3 font-mono text-xs text-mute">{current.stack.slice(0, 4).join(" · ")}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
