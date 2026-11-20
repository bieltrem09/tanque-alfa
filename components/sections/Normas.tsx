"use client";
import Link from "next/link";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { normas } from "@/content/site";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";
import SplitHeading from "@/components/ui/SplitHeading";

export function InmetroSeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={className} role="img" aria-label="Selo: fabricação certificada INMETRO desde 2018">
      <defs><path id="seal-normas" d="M120,120 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" /></defs>
      <circle cx="120" cy="120" r="116" fill="none" stroke="var(--alfa-accent)" strokeWidth="2" />
      <circle cx="120" cy="120" r="70" fill="var(--alfa-primary)" />
      <text fill="#fff" style={{ fontFamily: "var(--font-archivo)", fontWeight: 800, fontSize: 12 }}>
        <textPath href="#seal-normas" textLength="572" lengthAdjust="spacing">CERTIFICAÇÃO INMETRO • PRODUTOS PERIGOSOS • PORTARIA 16/2016 •</textPath>
      </text>
      <text x="120" y="114" textAnchor="middle" fill="#fff" style={{ fontFamily: "var(--font-anton)", fontSize: 30 }}>DESDE</text>
      <text x="120" y="148" textAnchor="middle" fill="var(--alfa-accent)" style={{ fontFamily: "var(--font-anton)", fontSize: 40 }}>2018</text>
    </svg>
  );
}

export default function Normas() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion()) return;
    gsap.to("[data-seal-rot]", { rotation: 200, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 } });
  }, { scope: ref });
  return (
    <section ref={ref} id="normas" aria-labelledby="normas-title" className="relative overflow-hidden bg-ink py-20 text-white md:py-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 md:grid-cols-[1fr_1.2fr] md:px-8">
        <div className="mx-auto w-[min(80vw,420px)]" data-seal-rot><InmetroSeal className="h-auto w-full" /></div>
        <div>
          <p className="label label-slash text-accent">Normas</p>
          <SplitHeading className="display mt-4 text-[clamp(44px,6vw,96px)]"><span id="normas-title">{normas.titulo}</span></SplitHeading>
          {normas.texto.map((p) => <p key={p} className="mt-5 max-w-xl text-white/75">{p}</p>)}
          <p className="ui mt-6 text-[12px] text-accent">{normas.registro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/empresa/#qualidade" className="ui inline-flex min-h-12 items-center gap-1 rounded-full bg-white px-6 text-[12px] font-extrabold text-primary transition-transform hover:scale-[1.04]">Política da qualidade <ChevronRight className="h-4 w-4" aria-hidden /></Link>
            <Link href="/empresa/#normas" className="ui inline-flex min-h-12 items-center gap-1 rounded-full px-6 text-[12px] ring-1 ring-white/30 transition-colors hover:bg-white/10">Normas <ChevronRight className="h-4 w-4" aria-hidden /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
