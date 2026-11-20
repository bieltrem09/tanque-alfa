"use client";
// Reveal de título com SplitText em máscara (padrão em todas as seções)
import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, reducedMotion } from "@/lib/gsap";

type Props = { as?: ElementType; className?: string; children: ReactNode; delay?: number; start?: string };

export default function SplitHeading({ as: Tag = "h2", className = "", children, delay = 0, start = "top 85%" }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion() || !ref.current) return;
    let split: SplitText | undefined;
    document.fonts.ready.then(() => {
      if (!ref.current) return;
      split = SplitText.create(ref.current, { type: "lines", mask: "lines", linesClass: "split-line" });
      gsap.from(split.lines, {
        yPercent: 110, duration: 0.9, stagger: 0.08, ease: "expo.out", delay,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    });
    return () => split?.revert();
  }, { scope: ref });
  return <Tag ref={ref} className={className}>{children}</Tag>;
}
