"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";
import Typewriter from "./Typewriter";
import Honeycomb from "./Honeycomb";
import { marquee, profile } from "@/lib/data";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax: headline drifts up and fades as you scroll away
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pt-32">
      <div aria-hidden className="bg-grid absolute inset-0 -z-0" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="absolute right-0 top-0 hidden lg:block">
          <Honeycomb />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-mute"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for internships and full-time roles
        </motion.p>

        <h1 className="text-[clamp(3.5rem,13vw,11rem)] lg:text-[clamp(4rem,8.5vw,8.5rem)] font-semibold leading-[0.9] tracking-tighter">
          <SplitText text={profile.first} delay={0.15} />
          <br />
          <SplitText text={profile.last} delay={0.35} className="font-serif font-normal italic text-accent" />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 flex flex-col gap-8"
        >
          <Typewriter titles={profile.titles} className="font-mono text-xl text-fg md:text-3xl" />
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a href="#projects" className="inline-block rounded-full bg-accent px-6 py-3 font-medium text-black">
                See the builds ↓
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="inline-block rounded-full border border-line px-6 py-3 font-medium transition-colors hover:border-accent hover:text-accent">
                Say hello
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>

      <div className="marquee relative z-10 -mx-6 mt-16 overflow-hidden border-y border-line py-4" aria-hidden>
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-widest text-mute">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10">
              {m} <span className="text-accent">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
