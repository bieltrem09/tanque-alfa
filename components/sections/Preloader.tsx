"use client";
// Silhueta do tanque enchendo de líquido + contador 0→100%. Só na 1ª visita da sessão.
import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";

export const READY_EVENT = "alfa:ready";

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    const done = () => {
      document.documentElement.dataset.ready = "1";
      window.dispatchEvent(new Event(READY_EVENT));
    };
    let seen = false;
    try { seen = sessionStorage.getItem("alfa-seen") === "1"; sessionStorage.setItem("alfa-seen", "1"); } catch {}
    if (seen || reducedMotion()) { el.style.display = "none"; done(); return; }

    const counter = el.querySelector<HTMLElement>("[data-count]")!;
    const fill = el.querySelector<SVGGElement>("[data-fill]")!;
    const wave = el.querySelector<SVGPathElement>("[data-wave]")!;
    const obj = { v: 0 };
    // a onda fica fora da timeline: um tween infinito dentro dela impedia o onComplete,
    // e o preloader (invisível) continuava por cima da página bloqueando os cliques
    const waveTw = gsap.to(wave, { x: -120, duration: 0.6, ease: "none", repeat: -1 });
    const hide = () => { el.style.display = "none"; waveTw.kill(); };
    const tl = gsap.timeline({ onComplete: hide });
    tl.fromTo(fill, { y: 120 }, { y: 0, duration: 1.1, ease: "power2.inOut" }, 0);
    tl.to(obj, { v: 100, duration: 1.1, ease: "power2.inOut", onUpdate: () => { counter.textContent = String(Math.round(obj.v)); } }, 0);
    tl.add(() => { done(); el.style.pointerEvents = "none"; }, 1.15);
    tl.to(el.querySelector("[data-content]"), { opacity: 0, scale: 0.92, duration: 0.25, ease: "power2.in" }, 1.15);
    tl.to(el.querySelector("[data-top]"), { yPercent: -100, duration: 0.55, ease: "expo.inOut" }, 1.2);
    tl.to(el.querySelector("[data-bottom]"), { yPercent: 100, duration: 0.55, ease: "expo.inOut" }, 1.2);
    return () => { tl.kill(); waveTw.kill(); };
  }, []);

  return (
    <div ref={root} id="preloader" aria-hidden="true" className="fixed inset-0 z-[200]">
      <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem("alfa-seen")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.getElementById("preloader").style.display="none"}catch(e){}` }} />
      <noscript><style>{`#preloader{display:none}`}</style></noscript>
      <div data-top className="absolute inset-x-0 top-0 h-1/2 bg-deep" />
      <div data-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-deep" />
      <div data-content className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-6">
          <svg viewBox="0 0 240 120" className="w-[min(70vw,320px)]">
            <defs>
              <clipPath id="tank-clip"><rect x="10" y="10" width="220" height="100" rx="50" /></clipPath>
            </defs>
            <g clipPath="url(#tank-clip)">
              <rect x="0" y="0" width="240" height="120" fill="#0b1680" />
              <g data-fill>
                <path data-wave d="M0 20 Q 30 8 60 20 T 120 20 T 180 20 T 240 20 T 300 20 T 360 20 V130 H0Z" fill="var(--liquid)" />
              </g>
            </g>
            <rect x="10" y="10" width="220" height="100" rx="50" fill="none" stroke="#fff" strokeWidth="4" />
            <rect x="104" y="0" width="32" height="12" rx="3" fill="#fff" />
          </svg>
          <p className="display text-6xl text-white"><span data-count>0</span>%</p>
        </div>
      </div>
    </div>
  );
}
