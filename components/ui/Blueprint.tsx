"use client";
// Desenho técnico do caminhão-tanque que se desenha no scroll (DrawSVG) + chamadas de especificação
import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

type Spec = { valor: string; rotulo: string };

export default function Blueprint({ specs, dark = true }: { specs: Spec[]; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (reducedMotion()) return;
    const q = gsap.utils.selector(ref);
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 60%", scrub: 1 } });
    tl.from(q("[data-line]"), { drawSVG: "0%", duration: 1, stagger: 0.02, ease: "none" })
      .from(q("[data-tank-line]"), { drawSVG: "0%", duration: 1, ease: "none" }, 0.2)
      .from(q("[data-call]"), { drawSVG: "0%", duration: 0.4, stagger: 0.2, ease: "none" }, 0.8)
      .from(q("[data-spec]"), { autoAlpha: 0, x: -20, duration: 0.4, stagger: 0.2 }, 0.9);
  }, { scope: ref });

  const line = dark ? "#C9CED6" : "#8E97A6";
  return (
    <div ref={ref} className="relative">
      <svg viewBox="0 0 1000 300" className="h-auto w-full" fill="none" aria-hidden="true">
        <g stroke={line} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path data-line d="M40 270 H980" opacity=".5" />
          <path data-line d="M330 216 H950 V232 H330 Z" />
          <path data-line d="M800 216 V110 Q800 84 826 84 H898 Q922 84 936 110 L966 170 V216" />
          <path data-line d="M872 98 H900 Q912 98 920 114 L940 156 H872 Z" />
          <path data-line d="M954 180 h12 v40 h-12" />
          {[420, 500, 880].map((cx) => (
            <g key={cx}>
              <circle data-line cx={cx} cy="240" r="30" />
              <circle data-line cx={cx} cy="240" r="14" />
            </g>
          ))}
          <path data-line d="M380 216 a46 46 0 0 1 160 0" />
          <path data-line d="M560 232 h90 v20 h-90 z" />
          <path data-line d="M370 60 H770" />
          {[370, 470, 570, 670, 770].map((x) => <path key={x} data-line d={`M${x} 60 V76`} />)}
          <path data-line d="M352 80 V206 M368 80 V206" />
        </g>
        <rect data-tank-line x="340" y="76" width="450" height="136" rx="56" stroke={dark ? "var(--alfa-primary-glow)" : "var(--alfa-primary)"} strokeWidth="3" />
        <g stroke={dark ? "var(--alfa-accent)" : "var(--alfa-primary)"} strokeWidth="1.5" strokeDasharray="4 5">
          <path data-call d="M420 110 L300 70 H40" />
          <path data-call d="M520 180 L300 170 H40" />
        </g>
      </svg>
      <dl className="mt-6 grid grid-cols-2 gap-4 md:pointer-events-none md:absolute md:inset-0 md:mt-0 md:block">
        {specs.slice(0, 2).map((s, i) => (
          <div key={s.rotulo} data-spec className={`md:absolute md:left-[4%] ${i === 0 ? "md:top-[4%]" : "md:top-[37%]"}`}>
            <dt className="sr-only">{s.rotulo}</dt>
            <dd>
              <span className={`display block text-[clamp(22px,3vw,44px)] ${s.valor.includes("CONFIRMAR") ? "confirmar text-[clamp(16px,2vw,26px)]" : ""}`}>{s.valor}</span>
              <span className="label mt-2 block opacity-75">{s.rotulo}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
