"use client";
// Transição entre páginas com a mesma animação da marca do rodapé (wordmark reveal):
// cortina escura sobe → letras "ALFA" nascem através da linha do chão, com reflexo →
// uma faixa de luz amarela atravessa as letras → troca de página → letras descem e a cortina sai por cima.
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, reducedMotion } from "@/lib/gsap";

const WORD = "ALFA";
const GLYPH: React.CSSProperties = {
  color: "#fff",
  backgroundImage: "linear-gradient(105deg,#fff 0%,#fff 43%,#FFC400 47.5%,#fffbe6 50%,#FFC400 52.5%,#fff 57%,#fff 100%)",
  backgroundSize: "250% 100%",
  backgroundPosition: "100% 0%",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function PageTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const busy = useRef(false);
  const ready = useRef<Promise<void> | null>(null); // termina quando a luz já passou pelas letras

  // linha de base: o chão encosta no pé das letras (mesma medição do rodapé)
  useLayoutEffect(() => {
    const el = ref.current!;
    const measure = () => {
      const row = el.querySelector<HTMLElement>("[data-row]")!, probe = el.querySelector<HTMLElement>("[data-probe]")!;
      const prev = el.style.display;
      el.style.display = "grid"; el.style.visibility = "hidden";
      const d = Math.max(0, row.getBoundingClientRect().bottom - probe.getBoundingClientRect().top);
      el.style.display = prev; el.style.visibility = "";
      row.style.clipPath = `inset(-100% 0 ${d}px 0)`;
      row.style.marginBottom = `${-d}px`;
      el.querySelector<HTMLElement>("[data-mirror]")!.style.marginTop = `${-d - 1}px`;
    };
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      const samePage = url.pathname === location.pathname;
      if (samePage) {
        if (url.hash) {
          e.preventDefault();
          e.stopPropagation();
          const el = document.querySelector(url.hash);
          if (el) window.__lenis ? window.__lenis.scrollTo(el as HTMLElement, { offset: -80 }) : el.scrollIntoView();
        }
        return;
      }
      if (reducedMotion() || busy.current || !ref.current) return;
      e.preventDefault();
      e.stopPropagation();
      busy.current = true;
      const el = ref.current;
      const q = gsap.utils.selector(el);
      gsap.set(el, { display: "grid", clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(q("[data-l]"), { yPercent: 115 });
      gsap.set(q("[data-g]"), { backgroundPosition: "100% 0%" });
      gsap.set(q("[data-floor]"), { scaleX: 0 });
      gsap.set(q("[data-mirror]"), { autoAlpha: 0 });
      const tl = gsap.timeline();
      tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "expo.inOut" })
        .to(q("[data-floor]"), { scaleX: 1, duration: 0.55, ease: "power3.inOut" }, 0.2)
        .to(q("[data-l]"), { yPercent: 0, duration: 0.65, stagger: 0.07, ease: "expo.out" }, 0.32)
        .to(q("[data-mirror]"), { autoAlpha: 1, duration: 0.4 }, 0.7)
        .to(q("[data-g]"), { backgroundPosition: "0% 0%", duration: 0.75, stagger: 0.07, ease: "power2.inOut" }, 0.8)
        .add(() => router.push(url.pathname + url.search + url.hash), 0.95);
      ready.current = new Promise<void>((r) => { tl.eventCallback("onComplete", () => r()); });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !busy.current) return;
    let alive = true;
    (ready.current ?? Promise.resolve()).then(() => {
      if (!alive) return;
      const q = gsap.utils.selector(el);
      if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
      gsap.timeline({ onComplete: () => { gsap.set(el, { display: "none" }); busy.current = false; } })
        .to(q("[data-l]"), { yPercent: 115, duration: 0.4, stagger: { each: 0.04, from: "end" }, ease: "power3.in" })
        .to(q("[data-mirror]"), { autoAlpha: 0, duration: 0.2 }, 0)
        .to(q("[data-floor]"), { scaleX: 0, transformOrigin: "100% 50%", duration: 0.35, ease: "power2.in" }, 0.15)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.55, ease: "expo.inOut" }, 0.3)
        .set(q("[data-floor]"), { transformOrigin: "0% 50%" });
    });
    return () => { alive = false; };
  }, [pathname]);

  return (
    <div ref={ref} aria-hidden="true" className="fixed inset-0 z-[150] hidden place-items-center bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(6,28,224,.35),transparent_70%)]" />
      <div className="relative w-[min(86vw,1100px)] select-none text-center font-display leading-none" style={{ fontSize: "clamp(120px, 30vw, 400px)" }}>
        <div data-row className="relative whitespace-nowrap">
          {[...WORD].map((c, i) => (
            <span key={i} data-l className="inline-block will-change-transform">
              <span data-g className="inline-block px-[0.01em]" style={GLYPH}>{c}</span>
            </span>
          ))}
          <span data-probe className="inline-block h-0 w-0 align-baseline" />
        </div>
        <div data-floor className="relative h-px w-full origin-left bg-white/25" />
        <div className="relative overflow-hidden" style={{ height: "0.4em", maskImage: "linear-gradient(to bottom, black, transparent 90%)", WebkitMaskImage: "linear-gradient(to bottom, black, transparent 90%)" }}>
          <div data-mirror className="whitespace-nowrap text-white/15 [filter:blur(1.5px)]" style={{ transform: "scaleY(-1)" }}>
            {[...WORD].map((c, i) => <span key={i} className="inline-block px-[0.01em]">{c}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
