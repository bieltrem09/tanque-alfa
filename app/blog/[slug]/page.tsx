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
        <header className="hero-bg grain relative isolate overflow-hidden pt-32 text-white md:pt-40">
          <div className="mx-auto max-w-[1000px] px-4 md:px-8">
            <Link href="/blog/" className="ui inline-flex items-center gap-1.5 text-[11px] text-white/75 hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden /> Todos os artigos</Link>
            <p className="mt-6 flex flex-wrap items-center gap-3 text-[13px] text-white/80">
              <span className="ui rounded-full bg-accent px-3 py-1 text-[11px] text-ink">{p.categoria}</span>
              <time dateTime={p.data}>{formatData(p.data)}</time>
              <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden /> {tempoLeitura(p)} min de leitura</span>
            </p>
            <h1 className="display mt-5 text-[clamp(40px,6vw,88px)] leading-[0.98]">{p.titulo}</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">{p.resumo}</p>
          </div>
          <div className="mx-auto mt-12 max-w-[1100px] px-4 md:px-8">
            <div className="relative aspect-[16/8] overflow-hidden rounded-t-[28px]">
              <Image src={p.capa} alt={p.capaAlt} fill priority sizes="(min-width: 1100px) 1100px, 100vw" className="object-cover" />
            </div>
          </div>
        </header>
        <div className="bg-paper pb-20 pt-12 md:pb-28 md:pt-16">
          <div className="mx-auto max-w-[760px] px-4 text-[18px] leading-[1.75] text-ink/85 md:px-8">
            {p.corpo.map((b, i) => (
              <div key={i}>
                {b.h2 && <h2 className="mt-12 font-[family-name:var(--font-archivo)] text-[clamp(24px,2.4vw,32px)] font-bold leading-tight text-ink">{b.h2}</h2>}
                {b.p && <ScrollWordReveal text={b.p} className="mt-5" />}
                {b.lista && (
                  <ul className="mt-5 space-y-3">
                    {b.lista.map((l) => <li key={l} className="flex gap-3" data-reveal><span aria-hidden="true" className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-primary" />{l}</li>)}
                  </ul>
                )}
              </div>
            ))}
            <aside className="mt-14 rounded-3xl bg-primary p-8 text-white md:p-10" data-reveal>
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
