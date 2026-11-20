import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { atendimento } from "@/content/site";
import SplitHeading from "@/components/ui/SplitHeading";

export default function Atendimento() {
  return (
    <section aria-labelledby="atendimento-title" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="label label-slash text-primary">Atendimento</p>
        <SplitHeading className="display mt-4 text-[clamp(44px,6vw,96px)]"><span id="atendimento-title">Do projeto ao pós-venda</span></SplitHeading>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {atendimento.map((a) => (
            <li key={a.titulo} data-reveal>
              <Link href={a.href} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink/10 transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(6,28,224,.45)]">
                <div className="aspect-[16/10] overflow-hidden">
                  <Image src={a.imagem.replace("/fotos/", "/fotos/thumb/")} alt="" width={720} height={405} sizes="(min-width:768px) 33vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h3 className="ui text-base">{a.titulo}</h3>
                  <p className="mt-3 flex-1 text-ink/70">{a.texto}</p>
                  <span className="ui mt-6 inline-flex items-center gap-2 text-[12px] text-primary">
                    {a.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
