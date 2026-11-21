"use client";
// Reveal genérico para [data-reveal] e .reveal-card (fade + y curto)
// + rótulos "/ SEÇÃO" que se "decodificam" ao aparecer (padrão "Scramble Text" do 21st.dev).
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#+";

function scramble(el: HTMLElement) {
  const final = el.textContent ?? "";
  if (!final.trim()) return;
  const w = el.getBoundingClientRect().width; // leitura antes das escritas
  el.setAttribute("aria-label", final);
  el.style.display = "inline-block";
  el.style.minWidth = `${w}px`;
  const o = { p: 0 };
  gsap.to(o, {
    p: 1, duration: 0.7, ease: "none",
    onUpdate: () => {
      const n = Math.floor(o.p * final.length);
      let s = final.slice(0, n);
      for (let i = n; i < final.length; i++) s += final[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      el.textContent = s;
    },
    onComplete: () => { el.textContent = final; el.removeAttribute("aria-label"); el.style.minWidth = ""; },
  });
}

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
    // rótulos de seção (só texto puro, fora das cenas pinadas)
    const labels = gsap.utils.toArray<HTMLElement>(".label-slash").filter((l) => l.childElementCount === 0 && !l.closest("[data-stage]"));
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); scramble(e.target as HTMLElement); } }), { rootMargin: "0px 0px -12% 0px" });
    labels.forEach((l) => io.observe(l));
    return () => { triggers.forEach((t) => t.kill()); io.disconnect(); };
  }, [pathname]);
  return null;
}
