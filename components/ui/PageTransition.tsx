"use client";
// Cortina na cor primária com o logo ao centro entre páginas (600ms expo.inOut)
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { gsap, reducedMotion } from "@/lib/gsap";

export default function PageTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const busy = useRef(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      const samePage = url.pathname === location.pathname;
      if (samePage) {
        if (url.hash) {
          e.preventDefault();
          e.stopPropagation();
          const el = document.querySelector(url.hash);
          if (el) window.__lenis ? window.__lenis.scrollTo(el as HTMLElement, { offset: -80 }) : el.scrollIntoView();
        }
        return;
      }
      if (reducedMotion() || busy.current || !ref.current) return;
      e.preventDefault();
      e.stopPropagation();
      busy.current = true;
      const el = ref.current;
      gsap.set(el, { display: "grid", yPercent: 100 });
      gsap.to(el, {
        yPercent: 0, duration: 0.6, ease: "expo.inOut",
        onComplete: () => router.push(url.pathname + url.search + url.hash),
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !busy.current) return;
    const t = setTimeout(() => {
      gsap.to(el, {
        yPercent: -100, duration: 0.6, ease: "expo.inOut",
        onComplete: () => { gsap.set(el, { display: "none" }); busy.current = false; },
      });
      if (location.hash) {
        const target = document.querySelector(location.hash);
        target?.scrollIntoView();
      }
    }, 80);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div ref={ref} aria-hidden="true" className="hero-bg fixed inset-0 z-[150] hidden place-items-center">
      <Image src="/img/logo-alfa.png" alt="" width={253} height={88} className="h-16 w-auto rounded-lg" />
    </div>
  );
}
