import Link from "next/link";
import { modules } from "@/content/modules";
import { SectionPreview } from "@/components/modules/SectionPreview";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      {/* Hero */}
      <div className="mb-20">
        <h1 className="mb-4 font-mono text-[42px] font-normal tracking-tight text-ink md:text-[52px]">
          AI for Normies
        </h1>
        <p className="mb-3 text-[17px] leading-[1.8] text-ink-light">
          The AI concepts you actually need&mdash;explained without the jargon.
        </p>
        <p className="text-[15px] leading-[1.8] text-ink-muted">
          For anyone who isn&apos;t a developer by training, but wants to be a
          builder by choice.
        </p>
      </div>

      {/* Hero image placeholder */}
      <div className="mb-20">
        <img
          src="/images/hero.png"
          alt="Retro technical illustration of a person at a desk with floating AI concept bubbles — a brain, a gear, a database — connected by thin lines"
          className="w-full rounded border border-border/30"
        />
      </div>

      {/* Divider */}
      <hr className="mb-16 border-border" />

      {/* Table of Contents */}
      <section className="mb-20">
        <h2 className="mb-10">
          <span className="font-serif text-[20px] text-ink">
            Table of Contents.
          </span>
          <sup className="ml-1 font-mono text-[11px] text-ink-muted">
            v1.0
          </sup>
        </h2>

        <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {modules.map((m, i) => {
            const num = String(i + 1).padStart(2, "0");
            const isLive = m.status === "live";

            return (
              <div key={m.slug}>
                {isLive ? (
                  <Link href={`/${m.slug}`} className="group block">
                    <div className="mb-1 flex items-baseline gap-2">
                      <span className="font-mono text-[14px] text-ink-muted">
                        {num}
                      </span>
                      <h3 className="font-mono text-[14px] text-ink decoration-ink-muted underline-offset-2 group-hover:underline">
                        {m.subtitle}
                      </h3>
                    </div>
                    <p className="text-[13px] leading-relaxed text-ink-light">
                      {m.description}
                    </p>
                  </Link>
                ) : (
                  <div>
                    <div className="mb-1 flex items-baseline gap-2">
                      <span className="font-mono text-[14px] text-ink-muted">
                        {num}
                      </span>
                      <h3 className="font-mono text-[14px] text-ink">
                        {m.subtitle}
                      </h3>
                    </div>
                    <p className="text-[13px] leading-relaxed text-ink-light">
                      {m.description}
                    </p>
                  </div>
                )}

                <div className="mt-2">
                  {isLive && m.sections ? (
                    <SectionPreview
                      sectionCount={m.sectionCount!}
                      readMinutes={m.readMinutes!}
                      sections={m.sections}
                    />
                  ) : (
                    <span className="font-mono text-[11px] text-ink-muted">
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
