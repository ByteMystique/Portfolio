"use client";

import { useRef } from "react";
import { motion, MotionValue, animate, useInView, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";
import { profile, stats } from "@/lib/data";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

function Counter({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const n = useMotionValue(0);
  const rounded = useTransform(n, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) animate(n, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
  }, [inView, n, to]);

  return (
    <div ref={ref} className="border-t border-line pt-4">
      <motion.p className="font-serif text-5xl italic text-accent">{rounded}</motion.p>
      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-mute">{label}</p>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  // Words light up one by one as the paragraph scrolls through the viewport
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = profile.about.split(" ");

  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-40">
      <p className="mb-10 font-mono text-xs uppercase tracking-widest text-accent">/ intro</p>
      <p ref={ref} className="text-3xl font-medium leading-snug tracking-tight md:text-5xl md:leading-[1.15]">
        {words.map((w, i) => {
          const start = i / words.length;
          return <Word key={i} word={w} range={[start, start + 1 / words.length]} progress={scrollYProgress} />;
        })}
      </p>
      <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <Counter key={s.label} to={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
}
