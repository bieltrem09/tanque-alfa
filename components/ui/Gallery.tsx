"use client";
// Galeria com lightbox acessível (dialog nativo, teclado ← → Esc, foco preso)
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type Foto = { src: string; alt: string };

export default function Gallery({ fotos }: { fotos: Foto[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const open = (i: number, el: HTMLButtonElement) => { opener.current = el; setIdx(i); };
  const close = useCallback(() => setIdx(null), []);
  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + fotos.length) % fotos.length)), [fotos.length]);

  useEffect(() => {
    const d = dlg.current!;
    if (idx !== null && !d.open) { d.showModal(); window.__lenis?.stop(); }
    if (idx === null && d.open) { d.close(); }
  }, [idx]);

  useEffect(() => {
    const d = dlg.current!;
    const onClose = () => { window.__lenis?.start(); setIdx(null); opener.current?.focus(); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    d.addEventListener("close", onClose); d.addEventListener("keydown", onKey);
    return () => { d.removeEventListener("close", onClose); d.removeEventListener("keydown", onKey); };
  }, [go]);

  const cur = idx !== null ? fotos[idx] : null;
  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {fotos.map((f, i) => (
          <li key={f.src} data-reveal>
            <button type="button" onClick={(e) => open(i, e.currentTarget)} className="group block w-full overflow-hidden rounded-2xl" aria-label={`Ampliar foto: ${f.alt}`}>
              <Image src={f.src} alt={f.alt} width={800} height={450} sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
            </button>
          </li>
        ))}
      </ul>
      <dialog ref={dlg} aria-label="Visualizador de fotos" className="m-0 h-full max-h-none w-full max-w-none bg-black/90 p-0 text-white backdrop:bg-black/60" onClick={(e) => e.target === dlg.current && close()}>
        {cur && (
          <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
            <Image src={cur.src} alt={cur.alt} width={1600} height={900} className="max-h-[78vh] w-auto rounded-xl object-contain" />
            <p className="text-center text-white/85">{cur.alt} <span className="text-white/60">({(idx ?? 0) + 1}/{fotos.length})</span></p>
            <div className="flex gap-3">
              <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="grid h-12 w-12 place-items-center rounded-full bg-white/15 hover:bg-white/25"><ChevronLeft aria-hidden /></button>
              <button type="button" onClick={close} aria-label="Fechar" className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink"><X aria-hidden /></button>
              <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className="grid h-12 w-12 place-items-center rounded-full bg-white/15 hover:bg-white/25"><ChevronRight aria-hidden /></button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
