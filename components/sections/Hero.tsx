"use client";
// HERO "LÍQUIDO": a palavra ALFA é o tanque. O líquido sobe ao carregar, ondula e troca
// de cor conforme a linha de produto (água → combustível → saneamento → agrícola).
// No scroll, o líquido enche e uma onda clara cobre a tela, entregando para a cena "A fábrica".
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ChevronRight, Droplet } from "lucide-react";
import { heroLiquido as H, whatsappLink } from "@/content/site";
import { tanques } from "@/content/tanques";
import { gsap, SplitText, useGSAP, reducedMotion } from "@/lib/gsap";
import { READY_EVENT } from "./Preloader";

const VB_W = 1000, VB_H = 300;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [ativo, setAtivo] = useState(0);
  const manual = useRef(false);
  const liq = H.liquidos[ativo];
  const resumo = tanques.find((t) => t.slug === liq.slug)?.resumo ?? "";

  // troca automática do líquido
  useEffect(() => {
    if (reducedMotion()) return;
    const id = setInterval(() => { if (!manual.current) setAtivo((a) => (a + 1) % H.liquidos.length); }, 3600);
    return () => clearInterval(id);
  }, []);

  useGSAP(() => {
    const q = gsap.utils.selector(root);
    if (reducedMotion()) { gsap.set(q("[data-level]"), { y: 0 }); return; }

    // entrada
    gsap.set(q("[data-level]"), { y: VB_H * 0.95 });
    gsap.set(q("[data-in]"), { autoAlpha: 0, y: 24 });
    const play = () => {
      const split = SplitText.create(q("[data-title] .ln"), { type: "lines", mask: "lines" });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(q("[data-word]"), { scale: 1.08, autoAlpha: 0, duration: 1.4 }, 0)
        .to(q("[data-level]"), { y: 0, duration: 2.2, ease: "power3.inOut" }, 0.2)
        .from(split.lines, { yPercent: 110, duration: 0.9, stagger: 0.08 }, 0.35)
        .to(q("[data-in]"), { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.6);
    };
    if (document.documentElement.dataset.ready) play();
    else window.addEventListener(READY_EVENT, play, { once: true });

    // saída: o líquido enche a palavra e a onda clara cobre o hero
    const out = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
    });
    out.to(q("[data-level]"), { y: -VB_H * 0.28 }, 0)
      .to(q("[data-word]"), { scale: 1.12, yPercent: -18 }, 0)
      .to(q("[data-fade]"), { autoAlpha: 0, y: -40 }, 0)
      .fromTo(q("[data-wave-out]"), { yPercent: 100 }, { yPercent: 0 }, 0.15);

    // leve parallax da palavra com o mouse
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine)", () => {
      const x = gsap.quickTo(q("[data-tilt]"), "x", { duration: 1, ease: "power3" });
      const y = gsap.quickTo(q("[data-tilt]"), "y", { duration: 1, ease: "power3" });
      const move = (e: PointerEvent) => { x((e.clientX / innerWidth - 0.5) * -18); y((e.clientY / innerHeight - 0.5) * -10); };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    });
  }, { scope: root });

  const escolher = (i: number) => { manual.current = true; setAtivo(i); };

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#040a2a] text-white"
      style={{ ["--liq" as string]: liq.cor, ["--liq2" as string]: liq.cor2 }}
    >
      {/* fundo: brilho da cor do líquido + grade técnica sutil */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 transition-[background] duration-1000" style={{ background: `radial-gradient(80% 60% at 50% 72%, color-mix(in srgb, var(--liq2) 38%, transparent) 0%, transparent 70%), radial-gradient(120% 90% at 50% 0%, #0b1a6e 0%, #040a2a 60%)` }} />
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 -z-10 opacity-25" />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <div data-fade className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-8 px-4 pt-28 md:grid-cols-[1.2fr_1fr] md:items-end md:px-8 md:pt-36">
        <div>
          <p data-in className="label label-slash text-[color:var(--liq)] transition-colors duration-700">{H.label}</p>
          <h1 id="hero-title" data-title className="display mt-4 text-[clamp(40px,5.4vw,88px)]">
            <span className="ln block">{H.titulo1}</span>
            <span className="ln accent-line block text-accent">{H.titulo2}</span>
          </h1>
        </div>
        <div className="md:pb-2">
          <p data-in className="max-w-md text-white/80">{H.texto}</p>
          <div data-in className="mt-6 flex flex-wrap gap-3">
            <a href={whatsappLink("Olá! Quero um orçamento de tanque.")} target="_blank" rel="noopener noreferrer" className="ui inline-flex min-h-12 items-center gap-1 rounded-full bg-white px-6 text-[12px] font-extrabold text-primary transition-transform duration-200 hover:scale-[1.04] active:scale-[.97]">
              {H.ctaPrimario} <ChevronRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href="/#tanques" className="ui inline-flex min-h-12 items-center gap-1 rounded-full px-6 text-[12px] ring-1 ring-white/35 transition-colors hover:bg-white/10">
              {H.ctaSecundario}
            </Link>
          </div>
        </div>
      </div>

      {/* a palavra-tanque */}
      <div className="relative z-0 flex flex-1 items-center">
        <div data-tilt className="w-full">
          <div data-word className="mx-auto w-[min(96vw,1500px)] px-2">
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="h-auto w-full overflow-visible" role="img" aria-label="Tanques Alfa">
              <defs>
                <clipPath id="alfa-word">
                  <text x={VB_W / 2} y={VB_H - 18} textAnchor="middle" textLength={VB_W - 16} lengthAdjust="spacingAndGlyphs" style={{ fontFamily: "var(--font-anton)", fontSize: 318 }}>ALFA</text>
                </clipPath>
                <linearGradient id="liq-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" style={{ stopColor: liq.cor, transition: "stop-color 1s ease" }} />
                  <stop offset="1" style={{ stopColor: liq.cor2, transition: "stop-color 1s ease" }} />
                </linearGradient>
                <linearGradient id="vidro" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity=".16" />
                  <stop offset=".5" stopColor="#fff" stopOpacity=".04" />
                  <stop offset="1" stopColor="#fff" stopOpacity=".1" />
                </linearGradient>
              </defs>
              {/* "vidro" vazio da palavra */}
              <g clipPath="url(#alfa-word)">
                <rect width={VB_W} height={VB_H} fill="url(#vidro)" />
                {/* líquido */}
                <g data-level>
                  <g className="liq-wave-slow">
                    <path d={wave(VB_W * 2, 70, 14, 2)} opacity=".55" style={{ fill: liq.cor2, transition: "fill 1s ease" }} />
                  </g>
                  <g className="liq-wave">
                    <path d={wave(VB_W * 2, 82, 10, 4)} fill="url(#liq-grad)" />
                  </g>
                  <g className="liq-bubbles" fill="#fff" opacity=".45">
                    {[90, 210, 330, 470, 560, 690, 800, 905].map((x, i) => (
                      <circle key={x} cx={x} cy={VB_H - 10} r={2 + (i % 3)} style={{ animationDelay: `${i * 0.55}s` }} />
                    ))}
                  </g>
                </g>
                {/* reflexo */}
                <rect x="0" y="0" width={VB_W} height={VB_H * 0.42} fill="#fff" opacity=".07" />
              </g>
              <text x={VB_W / 2} y={VB_H - 18} textAnchor="middle" textLength={VB_W - 16} lengthAdjust="spacingAndGlyphs" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.6" style={{ fontFamily: "var(--font-anton)", fontSize: 318 }}>ALFA</text>
            </svg>
          </div>
        </div>
      </div>

      {/* seletor de líquido */}
      <div data-fade className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-8 md:px-8 md:pb-10">
        <div data-in className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="ui text-[11px] text-white/60">Líquido no tanque</p>
            <ul className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Escolha o líquido">
              {H.liquidos.map((l, i) => (
                <li key={l.slug}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={i === ativo}
                    onClick={() => escolher(i)}
                    className={`ui inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[12px] transition-colors duration-300 ${i === ativo ? "bg-white text-ink" : "text-white/80 ring-1 ring-white/25 hover:bg-white/10"}`}
                  >
                    <Droplet className="h-4 w-4" style={{ color: l.cor, fill: l.cor }} aria-hidden />
                    {l.nome}
                  </button>
                </li>
              ))}
            </ul>
            <p aria-live="polite" className="mt-3 max-w-xl text-sm text-white/70">{resumo}</p>
          </div>
          <a href="#fabrica" className="ui hidden items-center gap-2 text-[11px] text-white/70 hover:text-white md:inline-flex">
            {H.rolar} <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
          </a>
        </div>
      </div>

      {/* onda clara que cobre o hero na saída (mesma cor da cena seguinte) */}
      <div data-wave-out aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[120%] translate-y-full">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute -top-[119px] left-0 h-[120px] w-full">
          <path d="M0,60 C240,0 480,120 720,60 C960,0 1200,120 1440,60 L1440,120 L0,120 Z" fill="var(--paper)" />
        </svg>
        <div className="h-full w-full bg-paper" />
      </div>
    </section>
  );
}

// onda senoidal repetida (largura 2x para rolar em loop)
function wave(width: number, top: number, amp: number, cycles: number) {
  const seg = width / (cycles * 2);
  let d = `M0 ${top}`;
  for (let i = 0; i < cycles * 2; i++) {
    const x0 = i * seg;
    d += ` Q ${x0 + seg / 2} ${top + (i % 2 ? amp : -amp)} ${x0 + seg} ${top}`;
  }
  return `${d} L ${width} ${VB_H + 40} L 0 ${VB_H + 40} Z`;
}
