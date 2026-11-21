"use client";
// Camadas do HERO "céu", montadas DENTRO da cena pinada da fábrica (FactoryScene):
// o tanque suspenso é a própria camada de montagem — ao rolar, o céu some, o chassi entra
// e o mesmo tanque desce e encaixa no caminhão.
import Image from "next/image";
import { preload } from "react-dom";
import { ArrowUpRight, Play, ShieldCheck } from "lucide-react";
import { heroCeu as H, clientes, whatsappLink } from "@/content/site";
import WordFlip from "@/components/ui/WordFlip";

const NUVENS_LQ = "data:image/webp;base64,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";
const SKY = "linear-gradient(180deg, #0453e0 0%, #126ff7 34%, #4da0ff 70%, #a2cfff 100%)";

// palavra que ocupa exatamente a largura disponível (contorno SVG), em qualquer tela
function Palavra() {
  return (
    <svg viewBox="0 0 1000 290" className="block h-auto w-full overflow-visible" aria-hidden="true">
      {/* "ALFA" em Archivo Black expandida (wght 900, wdth 125) convertido em contorno: não precisa baixar a fonte larga */}
      <path fill="#fff" d="M2.3 262 99.7 28.1H179.2L276.5 262H199.1L187.1 231.1H88.6L76.9 262ZM110.5 172.9H165.2L151.1 133.5Q150.2 130.8 148.8 126.2Q147.3 121.6 145.6 115.8Q143.8 110 142.2 104.2Q140.6 98.5 139.1 93.7H137.1Q135.3 99.5 133 107Q130.7 114.4 128.5 121.6Q126.3 128.7 124.5 133.5Z M294.7 262V28.1H366.9V197.7H497.2V262Z M518.6 262V28.1H722V86.2H590.8V125.7H705.6V183.8H590.8V262Z M729.3 262 826.7 28.1H906.2L1003.5 262H926L914.1 231.1H815.6L803.9 262ZM837.5 172.9H892.1L878.1 133.5Q877.2 130.8 875.8 126.2Q874.3 121.6 872.6 115.8Q870.8 110 869.2 104.2Q867.6 98.5 866.1 93.7H864.1Q862.3 99.5 860 107Q857.6 114.4 855.5 121.6Q853.3 128.7 851.5 133.5Z" />
    </svg>
  );
}

/** Fundo: céu + nuvens + palavra gigante (fica atrás do tanque). */
export function HeroBackdrop() {
  // pede a imagem das nuvens (maior elemento da 1ª tela) já no <head>, antes de fontes e scripts
  preload("/img/nuvens.webp", { as: "image", imageSrcSet: "/img/nuvens-640.webp 640w, /img/nuvens-900.webp 900w, /img/nuvens.webp 2400w", imageSizes: "100vw", fetchPriority: "high" });
  return (
    <div data-h-sky className="absolute inset-2 overflow-hidden rounded-[22px] md:inset-3 md:rounded-[30px]" aria-hidden="true">
      <div data-h-sky-in className="absolute inset-[-3%]" style={{ background: SKY }}>
        <div data-clouds className="absolute inset-y-0 left-0 flex w-[200%]">
          <div className="relative h-full w-1/2">{/* eslint-disable-next-line @next/next/no-img-element */}
            {/* prévia embutida (~3 KB): aparece no 1º quadro; a imagem nítida carrega por cima */}
            <img src={NUVENS_LQ} alt="" width={240} height={100} className="absolute inset-0 h-full w-full object-cover object-bottom" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/nuvens.webp" srcSet="/img/nuvens-640.webp 640w, /img/nuvens-900.webp 900w, /img/nuvens.webp 2400w" sizes="100vw" alt="" width={2400} height={1000} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-bottom" /></div>
          <div className="relative h-full w-1/2 [transform:scaleX(-1)]">{/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/nuvens.webp" srcSet="/img/nuvens-640.webp 640w, /img/nuvens-900.webp 900w, /img/nuvens.webp 2400w" sizes="100vw" alt="" width={2400} height={1000} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-bottom" /></div>
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
        <span data-h-in className="block">{H.lateral}</span>
      </p>

      <div data-h-ui className="pointer-events-auto absolute right-5 top-[57%] hidden md:right-8 md:block">
        <a data-h-in href="#fabrica" onClick={(e) => { e.preventDefault(); const y = window.innerHeight * 1.6; window.__lenis ? window.__lenis.scrollTo(y, { duration: 2.4 }) : window.scrollTo({ top: y, behavior: "smooth" }); }} className="group flex items-center gap-3 text-white">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-primary shadow-[0_10px_30px_-10px_rgba(0,0,0,.4)] transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 h-6 w-6 fill-current" aria-hidden />
          </span>
          <span className="max-w-[11rem] rounded-2xl bg-[#062a7a]/50 px-4 py-2.5 font-[family-name:var(--font-archivo)] text-[15px] font-semibold leading-tight backdrop-blur-md">{H.fabrica}</span>
        </a>
      </div>

      <div data-h-ui className="pointer-events-auto absolute inset-x-2 bottom-2 md:inset-x-auto md:bottom-8 md:left-8 md:w-[min(560px,42vw)]">
        <div data-h-in className="rounded-[20px] border border-white/25 bg-gradient-to-br from-[#1f5fe0]/60 to-[#05216f]/80 p-5 text-white shadow-[0_30px_60px_-30px_rgba(4,20,70,.6)] backdrop-blur-xl md:p-8">
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
        <div data-h-in className="flex items-center gap-4 rounded-2xl border border-white/20 bg-[#062a7a]/50 py-3 pl-3 pr-5 text-white backdrop-blur-md">
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
