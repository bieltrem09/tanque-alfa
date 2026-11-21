// Chamada final de todas as páginas (acima do rodapé): texto + celular com conversa de WhatsApp animada.
import { contato, whatsappLink } from "@/content/site";
import PhoneWhatsApp from "@/components/ui/PhoneWhatsApp";

export default function WhatsAppCta() {
  return (
        <section id="whatsapp" aria-labelledby="rodape-whats" className="hero-bg grain relative isolate overflow-hidden text-white">
          <div aria-hidden="true" className="display pointer-events-none absolute -left-[4vw] top-0 -z-10 select-none text-[30vw] leading-[.8] text-white/[.08]">ALFA</div>
          <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 pt-16 md:grid-cols-[1.1fr_1fr] md:gap-6 md:px-8 md:pt-0">
          <div className="relative md:py-16">
            <p className="label label-slash text-accent">Atendimento direto</p>
            <h2 id="rodape-whats" className="display mt-4 text-[clamp(48px,6.4vw,110px)] leading-[1.02]">
              Fale com a fábrica <span className="text-[#25D366]">no WhatsApp.</span>
            </h2>
            <p className="mt-5 max-w-md text-white/75">
              Conte o uso do tanque e o modelo do seu caminhão. Quem responde é a equipe que projeta e fabrica, sem intermediários.
            </p>
            <a
              href={whatsappLink("Olá! Vim pelo site da Tanques Alfa e quero um orçamento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="ui mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-[12px] font-extrabold text-white shadow-[0_14px_30px_-12px_rgba(37,211,102,.9)] transition-transform hover:scale-[1.04] active:scale-[.97]"
            >
              Chamar no WhatsApp<span className="hidden sm:inline"> · {contato.whatsapp}</span>
            </a>
          </div>
          <div className="relative mx-auto pb-10 md:py-12">
            <PhoneWhatsApp />
          </div>
          </div>
        </section>
  );
}
