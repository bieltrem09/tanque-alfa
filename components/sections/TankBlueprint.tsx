"use client";
// "Arquitetura do tanque": prancha de projeto pinada no scroll, em 5 etapas.
// 01 projeto (traço + cotas) → 02 estrutura (vista explodida sobre o chassi real)
// → 03 componentes (chamadas numeradas + quebra-ondas) → 04 fabricação (foto real se materializa) → 05 entrega (selo)
import { useRef } from "react";
import { arquitetura as A } from "@/content/arquitetura";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

type Props = { chassi: string | null; real: string | null };

const W = 1772, H = 769; // quadro comum das imagens do caminhão de água
const px = (p: number) => (p / 100) * W;
const py = (p: number) => (p / 100) * H;

export default function TankBlueprint({ chassi, real }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(root);
    const final = () => {
      gsap.set(q("[data-real]"), { clipPath: "inset(0% 0 0 0)" });
      gsap.set(q("[data-mk], [data-lbl], [data-desc='2']"), { autoAlpha: 1 });
      gsap.set(q("[data-step]"), { opacity: 0.45 });
      gsap.set(q("[data-step='2']"), { opacity: 1 });
      gsap.set(q("[data-desc]:not([data-desc='2'])"), { autoAlpha: 0 });
    };
    if (reducedMotion()) { final(); return; }

    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767.98px)" }, (ctx) => {
      const desktop = !!ctx.conditions?.desktop;
      gsap.set(q("[data-base], [data-tankline]"), { clipPath: "inset(0 100% 0 0)" });
      gsap.set(q("[data-cota], [data-guide], [data-baffle], [data-leader]"), { drawSVG: "0%" });
      gsap.set(q("[data-cota-lbl], [data-mk], [data-lbl], [data-stamp], [data-chassi]"), { autoAlpha: 0 });
      gsap.set(q("[data-mk]"), { scale: 0.4, transformOrigin: "50% 50%" });
      gsap.set(q("[data-real]"), { clipPath: "inset(100% 0 0 0)" });
      gsap.set(q("[data-scan]"), { autoAlpha: 0 });
      gsap.set(q("[data-desc]"), { autoAlpha: 0, y: 14 });
      gsap.set(q("[data-step]"), { opacity: 0.35 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: q("[data-pin]")[0], start: "top top", end: desktop ? "+=420%" : "+=330%", pin: true, scrub: 1, anticipatePin: 1 },
      });
      const step = (i: number, at: number) => {
        tl.to(q("[data-step]"), { opacity: (j: number) => (j === i ? 1 : 0.35), duration: 0.15 }, at)
          .to(q("[data-bar]"), { scaleY: (i + 1) / 5, duration: 0.3 }, at)
          .to(q("[data-desc]"), { autoAlpha: (j: number) => (j === i ? 1 : 0), y: (j: number) => (j === i ? 0 : 14), duration: 0.2 }, at);
      };

      // 01 — projeto
      step(0, 0);
      tl.to(q("[data-base]"), { clipPath: "inset(0 0% 0 0)", duration: 0.6 }, 0.05)
        .to(q("[data-tankline]"), { clipPath: "inset(0 0% 0 0)", duration: 0.6 }, 0.1)
        .to(q("[data-cota]"), { drawSVG: "100%", duration: 0.35, stagger: 0.1 }, 0.55)
        .to(q("[data-cota-lbl]"), { autoAlpha: 1, duration: 0.2, stagger: 0.1 }, 0.7);

      // 02 — estrutura: vista explodida sobre o chassi real
      step(1, 1.1);
      tl.to(q("[data-cota], [data-cota-lbl]"), { opacity: 0.3, duration: 0.2 }, 1.1)
        .to(q("[data-tankline]"), { yPercent: -24, duration: 0.6, ease: "power2.inOut" }, 1.15)
        .to(q("[data-chassi]"), { autoAlpha: 0.95, duration: 0.5 }, 1.25)
        .to(q("[data-base]"), { opacity: 0.25, duration: 0.5 }, 1.25)
        .to(q("[data-guide]"), { drawSVG: "100%", duration: 0.35, stagger: 0.08 }, 1.5);

      // 03 — componentes
      step(2, 2.1);
      tl.to(q("[data-tankline]"), { yPercent: 0, duration: 0.5, ease: "power2.inOut" }, 2.1)
        .to(q("[data-guide]"), { opacity: 0, duration: 0.2 }, 2.1)
        .to(q("[data-baffle]"), { drawSVG: "100%", duration: 0.3, stagger: 0.06 }, 2.4)
        .to(q("[data-mk]"), { autoAlpha: 1, scale: 1, duration: 0.18, stagger: 0.07, ease: "back.out(2)" }, 2.5)
        .to(q("[data-leader]"), { drawSVG: "100%", duration: 0.18, stagger: 0.07 }, 2.55)
        .to(q("[data-lbl]"), { autoAlpha: 1, duration: 0.18, stagger: 0.07 }, 2.6);

      // 04 — fabricação: o caminhão real se materializa
      step(3, 3.2);
      tl.to(q("[data-mk], [data-lbl], [data-leader], [data-baffle]"), { autoAlpha: 0, duration: 0.2 }, 3.2)
        .to(q("[data-scan]"), { autoAlpha: 1, duration: 0.05 }, 3.3)
        .fromTo(q("[data-scan]"), { top: "100%" }, { top: "0%", duration: 0.6, ease: "power1.inOut" }, 3.3)
        .to(q("[data-real]"), { clipPath: "inset(0% 0 0 0)", duration: 0.6, ease: "power1.inOut" }, 3.3)
        .to(q("[data-scan]"), { autoAlpha: 0, duration: 0.05 }, 3.9)
        .to(q("[data-chassi]"), { autoAlpha: 0, duration: 0.2 }, 3.9)
        .to(q("[data-base], [data-tankline]"), { opacity: 0.12, duration: 0.3 }, 3.8);

      // 05 — entrega
      step(4, 4.2);
      tl.to(q("[data-cota], [data-cota-lbl]"), { opacity: 0, duration: 0.2 }, 4.2)
        .fromTo(q("[data-stamp]"), { autoAlpha: 0, scale: 1.6, rotation: -30 }, { autoAlpha: 1, scale: 1, rotation: -12, duration: 0.35, ease: "back.out(1.8)" }, 4.3)
        .to({}, { duration: 0.4 }, 4.65);
    });
  }, { scope: root });

  const sheet = "rounded-2xl border border-white/15 bg-[#0d1a45]";
  return (
    <section ref={root} id="arquitetura" aria-labelledby="arq-title" className="relative bg-[#0b1330] text-white">
      <div data-pin className="relative min-h-[100svh] overflow-hidden md:h-[100svh]">
        <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid h-full max-w-[1500px] grid-rows-[auto_1fr] gap-4 px-4 pb-6 pt-20 md:grid-cols-[minmax(300px,0.75fr)_2fr] md:grid-rows-1 md:items-center md:gap-10 md:px-8 md:pt-24">
          {/* texto / etapas */}
          <div className="order-2 md:order-1">
            <p className="label label-slash text-accent">{A.label}</p>
            <h2 id="arq-title" className="display mt-3 text-[clamp(40px,5.2vw,88px)]">
              {A.titulo1} <span className="accent-line text-accent">{A.titulo2}</span>
            </h2>
            <p className="mt-5 hidden max-w-sm text-white/70 md:block">{A.intro}</p>
            <div className="mt-6 flex gap-4 md:mt-8">
              <div aria-hidden="true" className="relative w-[3px] shrink-0 rounded bg-white/15">
                <div data-bar className="absolute inset-0 origin-top rounded bg-accent" style={{ transform: "scaleY(0.2)" }} />
              </div>
              <ol className="flex-1 space-y-1">
                {A.etapas.map((e, i) => (
                  <li key={e.n} data-step={i} className="flex items-baseline gap-3">
                    <span className="ui text-[11px] text-accent">{e.n}</span>
                    <span className="display text-[clamp(20px,2vw,30px)]">{e.titulo}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative mt-4 min-h-[120px] md:min-h-[150px]">
              {A.etapas.map((e, i) => (
                <div key={e.n} data-desc={i} className={`absolute inset-x-0 top-0 ${i === 0 ? "" : "invisible"}`}>
                  <p className="max-w-md text-[15px] leading-relaxed text-white/80 md:text-base">{e.texto}</p>
                  {i === 2 && (
                    <ol className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[13px] text-white/75">
                      {A.componentes.map((c) => <li key={c.n}><span className="font-bold text-accent">{c.n}</span> {c.nome}</li>)}
                    </ol>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* prancha */}
          <div className={`relative order-1 overflow-hidden md:order-2 ${sheet}`}>
            <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-70" />
            <div aria-hidden="true" className="absolute inset-3 rounded-xl border border-white/15" />
            <div className="relative px-[5%] pb-[9%] pt-[11%]">
              <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
                {chassi && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img data-chassi loading="lazy" decoding="async" src={chassi} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full" />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img data-base loading="lazy" decoding="async" src="/img/arquitetura/projeto-agua-base.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full" />
                {real && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img data-real loading="lazy" decoding="async" src={real} alt="Caminhão-tanque de água Alfa pronto, vista lateral" className="absolute inset-0 h-full w-full drop-shadow-[0_20px_20px_rgba(0,0,0,.45)]" />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img data-tankline loading="lazy" decoding="async" src="/img/arquitetura/projeto-agua-tanque.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full" />
                <div data-scan aria-hidden="true" className="pointer-events-none absolute inset-x-[-3%] z-20 h-[3px] -translate-y-1/2 bg-accent shadow-[0_0_26px_8px_rgba(255,196,0,.55)]" />

                <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 z-10 h-full w-full overflow-visible" fill="none" aria-hidden="true">
                  {/* cotas */}
                  <g stroke="#FFC400" strokeWidth="2.5">
                    <path data-cota d={`M${px(14.5)} ${py(17)} H${px(75.5)} M${px(14.5)} ${py(13)} V${py(21)} M${px(75.5)} ${py(13)} V${py(21)}`} />
                    <path data-cota d={`M${px(77.3)} ${py(29)} V${py(71)} M${px(76.3)} ${py(29)} H${px(78.3)} M${px(76.3)} ${py(71)} H${px(78.3)}`} />
                    <path data-cota d={`M${px(29)} ${py(104)} H${px(85.4)} M${px(29)} ${py(100)} V${py(108)} M${px(85.4)} ${py(100)} V${py(108)}`} />
                  </g>
                  {/* quebra-ondas internos */}
                  <g stroke="#7FB2FF" strokeWidth="3" strokeDasharray="10 9">
                    {[29, 44, 59].map((x) => <path key={x} data-baffle d={`M${px(x)} ${py(32)} V${py(68)}`} />)}
                  </g>
                  {/* guias da vista explodida */}
                  <g stroke="#7FB2FF" strokeWidth="2" strokeDasharray="6 8" opacity=".8">
                    {[20, 47, 72].map((x) => <path key={x} data-guide d={`M${px(x)} ${py(52)} V${py(80)}`} />)}
                  </g>
                  {/* chamadas */}
                  <g stroke="#fff" strokeWidth="2">
                    {A.componentes.map((c) => <path key={c.n} data-leader d={`M${px(c.x)} ${py(c.y)} L${px(c.lx)} ${py(c.ly)}`} />)}
                  </g>
                  {A.componentes.map((c) => (
                    <g key={c.n} data-mk>
                      <circle cx={px(c.x)} cy={py(c.y)} r="22" fill="#FFC400" />
                      <text x={px(c.x)} y={py(c.y) + 9} textAnchor="middle" fill="#0b1330" style={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontSize: 26 }}>{c.n}</text>
                    </g>
                  ))}
                </svg>

                {/* rótulos HTML (nítidos em qualquer tamanho) */}
                {A.componentes.map((c) => (
                  <span key={c.n} data-lbl className="ui pointer-events-none absolute z-10 hidden -translate-x-1/2 whitespace-nowrap rounded bg-[#0b1330]/85 px-2 py-1 text-[11px] text-white md:block" style={{ left: `${c.lx}%`, top: `${c.ly}%`, transform: `translate(-50%, ${c.ly > 50 ? "10%" : "-110%"})` }}>
                    {c.nome}
                  </span>
                ))}
                {[
                  { l: A.cotas[0], x: 45, y: 17 },
                  { l: A.cotas[1], x: 77.3, y: 50 },
                  { l: A.cotas[2], x: 57, y: 104 },
                ].map(({ l, x, y }) => (
                  <span key={l.letra} data-cota-lbl title={l.rotulo} className="display pointer-events-none absolute z-10 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-accent bg-[#0d1a45] text-[15px] text-accent md:h-9 md:w-9 md:text-[18px]" style={{ left: `${x}%`, top: `${y}%` }}>
                    {l.letra}
                  </span>
                ))}

                {/* selo */}
                <div data-stamp className="pointer-events-none absolute right-[2%] top-[-6%] z-20 grid aspect-square w-[22%] place-items-center rounded-full border-[3px] border-accent text-center text-accent">
                  <div className="absolute inset-[6%] rounded-full border border-accent/60" />
                  <span className="ui px-[12%] text-[clamp(8px,1vw,13px)] leading-tight">{A.carimbo}</span>
                </div>
              </div>
            </div>

            {/* carimbo da folha */}
            <dl className="absolute left-3 top-3 z-20 hidden grid-cols-[auto_auto] gap-x-4 rounded-tl-xl border-b border-r border-white/15 bg-[#0d1a45]/95 px-4 py-2 text-[10px] uppercase tracking-[.12em] text-white/70 md:grid">
              <dt>Projeto</dt><dd className="font-bold">Tanque de água</dd>
              <dt>Cotas</dt><dd className="font-bold">{A.cotas.map((c) => `${c.letra} ${c.rotulo.toLowerCase()}`).join(" · ")}</dd>
              <dt>Fabricante</dt><dd className="font-bold">Alfa · Limeira-SP</dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
