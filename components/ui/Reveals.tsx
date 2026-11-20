"use client";
// Reveal genérico para [data-reveal] e .reveal-card (fade + y curto)
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";

export default function Reveals() {
  const pathname = usePathname();
  useEffect(() => {
    if (reducedMotion()) return;
    const els = gsap.utils.toArray<HTMLElement>("[data-reveal], .reveal-card");
    gsap.set(els, { autoAlpha: 0, y: 40 });
    const triggers = ScrollTrigger.batch(els, {
      start: "top 88%",
      once: true,
      onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "expo.out", overwrite: true }),
    });
    return () => triggers.forEach((t) => t.kill());
  }, [pathname]);
  return null;
}
