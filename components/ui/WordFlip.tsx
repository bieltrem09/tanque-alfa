"use client";
// Palavra que gira (inspirado no "Text Word Flip" / "Dia Text" do 21st.dev), feito com GSAP:
// letras saem para cima e a próxima palavra entra de baixo com leve giro — só transform/opacity.
import { useEffect, useRef, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";

export default function WordFlip({ words, interval = 2400, className = "" }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (reducedMotion()) return;
    const id = setInterval(() => {
      const chars = ref.current?.querySelectorAll("[data-ch]");
      if (!chars?.length) return setI((n) => (n + 1) % words.length);
      gsap.to(chars, {
        yPercent: -100, opacity: 0, rotateX: 70, duration: 0.32, stagger: 0.018, ease: "power2.in",
        onComplete: () => setI((n) => (n + 1) % words.length),
      });
    }, interval);
    return () => clearInterval(id);
  }, [interval, words.length]);

  useEffect(() => {
    if (reducedMotion()) return;
    const chars = ref.current?.querySelectorAll("[data-ch]");
    if (chars?.length) gsap.fromTo(chars, { yPercent: 100, opacity: 0, rotateX: -70 }, { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.55, stagger: 0.025, ease: "back.out(1.6)" });
  }, [i]);

  return (
    <span className={`relative inline-grid align-bottom [perspective:600px] ${className}`}>
      <span className="sr-only">{words.join(", ")}</span>
      {/* reserva a largura da maior palavra: nada se mexe ao trocar */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">{longest}</span>
      <span ref={ref} key={i} aria-hidden="true" className="col-start-1 row-start-1 overflow-hidden whitespace-nowrap">
        {words[i].split("").map((c, k) => (
          <span key={k} data-ch className="inline-block will-change-transform">{c === " " ? " " : c}</span>
        ))}
      </span>
    </span>
  );
}
