"use client";
// Selo circular "QUERO O MEU ›" com anel de texto girando; hover: escala 1.06 + anel acelera
import { useId, useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

export default function SealButton({ href, label, ring, className = "" }: { href: string; label: string; ring: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const spin = useRef<gsap.core.Tween | null>(null);
  useGSAP(() => {
    if (reducedMotion()) return;
    spin.current = gsap.to(ref.current!.querySelector("[data-ring]"), { rotation: 360, duration: 16, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
  }, { scope: ref });
  const speed = (s: number) => spin.current && gsap.to(spin.current, { timeScale: s, duration: 0.4, ease: "power2.out" });
  const words = label.split(" ");
  const pid = "ring" + useId().replace(/:/g, "");
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => speed(4)}
      onMouseLeave={() => speed(1)}
      onFocus={() => speed(4)}
      onBlur={() => speed(1)}
      aria-label={`${label}: solicitar orçamento pelo WhatsApp`}
      className={`group relative grid aspect-square place-items-center rounded-full ${className}`}
    >
      <svg data-ring viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <defs><path id={pid} d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" /></defs>
        <text className="fill-white" style={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontSize: 11.5 }} textLength="548" lengthAdjust="spacing">
          <textPath href={`#${pid}`} textLength="548" lengthAdjust="spacing">{ring}</textPath>
        </text>
      </svg>
      <span className="relative grid aspect-square w-[74%] place-items-center rounded-full bg-white text-center text-primary shadow-[0_20px_50px_-15px_rgba(0,0,0,.5)] transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-[1.06] group-active:scale-95">
        <span className="display text-[clamp(28px,3vw,44px)] leading-[.9]">
          {words.slice(0, 1).join(" ")}<br />{words.slice(1).join(" ")}<br />›
        </span>
      </span>
      <svg viewBox="0 0 60 60" className="absolute -right-[14%] -top-[10%] w-[30%]" aria-hidden="true">
        <g stroke="var(--alfa-accent)" strokeWidth="5" strokeLinecap="round"><path d="M10 44 30 20" /><path d="M24 52 52 40" /><path d="M6 30 13 6" /></g>
      </svg>
    </a>
  );
}
