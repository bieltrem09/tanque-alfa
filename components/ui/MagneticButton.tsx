"use client";
import { useRef, type ReactNode } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";

export default function MagneticButton({ children, className = "", strength = 0.3 }: { children: ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || reducedMotion()) return;
    const r = ref.current!.getBoundingClientRect();
    gsap.to(ref.current, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength, duration: 0.4, ease: "power3.out" });
  };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
  return <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`inline-block ${className}`}>{children}</div>;
}
