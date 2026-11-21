// 7.3 — Linha de produto estilo "blueprint" (desenho técnico + foto + accordion de vantagens)
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { Tanque } from "@/content/tanques";
import TankArchitecture from "@/components/ui/TankArchitecture";
import type { RealImg } from "@/lib/realAssets";
import { lineartFor } from "@/content/arquitetura";
import Accordion from "@/components/ui/Accordion";
import SplitHeading from "@/components/ui/SplitHeading";
import ScrollWordReveal from "@/components/ui/ScrollWordReveal";

export default function ProductLine({ t, dark, flip = false, showLink = true, headingLevel = "h2", video = null, produto = null, frames = null }: { t: Tanque; dark: boolean; flip?: boolean; showLink?: boolean; headingLevel?: "h2" | "h3"; video?: string | null; produto?: RealImg | null; frames?: { inicio: string; fim: string } | null }) {
  const isCut = t.recorte.includes("/recortes/");
  const foto = produto?.src ?? t.recorte;
  return (
    <section aria-labelledby={`linha-${t.slug}`} className={`relative overflow-hidden ${dark ? "bg-ink text-white" : "bg-paper text-ink"}`}>
      <div className="mx-auto max-w-[1400px] px-4 pt-20 md:px-8 md:pt-28">
        <div className={`h-px w-full ${dark ? "bg-white/15" : "bg-ink/15"}`} />
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1.9fr] md:items-center">
          <div>
            <p className={`label label-slash ${dark ? "text-accent" : "text-primary"}`}>{t.nome}</p>
            <SplitHeading as={headingLevel} className="display mt-4 text-[clamp(44px,6vw,96px)]">
              <span id={`linha-${t.slug}`}>{t.curto}</span>
            </SplitHeading>
            <ScrollWordReveal text={t.resumo} className={`mt-4 max-w-md ${dark ? "text-white/75" : "text-ink/75"}`} />
          </div>
          <TankArchitecture slug={t.slug} nome={t.nome} specs={t.specs} photo={t.recorte} lineart={lineartFor(t.slug)} video={video} frames={frames} dark={dark} />
        </div>
      </div>

      <div className={`blueprint-grid relative mt-16 border-t ${dark ? "border-white/10" : "border-ink/10"}`}>
        <div className={`mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24`}>
          <div className={`relative ${flip ? "md:order-2" : ""} ${produto ? "rounded-3xl bg-gradient-to-b from-[#8E9197] to-[#D3D6DA] p-[4%] shadow-[0_30px_60px_-30px_rgba(0,0,0,.6)]" : ""}`}>
            {produto && <div aria-hidden="true" className="absolute inset-x-[10%] bottom-[9%] h-[6%] rounded-[50%] bg-black/35 blur-xl" />}
            <Image
              src={foto}
              alt={`${t.nome} fabricado pela Tanques Alfa`}
              width={produto?.w ?? 1600}
              height={produto?.h ?? 900}
              sizes="(min-width: 768px) 55vw, 100vw"
              className={`relative h-auto ${produto ? "w-full" : `w-[115%] max-w-none ${flip ? "md:ml-0" : "md:-ml-[18%]"}`} ${isCut || produto ? "drop-shadow-[0_30px_30px_rgba(0,0,0,.35)]" : "rounded-2xl"}`}
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
