"use client";
// Política da Qualidade (texto oficial da Alfa) + transição: um painel cobalto se expande no scroll
// e vira o fundo da seção do WhatsApp que vem logo abaixo (mesmo gradiente .hero-bg).
import Image from "next/image";
import { useRef } from "react";
import { Trophy, Gem, Handshake, Users, RefreshCw } from "lucide-react";
import { qualidade } from "@/content/site";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import SplitHeading from "@/components/ui/SplitHeading";
import ScrollWordReveal from "@/components/ui/ScrollWordReveal";

const icons = [Trophy, Gem, Handshake, Users, RefreshCw];

export default function Qualidade() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion()) return;
    const q = gsap.utils.selector(ref);
    gsap.fromTo(q("[data-q-img]"), { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: q("[data-q-photo]")[0], start: "top bottom", end: "bottom top", scrub: true } });
    gsap.from(q("[data-q-item]"), { autoAlpha: 0, y: 30, duration: 0.7, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: q("[data-q-list]")[0], start: "top 85%", once: true } });
    // painel de transição: de um cartão arredondado no centro até a tela inteira
    const panel = q("[data-q-panel]")[0];
    gsap.timeline({ scrollTrigger: { trigger: panel, start: "top 95%", end: "top 15%", scrub: 0.6 } })
      .fromTo(panel, { clipPath: "inset(0% 14% 0% 14% round 48px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" }, 0)
      .fromTo(q("[data-q-panel-txt]"), { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power2.out" }, 0.2);
  }, { scope: ref });

  return (
    <section ref={ref} aria-labelledby="qualidade-home" className="relative bg-paper pt-20 md:pt-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 md:grid-cols-[1fr_1.1fr] md:gap-16 md:px-8">
        <div data-q-photo className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-40px_rgba(4,11,108,.55)]">
          <Image data-q-img src="/img/fotos/tanques_agua5.webp" alt="Placa de identificação Alfa em um tanque fabricado pela empresa" fill sizes="(min-width:768px) 45vw, 100vw" className="scale-[1.18] object-cover" />
          <span className="ui absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-[11px] text-primary backdrop-blur">Fabricado em Limeira-SP</span>
        </div>
        <div>
          <p className="label label-slash text-primary">Qualidade</p>
          <SplitHeading className="display mt-4 text-[clamp(44px,5.6vw,92px)] leading-[0.95]"><span id="qualidade-home">{qualidade.titulo}</span></SplitHeading>
          <ScrollWordReveal text={qualidade.texto} className="mt-6 max-w-xl text-[clamp(17px,1.3vw,20px)] leading-relaxed text-ink/80" />
        </div>
      </div>

      <ol data-q-list className="mx-auto mt-16 grid max-w-[1400px] gap-px overflow-hidden px-4 sm:grid-cols-2 md:mt-20 md:px-8 lg:grid-cols-5">
        {qualidade.compromissos.map((c, i) => {
          const Icon = icons[i];
          return (
            <li key={c.titulo} data-q-item className="group relative border-t-2 border-ink/10 py-6 pr-6 transition-colors duration-300 hover:border-primary">
              <span className="ui text-[12px] text-primary">{String(i + 1).padStart(2, "0")}</span>
              <Icon className="mt-4 h-7 w-7 text-primary transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg]" aria-hidden />
              <h3 className="mt-4 font-[family-name:var(--font-archivo)] text-[18px] font-bold text-ink">{c.titulo}</h3>
              <p className="mt-2 text-[15px] leading-snug text-ink/65">{c.texto}</p>
            </li>
          );
        })}
      </ol>

      {/* transição para a seção do WhatsApp (mesmo fundo) */}
      <div data-q-panel className="relative mt-16 overflow-hidden text-white md:mt-24" style={{ clipPath: "inset(0% 0% 0% 0%)", background: "radial-gradient(80% 120% at 50% 0%, #2a4bff 0%, #061CE0 45%, #0414a8 100%)" }}>
        <div data-q-panel-txt className="mx-auto flex max-w-[1400px] flex-col items-center px-4 pb-10 pt-24 text-center md:px-8 md:pb-6 md:pt-36">
          <p className="label label-slash text-accent">Próximo passo</p>
          <p className="display mt-4 max-w-[16ch] text-[clamp(40px,6vw,104px)] leading-[0.95]">{qualidade.ponte}</p>
          <span aria-hidden="true" className="mt-10 block h-16 w-px animate-pulse bg-gradient-to-b from-white/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
