import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { tanques } from "@/content/tanques";
import { heroCeu as H } from "@/content/site";

const thumbs: Record<string, string> = {
  agua: "/img/real/nt/caminhao-agua.webp",
  combustivel: "/img/real/nt/caminhao-combustivel.webp",
  estacionario: "/img/fotos/tanques_estacionario1.webp",
  saneamento: "/img/real/nt/caminhao-saneamento.webp",
  agricola: "/img/real/nt/caminhao-agricola.webp",
};

// "Explore por tipo de tanque": cards grandes com o caminhão em destaque, logo após a cena da fábrica.
export default function TipoStrip() {
  return (
    <section aria-labelledby="explorar-tipos" className="bg-[#e9ebee]">
      <div className="mx-auto max-w-[1500px] px-4 py-16 md:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label label-slash text-primary">Linhas de produto</p>
            <h2 id="explorar-tipos" className="display mt-3 text-[clamp(40px,5.6vw,92px)] leading-[0.95] text-ink">{H.explorar}</h2>
          </div>
          <p className="max-w-sm text-ink/65">Escolha a aplicação e veja aplicações, vantagens e detalhes de fabricação de cada linha.</p>
        </div>
        <ul className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-5 md:gap-5 md:overflow-visible md:px-0">
          {tanques.map((t, i) => {
            const foto = t.slug === "estacionario";
            return (
              <li key={t.slug} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] md:w-auto">
                <Link
                  href={`/tanques/${t.slug}/`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_20px_40px_-28px_rgba(6,28,224,.55)] ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-2 hover:shadow-[0_34px_60px_-30px_rgba(6,28,224,.7)]"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-[radial-gradient(120%_90%_at_50%_100%,#dfe6ff_0%,#f4f6fb_55%,#fff_100%)]">
                    <span className="absolute left-4 top-4 z-10 font-[family-name:var(--font-archivo)] text-[12px] font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {!foto && <span aria-hidden="true" className="absolute inset-x-[10%] bottom-[18%] h-[6%] rounded-[50%] bg-black/25 blur-md" />}
                    <Image
                      src={thumbs[t.slug]}
                      alt={`${t.nome} da Tanques Alfa`}
                      fill
                      sizes="(min-width: 768px) 20vw, 78vw"
                      loading="lazy"
                      className={`${foto ? "object-cover" : "object-contain px-3 pt-6"} transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07] ${foto ? "" : "group-hover:-translate-x-1"}`}
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <span className="display text-[clamp(26px,2vw,34px)] leading-none text-ink">{t.curto}</span>
                    <span className="mt-2 line-clamp-2 text-[14px] leading-snug text-ink/65">{t.resumo}</span>
                    <span className="ui mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-primary/10 px-4 py-2 text-[11px] text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      Ver tanque <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
