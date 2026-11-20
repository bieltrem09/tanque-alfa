"use client";
// Marquee infinito; pausa no hover; velocidade reage à velocidade do scroll (Lenis)
import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

export default function Marquee({ children, speed = 40 }: { children: React.ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (reducedMotion()) return;
    const track = ref.current!.querySelector<HTMLElement>("[data-track]")!;
    const tween = gsap.to(track, { xPercent: -50, duration: speed, ease: "none", repeat: -1 });
    let hover = false;
    const onTick = () => {
      const v = Math.abs(window.__lenis?.velocity ?? 0);
      const target = hover ? 0 : 1 + Math.min(v / 6, 5);
      tween.timeScale(gsap.utils.interpolate(tween.timeScale(), target, 0.08));
    };
    gsap.ticker.add(onTick);
    const el = ref.current!;
    const on = () => (hover = true), off = () => (hover = false);
    el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off);
    return () => { gsap.ticker.remove(onTick); el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); };
  }, { scope: ref });
  return (
    <div ref={ref} className="overflow-hidden">
      <div data-track className="flex w-max">
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
