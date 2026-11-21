import type { Metadata } from "next";
import { posts } from "@/content/blog";
import PageHero from "@/components/sections/PageHero";
import Reveals from "@/components/ui/Reveals";
import PostCard from "@/components/ui/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Novidades e artigos técnicos da Tanques Alfa sobre tanques de água, combustível, saneamento, agrícolas e estacionários.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  const lista = [...posts].sort((a, b) => b.data.localeCompare(a.data));
  return (
    <>
      <Reveals />
      <PageHero label="Blog" title="Novidades e artigos" subtitle="Conteúdo técnico de quem projeta e fabrica tanques: normas, manutenção e dicas para escolher o equipamento certo." />
      <section aria-label="Artigos" className="bg-paper py-16 md:py-24">
        <ul className="mx-auto grid max-w-[1400px] gap-6 px-4 sm:grid-cols-2 md:px-8 lg:grid-cols-3 lg:gap-8">
          {lista.map((p, i) => <li key={p.slug}><PostCard p={p} priority={i < 3} /></li>)}
        </ul>
      </section>
    </>
  );
}
