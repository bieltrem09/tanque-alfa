"use client";
// Celular: cartões empilhados. Cada cartão gruda no topo e o próximo sobe por cima dele;
// o cartão coberto encolhe e escurece (scrub com o scroll). No computador a lista fica escondida.
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ChevronRight, Droplets, Fuel, Cylinder, Waves, Sprout } from "lucide-react";
import { tanques } from "@/content/tanques";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

const icons = [Droplets, Fuel, Cylinder, Waves, Sprout];
const fotos: Record<string, string> = {
  agua: "/img/real/nt/thumb/caminhao-agua.webp",
  combustivel: "/img/real/nt/thumb/caminhao-combustivel.webp",
  estacionario: "/img/fotos/thumb/tanques_estacionario1.webp",
  saneamento: "/img/real/nt/thumb/caminhao-saneamento.webp",
  agricola: "/img/real/nt/thumb/caminhao-agricola.webp",
};

export default function StackCards() {
  const ref = useRef<HTMLUListElement>(null);
  useGSAP(() => {
    if (reducedMotion() || window.innerWidth >= 768) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-stack]", ref.current);
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      gsap.to(card.querySelector("[data-stack-inner]"), {
        scale: 0.9, filter: "brightness(.55)", ease: "none",
        scrollTrigger: { trigger: next, start: "top 70%", end: "top 100px", scrub: true },
      });
    });
  }, { scope: ref });

  return (
    <ul ref={ref} aria-label="Linhas de produto" className="relative bg-ink px-3 pb-[18svh] pt-6 md:hidden">
      {tanques.map((t, i) => {
        const Icon = icons[i];
        const foto = t.slug === "estacionario";
        return (
          <li key={t.slug} data-stack className="sticky" style={{ top: `calc(84px + ${i * 12}px)`, marginBottom: i < tanques.length - 1 ? "32svh" : 0 }}>
            <div data-stack-inner className="origin-top overflow-hidden rounded-[26px] bg-[#16171b] text-white shadow-[0_-18px_40px_-12px_rgba(0,0,0,.7)] ring-1 ring-white/10">
              <div className="relative h-[34svh] bg-[radial-gradient(120%_90%_at_50%_100%,#1e3bff_0%,#061CE0_45%,#04108f_100%)]">
                <span className="ui absolute left-5 top-5 z-10 text-[12px] text-accent">{String(i + 1).padStart(2, "0")} / {String(tanques.length).padStart(2, "0")}</span>
                <Image src={fotos[t.slug]} alt={`${t.nome} da Tanques Alfa`} fill sizes="94vw" loading="lazy" className={foto ? "object-cover" : "object-contain px-4 pt-10"} />
              </div>
              <div className="p-6">
                <Icon className="h-7 w-7 text-accent" aria-hidden />
                <h3 className="ui mt-3 text-base">{t.nome}</h3>
                <p className="mt-2 text-white/70">{t.resumo}</p>
                <Link href={`/tanques/${t.slug}/`} className="ui mt-4 inline-flex min-h-11 items-center gap-1 text-[12px] text-accent">
                  Ver tanque <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
