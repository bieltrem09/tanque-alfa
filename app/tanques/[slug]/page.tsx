import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { tanques, getTanque } from "@/content/tanques";
import { foto } from "@/content/galeria";
import PageHero from "@/components/sections/PageHero";
import ProductLine from "@/components/sections/ProductLine";
import CtaContato from "@/components/sections/CtaContato";
import Gallery from "@/components/ui/Gallery";
import Reveals from "@/components/ui/Reveals";
import SplitHeading from "@/components/ui/SplitHeading";
import { getRealAssets } from "@/lib/realAssets";

export const dynamicParams = false;
export function generateStaticParams() {
  return tanques.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = getTanque((await params).slug)!;
  return {
    title: t.nome,
    description: `${t.resumo} Fabricação sob medida em Limeira-SP pela Tanques Alfa.`,
    alternates: { canonical: `/tanques/${t.slug}/` },
    openGraph: { title: `${t.nome} | Tanques Alfa`, description: t.resumo, images: [{ url: `/img/fotos/${t.galeria[0]}.webp` }] },
  };
}

export default async function TanquePage({ params }: { params: Promise<{ slug: string }> }) {
  const t = getTanque((await params).slug);
  if (!t) notFound();
  const real = await getRealAssets();
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: t.nome,
    description: t.resumo,
    image: t.galeria.map((g) => `/img/fotos/${g}.webp`),
    brand: { "@type": "Brand", name: "Tanques Alfa" },
    manufacturer: { "@type": "Organization", name: "ALFA Equipamentos Rodoviários" },
  };
  return (
    <>
      <Reveals />
      <PageHero label="Tanques" title={t.nome} subtitle={t.resumo} image={t.recorte} imageAlt={`${t.nome} fabricado pela Tanques Alfa`} dropColor={t.cor} cutout={t.recorte.includes("/recortes/")} />

      <section aria-labelledby="sobre" className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 md:grid-cols-[1.3fr_1fr] md:px-8">
          <div>
            <p className="label label-slash text-primary">Sobre a linha</p>
            <SplitHeading className="display mt-4 text-[clamp(40px,5vw,80px)]"><span id="sobre">Feito para o seu líquido</span></SplitHeading>
            {t.descricao.map((p) => <p key={p} className="mt-5 max-w-2xl text-lg text-ink/80">{p}</p>)}
          </div>
          <div className="rounded-3xl bg-white p-8 ring-1 ring-ink/10" data-reveal>
            <h2 className="ui text-sm text-primary">Aplicações</h2>
            <ul className="mt-5 space-y-3">
              {t.aplicacoes.map((a) => <li key={a} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />{a}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <ProductLine t={t} dark showLink={false} video={real.arquitetura[t.slug]} produto={real.produto[t.slug]} frames={real.arquiteturaQuadros[t.slug]} />

      <section aria-labelledby="galeria-produto" className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="label label-slash text-primary">Galeria</p>
          <SplitHeading className="display mt-4 mb-10 text-[clamp(40px,5vw,80px)]"><span id="galeria-produto">Tanques entregues</span></SplitHeading>
          <Gallery fotos={t.galeria.map(foto)} />
        </div>
      </section>

      <CtaContato tipoInicial={t.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
    </>
  );
}
