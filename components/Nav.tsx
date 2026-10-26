"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { profile } from "@/lib/data";

const links = [
  { href: "/#about", label: "Intro" },
  { href: "/#experience", label: "Path" },
  { href: "/#projects", label: "Builds" },
  { href: "/#awards", label: "Trophies" },
  { href: "/#contact", label: "Say hi" },
];

/** Floating nav: hides while scrolling down, returns on scroll up. */
export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 120);
  });

  return (
    <motion.header
      animate={{ y: hidden ? -90 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        aria-label="Primary"
        className="flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-line bg-bg/70 px-5 py-2.5 backdrop-blur-md"
      >
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          JN<span className="text-accent">.</span>
        </Link>
        <ul className="hidden items-center gap-6 text-sm text-mute md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-fg">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.resume}
          className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-black transition-transform hover:scale-105"
        >
          Grab resume
        </a>
      </nav>
    </motion.header>
  );
}
