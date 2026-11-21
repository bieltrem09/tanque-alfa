import type { Metadata } from "next";
import Image from "next/image";
import { empresa } from "@/content/empresa";
import PageHero from "@/components/sections/PageHero";
import Numbers from "@/components/sections/Numbers";
import Reveals from "@/components/ui/Reveals";
import SplitHeading from "@/components/ui/SplitHeading";
import { InmetroSeal } from "@/components/sections/Normas";
import TankBlueprint from "@/components/sections/TankBlueprint";
import { getRealAssets } from "@/lib/realAssets";

export const metadata: Metadata = {
  title: "A fábrica",
  description: "Conheça a Alfa Equipamentos Rodoviários: fábrica de tanques em Limeira-SP, certificada pelo INMETRO desde 2018 para produtos perigosos.",
  alternates: { canonical: "/empresa/" },
};

export default async function EmpresaPage() {
  const real = await getRealAssets();
  return (
    <>
      <Reveals />
      <PageHero label="Quem somos" title={empresa.titulo} subtitle={empresa.chamada} image="/img/fotos/combustivel06.webp" imageAlt="Caminhão-tanque fabricado pela Tanques Alfa no pátio da fábrica" cutout={false} />

      <section aria-labelledby="quem-somos" className="bg-paper py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 md:grid-cols-2 md:px-8">
          <div>
            <p className="label label-slash text-primary">A empresa</p>
            <SplitHeading className="display mt-4 text-[clamp(40px,5vw,84px)]"><span id="quem-somos">Tanques Alfa</span></SplitHeading>
          </div>
          <div className="space-y-5 text-lg text-ink/80">{empresa.intro.map((p) => <p key={p}>{p}</p>)}</div>
        </div>
      </section>

      <section aria-labelledby="pessoas" className="bg-ink py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 md:grid-cols-2 md:px-8">
          <Image src="/img/fotos/tanques_combustivel4.webp" alt="Detalhe das válvulas de um tanque de combustível fabricado pela Alfa" width={1110} height={754} className="h-auto w-full rounded-3xl" data-reveal />
          <div>
            <p className="label label-slash text-accent">Pessoas</p>
            <SplitHeading className="display mt-4 text-[clamp(40px,5vw,84px)]"><span id="pessoas">Solda, cálculo e desenho</span></SplitHeading>
            {empresa.pessoas.map((p) => <p key={p} className="mt-5 text-lg text-white/80">{p}</p>)}
          </div>
        </div>
      </section>

      <section aria-labelledby="missao" className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="label label-slash text-primary">Missão</p>
          <h2 id="missao" className="mt-6 max-w-5xl font-[family-name:var(--font-archivo)] text-[clamp(24px,2.6vw,40px)] font-bold leading-tight">{empresa.missao}</h2>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {empresa.valores.map((v) => (
              <li key={v.titulo} className="bg-white p-8" data-reveal>
                <h3 className="display text-4xl text-primary">{v.titulo}</h3>
                <p className="mt-3 text-ink/75">{v.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TankBlueprint chassi={real.montagem?.chassi.src ?? null} real={real.lateral[0]?.src ?? null} />
      <Numbers />

      <section id="normas" aria-labelledby="normas-title" className="bg-ink py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-4 md:grid-cols-[1fr_1.3fr] md:px-8">
          <InmetroSeal className="mx-auto h-auto w-[min(78vw,400px)]" />
          <div>
            <p className="label label-slash text-accent">Normas</p>
            <SplitHeading className="display mt-4 text-[clamp(40px,5vw,84px)]"><span id="normas-title">Certificação INMETRO</span></SplitHeading>
            {empresa.certificacao.map((p) => <p key={p} className="mt-5 text-lg text-white/80">{p}</p>)}
            <ul className="mt-10 grid gap-6 sm:grid-cols-3">
              {empresa.pilares.map((p) => (
                <li key={p.titulo} data-reveal>
                  <h3 className="ui text-sm text-accent">{p.titulo}</h3>
                  <p className="mt-2 text-white/75">{p.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="qualidade" aria-labelledby="qualidade-title" className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="label label-slash text-primary">Qualidade</p>
          <SplitHeading className="display mt-4 text-[clamp(40px,5vw,84px)]"><span id="qualidade-title">Política da qualidade</span></SplitHeading>
          <p className="mt-6 max-w-3xl text-lg"><span className="confirmar">{empresa.politicaQualidade}</span></p>
        </div>
      </section>
    </>
  );
}
