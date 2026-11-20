"use client";
// Mini-hero das páginas internas: mesma linguagem do hero da home
import Image from "next/image";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, reducedMotion } from "@/lib/gsap";
import Drop from "@/components/ui/Drop";
import { READY_EVENT } from "./Preloader";

type Props = { label: string; title: string; subtitle?: string; image?: string; imageAlt?: string; dropColor?: string; cutout?: boolean };

export default function PageHero({ label, title, subtitle, image, imageAlt = "", dropColor = "var(--liquid)", cutout = true }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion()) return;
    const q = gsap.utils.selector(ref);
    const play = () => {
      const split = SplitText.create(q("h1"), { type: "lines", mask: "lines" });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(split.lines, { yPercent: 110, duration: 0.9, stagger: 0.08 }, 0.1)
        .from(q("[data-img]"), { y: 80, rotation: -4, opacity: 0, duration: 1.1, ease: "back.out(1.4)" }, 0.2)
        .from(q("[data-drop]"), { scale: 0, opacity: 0, duration: 0.8, stagger: 0.05 }, 0.4)
        .from(q("[data-sub]"), { y: 20, opacity: 0, duration: 0.7 }, 0.5);
    };
    if (document.documentElement.dataset.ready) play(); else window.addEventListener(READY_EVENT, play, { once: true });
  }, { scope: ref });

  return (
    <section ref={ref} className="hero-bg grain relative isolate overflow-hidden text-white">
      <div aria-hidden="true" className="display pointer-events-none absolute -right-[4vw] top-8 -z-10 select-none whitespace-nowrap text-[28vw] leading-[.8] text-white/[.08]">ALFA</div>
      <div className={`mx-auto grid max-w-[1400px] items-center gap-8 px-4 pb-20 pt-32 md:px-8 md:pt-40 ${image ? "lg:grid-cols-[1fr_1.1fr]" : ""}`}>
        <div>
          <p className="label label-slash text-accent">{label}</p>
          <h1 className="display mt-4 text-[clamp(56px,9vw,150px)]">{title}</h1>
          {subtitle && <p data-sub className="mt-6 max-w-xl text-lg text-white/85">{subtitle}</p>}
        </div>
        {image && (
          <div className="relative">
            {[["2%", "6%", 34], ["86%", "0%", 46], ["94%", "70%", 24], ["-2%", "72%", 20]].map(([l, t, s], i) => (
              <div key={i} data-drop className="absolute z-20" style={{ left: l as string, top: t as string }}><Drop color={dropColor} size={s as number} rotate={i * 17 - 20} /></div>
            ))}
            <div data-img>
              <Image src={image} alt={imageAlt} width={800} height={460} priority sizes="(min-width:1024px) 50vw, 100vw" className={`relative z-10 h-auto w-full ${cutout ? "drop-shadow-[0_30px_40px_rgba(0,0,30,.45)]" : "rounded-3xl ring-4 ring-white/20"}`} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
