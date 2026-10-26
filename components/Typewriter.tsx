"use client";

import { useEffect, useState } from "react";

/** Types each title out, pauses, deletes it, then moves to the next. Static first title under reduced motion. */
export default function Typewriter({ titles, className = "" }: { titles: string[]; className?: string }) {
  const [text, setText] = useState(titles[0]);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let n = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = titles[i];
      n += deleting ? -1 : 1;
      setText(full.slice(0, n));

      let delay = deleting ? 35 : 75;
      if (!deleting && n === full.length) {
        deleting = true;
        delay = 1600; // hold the finished title
      } else if (deleting && n === 0) {
        deleting = false;
        i = (i + 1) % titles.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };

    n = titles[0].length;
    deleting = true;
    timer = setTimeout(tick, 1800);
    return () => clearTimeout(timer);
  }, [titles]);

  return (
    <p className={className} aria-label={titles.join(", ")}>
      <span aria-hidden>
        <span className="text-accent">&gt; </span>
        {text}
        <span className="ml-0.5 inline-block w-[0.55ch] animate-pulse bg-accent align-middle">&nbsp;</span>
      </span>
    </p>
  );
}
