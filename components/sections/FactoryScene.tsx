"use client";
// 7.2 — CENA PINADA "A FÁBRICA": uma única timeline pinada com scrub: 1.
// 2a montagem → 2b horizonte → 2c linhas de produto → 2d estrada vista de cima → 2e mergulho → 2f vapor
import Link from "next/link";
import { useRef } from "react";
import { Droplets, Fuel, Cylinder, Waves, Sprout, ShieldCheck, PencilRuler, Wrench, Factory, Gem, ClipboardCheck, Flame, CalendarCheck, ChevronRight } from "lucide-react";
import { fabrica } from "@/content/site";
import { tanques } from "@/content/tanques";
import { gsap, SplitText, useGSAP, reducedMotion } from "@/lib/gsap";
import { TruckSide, TruckTop, SteelTopDefs } from "@/components/ui/TruckSvgs";
import type { RealAssets } from "@/lib/realAssets";

const prodIcons = [Droplets, Fuel, Cylinder, Waves, Sprout];
const difIcons = [ShieldCheck, PencilRuler, Wrench, Factory];
const benIcons = [Gem, ClipboardCheck, Flame, CalendarCheck];

const ROAD = "M880,-120 C880,140 700,170 700,330 C700,480 880,470 880,600 L880,1200";
const ROUTE = "M880,-120 C880,140 700,170 700,330 C700,480 880,470 880,600";

export default function FactoryScene({ real }: { real: RealAssets }) {
  const photoSide = !!real.lateral[0];
  const pick = (i: number) => (real.lateral[i] ? i : 0);
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion()) return;
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767.98px)" }, (ctx) => {
      const desktop = !!ctx.conditions?.desktop;
      const stage = q("[data-stage]")[0];
      const split = SplitText.create(q("[data-final]"), { type: "lines", mask: "lines" });

      // estados iniciais
      gsap.set(q("svg [data-tank]"), { y: -150 });
      gsap.set(q("[data-real-tank]"), { yPercent: -62 });
      gsap.set(q("[data-photo-paint]"), { autoAlpha: 0 });
      gsap.set(q("[data-ink]"), { yPercent: 100 });
      gsap.set(q("[data-big]"), { xPercent: 0, x: () => window.innerWidth });
      gsap.set(q("[data-hl] > *"), { yPercent: 110 });
      gsap.set(q("[data-para]"), { autoAlpha: 0, y: 20 });
      gsap.set(q("[data-track]"), { x: () => window.innerWidth });
      gsap.set(q("[data-col]"), { autoAlpha: 0.35 });
      gsap.set(q("[data-top]"), { autoAlpha: 0 });
      gsap.set(q("[data-road]"), { drawSVG: "0%" });
      gsap.set(q("[data-dif]"), { autoAlpha: 0, y: 30 });
      gsap.set(q("[data-water]"), { scale: 0 });
      gsap.set(q("[data-ben]"), { autoAlpha: 0, scale: 0.8 });
      gsap.set(q("[data-water-truck]"), { scale: 1.8, autoAlpha: 0 });
      gsap.set(q("[data-final-wrap]"), { autoAlpha: 0 });
      gsap.set(q("[data-cloud]"), { yPercent: 160 });
      gsap.set(q("[data-white]"), { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: desktop ? "+=800%" : "+=420%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 2a — Montagem
      tl.to(q("svg [data-tank]"), { y: 0, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(q("[data-real-tank]"), { yPercent: 0, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(q("[data-cables]"), { y: -320, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, 1.7);
      // com fotos reais: o caminhão montado (sem as lingas) substitui a montagem
      if (photoSide) {
        tl.to(q("[data-photo-paint='0']"), { autoAlpha: 1, duration: 0.5 }, 1.75)
          .to(q("[data-assembly]"), { autoAlpha: 0, duration: 0.5 }, 1.75);
      }
      tl
        // 2b — Horizonte
        .to(q("[data-crane]"), { y: -120, autoAlpha: 0, duration: 0.6 }, 2.0)
        .to(q("[data-a-label]"), { autoAlpha: 0, duration: 0.3 }, 2.0)
        .to(q("[data-ink]"), { yPercent: 0, duration: 0.8, ease: "power2.out" }, 2.1)
        .to(q("[data-side]"), { scale: desktop ? 0.74 : 0.92, duration: 0.8, ease: "power2.out" }, 2.1)
        .to(q("[data-big]"), { x: () => -q("[data-big]")[0].offsetWidth, duration: desktop ? 4.6 : 2.6 }, 2.3)
        // 2c — Linhas de produto (headline)
        .to(q("[data-hl] > *"), { yPercent: 0, duration: 0.6, stagger: 0.12, ease: "expo.out" }, 3.0)
        .to(q("[data-para]"), { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, 3.3);

      let t = 4.2;
      if (desktop) {
        tl.to(q("[data-hl-wrap]"), { autoAlpha: 0, y: -30, duration: 0.4 }, 4.0);
        const cols = q("[data-col]");
        const colX = (i: number) => () => {
          const w = cols[0].offsetWidth;
          const vw = window.innerWidth;
          return vw * 0.5 - w * (i + 0.5);
        };
        cols.forEach((_c, i) => {
          const at = 4.2 + i * 0.7;
          tl.to(q("[data-track]"), { x: colX(i), duration: 0.6, ease: "power2.inOut" }, at)
            .to(cols, { autoAlpha: (j: number) => (j === i ? 1 : 0.35), duration: 0.3 }, at + 0.2)
            .to(q("[data-paint]"), { opacity: (j: number) => (j === i ? 1 : 0), duration: 0.35 }, at + 0.15);
          if (photoSide) tl.to(q("[data-photo-paint]"), { autoAlpha: (_j: number, el: HTMLElement) => (Number(el.dataset.photoPaint) === pick(i) ? 1 : 0), duration: 0.35 }, at + 0.15);
        });
        t = 4.2 + cols.length * 0.7 + 0.2;
      } else {
        // mobile: a pintura do tanque varia rapidamente; as colunas viram cards abaixo da cena
        [1, 2, 3, 4, 0].forEach((p, k) => {
          tl.to(q("[data-paint]"), { opacity: (j: number) => (j === p ? 1 : 0), duration: 0.2 }, 3.6 + k * 0.25);
          if (photoSide) tl.to(q("[data-photo-paint]"), { autoAlpha: (_j: number, el: HTMLElement) => (Number(el.dataset.photoPaint) === pick(p) ? 1 : 0), duration: 0.2 }, 3.6 + k * 0.25);
        });
        t = 5.0;
      }

      // 2d — Virada de câmera: estrada vista de cima
      tl.to(q("[data-side-layer]"), { autoAlpha: 0, duration: 0.5 }, t)
        .to(q("[data-top]"), { autoAlpha: 1, duration: 0.5 }, t)
        .to(q("[data-road]"), { drawSVG: "100%", duration: 0.9, ease: "power2.out" }, t + 0.1)
        .fromTo(q("[data-sweep]"), { backgroundPosition: "100% 0" }, { backgroundPosition: "0% 0", duration: 2.2 }, t + 0.4)
        .to(q("[data-truck-top]"), {
          motionPath: { path: q("[data-route]")[0] as unknown as SVGPathElement, align: q("[data-route]")[0] as unknown as SVGPathElement, alignOrigin: [0.5, 0.5], autoRotate: true },
          duration: 2.6,
          ease: "power1.inOut",
        }, t + 0.3);
      const difs = q("[data-dif]");
      difs.forEach((d, i) => {
        tl.to(d, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, t + 0.5 + i * 0.6);
        if (!desktop && i < difs.length - 1) tl.to(d, { autoAlpha: 0, y: -20, duration: 0.25 }, t + 1.0 + i * 0.6);
      });
      t += 3.2;

      // 2e — Mergulho no líquido
      tl.to(q("[data-zoom]"), { scale: 9, svgOrigin: "880 600", duration: 1.0, ease: "power2.in" }, t)
        .to(q("[data-top-text]"), { autoAlpha: 0, duration: 0.4 }, t)
        .to(q("[data-water]"), { scale: 1, duration: 0.9, ease: "power2.inOut" }, t + 0.4)
        .to(q("[data-water-truck]"), { autoAlpha: 1, duration: 0.3 }, t + 1.0)
        .to(q("[data-water-truck]"), { scale: 0.6, duration: 1.8, ease: "power1.out" }, t + 1.0)
        .to(q("[data-ben]"), { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.18, ease: "back.out(1.6)" }, t + 1.2)
        .to(q("[data-ben]"), { autoAlpha: 0, duration: 0.35 }, t + 2.6)
        .to(q("[data-water-truck]"), { autoAlpha: 0, duration: 0.35 }, t + 2.6)
        .to(q("[data-final-wrap]"), { autoAlpha: 1, duration: 0.1 }, t + 2.9)
        .from(split.lines, { yPercent: 110, duration: 0.6, stagger: 0.12, ease: "expo.out" }, t + 2.9);
      t += 4.0;

      // 2f — Vapor / nuvens revelam a próxima seção
      tl.to(q("[data-cloud]"), { yPercent: -40, duration: 1.2, stagger: 0.06, ease: "power2.out" }, t)
        .to(q("[data-white]"), { autoAlpha: 1, duration: 0.5 }, t + 0.7);

      return () => split.revert();
    });
  }, { scope: root });

  return (
    <section ref={root} id="fabrica" aria-label="A fábrica — como fabricamos seus tanques" className="relative bg-paper">
      {/* ====== Versão animada ====== */}
      <div data-stage className="relative h-[100svh] overflow-hidden motion-reduce:hidden">
        {/* Camada lateral (2a–2c) */}
        <div data-side-layer className="absolute inset-0">
          <p data-a-label className="label label-slash absolute left-4 top-24 text-ink/70 md:left-8 md:top-32">{fabrica.label}</p>

          <p
            data-big
            aria-hidden="true"
            className="display absolute bottom-[45%] left-0 z-0 mb-[-0.06em] whitespace-nowrap text-[26vw] leading-[.8] text-[#e3e3df] md:text-[22vw]"
          >
            {fabrica.nossos}
          </p>

          <div data-side className="absolute bottom-[45%] left-1/2 z-10 w-[min(92vw,880px,calc(55svh*1.42))] -translate-x-1/2 origin-bottom">
            <div data-assembly className="relative">
              {real.montagem ? (
                <>
                  <img data-crane src={real.montagem.ponte.src} alt="" width={real.montagem.ponte.w} height={real.montagem.ponte.h} className="pointer-events-none absolute bottom-[calc(100%+min(18svh,160px))] left-1/2 w-[220vw] max-w-none -translate-x-1/2" />
                  <img src={real.montagem.chassi.src} alt="" width={real.montagem.chassi.w} height={real.montagem.chassi.h} className="block h-auto w-full" />
                  <img data-real-tank src={real.montagem.tanque.src} alt="" width={real.montagem.tanque.w} height={real.montagem.tanque.h} className="absolute inset-0 h-full w-full object-contain" />
                </>
              ) : (
                <TruckSide />
              )}
            </div>
            {real.lateral.map((im, i) =>
              im ? (
                <img key={i} data-photo-paint={i} src={im.src} alt="" width={im.w} height={im.h} loading="lazy" className="invisible absolute bottom-0 left-0 h-auto w-full" />
              ) : null,
            )}
          </div>

          <div data-ink className="absolute inset-x-0 bottom-0 z-20 h-[45%] bg-ink text-white">
            <div data-hl-wrap className="mx-auto grid h-full max-w-[1400px] content-center gap-6 px-4 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12 md:px-8">
              <h2 data-hl className="display text-[clamp(34px,5.2vw,84px)]">
                <span className="block overflow-clip"><span className="block">{fabrica.titulo1}</span></span>
                <span className="block overflow-clip text-white/45"><span className="block">{fabrica.titulo2}</span></span>
              </h2>
              <p data-para className="max-w-md text-[15px] text-white/75 md:text-base">{fabrica.paragrafo}</p>
            </div>

            {/* colunas em scroll horizontal (desktop) */}
            <div className="absolute inset-0 hidden items-center md:flex" aria-hidden="false">
              <ul data-track className="flex">
                {tanques.map((t, i) => {
                  const Icon = prodIcons[i];
                  return (
                    <li key={t.slug} data-col className="w-[30vw] max-w-[420px] shrink-0 border-l border-white/15 px-8">
                      <Icon className="h-9 w-9 text-accent" aria-hidden />
                      <h3 className="ui mt-4 text-lg">{t.curto}</h3>
                      <p className="mt-2 text-[15px] leading-snug text-white/70">{t.resumo}</p>
                      <Link href={`/tanques/${t.slug}/`} className="ui mt-4 inline-flex items-center gap-1 text-[12px] text-accent hover:underline">
                        Ver tanque <ChevronRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Camada de topo (2d) */}
        <div data-top className="absolute inset-0 z-30 bg-white">
          <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs><SteelTopDefs /></defs>
            <g data-zoom>
              <path data-road d={ROAD} fill="none" stroke="#0B0B0C" strokeWidth="150" />
              <path d={ROAD} fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="34 30" opacity=".75" />
              <path data-route d={ROUTE} fill="none" stroke="none" />
              <g data-truck-top>
                {real.topo ? <image href={real.topo.src} x={-150} y={(-150 * real.topo.h) / real.topo.w} width={300} height={(300 * real.topo.h) / real.topo.w} /> : <TruckTop />}
              </g>
            </g>
          </svg>

          <div data-top-text className="absolute inset-0">
            <h2 className="display absolute inset-x-0 top-0 z-10 bg-white px-4 pb-4 pt-24 text-[clamp(40px,11vw,84px)] md:inset-x-auto md:left-8 md:top-1/2 md:max-w-[40vw] md:-translate-y-1/2 md:bg-transparent md:p-0 md:text-[clamp(40px,5vw,84px)] leading-[1]">
              <span className="block text-[#b5b8be]">{fabrica.estradaTitulo1}</span>
              <span
                data-sweep
                className="clip-pad block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #0B0B0C 0%, #0B0B0C 40%, var(--alfa-primary) 50%, #0B0B0C 60%, #0B0B0C 100%)", backgroundSize: "300% 100%" }}
              >
                {fabrica.estradaTitulo2}
              </span>
            </h2>
            <ul className="absolute inset-x-4 bottom-8 md:inset-x-auto md:bottom-auto md:right-8 md:top-1/2 md:w-[32vw] md:max-w-[440px] md:-translate-y-1/2 md:space-y-7">
              {fabrica.diferenciais.map((d, i) => {
                const Icon = difIcons[i];
                return (
                  <li key={d.titulo} data-dif className="absolute inset-x-0 bottom-0 flex gap-4 rounded-2xl bg-white/95 p-4 shadow-[0_10px_40px_-20px_rgba(0,0,0,.4)] md:static md:bg-transparent md:p-0 md:shadow-none">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary text-white"><Icon className="h-6 w-6" aria-hidden /></span>
                    <div>
                      <h3 className="ui text-[13px]">{d.titulo}</h3>
                      <p className="mt-1 text-[15px] leading-snug text-ink/70">{d.texto}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 2e — água */}
          <div data-water className="absolute left-1/2 top-[60%] h-[260vmax] w-[260vmax] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
            <div className="water absolute inset-0" />
            {real.agua && <video src={real.agua} autoPlay muted loop playsInline preload="none" aria-hidden="true" className="absolute left-1/2 top-1/2 h-[100svh] w-[100vw] -translate-x-1/2 -translate-y-1/2 object-cover" />}
          </div>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            {real.topo ? (
              <img data-water-truck src={real.topo.src} alt="" width={real.topo.w} height={real.topo.h} className="w-[min(60vw,460px)] -rotate-90 md:rotate-0" />
            ) : (
              <svg data-water-truck viewBox="-140 -50 280 100" className="w-[min(60vw,420px)] -rotate-90 md:rotate-0" aria-hidden="true">
              <defs><SteelTopDefs /></defs>
              <TruckTop id="truck-top-water" />
            </svg>
            )}
          </div>
          <ul className="pointer-events-none absolute inset-0 mx-auto grid max-w-[1200px] grid-cols-2 content-between gap-x-4 px-4 py-24 text-white md:content-center md:gap-x-[34vw] md:gap-y-[30vh] md:px-8">
            {fabrica.beneficios.map((b, i) => {
              const Icon = benIcons[i];
              return (
                <li key={b.titulo} data-ben className={`${i % 2 ? "text-right" : ""}`}>
                  <Icon className={`h-8 w-8 text-accent ${i % 2 ? "ml-auto" : ""}`} aria-hidden />
                  <h3 className="display mt-2 text-[clamp(22px,2.6vw,40px)]">{b.titulo}</h3>
                  <p className="mt-1 hidden text-white/85 md:block">{b.texto}</p>
                </li>
              );
            })}
          </ul>
          <div data-final-wrap className="absolute inset-0 grid place-items-center px-4 text-center text-white">
            <p data-final className="display max-w-[14ch] text-[clamp(48px,8vw,140px)] [text-shadow:0_6px_40px_rgba(0,20,80,.35)]">
              {fabrica.fechamento}
            </p>
          </div>
        </div>

        {/* 2f — vapor */}
        <div className="pointer-events-none absolute inset-0 z-40" aria-hidden="true">
          {[
            ["-10%", "70vmax"], ["20%", "60vmax"], ["45%", "80vmax"], ["70%", "65vmax"], ["85%", "75vmax"], ["5%", "55vmax"], ["60%", "50vmax"],
          ].map(([l, s], i) => (
            <div key={i} data-cloud className="absolute bottom-0 rounded-full bg-white blur-2xl" style={{ left: l, width: s, height: s }} />
          ))}
          <div data-white className="absolute inset-0 bg-white" />
        </div>
      </div>

      {/* ====== Versão estática (reduced motion) e cards mobile ====== */}
      <div className="hidden bg-ink py-16 text-white motion-reduce:block">
        <div className="mx-auto max-w-[1400px] space-y-12 px-4 md:px-8">
          <p className="label label-slash text-accent">{fabrica.label}</p>
          <h2 className="display text-[clamp(40px,6vw,90px)]">{fabrica.titulo1} <span className="text-white/45">{fabrica.titulo2}</span></h2>
          <p className="max-w-2xl text-white/75">{fabrica.paragrafo}</p>
          <h2 className="display text-[clamp(36px,5vw,72px)]">{fabrica.estradaTitulo1} {fabrica.estradaTitulo2}</h2>
          <ul className="grid gap-6 md:grid-cols-4">{fabrica.diferenciais.map((d) => <li key={d.titulo}><h3 className="ui text-sm text-accent">{d.titulo}</h3><p className="mt-2 text-white/75">{d.texto}</p></li>)}</ul>
          <ul className="grid gap-6 md:grid-cols-4">{fabrica.beneficios.map((d) => <li key={d.titulo}><h3 className="ui text-sm text-accent">{d.titulo}</h3><p className="mt-2 text-white/75">{d.texto}</p></li>)}</ul>
          <p className="display text-[clamp(40px,6vw,90px)]">{fabrica.fechamento}</p>
        </div>
      </div>
      <ul className="grid gap-px bg-ink/10 md:hidden motion-reduce:md:grid motion-reduce:md:grid-cols-5" aria-label="Linhas de produto">
        {tanques.map((t, i) => {
          const Icon = prodIcons[i];
          return (
            <li key={t.slug} className="reveal-card bg-ink px-5 py-8 text-white">
              <Icon className="h-8 w-8 text-accent" aria-hidden />
              <h3 className="ui mt-3 text-base">{t.nome}</h3>
              <p className="mt-2 text-white/70">{t.resumo}</p>
              <Link href={`/tanques/${t.slug}/`} className="ui mt-4 inline-flex min-h-11 items-center gap-1 text-[12px] text-accent">
                Ver tanque <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
