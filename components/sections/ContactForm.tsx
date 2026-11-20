"use client";
// Formulário curto que monta a mensagem e abre o WhatsApp (sem backend)
import { useEffect, useId, useState } from "react";
import { Send } from "lucide-react";
import { tanques } from "@/content/tanques";
import { whatsappLink } from "@/content/site";

type Fields = { nome: string; empresa: string; telefone: string; tipo: string; mensagem: string };
const empty: Fields = { nome: "", empresa: "", telefone: "", tipo: "", mensagem: "" };

const assuntos: Record<string, string> = {
  projeto: "Projeto personalizado",
  manutencao: "Pós-venda e manutenção",
  catalogo: "Catálogo / informações técnicas",
};

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.nome.trim().length < 2) e.nome = "Informe seu nome.";
  const digits = f.telefone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) e.telefone = "Informe um telefone com DDD, ex.: (19) 98150-6868.";
  if (!f.tipo) e.tipo = "Escolha o tipo de tanque ou assunto.";
  return e;
}

export default function ContactForm({ tipoInicial = "", dark = false }: { tipoInicial?: string; dark?: boolean }) {
  const [f, setF] = useState<Fields>({ ...empty, tipo: tipoInicial });
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [sent, setSent] = useState(false);
  const id = useId();
  const errors = validate(f);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get("tanque") || p.get("assunto");
    if (t && (tanques.some((x) => x.slug === t) || assuntos[t])) setF((s) => ({ ...s, tipo: t }));
  }, []);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF((s) => ({ ...s, [k]: e.target.value }));
  const blur = (k: keyof Fields) => () => setTouched((s) => ({ ...s, [k]: true }));
  const show = (k: keyof Fields) => (touched[k] || sent) && errors[k];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    if (Object.keys(errors).length) {
      const first = Object.keys(errors)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    const tipoNome = tanques.find((t) => t.slug === f.tipo)?.nome ?? assuntos[f.tipo] ?? f.tipo;
    const msg = [
      "Olá, Tanques Alfa! Vim pelo site.",
      `*Nome:* ${f.nome}`,
      f.empresa && `*Empresa:* ${f.empresa}`,
      `*Telefone/WhatsApp:* ${f.telefone}`,
      `*Interesse:* ${tipoNome}`,
      f.mensagem && `*Mensagem:* ${f.mensagem}`,
    ].filter(Boolean).join("\n");
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  };

  const input = `mt-2 block w-full rounded-xl border-0 px-4 py-3.5 text-base ring-1 ring-inset focus:ring-2 ${dark ? "bg-white/10 text-white ring-white/25 placeholder:text-white/40 focus:ring-accent" : "bg-white text-ink ring-ink/15 focus:ring-primary"}`;
  const lbl = "ui text-[12px]";
  const err = `mt-1.5 text-sm font-semibold ${dark ? "text-accent" : "text-[#b3261e]"}`;

  const field = (k: keyof Fields, label: string, el: React.ReactNode, optional = false) => (
    <div>
      <label htmlFor={`${id}-${k}`} className={lbl}>{label}{optional && <span className="ml-1 normal-case tracking-normal opacity-70">(opcional)</span>}</label>
      {el}
      {show(k) && <p id={`${id}-${k}-err`} className={err} role="alert">{errors[k]}</p>}
    </div>
  );
  const aria = (k: keyof Fields) => ({ id: `${id}-${k}`, "aria-invalid": !!show(k), "aria-describedby": show(k) ? `${id}-${k}-err` : undefined, onBlur: blur(k) });

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      {field("nome", "Nome", <input {...aria("nome")} className={input} value={f.nome} onChange={set("nome")} autoComplete="name" required />)}
      {field("empresa", "Empresa", <input {...aria("empresa")} className={input} value={f.empresa} onChange={set("empresa")} autoComplete="organization" />, true)}
      {field("telefone", "Telefone / WhatsApp", <input {...aria("telefone")} className={input} value={f.telefone} onChange={set("telefone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="(19) 99999-9999" required />)}
      {field("tipo", "Tipo de tanque", (
        <select {...aria("tipo")} className={input} value={f.tipo} onChange={set("tipo")} required>
          <option value="">Selecione…</option>
          {tanques.map((t) => <option key={t.slug} value={t.slug}>{t.nome}</option>)}
          {Object.entries(assuntos).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
      ))}
      <div className="sm:col-span-2">
        {field("mensagem", "Mensagem", <textarea {...aria("mensagem")} className={`${input} min-h-[120px]`} value={f.mensagem} onChange={set("mensagem")} placeholder="Capacidade desejada, chassi, prazo…" />, true)}
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className={`ui inline-flex min-h-14 items-center gap-2 rounded-full px-8 text-sm font-extrabold transition-transform duration-200 hover:scale-[1.04] active:scale-[.97] ${dark ? "bg-white text-primary" : "bg-primary text-white"}`}>
          Enviar pelo WhatsApp <Send className="h-4 w-4" aria-hidden />
        </button>
        <p className={`mt-3 text-sm ${dark ? "text-white/70" : "text-ink/60"}`}>A mensagem abre pronta no WhatsApp. Você revisa antes de enviar.</p>
      </div>
    </form>
  );
}
