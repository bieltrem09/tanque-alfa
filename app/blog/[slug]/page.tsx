import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { posts, getPost, formatData, tempoLeitura } from "@/content/blog";
import { whatsappLink } from "@/content/site";
import Reveals from "@/components/ui/Reveals";
import PostCard from "@/components/ui/PostCard";
import ScrollWordReveal from "@/components/ui/ScrollWordReveal";

export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.titulo,
    description: p.resumo,
    alternates: { canonical: `/blog/${p.slug}/` },
    openGraph: { type: "article", title: p.titulo, description: p.resumo, images: [p.capa], publishedTime: p.data },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const outros = posts.filter((o) => o.slug !== p.slug).sort((a, b) => b.data.localeCompare(a.data)).slice(0, 3);
  const jsonLd = { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.titulo, datePublished: p.data, image: p.capa, description: p.resumo, author: { "@type": "Organization", name: "Tanques Alfa" } };
  return (
    <>
      <Reveals />
      <article>
        <header className="relative isolate overflow-hidden text-white">
          <Image src={p.capa} alt={p.capaAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,11,108,.55)_0%,rgba(4,11,108,.72)_55%,rgba(2,8,60,.9)_100%)]" />
          <div className="mx-auto max-w-[1400px] px-4 pb-40 pt-32 md:px-8 md:pb-48 md:pt-40">
            <Link href="/blog/" className="ui inline-flex items-center gap-1.5 text-[11px] text-white/80 hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden /> Todos os artigos</Link>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Assuntos">
              {(p.tags ?? [p.categoria]).map((t) => <li key={t} className="rounded-full bg-primary px-4 py-1.5 text-[13px] font-semibold ring-1 ring-white/25">{t}</li>)}
            </ul>
            <h1 className="mt-6 max-w-5xl font-[family-name:var(--font-archivo)] text-[clamp(34px,4.6vw,64px)] font-extrabold leading-[1.05]">{p.titulo}</h1>
            {p.subtitulo && <p className="mt-4 max-w-3xl text-[clamp(18px,1.6vw,24px)] text-white/85">{p.subtitulo}</p>}
            <p className="mt-10 flex items-center gap-4 text-[15px] text-white/85">
              <time dateTime={p.data}>{formatData(p.data)}</time>
              <span aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden /> {tempoLeitura(p)} min de leitura</span>
            </p>
          </div>
        </header>
        <div className="bg-paper pb-20 md:pb-28">
          <div className="relative z-10 mx-auto -mt-28 max-w-[1240px] rounded-[28px] bg-white px-6 py-12 text-[18px] leading-[1.8] text-ink/80 shadow-[0_30px_80px_-40px_rgba(4,11,108,.45)] md:-mt-32 md:px-24 md:py-16">
            {p.corpo.map((b, i) => (
              <div key={i}>
                {b.h2 && <h2 className="mt-12 font-[family-name:var(--font-archivo)] text-[clamp(24px,2.4vw,32px)] font-bold leading-tight text-ink">{b.h2}</h2>}
                {b.p && <ScrollWordReveal text={b.p} className="mt-5" />}
                {b.lista && (
                  <ul className="mt-5 space-y-3">
                    {b.lista.map((l) => {
                      const i2 = l.indexOf(": ");
                      return (
                        <li key={l} className="flex gap-3" data-reveal>
                          <span aria-hidden="true" className="mt-[0.75em] h-2 w-2 shrink-0 rounded-full bg-primary" />
                          <span>{i2 > 0 && i2 < 40 ? <><strong className="font-semibold text-ink">{l.slice(0, i2)}:</strong>{l.slice(i2 + 1)}</> : l}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
            <aside className="mx-auto mt-14 max-w-3xl rounded-3xl bg-primary p-8 text-white md:p-10" data-reveal>
              <p className="display text-[clamp(28px,3vw,40px)] leading-none">Tem dúvida sobre o seu tanque?</p>
              <p className="mt-3 text-white/80">Fale direto com quem projeta e fabrica.</p>
              <a href={whatsappLink(`Olá! Li o artigo "${p.titulo}" no site e tenho uma dúvida.`)} target="_blank" rel="noopener noreferrer" className="ui mt-6 inline-flex min-h-12 items-center rounded-full bg-[#25D366] px-6 text-[12px] font-extrabold text-white">Chamar no WhatsApp</a>
            </aside>
          </div>
        </div>
      </article>
      <section aria-labelledby="mais-artigos" className="bg-[#e9ebee] py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <h2 id="mais-artigos" className="display text-[clamp(36px,4.5vw,72px)]">Leia também</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">{outros.map((o) => <li key={o.slug}><PostCard p={o} /></li>)}</ul>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
