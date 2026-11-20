"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, X } from "lucide-react";
import { contato, nav, whatsappLink } from "@/content/site";
import { gsap, reducedMotion } from "@/lib/gsap";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 160 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    document.documentElement.style.overflow = open ? "hidden" : "";
    open ? window.__lenis?.stop() : window.__lenis?.start();
    if (open) {
      const rm = reducedMotion();
      gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: rm ? 0.01 : 0.6, ease: "expo.inOut" });
      gsap.fromTo(el.querySelectorAll("[data-menu-item]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.06, duration: rm ? 0.01 : 0.8, delay: rm ? 0 : 0.25 });
      el.querySelector<HTMLElement>("a")?.focus();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/#.*/, "")) && href !== "/#tanques");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] text-white transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className={`transition-colors duration-300 ${solid ? "bg-deep/90 backdrop-blur-md" : "bg-transparent"}`}>
          <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between gap-4 px-4 md:px-6">
            <Link href="/" aria-label="Tanques Alfa — início" className="shrink-0">
              <Image src="/img/logo-alfa-hd.webp" alt="Tanques Alfa — Equipamentos Rodoviários" width={640} height={223} priority className="h-10 w-auto md:h-12" />
            </Link>
            <nav aria-label="Principal" className="hidden lg:block">
              <ul className="flex items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-sm ring-1 ring-white/15">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      aria-current={isActive(n.href) ? "page" : undefined}
                      className={`ui block rounded-full px-4 py-2.5 text-[12px] transition-colors duration-200 ${isActive(n.href) ? "bg-white text-primary" : "hover:bg-white/15"}`}
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-2">
              <Link
                href="/contato/"
                className="ui hidden items-center gap-1 rounded-full bg-white px-5 py-3 text-[12px] font-extrabold text-primary transition-transform duration-200 hover:scale-[1.04] active:scale-[.97] sm:flex"
              >
                Pedir orçamento <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                className="grid h-12 w-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 lg:hidden"
              >
                {open ? <X aria-hidden /> : <Menu aria-hidden />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="menu-mobile"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="hero-bg grain fixed inset-0 z-[70] flex flex-col justify-between overflow-y-auto px-6 pb-10 pt-28 text-white lg:hidden"
      >
        <nav aria-label="Menu mobile">
          <ul className="space-y-1">
            {nav.map((n) => (
              <li key={n.href} className="overflow-hidden">
                <Link data-menu-item href={n.href} onClick={() => setOpen(false)} className="display block py-1 text-[clamp(52px,16vw,96px)] hover:text-accent">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="relative z-10 mt-10 space-y-3 text-white/90">
          <Link href="/contato/" onClick={() => setOpen(false)} className="ui inline-flex items-center gap-1 rounded-full bg-white px-6 py-4 text-sm font-extrabold text-primary">
            Pedir orçamento <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </>
  );
}
