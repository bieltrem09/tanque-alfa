// 7.3 — Linha de produto estilo "blueprint" (desenho técnico + foto + accordion de vantagens)
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { Tanque } from "@/content/tanques";
import Blueprint from "@/components/ui/Blueprint";
import Accordion from "@/components/ui/Accordion";
import SplitHeading from "@/components/ui/SplitHeading";

export default function ProductLine({ t, dark, flip = false, showLink = true, headingLevel = "h2" }: { t: Tanque; dark: boolean; flip?: boolean; showLink?: boolean; headingLevel?: "h2" | "h3" }) {
  const isCut = t.recorte.includes("/recortes/");
  return (
    <section aria-labelledby={`linha-${t.slug}`} className={`relative overflow-hidden ${dark ? "bg-ink text-white" : "bg-paper text-ink"}`}>
      <div className="mx-auto max-w-[1400px] px-4 pt-20 md:px-8 md:pt-28">
        <div className={`h-px w-full ${dark ? "bg-white/15" : "bg-ink/15"}`} />
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_2fr] md:items-end">
          <div>
            <p className={`label label-slash ${dark ? "text-accent" : "text-primary"}`}>{t.nome}</p>
            <SplitHeading as={headingLevel} className="display mt-4 text-[clamp(44px,6vw,96px)]">
              <span id={`linha-${t.slug}`}>{t.curto}</span>
            </SplitHeading>
            <p className={`mt-4 max-w-md ${dark ? "text-white/75" : "text-ink/75"}`}>{t.resumo}</p>
          </div>
          <Blueprint specs={t.specs} dark={dark} />
        </div>
      </div>

      <div className={`blueprint-grid relative mt-16 border-t ${dark ? "border-white/10" : "border-ink/10"}`}>
        <div className={`mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24`}>
          <div className={`relative ${flip ? "md:order-2" : ""}`}>
            <Image
              src={t.recorte}
              alt={`${t.nome} fabricado pela Tanques Alfa`}
              width={800}
              height={460}
              sizes="(min-width: 768px) 55vw, 100vw"
              className={`relative h-auto w-[115%] max-w-none ${flip ? "md:ml-0" : "md:-ml-[18%]"} ${isCut ? "drop-shadow-[0_30px_30px_rgba(0,0,0,.35)]" : "rounded-2xl"}`}
              data-reveal
            />
          </div>
          <div>
            <p className={`label label-slash ${dark ? "text-accent" : "text-primary"}`}>Vantagens</p>
            <div className="mt-6"><Accordion items={t.vantagens} dark={dark} /></div>
            {showLink && (
              <Link
                href={`/tanques/${t.slug}/`}
                className={`ui mt-8 inline-flex min-h-12 items-center gap-1 rounded-full px-6 py-3 text-[12px] font-extrabold transition-transform duration-200 hover:scale-[1.04] active:scale-[.97] ${dark ? "bg-white text-primary" : "bg-primary text-white"}`}
              >
                Ver tanque <ChevronRight className="h-4 w-4" aria-hidden />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
