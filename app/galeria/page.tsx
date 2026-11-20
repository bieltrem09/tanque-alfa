import type { Metadata } from "next";
import { legendas, foto } from "@/content/galeria";
import PageHero from "@/components/sections/PageHero";
import Gallery from "@/components/ui/Gallery";
import CtaContato from "@/components/sections/CtaContato";
import Reveals from "@/components/ui/Reveals";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Fotos de tanques de água, combustível, estacionários e de saneamento fabricados pela Tanques Alfa.",
  alternates: { canonical: "/galeria/" },
};

const grupos = [
  { titulo: "Linha Alfa em estúdio", bases: ["estudio-agua", "estudio-combustivel", "estudio-saneamento", "estudio-agricola", "estudio-agua-projeto", "estudio-combustivel-projeto", "estudio-maquete"] },
  { titulo: "Combustível e óleo", bases: ["combustivel", "oleo"] },
  { titulo: "Água", bases: ["agua"] },
  { titulo: "Saneamento", bases: ["saneamento"] },
  { titulo: "Estacionário", bases: ["estacionario"] },
];

export default function GaleriaPage() {
  const nomes = Object.keys(legendas);
  return (
    <>
      <Reveals />
      <PageHero label="Galeria" title="Na estrada" subtitle="Alguns dos tanques que saíram da nossa fábrica em Limeira e hoje rodam pelo Brasil." />
      {grupos.map((g, i) => (
        <section key={g.titulo} aria-labelledby={`g-${i}`} className={`${i % 2 ? "bg-ink text-white" : "bg-paper"} py-16 md:py-24`}>
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <h2 id={`g-${i}`} className="display mb-10 text-[clamp(40px,5vw,80px)]">{g.titulo}</h2>
            <Gallery fotos={nomes.filter((n) => g.bases.includes(n) || g.bases.includes(n.replace(/^tanques_/, "").replace(/\d+$/, ""))).map(foto)} />
          </div>
        </section>
      ))}
      <CtaContato />
    </>
  );
}
