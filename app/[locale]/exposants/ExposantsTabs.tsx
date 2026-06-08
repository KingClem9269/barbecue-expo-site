"use client";

import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface ExposantsTabsProps {
  tab2026: string;
  tab2027: string;
  message2027: string;
  list2027?: ReactNode;
}

export default function ExposantsTabs({
  tab2026,
  tab2027,
  message2027,
  list2027,
}: ExposantsTabsProps) {
  const [activeTab, setActiveTab] = useState<"2026" | "2027">("2027");
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  // Handle iframe auto-resize messages from Imagina
  useEffect(() => {
    function resizeIFrame(event: MessageEvent) {
      if (event.data && event.data.height && iframeContainerRef.current) {
        const iframe = iframeContainerRef.current.querySelector("iframe");
        if (iframe) {
          iframe.style.height = event.data.height + "px";
        }
      }
    }
    window.addEventListener("message", resizeIFrame);
    return () => window.removeEventListener("message", resizeIFrame);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16">
      {/* Tab buttons */}
      <div className="flex gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("2026")}
          className={`px-6 py-3 rounded-sm text-sm md:text-base font-bold uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === "2026"
              ? "bg-gold-500 text-ink-950"
              : "bg-ink-950/10 text-ink-900 hover:bg-ink-950/20"
          }`}
        >
          {tab2026}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("2027")}
          className={`px-6 py-3 rounded-sm text-sm md:text-base font-bold uppercase tracking-widest transition-all cursor-pointer ${
            activeTab === "2027"
              ? "bg-gold-500 text-ink-950"
              : "bg-ink-950/10 text-ink-900 hover:bg-ink-950/20"
          }`}
        >
          {tab2027}
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "2026" && (
        <div ref={iframeContainerRef}>
          <iframe
            scrolling="no"
            allow="geolocation"
            src="https://app.imagina.com/module/460795/112440?application_id=43669485"
            tabIndex={-1}
            style={{
              border: "none",
              width: "100%",
              display: "block",
              overflow: "hidden",
              minHeight: "800px",
            }}
            title="Exposants Barbecue Expo 2026"
          />
        </div>
      )}

      {activeTab === "2027" && (
        list2027 ? (
          <div>{list2027}</div>
        ) : (
          <div className="flex flex-col items-center justify-center py-14 md:py-20 text-center">
            <p
              className="text-ink-900 text-2xl md:text-3xl lg:text-4xl font-bold max-w-2xl leading-snug"
              style={{ fontFamily: "SansPlomb-98, sans-serif" }}
            >
              {message2027}
            </p>
          </div>
        )
      )}
    </section>
  );
}
