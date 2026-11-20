import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { contato, ctaFinal, whatsappLink } from "@/content/site";
import ContactForm from "./ContactForm";
import SplitHeading from "@/components/ui/SplitHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { WhatsAppIcon } from "@/components/ui/Icons";

export default function CtaContato({ tipoInicial = "", headingLevel = "h2" }: { tipoInicial?: string; headingLevel?: "h1" | "h2" }) {
  return (
    <section id="orcamento" aria-labelledby="cta-title" className="hero-bg grain relative isolate overflow-hidden text-white">
      <div aria-hidden="true" className="display pointer-events-none absolute -left-[4vw] top-0 -z-10 select-none text-[30vw] leading-[.8] text-white/[.08]">ALFA</div>
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <SplitHeading as={headingLevel} className="display text-[clamp(56px,9vw,150px)]">
          <span id="cta-title">{ctaFinal.titulo1}</span><br />
          <span className="accent-line text-accent">{ctaFinal.titulo2}</span>
        </SplitHeading>
        <p className="mt-6 max-w-xl text-white/85">{ctaFinal.texto}</p>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <ContactForm tipoInicial={tipoInicial} dark />
          <div className="space-y-6">
            <MagneticButton>
              <a href={whatsappLink("Olá! Quero um orçamento de tanque.")} target="_blank" rel="noopener noreferrer" className="ui inline-flex min-h-14 items-center gap-3 rounded-full bg-[#25D366] px-7 text-sm font-extrabold text-white">
                <WhatsAppIcon className="h-6 w-6" /> {contato.whatsapp}
              </a>
            </MagneticButton>
            <ul className="space-y-4 text-white/90">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden /><span>{contato.endereco}<br />{contato.cidade} · CEP {contato.cep}</span></li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden /><a href={contato.telefoneHref} className="hover:underline">{contato.telefone}</a></li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden /><a href={`mailto:${contato.email}`} className="hover:underline">{contato.email}</a></li>
              <li className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden /><span>{contato.horario}</span></li>
            </ul>
            <div className="overflow-hidden rounded-2xl ring-1 ring-white/20">
              <iframe title="Mapa: localização da fábrica da Tanques Alfa em Limeira-SP" src={contato.mapaEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-[280px] w-full border-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
