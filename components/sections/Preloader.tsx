"use client";
// Tanque enchendo + contador 0→100% — 100% CSS: começa no primeiro quadro, sem esperar o JavaScript,
// e se abre sozinho em ~1 s. Só na 1ª visita da sessão. O JS apenas avisa o resto do site (READY_EVENT).
import { useEffect } from "react";

export const READY_EVENT = "alfa:ready";
export const INTRO_MS = 950; // duração do preloader (CSS usa o mesmo valor em --intro)

export default function Preloader() {
  useEffect(() => {
    const done = () => { document.documentElement.dataset.ready = "1"; window.dispatchEvent(new Event(READY_EVENT)); };
    const show = document.documentElement.dataset.intro === "slow";
    try { sessionStorage.setItem("alfa-seen", "1"); } catch {}
    if (!show) { done(); return; }
    const t = setTimeout(done, Math.max(0, INTRO_MS - performance.now()));
    // depois da entrada, as próximas páginas da sessão abrem sem espera
    const t2 = setTimeout(() => { document.documentElement.dataset.intro = "fast"; }, 3200);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  return (
    <div id="preloader" aria-hidden="true" className="pl fixed inset-0 z-[200]">
      <div className="pl-top absolute inset-x-0 top-0 h-1/2 bg-deep" />
      <div className="pl-bottom absolute inset-x-0 bottom-0 h-1/2 bg-deep" />
      <div className="pl-content absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-6">
          <svg viewBox="0 0 240 120" className="w-[min(70vw,320px)]">
            <defs><clipPath id="tank-clip"><rect x="10" y="10" width="220" height="100" rx="50" /></clipPath></defs>
            <g clipPath="url(#tank-clip)">
              <rect x="0" y="0" width="240" height="120" fill="#0b1680" />
              <g className="pl-fill">
                <path className="pl-wave" d="M0 20 Q 30 8 60 20 T 120 20 T 180 20 T 240 20 T 300 20 T 360 20 V130 H0Z" fill="var(--liquid)" />
              </g>
            </g>
            <rect x="10" y="10" width="220" height="100" rx="50" fill="none" stroke="#fff" strokeWidth="4" />
            <rect x="104" y="0" width="32" height="12" rx="3" fill="#fff" />
          </svg>
          <p className="display text-6xl text-white"><span className="pl-count" />%</p>
        </div>
      </div>
    </div>
  );
}
