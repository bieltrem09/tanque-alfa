import Image from "next/image";
import { clientes } from "@/content/site";
import Marquee from "@/components/ui/Marquee";
import SplitHeading from "@/components/ui/SplitHeading";
import ScrollWordReveal from "@/components/ui/ScrollWordReveal";

export default function Clientes() {
  return (
    <section aria-labelledby="clientes-title" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <p className="label label-slash text-primary">Clientes</p>
        <SplitHeading className="display mt-4 text-[clamp(44px,6vw,96px)]"><span id="clientes-title">{clientes.titulo}</span></SplitHeading>
        <ScrollWordReveal text={clientes.texto} className="mt-4 max-w-xl text-ink/70" />
      </div>
      <div className="mt-12 border-y border-ink/10 py-8">
        <Marquee speed={30}>
          {[...clientes.logos, ...clientes.logos].map((c, i) => (
            <div key={i} className="mx-8 grid h-24 w-40 place-items-center md:mx-14">
              <Image src={c.src} alt={i < clientes.logos.length ? c.nome : ""} width={120} height={87} className="h-auto w-[120px] grayscale transition-[filter] duration-300 hover:grayscale-0" />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
