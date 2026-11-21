"use client";
// Faixa de palavras gigantes que reage à velocidade do scroll (padrão "Scroll Velocity Text" do 21st.dev).
// Duas linhas em sentidos opostos; a velocidade vem do Lenis. Só transform.
import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

export default function VelocityWords({ words }: { words: string[] }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion()) return;
    const rows = gsap.utils.toArray<HTMLElement>("[data-row]", ref.current);
    const pos = rows.map(() => 0);
    let dir = 1, visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(ref.current!);
    const tick = (_t: number, dt: number) => {
      if (!visible) return;
      const v = window.__lenis?.velocity ?? 0;
      if (Math.abs(v) > 0.3) dir = v > 0 ? 1 : -1;
      const speed = (0.035 + Math.min(Math.abs(v) * 0.012, 0.35)) * dt; // % por frame
      rows.forEach((row, k) => {
        pos[k] = gsap.utils.wrap(-50, 0, pos[k] + (k ? 1 : -1) * dir * speed);
        gsap.set(row, { xPercent: pos[k] });
      });
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); io.disconnect(); };
  }, { scope: ref });

  const line = words.join(" • ") + " • ";
  return (
    <section ref={ref} aria-label={words.join(", ")} className="overflow-hidden bg-paper py-10 md:py-16">
      {[0, 1].map((k) => (
        <div key={k} data-row aria-hidden="true" className="flex w-max whitespace-nowrap will-change-transform">
          {[0, 1].map((c) => (
            <span key={c} className={`display pr-[0.3em] text-[clamp(56px,11vw,180px)] leading-[1.02] ${k ? "text-transparent [-webkit-text-stroke:2px_var(--alfa-primary)]" : "text-ink"}`}>
              {line}
            </span>
          ))}
        </div>
      ))}
    </section>
  );
}
