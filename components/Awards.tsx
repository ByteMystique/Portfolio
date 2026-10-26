import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import { awards } from "@/lib/data";

export default function Awards() {
  return (
    <section id="awards" className="relative z-10 mx-auto max-w-6xl px-6 py-32">
      <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">/ trophies</p>
      <h2 className="mb-16 text-4xl font-semibold tracking-tight md:text-6xl">
        Podium <span className="font-serif font-normal italic">finishes</span>
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {awards.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.08}>
            <SpotlightCard className="flex h-full items-center gap-6 p-6">
              <span className={`font-serif text-6xl italic ${a.place === "1st" ? "text-accent" : "text-fg"}`}>{a.place}</span>
              <div>
                <h3 className="text-xl font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-mute">{a.org}</p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
