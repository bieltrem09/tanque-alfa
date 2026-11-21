"use client";
// Texto que se revela palavra por palavra conforme o scroll (padrões "Motion Scroll Word Reveal" e
// "Text Scroll Reveal" do 21st.dev, feitos com GSAP ScrollTrigger para seguir o Lenis do site).
// Cada palavra começa apagada e desfocada e acende na ordem de leitura enquanto o bloco atravessa a tela.
// O texto completo fica no HTML (leitores de tela e SEO leem normalmente).
import { useRef, type ElementType } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

type Props = { text: string; as?: ElementType; className?: string; from?: number; blur?: number };

export default function ScrollWordReveal({ text, as: Tag = "p", className = "", from = 0.14, blur = 6 }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion()) return;
    const words = gsap.utils.toArray<HTMLElement>("[data-w]", ref.current);
    gsap.fromTo(
      words,
      { opacity: from, filter: `blur(${blur}px)`, y: 6 },
      {
        opacity: 1, filter: "blur(0px)", y: 0, ease: "none", stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 88%", end: "bottom 55%", scrub: 0.6 },
      },
    );
  }, { scope: ref });

  const parts = text.split(/(\s+)/);
  return (
    <Tag ref={ref} className={className}>
      {parts.map((p, i) => (/^\s+$/.test(p) ? p : <span key={i} data-w className="inline-block will-change-[opacity,filter]">{p}</span>))}
    </Tag>
  );
}
