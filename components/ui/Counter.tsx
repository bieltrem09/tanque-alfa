"use client";
import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

export default function Counter({ value, prefix = "", suffix = "", className = "" }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const from = value > 1000 ? value - 40 : 0;
    const o = { v: from };
    el.textContent = String(from);
    gsap.to(o, {
      v: value, duration: 1.6, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => { el.textContent = String(Math.round(o.v)); },
    });
  });
  return (
    <span className={className}>
      {prefix}<span ref={ref}>{value}</span>{suffix}
    </span>
  );
}
