"use client";
// Accordion com ícone + que vira ×; o primeiro abre por padrão, borda lateral na cor primária
import { useId, useState } from "react";
import { Plus } from "lucide-react";

type Item = { titulo: string; texto: string };

export default function Accordion({ items, dark = false }: { items: Item[]; dark?: boolean }) {
  const [open, setOpen] = useState(0);
  const id = useId();
  return (
    <ul className={`divide-y ${dark ? "divide-white/15 border-white/15" : "divide-ink/15 border-ink/15"} border-y`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.titulo} className={`relative transition-colors duration-200 ${isOpen ? "before:absolute before:inset-y-3 before:left-0 before:w-[3px] before:bg-primary" : ""} ${dark && isOpen ? "before:bg-accent" : ""}`}>
            <h3>
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="ui flex min-h-[56px] w-full items-center justify-between gap-4 py-4 pl-5 pr-1 text-left text-[13px] md:text-sm"
              >
                <span>{it.titulo}</span>
                <Plus aria-hidden className={`h-5 w-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] ${isOpen ? "rotate-45" : ""} ${dark ? "text-accent" : "text-primary"}`} />
              </button>
            </h3>
            <div
              id={`${id}-p${i}`}
              role="region"
              aria-labelledby={`${id}-b${i}`}
              className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className={`pb-5 pl-5 pr-8 ${dark ? "text-white/75" : "text-ink/75"}`}>{it.texto}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
