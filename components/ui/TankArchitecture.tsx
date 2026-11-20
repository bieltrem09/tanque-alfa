"use client";
// "Arquitetura do tanque": do desenho técnico ao tanque real, guiado pelo scroll.
// Com vídeo (public/img/real/arquitetura-<linha>.mp4): o scroll controla o tempo do vídeo.
// Sem vídeo: o traço técnico do próprio caminhão se desenha e a foto real se materializa por cima.
import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

type Spec = { valor: string; rotulo: string };
type Props = { slug: string; nome: string; specs: Spec[]; photo: string; lineart: string | null; video: string | null; dark?: boolean };

export default function TankArchitecture({ slug, nome, specs, photo, lineart, video, dark = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const q = gsap.utils.selector(ref);
    const v = q("video")[0] as HTMLVideoElement | undefined;
    if (reducedMotion()) {
      if (v) v.addEventListener("loadedmetadata", () => (v.currentTime = v.duration), { once: true });
      return;
    }
    const st = { trigger: ref.current, start: "top 80%", end: "bottom 35%", scrub: 1 };
    const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st });

    if (v) {
      const seek = { t: 0 };
      const setup = () => {
        tl.to(seek, { t: v.duration - 0.05, duration: 1, onUpdate: () => { v.currentTime = seek.t; } }, 0);
      };
      v.readyState >= 1 ? setup() : v.addEventListener("loadedmetadata", setup, { once: true });
    } else {
      gsap.set(q("[data-lines]"), { clipPath: "inset(0 100% 0 0)" });
      gsap.set(q("[data-photo]"), { clipPath: "inset(100% 0 0 0)" });
      gsap.set(q("[data-scan]"), { yPercent: 0, autoAlpha: 0 });
      tl.to(q("[data-lines]"), { clipPath: "inset(0 0% 0 0)", duration: 0.45 }, 0)
        .to(q("[data-scan]"), { autoAlpha: 1, duration: 0.05 }, 0.45)
        .fromTo(q("[data-scan]"), { top: "100%" }, { top: "0%", duration: 0.45, ease: "power1.inOut" }, 0.45)
        .to(q("[data-photo]"), { clipPath: "inset(0% 0 0 0)", duration: 0.45, ease: "power1.inOut" }, 0.45)
        .to(q("[data-scan]"), { autoAlpha: 0, duration: 0.05 }, 0.9)
        .to(q("[data-lines]"), { opacity: 0.25, duration: 0.15 }, 0.9);
    }
    tl.from(q("[data-call]"), { scaleX: 0, transformOrigin: "left center", duration: 0.15, stagger: 0.08 }, video ? 0.7 : 0.75)
      .from(q("[data-spec]"), { autoAlpha: 0, x: -16, duration: 0.15, stagger: 0.08 }, video ? 0.75 : 0.8);
  }, { scope: ref });

  const line = dark ? "border-white/15" : "border-ink/15";
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-2xl border ${line} ${dark ? "bg-[#0d1530]" : "bg-white"}`}>
      {/* folha de projeto */}
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-60" />
      <div aria-hidden="true" className={`absolute inset-3 rounded-xl border ${line}`} />
      <div className={`relative grid aspect-[16/10] place-items-center px-[6%] pb-[13%] pt-[8%] md:aspect-[16/9]`}>
        {video ? (
          <video src={video} muted playsInline preload="auto" aria-label={`Animação: ${nome} do projeto ao tanque real`} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={`${nome}: do desenho técnico ao tanque real`} data-photo className="relative z-10 block h-auto w-full drop-shadow-[0_24px_24px_rgba(0,0,0,.35)]" />
            {lineart && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={lineart} alt="" aria-hidden="true" data-lines className={`absolute inset-0 z-20 h-full w-full ${dark ? "" : "invert"}`} />
            )}
            <div data-scan aria-hidden="true" className="pointer-events-none absolute inset-x-[-4%] z-30 h-[3px] -translate-y-1/2 bg-accent shadow-[0_0_24px_6px_rgba(255,196,0,.55)]" />
          </div>
        )}
      </div>

      {/* chamadas de especificação */}
      <dl className="absolute left-[5%] top-[7%] z-30 space-y-3 md:space-y-5">
        {specs.slice(0, 2).map((s) => (
          <div key={s.rotulo} data-spec>
            <dt className="sr-only">{s.rotulo}</dt>
            <dd className={dark ? "text-white" : "text-ink"}>
              <span className={`display block ${s.valor.includes("CONFIRMAR") ? "confirmar text-[clamp(13px,1.5vw,20px)]" : "text-[clamp(20px,2.6vw,40px)]"}`}>{s.valor}</span>
              <span className="label mt-1.5 flex items-center gap-2 opacity-80">
                <span data-call className={`h-px w-8 border-t border-dashed ${dark ? "border-accent" : "border-primary"}`} />
                {s.rotulo}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {/* carimbo da folha */}
      <div className={`absolute bottom-3 right-3 z-30 grid grid-cols-[auto_auto] gap-x-4 rounded-br-xl border-l border-t ${line} px-4 py-2 text-[10px] uppercase tracking-[.12em] ${dark ? "bg-[#0d1530]/90 text-white/70" : "bg-white/90 text-ink/60"}`}>
        <span>Projeto</span><span className="font-bold">{nome}</span>
        <span>Fabricante</span><span className="font-bold">Alfa · Limeira-SP</span>
        <span>Folha</span><span className="font-bold">{slug.toUpperCase()}-01</span>
      </div>
    </div>
  );
}
