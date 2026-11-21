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
    const el = ref.current!;
    const words = gsap.utils.toArray<HTMLElement>("[data-w]", el);
    gsap.set(words, { opacity: from, filter: `blur(${blur}px)`, y: 6 }); // só escrita, sem medir a página
    // o gatilho de scroll (que mede o layout) só é criado quando o bloco chega perto da tela
    let tw: gsap.core.Tween | null = null;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      tw = gsap.to(words, {
        opacity: 1, filter: "blur(0px)", y: 0, ease: "none", stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 88%", end: "bottom 55%", scrub: 0.6 },
      });
    }, { rootMargin: "40% 0px 40% 0px" });
    io.observe(el);
    return () => { io.disconnect(); tw?.scrollTrigger?.kill(); tw?.kill(); };
  }, { scope: ref });

  const parts = text.split(/(\s+)/);
  return (
    <Tag ref={ref} className={className}>
      {parts.map((p, i) => (/^\s+$/.test(p) ? p : <span key={i} data-w className="inline-block">{p}</span>))}
    </Tag>
  );
}
