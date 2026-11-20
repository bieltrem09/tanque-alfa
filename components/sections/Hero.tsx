"use client";
import Image from "next/image";
import { useRef } from "react";
import { hero, whatsappLink } from "@/content/site";
import { gsap, SplitText, ScrollTrigger, useGSAP, reducedMotion } from "@/lib/gsap";
import SealButton from "@/components/ui/SealButton";
import Road, { LiquidWave } from "@/components/ui/Road";
import Drop from "@/components/ui/Drop";
import { READY_EVENT } from "./Preloader";

const drops = [
  { c: "var(--liquid)", s: 34, x: "4%", y: "10%", d: 3, r: -20 },
  { c: "var(--fuel)", s: 22, x: "22%", y: "-2%", d: 2, r: 15 },
  { c: "var(--liquid)", s: 48, x: "88%", y: "4%", d: 3, r: 25 },
  { c: "var(--fuel)", s: 18, x: "70%", y: "-6%", d: 2, r: -10 },
  { c: "var(--liquid)", s: 20, x: "-4%", y: "62%", d: 2, r: -35 },
  { c: "var(--fuel)", s: 30, x: "96%", y: "58%", d: 3, r: 30 },
  { c: "var(--liquid)", s: 14, x: "50%", y: "-10%", d: 1, r: 0 },
  { c: "var(--fuel)", s: 12, x: "10%", y: "38%", d: 1, r: 10 },
];

export default function Hero({ bottom = "road" }: { bottom?: "road" | "wave" }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(root);
    if (reducedMotion()) return;

    gsap.set(q("[data-hero-in]"), { autoAlpha: 0 });
    const play = () => {
      const split = SplitText.create(q("[data-hl] .ln"), { type: "lines", mask: "lines" });
      gsap.set(q("[data-hero-in]"), { autoAlpha: 1 });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(q("[data-bg]"), { scale: 1.15, duration: 1.6 }, 0)
        .from(q("[data-ghost]"), { xPercent: 12, opacity: 0, duration: 1.4 }, 0)
        .from(split.lines, { yPercent: 110, duration: 0.9, stagger: 0.08 }, 0.15)
        .from(q("[data-truck]"), { yPercent: 40, rotation: -6, opacity: 0, duration: 1.1, ease: "back.out(1.4)" }, 0.3)
        .from(q("[data-drop]"), {
          x: (_i: number, el: HTMLElement) => (el.parentElement!.offsetWidth / 2 - el.offsetLeft),
          y: (_i: number, el: HTMLElement) => (el.parentElement!.offsetHeight / 2 - el.offsetTop),
          scale: 0, opacity: 0, duration: 1, stagger: 0.03,
        }, 0.5)
        .from(q("[data-seal]"), { scale: 0.4, rotation: -90, opacity: 0, duration: 1, ease: "back.out(1.6)" }, 0.6)
        .from(q("[data-foot]"), { y: 20, opacity: 0, duration: 0.7 }, 0.8)
        .from(q("[data-underline]"), { scaleX: 0, transformOrigin: "left", duration: 0.7, ease: "power3.out" }, 1.1);
    };
    if (document.documentElement.dataset.ready) play();
    else window.addEventListener(READY_EVENT, play, { once: true });

    // parallax com o mouse em 3 profundidades
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine)", () => {
      const layers = [
        { el: q("[data-ghost]"), k: 10 },
        { el: q("[data-truck-wrap]"), k: 22 },
        { el: q("[data-drops]"), k: 44 },
      ].map(({ el, k }) => ({ x: gsap.quickTo(el, "x", { duration: 0.8, ease: "power3" }), y: gsap.quickTo(el, "y", { duration: 0.8, ease: "power3" }), k }));
      const onMove = (e: PointerEvent) => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        layers.forEach((l) => { l.x(nx * l.k); l.y(ny * l.k); });
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    });

    // saída no scroll: caminhão "passa o bastão" descendo para a próxima cena
    gsap.to(q("[data-truck]"), {
      yPercent: 30, scale: 0.85, ease: "none",
      scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
    });
    gsap.to(q("[data-ghost]"), { yPercent: 25, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
    ScrollTrigger.refresh();
  }, { scope: root });

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative isolate overflow-hidden text-white">
      <div data-bg className="hero-bg grain absolute inset-0 -z-10" />
      <div data-ghost aria-hidden="true" className="display pointer-events-none absolute -right-[6vw] top-[2vh] -z-10 select-none text-[38vw] leading-[.78] text-white/[.09] md:text-[34vw]">
        ALFA
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 items-center gap-6 px-4 pb-28 pt-28 md:px-6 lg:grid-cols-[1.05fr_1.2fr_auto] lg:gap-4 lg:pt-32">
        {/* Headline */}
        <div className="relative z-10">
          <h1 id="hero-title" data-hl data-hero-in className="display">
            <span className="ln block text-[clamp(30px,3.6vw,54px)]">{hero.linha1}</span>
            <span className="ln accent-line block whitespace-nowrap text-[clamp(70px,9.2vw,150px)]">{hero.linha2}</span>
            <span className="ln accent-line block text-[clamp(48px,6.2vw,100px)] text-accent">{hero.linha3}</span>
          </h1>
          <p className="sr-only">{hero.resumo}</p>
          <div data-foot data-hero-in className="mt-8 flex items-center gap-4">
            <svg viewBox="0 0 84 52" className="h-14 w-auto shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 14h16M6 8h10M4 20h8" />
              <rect x="16" y="12" width="44" height="22" rx="11" />
              <path d="M38 12V8h8v4" />
              <path d="M60 18h10l10 9v9H60z" />
              <path d="M66 20v6h10" />
              <path d="M16 36h64" />
              <circle cx="28" cy="40" r="6" fill="var(--alfa-primary)" /><circle cx="68" cy="40" r="6" fill="var(--alfa-primary)" />
            </svg>
            <span className="h-12 w-[2px] bg-white/70" aria-hidden="true" />
            <p className="ui text-[13px] leading-snug normal-case tracking-[.02em] md:text-[15px]">
              {hero.rodape1}<br />
              <span className="relative inline-block">
                <strong>{hero.rodape2}</strong>
                <svg data-underline viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full" aria-hidden="true">
                  <path d="M2 8 C 50 2, 120 12, 198 4" stroke="var(--alfa-accent)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </p>
          </div>
        </div>

        {/* Caminhão + gotas */}
        <div data-truck-wrap className="relative mx-auto w-full max-w-[760px]">
          <div data-drops className="pointer-events-none absolute inset-0 z-20">
            {drops.map((d, i) => (
              <div key={i} data-drop className="absolute" style={{ left: d.x, top: d.y }}>
                <Drop color={d.c} size={d.s} rotate={d.r} className="drop-shadow-[0_8px_10px_rgba(0,0,40,.35)]" />
              </div>
            ))}
          </div>
          <div data-truck data-hero-in className="relative z-10 [perspective:1200px]">
            <div className="absolute inset-x-[8%] bottom-[2%] h-[14%] rounded-[50%] bg-black/45 blur-2xl" aria-hidden="true" />
            <Image
              src="/img/recortes/hero-truck.webp"
              alt="Caminhão-tanque de combustível fabricado pela Tanques Alfa, cabine vermelha e tanque laranja"
              width={1247}
              height={836}
              priority
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="relative h-auto w-full scale-[1.08] drop-shadow-[0_30px_40px_rgba(0,0,30,.45)] [transform:rotateY(-8deg)]"
            />
          </div>
        </div>

        {/* Selo */}
        <div data-seal data-hero-in className="relative z-10 mx-auto w-[200px] md:w-[230px] lg:mr-4">
          <SealButton href={whatsappLink("Olá! Quero um orçamento de tanque.")} label={hero.selo} ring={hero.seloAnel} className="w-full" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20">
        {bottom === "road" ? <Road height={60} /> : <LiquidWave height={60} />}
      </div>
    </section>
  );
}
