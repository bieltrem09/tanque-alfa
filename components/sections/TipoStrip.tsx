import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { tanques } from "@/content/tanques";
import { heroCeu as H } from "@/content/site";

const thumbs: Record<string, string> = {
  agua: "/img/real/caminhao-lateral-agua.webp",
  combustivel: "/img/real/caminhao-lateral-combustivel.webp",
  estacionario: "/img/fotos/thumb/tanques_estacionario1.webp",
  saneamento: "/img/real/caminhao-lateral-saneamento.webp",
  agricola: "/img/real/caminhao-lateral-agricola.webp",
};

// Faixa "Explore por tipo de tanque" (padrão de categorias logo abaixo do hero)
export default function TipoStrip() {
  return (
    <section aria-label={H.explorar} className="bg-[#e9ebee]">
      <div className="mx-auto max-w-[1500px] px-4 py-8 md:px-6">
        <div className="flex items-center gap-4">
          <p className="label label-slash text-ink/70">{H.explorar}</p>
          <span className="h-[2px] w-16 bg-primary" aria-hidden="true" />
        </div>
        <ul className="mt-5 flex snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-0 md:divide-x md:divide-ink/10 md:overflow-visible">
          {tanques.map((t) => (
            <li key={t.slug} className="w-[72vw] shrink-0 snap-start md:w-auto">
              <Link href={`/tanques/${t.slug}/`} className="group flex items-center gap-4 rounded-2xl bg-white/60 p-3 transition-colors hover:bg-white md:mx-3 md:bg-transparent md:p-2">
                <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-white">
                  <Image src={thumbs[t.slug]} alt="" fill sizes="96px" loading="lazy" className="object-contain p-1 transition-transform duration-500 group-hover:scale-110" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-[family-name:var(--font-archivo)] text-[15px] font-semibold text-ink">{t.curto}</span>
                  <span className="block truncate text-[13px] text-ink/60">{t.aplicacoes[0]}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
