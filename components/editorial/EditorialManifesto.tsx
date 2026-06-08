"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

export interface EditorialReason {
  number: string;
  title: string;
  body: string;
  image: string;
}

export interface EditorialManifestoProps {
  eyebrow: string;
  heroImage: string;
  heroTitle: { line1: string; line2_highlight: string; line3: string };
  heroSubtitle: string;
  reasons: EditorialReason[];
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  closingQuote?: string;
}

/**
 * EditorialManifesto — reusable scroll-narrative layout.
 *
 * Used for /pourquoi-visiter, /pourquoi-exposer, etc.
 * Each "reason" is its own full-width photo + text block, alternating
 * left/right, with a numbered marker. Closing quote optional.
 */
export default function EditorialManifesto({
  eyebrow,
  heroImage,
  heroTitle,
  heroSubtitle,
  reasons,
  cta,
  ctaSecondary,
  closingQuote,
}: EditorialManifestoProps) {
  return (
    <article className="bg-cream-50">
      {/* Hero */}
      <section className="relative w-full min-h-[100dvh] overflow-hidden bg-ink-950">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent"
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28 flex flex-col justify-end min-h-[100dvh]">
          <div className="flex items-center gap-3 text-gold-500 text-xs md:text-sm uppercase tracking-widest font-semibold mb-10 md:mb-14">
            <span className="inline-block w-8 h-px bg-gold-500" aria-hidden="true" />
            {eyebrow}
          </div>

          <h1
            className="text-cream-50 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.92] tracking-tight font-bold max-w-5xl"
            style={{ fontFamily: "SansPlomb-98, sans-serif" }}
          >
            <span className="block">{heroTitle.line1}</span>
            <span className="block text-gold-500">{heroTitle.line2_highlight}</span>
            <span className="block">{heroTitle.line3}</span>
          </h1>

          <p className="mt-10 md:mt-14 text-cream-50/90 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl font-light">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Reasons — alternating photo / text */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20 space-y-24 md:space-y-40">
        {reasons.map((r, i) => {
          const reverse = i % 2 === 1;
          return (
            <div
              key={r.number}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="lg:col-span-7 relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={r.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-5">
                <div
                  className="text-gold-600 text-sm md:text-base font-bold tabular-nums mb-4"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  — {r.number}
                </div>
                <h2
                  className="text-ink-900 text-3xl md:text-4xl lg:text-5xl leading-tight font-bold mb-6"
                  style={{ fontFamily: "SansPlomb-98, sans-serif" }}
                >
                  {r.title}
                </h2>
                <p className="text-ink-600 text-base md:text-lg leading-relaxed">
                  {r.body}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Optional closing quote */}
      {closingQuote && (
        <section className="bg-ink-950 py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
            <span
              className="block text-gold-500 text-5xl md:text-7xl leading-none mb-6"
              aria-hidden="true"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              «
            </span>
            <p
              className="text-cream-50 text-2xl md:text-3xl lg:text-4xl leading-snug italic"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {closingQuote}
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-cream-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row gap-4">
          <Link
            href={cta.href}
            className="group inline-flex items-center gap-4 bg-gold-500 hover:bg-gold-300 text-ink-950 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
          >
            <span>{cta.label}</span>
            <ArrowUpRight
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={2.5}
            />
          </Link>
          {ctaSecondary && (
            <Link
              href={ctaSecondary.href}
              className="group inline-flex items-center gap-4 border border-ink-900/30 hover:border-gold-500 text-ink-900 hover:text-gold-700 px-6 sm:px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-sm sm:text-base transition-colors"
            >
              <span>{ctaSecondary.label}</span>
              <ArrowUpRight
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={2}
              />
            </Link>
          )}
        </div>
      </section>
    </article>
  );
}
