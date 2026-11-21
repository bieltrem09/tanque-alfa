"use client";
// Celular (foto real recortada, tela transparente) com uma conversa de WhatsApp desenhada por baixo.
// A conversa é HTML normal levado para a perspectiva da tela com matrix3d (homografia calculada
// a partir dos cantos da tela na foto: 333×732 px). As mensagens chegam em sequência quando o
// celular aparece na tela, com o indicador "digitando…" entre elas, e terminam no botão do WhatsApp.
import { useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/content/site";

const SCREEN = "matrix3d(1.012054,0.167919,0,0.000299,0,0.919055,0,0,0,0,1,0,44,14.927273,0,1)";

type Msg = { de: "cliente" | "alfa"; texto: string; hora: string };
const CONVERSA: Msg[] = [
  { de: "cliente", texto: "Olá! Preciso de um orçamento de tanque 🚚", hora: "09:41" },
  { de: "alfa", texto: "Olá! Aqui é a Tanques Alfa 👋 Para qual uso é o tanque?", hora: "09:41" },
  { de: "cliente", texto: "Transporte de combustível.", hora: "09:42" },
  { de: "alfa", texto: "Perfeito! Fabricamos sob medida, com certificação INMETRO para produtos perigosos. Qual é o modelo do seu caminhão?", hora: "09:42" },
];
const MSG_WA = "Olá! Vim pelo site da Tanques Alfa e quero um orçamento.";

export default function PhoneWhatsApp({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0); // quantas mensagens já apareceram
  const [typing, setTyping] = useState<"cliente" | "alfa" | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setShown(CONVERSA.length); return; }
    const timers: number[] = [];
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      let at = 400;
      CONVERSA.forEach((m, i) => {
        const espera = m.de === "alfa" ? 1300 : 700;
        timers.push(window.setTimeout(() => setTyping(m.de), at));
        at += espera;
        timers.push(window.setTimeout(() => { setTyping(null); setShown(i + 1); }, at));
        at += 600;
      });
      timers.push(window.setTimeout(() => setTyping("alfa"), at + 400)); // fica "digitando…" no fim
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return (
    <div ref={ref} className={`group relative h-[659px] w-[300px] md:h-[732px] md:w-[333px] ${className}`}>
      {/* brilho atrás do aparelho */}
      <div aria-hidden="true" className="absolute inset-x-[-20%] top-[15%] h-[70%] rounded-full bg-[#25D366]/20 blur-[80px]" />
      <div className="absolute inset-0 [animation:flutua_6s_ease-in-out_infinite] motion-reduce:[animation:none]">
      <div className="absolute left-0 top-0 h-[732px] w-[333px] origin-top-left scale-[0.9] md:scale-100">
        {/* tela (por baixo da moldura) */}
        <div className="absolute left-0 top-0 h-[760px] w-[300px] origin-top-left overflow-hidden bg-[#efeae2]" style={{ transform: SCREEN }}>
          {/* barra de status + Dynamic Island ficam na moldura; aqui só o espaço */}
          <div className="flex h-[52px] items-end justify-between bg-[#075E54] px-6 pb-1 text-[11px] font-semibold text-white">
            <span>09:41</span>
            <span aria-hidden="true">●●● 5G ▮</span>
          </div>
          {/* cabeçalho da conversa */}
          <div className="flex items-center gap-2.5 bg-[#075E54] px-3 pb-2.5 pt-1.5 text-white">
            <span aria-hidden="true" className="text-lg leading-none">‹</span>
            <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/logo-alfa.png" alt="" width={253} height={88} loading="lazy" className="h-auto w-[30px]" />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[14px] font-semibold">Tanques Alfa</span>
              <span className="block text-[11px] text-white/80">{typing === "alfa" ? "digitando…" : "online"}</span>
            </span>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-white/90"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" /></svg>
          </div>
          {/* mensagens */}
          <div className="flex h-[548px] flex-col gap-2 overflow-hidden px-3 py-3 text-[13.5px] leading-snug text-[#111b21] [background-image:radial-gradient(rgba(0,0,0,.035)_1px,transparent_1px)] [background-size:14px_14px]" aria-live="polite">
            <span className="mx-auto mb-1 rounded-md bg-white/90 px-2.5 py-0.5 text-[11px] text-[#54656f] shadow-sm">HOJE</span>
            {CONVERSA.slice(0, shown).map((m, i) => (
              <div
                key={i}
                className={`max-w-[82%] animate-[bolha_.45s_cubic-bezier(.16,1,.3,1)_both] rounded-lg px-2.5 py-1.5 shadow-[0_1px_.5px_rgba(0,0,0,.13)] ${m.de === "cliente" ? "self-end rounded-tr-none bg-[#d9fdd3]" : "self-start rounded-tl-none bg-white"}`}
                style={{ transformOrigin: m.de === "cliente" ? "100% 0" : "0 0" }}
              >
                {m.texto}
                <span className="ml-2 inline-block translate-y-1 text-[10px] text-[#667781]">{m.hora}{m.de === "cliente" && <span className="ml-0.5 text-[#53bdeb]">✓✓</span>}</span>
              </div>
            ))}
            {typing && (
              <div className={`flex gap-1 rounded-lg px-3 py-2.5 shadow-[0_1px_.5px_rgba(0,0,0,.13)] ${typing === "cliente" ? "self-end bg-[#d9fdd3]" : "self-start bg-white"}`} aria-label="digitando">
                {[0, 1, 2].map((k) => <span key={k} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8696a0]" style={{ animationDelay: `${k * 0.15}s` }} />)}
              </div>
            )}
          </div>
          {/* chamada para ação */}
          <div className="absolute inset-x-0 bottom-0 bg-[#f0f2f5] px-3 pb-6 pt-2.5">
            <a
              href={whatsappLink(MSG_WA)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-[14px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(37,211,102,.9)] transition-transform hover:scale-[1.03] active:scale-[.97]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-white"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z" /></svg>
              Chamar no WhatsApp
            </a>
          </div>
        </div>
        {/* moldura do aparelho (tela recortada = transparente) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/celular-alfa.webp" alt="" width={333} height={732} loading="lazy" className="pointer-events-none relative block h-[732px] w-[333px] drop-shadow-[0_40px_40px_rgba(0,0,0,.55)]" />
      </div>
      </div>
    </div>
  );
}
