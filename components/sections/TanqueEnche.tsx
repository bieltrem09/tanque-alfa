"use client";
// Transição "tanque enchendo" (mesma ideia do preloader): a tela fica fixa enquanto um líquido cobalto
// com onda e bolhas sobe; o título vazado ganha preenchimento onde o líquido passa e um medidor vai de 0 a 100%.
// Ao encher, a tela inteira está na cor exata do topo da seção do WhatsApp, que entra logo abaixo sem emenda.
import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

const TITULO = ["Agora é com você:", "vamos fabricar", "o seu tanque?"];
const LIQ = "linear-gradient(180deg,#2a4bff 0%,#0a24e6 35%,#061CE0 60%,#0414a8 100%)";
const WAVE = "M0 30 Q 75 0 150 30 T 300 30 T 450 30 T 600 30 T 750 30 T 900 30 T 1050 30 T 1200 30 V60 H0Z";

function Titulo({ solid }: { solid?: boolean }) {
  return (
    <p aria-hidden={solid ? undefined : true} className={`display text-center text-[clamp(52px,9vw,168px)] leading-[0.92] ${solid ? "text-white" : "text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,.35)]"}`}>
      {TITULO.map((l) => <span key={l} className="block">{l}</span>)}
    </p>
  );
}

export default function TanqueEnche() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const q = gsap.utils.selector(ref);
    if (reducedMotion()) { gsap.set(q("[data-liq]"), { y: 0, yPercent: 0 }); gsap.set(q("[data-fill-txt]"), { clipPath: "inset(0% 0 0 0)" }); return; }
    const pct = q("[data-pct]")[0];
    const o = { v: 0 };
    gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: 0.5 } })
      .fromTo(q("[data-liq]"), { y: 0, yPercent: 100 }, { y: 0, yPercent: 0, ease: "none", duration: 1 }, 0)
      .fromTo(q("[data-fill-txt]"), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", ease: "none", duration: 1 }, 0)
      .to(o, { v: 100, ease: "none", duration: 1, onUpdate: () => { pct.textContent = String(Math.round(o.v)); } }, 0)
      .fromTo(q("[data-gauge]"), { scaleY: 0 }, { scaleY: 1, ease: "none", duration: 1 }, 0)
      .to(q("[data-hint]"), { autoAlpha: 0, duration: 0.1 }, 0.05)
      .fromTo(q("[data-done]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.9);
  }, { scope: ref });

  return (
    <section ref={ref} aria-label="Próximo passo: fale com a fábrica" className="relative h-[260svh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden text-white">
        {/* título vazado (tanque vazio) */}
        <div className="absolute inset-0 grid place-items-center px-4"><Titulo /></div>

        {/* líquido subindo: corpo + onda + bolhas */}
        <div data-liq className="absolute inset-0 will-change-transform" style={{ transform: "translateY(100%)" }} aria-hidden="true">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute -top-[38px] left-0 h-[40px] w-[200%] animate-[onda_3.2s_linear_infinite]">
            <path d={WAVE} fill="#2a4bff" />
          </svg>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="absolute -top-[26px] left-[-50%] h-[30px] w-[200%] opacity-60 animate-[onda_5s_linear_infinite_reverse]">
            <path d={WAVE} fill="#5c77ff" />
          </svg>
          <div className="absolute inset-0" style={{ background: LIQ }} />
          {[8, 17, 29, 41, 55, 63, 72, 84, 93].map((x, i) => (
            <span key={x} className="absolute bottom-0 rounded-full border border-white/40 bg-white/10 animate-[bolha-sobe_linear_infinite]"
              style={{ left: `${x}%`, width: 6 + (i % 4) * 5, height: 6 + (i % 4) * 5, animationDuration: `${4 + (i % 5)}s`, animationDelay: `${-i * 0.7}s` }} />
          ))}
        </div>

        {/* título preenchido onde o líquido já chegou */}
        <div data-fill-txt className="absolute inset-0 grid place-items-center px-4" style={{ clipPath: "inset(100% 0 0 0)" }}><Titulo solid /></div>

        {/* medidor de nível, como no preloader */}
        <div className="absolute bottom-[8svh] left-4 flex items-end gap-3 md:left-8" aria-hidden="true">
          <span className="relative block h-[22svh] w-2 overflow-hidden rounded-full bg-white/15"><span data-gauge className="absolute inset-0 origin-bottom rounded-full bg-accent" /></span>
          <span className="leading-none">
            <span className="label block text-[11px] text-white/70">Nível do tanque</span>
            <span className="display text-[clamp(40px,4vw,64px)]"><span data-pct>0</span>%</span>
          </span>
        </div>
        <p data-hint className="label absolute bottom-[8svh] right-4 hidden md:block text-[11px] text-white/60 md:right-8">Role para encher ↓</p>
        <p data-done className="label absolute bottom-[8svh] right-4 hidden md:block text-[11px] text-accent opacity-0 md:right-8">Tanque cheio. Fale com a fábrica ↓</p>
      </div>
    </section>
  );
}
