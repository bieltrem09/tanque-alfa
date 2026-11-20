"use client";
// FILME: o scroll controla o vídeo do caminhão. Entrada: o quadro abre de um card até a tela cheia.
// Durante: nome do tanque sincronizado com cada troca, legendas da estrada e das curvas.
// Final ("chave de ouro"): título com brilho dourado + botões de orçamento.
import Link from "next/link";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { filme as F, whatsappLink } from "@/content/site";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

export default function VideoScrub({ src, poster }: { src: string; poster?: string }) {
  const webm = src.replace(/\.mp4$/, ".webm");
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(ref);
    const v = q("video")[0] as HTMLVideoElement;
    if (reducedMotion()) {
      v.controls = true;
      gsap.set(q("[data-final]"), { autoAlpha: 1 });
      return;
    }
    const D = F.duracao;
    gsap.set(q("[data-nome], [data-leg], [data-final], [data-final-cta]"), { autoAlpha: 0 });
    gsap.set(q("[data-nome]"), { yPercent: 60 });
    gsap.set(q("[data-nome='0']"), { autoAlpha: 1, yPercent: 0 });
    gsap.set(q("[data-leg]"), { y: 30 });

    // entrada: card → tela cheia
    gsap.fromTo(q("[data-frame]"),
      { clipPath: "inset(9% 7% 9% 7% round 32px)" },
      { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top top", scrub: 1 } });
    gsap.fromTo(q("video"), { scale: 1.12 }, { scale: 1, ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top top", scrub: 1 } });

    const seek = { t: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: q("[data-film-pin]")[0], start: "top top", end: "+=560%", pin: true, scrub: 1, anticipatePin: 1 },
    });
    tl.to(seek, { t: D - 0.04, duration: D, onUpdate: () => { if (v.readyState >= 1) v.currentTime = seek.t; } }, 0)
      .fromTo(q("[data-progress]"), { scaleX: 0 }, { scaleX: 1, duration: D }, 0);

    // nome do tanque em cada troca
    F.linhas.forEach((l, i) => {
      if (i === 0) return;
      tl.to(q(`[data-nome='${i - 1}']`), { autoAlpha: 0, yPercent: -60, duration: 0.35, ease: "power2.in" }, l.de - 0.2)
        .to(q(`[data-nome='${i}']`), { autoAlpha: 1, yPercent: 0, duration: 0.45, ease: "power3.out" }, l.de + 0.1)
        .set(q("[data-count]"), { textContent: `0${i + 1}` }, l.de);
    });
    tl.to(q("[data-linhas]"), { autoAlpha: 0, y: -20, duration: 0.4 }, F.legendas[0].de - 0.4);

    // legendas
    F.legendas.forEach((lg, i) => {
      tl.to(q(`[data-leg='${i}']`), { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" }, lg.de)
        .to(q(`[data-leg='${i}']`), { autoAlpha: 0, y: -20, duration: 0.35, ease: "power2.in" }, lg.ate - 0.35);
    });

    // final — chave de ouro
    tl.to(q("[data-final]"), { autoAlpha: 1, duration: 0.3 }, F.final.de)
      .from(q("[data-final-title]"), { yPercent: 40, opacity: 0, duration: 0.7, ease: "expo.out" }, F.final.de)
      .fromTo(q("[data-sweep-gold]"), { backgroundPosition: "120% 0" }, { backgroundPosition: "-20% 0", duration: 1.2 }, F.final.de + 0.2)
      .to(q("[data-final-cta]"), { autoAlpha: 1, duration: 0.4 }, F.final.de + 0.6)
      .to({}, { duration: 0.6 }, D);
  }, { scope: ref });

  return (
    <section ref={ref} id="filme" aria-label="Filme: o caminhão-tanque Alfa em movimento" className="relative bg-[#e8eae6] text-ink">
      <div data-film-pin className="relative h-[100svh] overflow-hidden">
        <div data-frame className="absolute inset-0 overflow-hidden bg-[#e8eae6]">
          <video poster={poster} muted playsInline preload="auto" aria-hidden="true" className="h-full w-full object-contain md:object-cover">
            <source src={webm} type="video/webm" />
            <source src={src} type="video/mp4" />
          </video>
        </div>

        {/* nome do tanque */}
        <div data-linhas className="pointer-events-none absolute left-4 top-24 md:left-10 md:top-28">
          <p className="label label-slash text-primary">{F.label}</p>
          <div className="mt-3 flex items-end gap-4">
            <span className="ui text-sm text-ink/60"><span data-count>01</span>/0{F.linhas.length}</span>
            <div className="relative h-[clamp(52px,7vw,110px)] w-[80vw] overflow-hidden md:w-[50vw]">
              {F.linhas.map((l, i) => (
                <span key={l.nome} data-nome={i} className="display absolute bottom-0 left-0 text-[clamp(48px,7vw,110px)] leading-none">
                  {l.nome}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* legendas da estrada */}
        {F.legendas.map((lg, i) => (
          <p key={lg.texto} data-leg={i} className="display pointer-events-none absolute left-4 top-24 max-w-[16ch] text-[clamp(44px,6.4vw,104px)] md:left-10 md:top-28">
            {lg.texto}
          </p>
        ))}

        {/* final */}
        <div data-final className="absolute inset-x-0 top-[12%] flex flex-col items-center px-4 text-center md:top-[10%]">
          <h2 data-final-title className="display text-[clamp(64px,11vw,190px)]">
            <span
              data-sweep-gold
              className="clip-pad bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(100deg, #0B0B0C 0%, #0B0B0C 38%, #FFC400 46%, #FFE58A 50%, #FFC400 54%, #0B0B0C 62%, #0B0B0C 100%)", backgroundSize: "260% 100%", backgroundPosition: "120% 0" }}
            >
              {F.final.titulo}
            </span>
          </h2>
          <p className="ui mt-2 text-[13px] text-ink/70 md:text-base">{F.final.sub}</p>
          <div data-final-cta className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={whatsappLink("Olá! Vi o filme no site e quero um orçamento de tanque.")} target="_blank" rel="noopener noreferrer" className="ui inline-flex min-h-12 items-center gap-1 rounded-full bg-primary px-6 text-[12px] font-extrabold text-white transition-transform hover:scale-[1.04]">
              {F.final.cta} <ChevronRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href="/#tanques" className="ui inline-flex min-h-12 items-center rounded-full px-6 text-[12px] ring-1 ring-ink/25 transition-colors hover:bg-ink/5">
              {F.final.cta2}
            </Link>
          </div>
        </div>

        {/* progresso */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-ink/10">
          <div data-progress className="h-full origin-left bg-accent" />
        </div>
      </div>
    </section>
  );
}
