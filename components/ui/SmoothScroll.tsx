"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";
import { usePathname } from "next/navigation";

declare global {
  interface Window { __lenis?: Lenis }
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (reducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // um único ScrollTrigger.refresh depois que fontes E página estiverem prontas (refresh é caro com várias cenas pinadas)
  useEffect(() => {
    let done = false;
    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true })),
    ]);
    ready.then(() => { if (!done) requestAnimationFrame(() => ScrollTrigger.refresh()); });
    return () => { done = true; };
  }, [pathname]);

  useEffect(() => {
    if (window.location.hash) return;
    window.__lenis ? window.__lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
