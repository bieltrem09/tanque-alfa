"use client";
// Accordion de vantagens.
// Entrada no scroll: cada linha se desenha, o título sobe de uma máscara, o "+" gira para o lugar e uma
// faixa de luz varre o item (em sequência). Ao abrir: barra lateral cresce e o texto sai do desfoque.
import { useId, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap, useGSAP, reducedMotion } from "@/lib/gsap";

type Item = { titulo: string; texto: string };

export default function Accordion({ items, dark = false }: { items: Item[]; dark?: boolean }) {
  const [open, setOpen] = useState(0);
  const id = useId();
  const ref = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    if (reducedMotion()) return;
    const q = gsap.utils.selector(ref);
    gsap.set(q("[data-acc-line]"), { scaleX: 0 });
    gsap.set(q("[data-acc-title]"), { yPercent: 110 });
    gsap.set(q("[data-acc-icon]"), { scale: 0, rotation: -180 });
    gsap.set(q("[data-acc-hl]"), { xPercent: -101 });
    gsap.set(q("[data-acc-body]"), { autoAlpha: 0, y: 12, filter: "blur(6px)" });
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 82%", once: true } });
    q("li").forEach((li, i) => {
      const at = i * 0.14;
      const sel = gsap.utils.selector(li);
      tl.to(sel("[data-acc-line]"), { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, at)
        .to(sel("[data-acc-hl]"), { xPercent: 101, duration: 0.9, ease: "power2.inOut" }, at + 0.1)
        .to(sel("[data-acc-title]"), { yPercent: 0, duration: 0.7, ease: "expo.out" }, at + 0.2)
        .to(sel("[data-acc-icon]"), { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }, at + 0.3);
    });
    gsap.set(q("[data-acc-line-end]"), { scaleX: 0 });
    tl.to(q("[data-acc-line-end]"), { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, items.length * 0.14)
      .to(q("[data-acc-body]"), { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" }, 0.45);
  }, { scope: ref });

  const line = dark ? "bg-white/15" : "bg-ink/15";
  return (
    <ul ref={ref} className="relative">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.titulo} className="relative overflow-hidden">
            <span data-acc-line aria-hidden="true" className={`absolute inset-x-0 top-0 h-px origin-left ${line}`} />
            {i === items.length - 1 && <span data-acc-line-end aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-px origin-left ${line}`} />}
            <span data-acc-hl aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent ${dark ? "via-white/[.07]" : "via-primary/[.07]"} to-transparent`} />
            <span
              aria-hidden="true"
              className={`absolute inset-y-3 left-0 w-[3px] origin-top transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${dark ? "bg-accent" : "bg-primary"} ${isOpen ? "scale-y-100" : "scale-y-0"}`}
            />
            <h3>
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="ui group flex min-h-[56px] w-full items-center justify-between gap-4 py-4 pl-5 pr-1 text-left text-[13px] md:text-sm"
              >
                <span className="block overflow-hidden pb-0.5">
                  <span data-acc-title className={`block transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1.5 ${isOpen && dark ? "text-accent" : ""}`}>{it.titulo}</span>
                </span>
                <span data-acc-icon className="inline-flex">
                  <Plus aria-hidden className={`h-5 w-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${isOpen ? "rotate-[135deg]" : ""} ${dark ? "text-accent" : "text-primary"}`} />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-p${i}`}
              role="region"
              aria-labelledby={`${id}-b${i}`}
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div data-acc-body className="overflow-hidden">
                <p
                  className={`pb-5 pl-5 pr-8 transition-[opacity,filter,transform] duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100 blur-0 delay-100" : "-translate-y-1 opacity-0 blur-[4px]"} ${dark ? "text-white/75" : "text-ink/75"}`}
                >
                  {it.texto}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
