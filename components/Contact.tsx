"use client";

import { useState } from "react";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";
import { profile } from "@/lib/data";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable; the mailto link still works */
    }
  };

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-32">
      <p className="mb-6 font-mono text-xs uppercase tracking-widest text-accent">/ say hi</p>
      <h2 className="text-5xl font-semibold leading-[0.95] tracking-tighter md:text-8xl">
        <SplitText text="Got a problem" inView />
        <br />
        <SplitText text="worth solving?" inView delay={0.2} className="font-serif font-normal italic text-accent" />
      </h2>

      <div className="mt-14 flex flex-wrap items-center gap-4">
        <Magnetic>
          <a href={`mailto:${profile.email}`} className="inline-block rounded-full bg-accent px-7 py-4 text-lg font-medium text-black">
            {profile.email}
          </a>
        </Magnetic>
        <button onClick={copy} className="rounded-full border border-line px-5 py-4 font-mono text-sm transition-colors hover:border-accent hover:text-accent">
          {copied ? "Copied ✓" : "Grab address"}
        </button>
      </div>

      <div className="mt-8 flex gap-6 font-mono text-sm text-mute">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub ↗</a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn ↗</a>
        <a href={profile.resume} className="hover:text-accent">Resume PDF ↓</a>
      </div>

      <footer className="mt-32 flex flex-col justify-between gap-2 border-t border-line pt-6 font-mono text-xs text-mute sm:flex-row">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with Next.js, Tailwind, Framer Motion &amp; Lenis</p>
      </footer>
    </section>
  );
}
