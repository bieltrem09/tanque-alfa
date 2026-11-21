"use client";
// Camadas do HERO "céu", montadas DENTRO da cena pinada da fábrica (FactoryScene):
// o tanque suspenso é a própria camada de montagem — ao rolar, o céu some, o chassi entra
// e o mesmo tanque desce e encaixa no caminhão.
import Image from "next/image";
import type React from "react";
import { ArrowUpRight, Play, ShieldCheck } from "lucide-react";
import { heroCeu as H, clientes, whatsappLink } from "@/content/site";
import WordFlip from "@/components/ui/WordFlip";

const SKY = "linear-gradient(180deg, #0453e0 0%, #126ff7 34%, #4da0ff 70%, #a2cfff 100%)";

// palavra que ocupa exatamente a largura disponível (SVG + textLength), em qualquer tela
function Palavra() {
  return (
    <svg viewBox="0 0 1000 290" className="block h-auto w-full overflow-visible" aria-hidden="true">
      <text x="500" y="262" textAnchor="middle" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="#fff"
        style={{ fontFamily: "var(--font-archivo)", fontWeight: 900, fontSize: 340, fontStretch: "125%", letterSpacing: "-0.02em" }}>
        {H.palavra}
      </text>
    </svg>
  );
}

/** Fundo: céu + nuvens + palavra gigante (fica atrás do tanque). */
export function HeroBackdrop() {
  return (
    <div data-h-sky className="absolute inset-2 overflow-hidden rounded-[22px] md:inset-3 md:rounded-[30px]" aria-hidden="true">
      <div data-h-sky-in className="absolute inset-[-3%]" style={{ background: SKY }}>
        <div data-clouds className="absolute inset-y-0 left-0 flex w-[200%]">
          <div className="relative h-full w-1/2"><Image src="/img/nuvens.webp" alt="" fill priority fetchPriority="high" sizes="100vw" className="object-cover object-bottom" /></div>
          <div className="relative h-full w-1/2 [transform:scaleX(-1)]"><Image src="/img/nuvens.webp" alt="" fill sizes="100vw" className="object-cover object-bottom" /></div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#062a7a]/50 to-transparent" />
      <div className="absolute inset-0 hidden md:block">
        {[25, 50, 75].map((x) => <span key={x} className="absolute inset-y-0 w-px bg-white/15" style={{ left: `${x}%` }} />)}
      </div>
      <div data-h-word className="absolute inset-x-[3%] top-[19%] md:inset-x-[-6%] md:top-[14%]">
        <div className="overflow-hidden"><div data-h-word-in><Palavra /></div></div>
      </div>
    </div>
  );
}

/** Interface do hero (fica na frente do tanque). */
export function HeroUI() {
  return (
    <div className="pointer-events-none absolute inset-2 z-[45] md:inset-3">
      <p data-h-ui className="ui absolute left-4 top-[30%] hidden -rotate-180 text-[11px] text-white/85 [writing-mode:vertical-rl] md:block">
        <span data-h-in style={{ "--i": 0 } as React.CSSProperties} className="block">{H.lateral}</span>
      </p>

      <div data-h-ui className="pointer-events-auto absolute right-5 top-[57%] hidden md:right-8 md:block">
        <a data-h-in style={{ "--i": 1 } as React.CSSProperties} href="#fabrica" onClick={(e) => { e.preventDefault(); const y = window.innerHeight * 1.6; window.__lenis ? window.__lenis.scrollTo(y, { duration: 2.4 }) : window.scrollTo({ top: y, behavior: "smooth" }); }} className="group flex items-center gap-3 text-white">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-primary shadow-[0_10px_30px_-10px_rgba(0,0,0,.4)] transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 h-6 w-6 fill-current" aria-hidden />
          </span>
          <span className="max-w-[11rem] rounded-2xl bg-[#062a7a]/50 px-4 py-2.5 font-[family-name:var(--font-archivo)] text-[15px] font-semibold leading-tight backdrop-blur-md">{H.fabrica}</span>
        </a>
      </div>

      <div data-h-ui className="pointer-events-auto absolute inset-x-2 bottom-2 md:inset-x-auto md:bottom-8 md:left-8 md:w-[min(560px,42vw)]">
        <div data-h-in style={{ "--i": 2 } as React.CSSProperties} className="rounded-[20px] border border-white/25 bg-gradient-to-br from-[#1f5fe0]/60 to-[#05216f]/80 p-5 text-white shadow-[0_30px_60px_-30px_rgba(4,20,70,.6)] backdrop-blur-xl md:p-8">
          <p className="ui text-[11px] text-white/80 md:text-[12px]">
            {H.eyebrow} <WordFlip words={H.tipos} className="text-accent" />
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-archivo)] text-[clamp(26px,3.4vw,52px)] font-semibold leading-[1.04] tracking-[-0.02em] [text-wrap:balance]">
            {H.titulo}
          </h1>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/85 md:text-base">{H.texto}</p>
          <a href={whatsappLink("Olá! Quero um orçamento de tanque.")} target="_blank" rel="noopener noreferrer" className="group mt-5 inline-flex min-h-12 items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-ink transition-transform hover:scale-[1.03]">
            {H.cta}
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" aria-hidden />
            </span>
          </a>
        </div>
      </div>

      <div data-h-ui className="absolute bottom-8 right-8 hidden lg:block">
        <div data-h-in style={{ "--i": 3 } as React.CSSProperties} className="flex items-center gap-4 rounded-2xl border border-white/20 bg-[#062a7a]/50 py-3 pl-3 pr-5 text-white backdrop-blur-md">
          <ul className="flex -space-x-3">
            {clientes.logos.slice(0, 4).map((c) => (
              <li key={c.nome} className="grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-white ring-2 ring-white">
                <Image src={c.src} alt={c.nome} width={120} height={87} className="h-auto w-10" />
              </li>
            ))}
          </ul>
          <div>
            <p className="flex items-center gap-1.5 font-[family-name:var(--font-archivo)] text-2xl font-bold"><ShieldCheck className="h-5 w-5" aria-hidden />{H.provaNumero}</p>
            <p className="max-w-[13rem] text-[13px] leading-snug text-white/85">{H.provaTexto}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Versão estática (prefers-reduced-motion): mesma mensagem, sem cena pinada. */
export function HeroStatic({ tanque }: { tanque: string }) {
  return (
    <div className="relative hidden min-h-[90svh] overflow-hidden p-2 motion-reduce:block md:p-3">
      <div className="relative h-full min-h-[86svh] overflow-hidden rounded-[22px] px-5 pb-8 pt-28 text-white md:rounded-[30px] md:px-10" style={{ background: SKY }}>
        <div className="mx-auto max-w-5xl"><Palavra /></div>
        <Image src={tanque} alt="Tanque Alfa suspenso pela ponte rolante" width={1772} height={769} className="mx-auto -mt-[8%] h-auto w-full max-w-4xl" />
        <p className="font-[family-name:var(--font-archivo)] text-[clamp(26px,3.4vw,52px)] font-semibold leading-tight">{H.titulo}</p>
        <p className="mt-3 max-w-xl text-white/90">{H.texto}</p>
      </div>
    </div>
  );
}
