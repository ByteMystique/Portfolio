"use client";

import { motion } from "framer-motion";

/** Words slide up out of a clipping mask, staggered. Use for big headlines. */
export default function SplitText({
  text,
  className,
  delay = 0,
  inView = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  inView?: boolean;
}) {
  const words = text.split(" ");
  const anim = inView
    ? { whileInView: "show" as const, viewport: { once: true, margin: "-60px" } }
    : { animate: "show" as const };
  return (
    <motion.span
      className={className}
      initial="hide"
      {...anim}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] pr-[0.14em] -mr-[0.14em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hide: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
