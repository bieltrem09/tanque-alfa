"use client";
// Filme do caminhão (public/img/real/filme-fabrica.mp4): o scroll controla o tempo do vídeo.
import { useRef } from "react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

export default function VideoScrub({ src }: { src: string }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const v = ref.current!.querySelector("video")!;
    if (reducedMotion()) { v.controls = true; return; }
    const setup = () => {
      const o = { t: 0 };
      gsap.to(o, {
        t: v.duration - 0.05, ease: "none",
        onUpdate: () => { v.currentTime = o.t; },
        scrollTrigger: { trigger: ref.current, start: "top top", end: "+=300%", pin: true, scrub: 1 },
      });
    };
    v.readyState >= 1 ? setup() : v.addEventListener("loadedmetadata", setup, { once: true });
  }, { scope: ref });
  return (
    <section ref={ref} aria-label="Filme: o caminhão-tanque Alfa em movimento" className="relative h-[100svh] overflow-hidden bg-ink">
      <video src={src} muted playsInline preload="auto" className="h-full w-full object-cover" />
    </section>
  );
}
