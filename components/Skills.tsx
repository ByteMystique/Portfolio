import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 mx-auto max-w-6xl px-6 py-32">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">/ craft</p>
      <h2 className="mb-16 text-4xl font-semibold tracking-tight md:text-6xl">
        My everyday <span className="font-serif font-normal italic">kit</span>
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={i * 0.08}>
            <SpotlightCard className="h-full p-6">
              <h3 className="mb-4 font-mono text-sm uppercase tracking-wider text-mute">{s.group}</h3>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li key={it} className="rounded-full border border-line px-3 py-1 text-sm transition-colors hover:border-accent hover:text-accent">
                    {it}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
