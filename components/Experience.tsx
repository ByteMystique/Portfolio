"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "./Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  // The vertical line draws itself as the timeline scrolls through
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.7"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="relative z-10 mx-auto max-w-6xl px-6 py-32">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">/ path</p>
      <h2 className="mb-16 text-4xl font-semibold tracking-tight md:text-6xl">
        Where the <span className="font-serif font-normal italic">hours went</span>
      </h2>

      <ol ref={ref} className="relative ml-3 border-l border-line pl-10 md:ml-0 md:pl-16">
        <motion.span aria-hidden style={{ scaleY }} className="absolute -left-px top-0 h-full w-px origin-top bg-accent" />
        {experience.map((e) => (
          <li key={e.role + e.org} className="relative pb-20 last:pb-0">
            <span aria-hidden className="absolute -left-[46px] top-2 h-3 w-3 rounded-full border-2 border-accent bg-bg md:-left-[70px]" />
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-wider text-mute">
                {e.period} · {e.place}
              </p>
              <h3 className="mt-2 text-2xl font-semibold md:text-3xl">
                {e.role} <span className="font-serif font-normal italic text-accent">@ {e.org}</span>
              </h3>
              <ul className="mt-4 max-w-2xl space-y-2 text-mute">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="text-accent">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
