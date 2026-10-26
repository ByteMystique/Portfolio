import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { Poster } from "@/components/Projects";
import { projects } from "@/lib/data";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} — Jayadev Narayanan`, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <main id="main" className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-36">
      <Link href="/#projects" className="font-mono text-sm text-mute hover:text-accent">← All projects</Link>

      <Reveal>
        <p className="mt-10 font-mono text-xs uppercase tracking-widest text-accent">{p.year ? `${p.kind} · ${p.year}` : p.kind}</p>
        <h1 className="mt-3 text-5xl font-semibold leading-[0.95] tracking-tighter md:text-7xl">{p.title}</h1>
        <p className="mt-6 max-w-2xl text-xl text-mute">{p.summary}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
        {p.live ? (
          <a href={p.live} target="_blank" rel="noopener noreferrer" className="rounded-full bg-accent px-6 py-3 font-medium text-black">Open it ↗</a>
        ) : (
          <span className="rounded-full border border-dashed border-line px-6 py-3 font-mono text-sm text-mute">Going live soon</span>
        )}
        {p.code && (
          <a href={p.code} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line px-6 py-3 font-medium hover:border-accent hover:text-accent">Source ↗</a>
        )}
      </Reveal>

      {/* TODO: replace Poster with a real screenshot or video (public/projects/<slug>.png) */}
      <Reveal delay={0.15} className="mt-14">
        <Poster hue={p.hue} title={p.title} className="h-72 rounded-2xl border border-line md:h-96" />
      </Reveal>

      <Reveal className="mt-16 grid gap-10 md:grid-cols-[1fr_2fr]">
        <div className="space-y-8">
          {p.role && (
            <div>
              <h2 className="font-mono text-xs uppercase tracking-wider text-mute">Role</h2>
              <p className="mt-2">{p.role}</p>
            </div>
          )}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-mute">Stack</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-3 py-1 text-sm">{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="font-mono text-xs uppercase tracking-wider text-mute">Highlights</h2>
          <ul className="mt-3 space-y-3">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="text-accent">→</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Link href={`/projects/${next.slug}`} className="group mt-24 block border-t border-line pt-8">
        <p className="font-mono text-xs uppercase tracking-wider text-mute">Next project</p>
        <p className="mt-2 text-4xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-6xl">{next.title} →</p>
      </Link>
    </main>
  );
}
