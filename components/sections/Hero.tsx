"use client";
// HERO "CÉU" — inspirado em hero de logística: céu azul, palavra gigante cortada nas bordas,
// o tanque real da Alfa suspenso pela ponte rolante na frente dela, cartão de vidro com CTA,
// atalho para a fábrica, prova social e uma faixa "explore por tipo de tanque" abaixo da moldura.
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight, ArrowRight, Play, ShieldCheck } from "lucide-react";
import { heroCeu as H, clientes, whatsappLink } from "@/content/site";
import { tanques } from "@/content/tanques";
import { gsap, SplitText, useGSAP, reducedMotion } from "@/lib/gsap";
import { READY_EVENT } from "./Preloader";

const thumbs: Record<string, string> = {
  agua: "/img/real/caminhao-lateral-agua.webp",
  combustivel: "/img/real/caminhao-lateral-combustivel.webp",
  estacionario: "/img/fotos/thumb/tanques_estacionario1.webp",
  saneamento: "/img/real/caminhao-lateral-saneamento.webp",
  agricola: "/img/real/caminhao-lateral-agricola.webp",
};

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(root);
    if (reducedMotion()) return;

    gsap.set(q("[data-in]"), { autoAlpha: 0, y: 28 });
    const split = SplitText.create(q("[data-word]"), { type: "chars", mask: "chars" });
    gsap.set(split.chars, { yPercent: 105 });
    gsap.set(q("[data-load]"), { y: "-70svh" });

    const play = () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(q("[data-sky]"), { scale: 1.12, duration: 2 }, 0)
        .to(split.chars, { yPercent: 0, duration: 1.1, stagger: 0.07 }, 0.1)
        // o tanque desce pelo cabo e "assenta" com um pequeno balanço
        .to(q("[data-load]"), { y: 0, duration: 1.6, ease: "back.out(1.2)" }, 0.35)
        .fromTo(q("[data-swing]"), { rotation: 3 }, { rotation: 0, duration: 2.2, ease: "elastic.out(1, 0.35)" }, 0.9)
        .to(q("[data-in]"), { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.9)
        .add(() => {
          // balanço contínuo e suave, como carga pendurada
          gsap.to(q("[data-swing]"), { rotation: 1.1, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
          gsap.to(q("[data-bob]"), { y: 8, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
        });
    };
    if (document.documentElement.dataset.ready) play();
    else window.addEventListener(READY_EVENT, play, { once: true });

    // nuvens passando
    gsap.to(q("[data-clouds]"), { xPercent: -50, duration: 120, ease: "none", repeat: -1 });

    // parallax com o mouse (palavra, tanque e nuvens em profundidades diferentes)
    const mm = gsap.matchMedia();
    mm.add("(pointer: fine)", () => {
      const layers = [
        { el: q("[data-p-word]"), k: 12 },
        { el: q("[data-p-load]"), k: 26 },
        { el: q("[data-p-sky]"), k: 6 },
      ].map(({ el, k }) => ({ x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3" }), k }));
      const move = (e: PointerEvent) => layers.forEach((l) => l.x((e.clientX / innerWidth - 0.5) * -l.k));
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    });

    // saída: a moldura recua, a palavra sobe e o tanque segue descendo para a próxima cena
    const out = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
    out.to(q("[data-frame]"), { scale: 0.93, borderRadius: 44 }, 0)
      .to(q("[data-p-word]"), { yPercent: -30, opacity: 0.4 }, 0)
      .to(q("[data-p-load]"), { yPercent: 45 }, 0)
      .to(q("[data-fadeout]"), { autoAlpha: 0, y: 30 }, 0);

    return () => split.revert();
  }, { scope: root });

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative bg-[#e9ebee] p-2 md:p-3">
      {/* MOLDURA */}
      <div data-frame className="relative h-[calc(100svh-16px)] min-h-[620px] overflow-hidden rounded-[22px] text-white md:h-[calc(100svh-24px)] md:rounded-[30px]">
        {/* céu */}
        <div data-p-sky className="absolute inset-[-3%]">
          <div data-sky className="absolute inset-0" style={{ background: "linear-gradient(180deg, #1f6fdc 0%, #3d8ff0 38%, #8fc2f7 78%, #cfe4fa 100%)" }}>
            <div data-clouds className="absolute inset-y-0 left-0 flex w-[200%]" aria-hidden="true">
              <div className="h-full w-1/2 bg-[url('/img/nuvens.webp')] bg-cover bg-bottom opacity-90" />
              <div className="h-full w-1/2 bg-[url('/img/nuvens.webp')] bg-cover bg-bottom opacity-90 [transform:scaleX(-1)]" />
            </div>
          </div>
        </div>
        {/* sombra superior para o menu ficar legível */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0b2c6b]/45 to-transparent" />
        {/* linhas verticais de grade, como numa prancha */}
        <div aria-hidden="true" className="absolute inset-0 hidden md:block">
          {[25, 50, 75].map((x) => <span key={x} className="absolute inset-y-0 w-px bg-white/15" style={{ left: `${x}%` }} />)}
        </div>

        {/* palavra gigante atrás da carga */}
        <div data-p-word className="pointer-events-none absolute inset-x-0 top-[17%] flex justify-center md:top-[15%]" aria-hidden="true">
          <span data-word className="block whitespace-nowrap font-[family-name:var(--font-archivo)] text-[46vw] font-black uppercase leading-[0.78] tracking-[-0.04em] text-white md:text-[33vw]" style={{ fontStretch: "125%" }}>
            {H.palavra}
          </span>
        </div>

        {/* tanque real suspenso pela ponte rolante */}
        <div data-p-load className="pointer-events-none absolute left-1/2 top-0 z-10 w-[min(96vw,980px)] -translate-x-1/2 md:left-[55%] md:w-[min(52vw,860px)]">
          <div data-load>
            <div data-bob>
              <div data-swing style={{ transformOrigin: "50.3% 0%" }} className="relative pt-[22svh] md:pt-[21svh]">
                {/* cabo de aço até o topo */}
                <span aria-hidden="true" className="absolute left-[50.3%] top-[-10svh] h-[calc(32svh+90px)] w-[3px] -translate-x-1/2 bg-gradient-to-b from-[#1b1c20]/20 via-[#1b1c20]/90 to-[#1b1c20] md:h-[calc(31svh+90px)]" />
                <Image
                  src="/img/recortes/hero-tanque.webp"
                  alt="Tanque de água Alfa suspenso pela ponte rolante na fábrica"
                  width={1600}
                  height={812}
                  priority
                  sizes="(min-width: 768px) 64vw, 96vw"
                  className="relative h-auto w-full drop-shadow-[0_40px_40px_rgba(6,30,90,.35)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* texto lateral vertical */}
        <p data-fadeout className="ui absolute left-5 top-[34%] hidden -translate-y-1/2 -rotate-180 text-[11px] text-white/80 [writing-mode:vertical-rl] md:block">
          {H.lateral}
        </p>

        {/* atalho para a fábrica (estilo "play") */}
        <a data-in data-fadeout href="#fabrica" className="group absolute right-5 top-[58%] z-20 hidden items-center gap-3 md:right-10 md:flex">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-primary shadow-[0_10px_30px_-10px_rgba(0,0,0,.4)] transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 h-6 w-6 fill-current" aria-hidden />
          </span>
          <span className="max-w-[11rem] rounded-2xl bg-[#08277a]/45 px-4 py-2.5 font-[family-name:var(--font-archivo)] text-[15px] font-semibold leading-tight backdrop-blur-md">{H.fabrica}</span>
        </a>

        {/* cartão de vidro com a chamada */}
        <div data-in data-fadeout className="absolute inset-x-3 bottom-3 z-20 rounded-[20px] border border-white/25 bg-gradient-to-br from-[#2a62d8]/55 to-[#08277a]/75 p-5 shadow-[0_30px_60px_-30px_rgba(4,20,70,.6)] backdrop-blur-xl md:inset-x-auto md:bottom-8 md:left-10 md:w-[min(560px,42vw)] md:p-8">
          <h1 id="hero-title" className="font-[family-name:var(--font-archivo)] text-[clamp(28px,3.4vw,52px)] font-semibold leading-[1.02] tracking-[-0.02em]">
            {H.titulo}
          </h1>
          <p className="mt-3 max-w-md text-[15px] text-white/85 md:text-base">{H.texto}</p>
          <a href={whatsappLink("Olá! Quero um orçamento de tanque.")} target="_blank" rel="noopener noreferrer" className="group mt-5 inline-flex min-h-12 items-center gap-3 rounded-full bg-white py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-ink transition-transform hover:scale-[1.03]">
            {H.cta}
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" aria-hidden />
            </span>
          </a>
        </div>

        {/* prova social */}
        <div data-in data-fadeout className="absolute bottom-8 right-10 z-20 hidden items-center gap-4 rounded-2xl border border-white/20 bg-[#08277a]/45 py-3 pl-3 pr-5 backdrop-blur-md lg:flex">
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

      {/* FAIXA: explore por tipo de tanque */}
      <div className="mx-auto max-w-[1500px] px-2 pb-6 pt-6 md:px-6 md:pt-8">
        <div className="flex items-center gap-4">
          <p className="label text-ink/70">{H.explorar}</p>
          <span className="h-[2px] w-16 bg-primary" aria-hidden="true" />
        </div>
        <ul className="mt-5 flex snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-0 md:divide-x md:divide-ink/10 md:overflow-visible">
          {tanques.map((t) => (
            <li key={t.slug} className="w-[72vw] shrink-0 snap-start md:w-auto">
              <Link href={`/tanques/${t.slug}/`} className="group flex items-center gap-4 rounded-2xl bg-white/60 p-3 transition-colors hover:bg-white md:mx-3 md:bg-transparent md:p-2">
                <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-white">
                  <Image src={thumbs[t.slug]} alt="" fill sizes="96px" className="object-contain p-1 transition-transform duration-500 group-hover:scale-110" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-[family-name:var(--font-archivo)] text-[15px] font-semibold text-ink">{t.curto}</span>
                  <span className="block truncate text-[13px] text-ink/60">{t.aplicacoes[0]}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
