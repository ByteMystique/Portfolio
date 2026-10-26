"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";

const HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";
const W = 128;
const H = 148;
const PX = W + 6; // horizontal pitch between hexes
const PY = H * 0.75 + 6; // vertical pitch between rows

const Icons = {
  github: (
    <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor" aria-hidden>
      <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.300 3.500 1 .1-.8.4-1.300.8-1.600-2.700-.3-5.500-1.300-5.500-5.900 0-1.300.5-2.400 1.200-3.200-.1-.3-.5-1.500.1-3.200 0 0 1-.3 3.300 1.200a11.500 11.500 0 0 1 6 0C17.300 4.700 18.300 5 18.300 5c.7 1.700.3 2.900.1 3.200.8.800 1.200 1.900 1.200 3.200 0 4.600-2.800 5.600-5.500 5.900.4.400.8 1.100.8 2.200v3.300c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-9 w-9" fill="currentColor" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="3" opacity=".9" />
      <text x="12" y="17" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="Arial, sans-serif" fill="#0a0a0b">in</text>
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      <rect x="2.500" y="5" width="19" height="14" rx="2.500" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      <path d="M6 2.500h8l5 5V21a.5.5 0 0 1-.5.5h-12A.5.5 0 0 1 6 21z" />
      <path d="M14 2.500V8h5.500M9 14h6M9 17.500h6" />
    </svg>
  ),
};

type Tile = {
  key: string;
  label: string;
  href: string;
  icon: keyof typeof Icons;
  col: number;
  row: number;
  external?: boolean;
  solid?: boolean; // filled lime hex (the "featured" tile)
};

// Honeycomb layout: odd rows are shifted half a hex to the right
const tiles: Tile[] = [
  { key: "github", label: "GitHub", href: profile.github, icon: "github", col: 0, row: 0, external: true },
  { key: "linkedin", label: "LinkedIn", href: profile.linkedin, icon: "linkedin", col: 1, row: 0, external: true },
  { key: "email", label: "Email", href: `mailto:${profile.email}`, icon: "mail", col: 0.5, row: 1, solid: true },
  { key: "resume", label: "Resume", href: profile.resume, icon: "file", col: 1.5, row: 2 },
];

const pos = (col: number, row: number) => ({ left: col * PX, top: row * PY });

/** Hexagon link cluster with an empty slot reserved for a profile photo. */
export default function Honeycomb() {
  const reduce = useReducedMotion();

  return (
    <div className="relative" style={{ width: PX * 2.5 + W / 2, height: PY * 2 + H }}>
      {/* Faint decorative hexes to complete the comb */}
      {[{ col: 0, row: 2 }, { col: 2, row: 1 }].map((g) => (
        <div key={`${g.col}-${g.row}`} aria-hidden className="absolute bg-line/70" style={{ width: W, height: H, clipPath: HEX, ...pos(g.col, g.row) }}>
          <div className="absolute inset-px bg-bg" style={{ clipPath: HEX }} />
        </div>
      ))}

      {/* Photo slot. TODO: set profile.photo in lib/data.ts (e.g. "/me.jpg") and drop the file in /public */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute"
        style={{ width: W, height: H, ...pos(1, 1) }}
      >
        <div className="absolute inset-0 bg-accent/40" style={{ clipPath: HEX }}>
          <div className="absolute inset-[2px] flex items-center justify-center bg-surface" style={{ clipPath: HEX }}>
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              <span className="px-4 text-center font-mono text-[10px] uppercase leading-tight tracking-wider text-mute">your<br />photo<br />here</span>
            )}
          </div>
        </div>
      </motion.div>

      {tiles.map((t, i) => (
        <motion.div
          key={t.key}
          className="absolute"
          style={{ width: W, height: H, ...pos(t.col, t.row) }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: reduce ? 0 : [0, -6, 0] }}
          transition={{
            opacity: { delay: 0.5 + i * 0.12, duration: 0.6 },
            scale: { delay: 0.5 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            y: { delay: 1.5 + i * 0.4, duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <a
            href={t.href}
            aria-label={t.label}
            {...(t.external ? { target: "_blank", rel: "noopener noreferrer" } : t.key === "resume" ? { download: "" } : {})}
            className="group absolute inset-0 block transition-transform duration-300 hover:scale-110 focus-visible:scale-110 focus-visible:outline-none"
          >
            <span
              className={`absolute inset-0 transition-[filter,background-color] duration-300 ${t.solid ? "bg-accent" : "bg-accent/40 group-hover:bg-accent"} drop-shadow-[0_0_14px_rgba(198,255,61,0.35)] group-hover:drop-shadow-[0_0_22px_rgba(198,255,61,0.7)]`}
              style={{ clipPath: HEX }}
            >
              <span
                className={`absolute inset-[2px] flex flex-col items-center justify-center gap-1 transition-colors duration-300 ${
                  t.solid ? "bg-accent text-black" : "bg-bg text-accent"
                }`}
                style={{ clipPath: HEX }}
              >
                {Icons[t.icon]}
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  {t.label}
                </span>
              </span>
            </span>
          </a>
        </motion.div>
      ))}
    </div>
  );
}
