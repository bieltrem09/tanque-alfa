import FactoryScene from "@/components/sections/FactoryScene";
import ProductLine from "@/components/sections/ProductLine";
import Numbers from "@/components/sections/Numbers";
import Normas from "@/components/sections/Normas";
import Clientes from "@/components/sections/Clientes";
import Atendimento from "@/components/sections/Atendimento";
import Reveals from "@/components/ui/Reveals";
import TipoStrip from "@/components/sections/TipoStrip";
import VelocityWords from "@/components/ui/VelocityWords";
import TankBlueprint from "@/components/sections/TankBlueprint";
import VideoScrub from "@/components/sections/VideoScrub";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { tanques } from "@/content/tanques";
import { getRealAssets } from "@/lib/realAssets";

export default async function Home() {
  const real = await getRealAssets();
  const destaque = ["combustivel", "agua", "saneamento"].map((s) => tanques.find((t) => t.slug === s)!);
  const outros = tanques.filter((t) => !destaque.includes(t));
  return (
    <>
      <Reveals />
      <FactoryScene real={real} />
      <TipoStrip />
      {real.filme && <VideoScrub src={real.filme} />}
      <Clientes />
      <TankBlueprint chassi={real.montagem?.chassi.src ?? null} real={real.lateral[0]?.src ?? null} />
      <VelocityWords words={["Água", "Combustível", "Saneamento", "Agrícola", "Estacionário"]} />
      <div id="tanques">
        {destaque.map((t, i) => <ProductLine key={t.slug} t={t} dark={i % 2 === 0} flip={i % 2 === 1} video={real.arquitetura[t.slug]} produto={real.produto[t.slug]} frames={real.arquiteturaQuadros[t.slug]} />)}
        <section aria-label="Outras linhas" className="bg-ink py-16 text-white">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-8">
            <p className="display text-[clamp(32px,4vw,56px)]">Também fabricamos</p>
            <ul className="flex flex-wrap gap-3">
              {outros.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tanques/${t.slug}/`} className="ui inline-flex min-h-12 items-center gap-1 rounded-full px-6 text-[12px] ring-1 ring-white/30 transition-colors hover:bg-white hover:text-ink">
                    {t.nome} <ChevronRight className="h-4 w-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <Numbers />
      <Normas />
      <Atendimento />
    </>
  );
}
