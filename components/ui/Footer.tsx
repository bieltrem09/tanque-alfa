// Rodapé: colunas com menu, tanques e contato + marca "ALFA" gigante que sobe pela linha do chão
// (componente wordmark-reveal-footer, do 21st.dev). Cores da Alfa via variáveis no <footer>.
import Image from "next/image";
import { contato, nav, whatsappLink } from "@/content/site";
import { tanques } from "@/content/tanques";
import { WordmarkRevealFooter } from "./wordmark-reveal-footer";
import PhoneWhatsApp from "./PhoneWhatsApp";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./Icons";

export default function Footer() {
  const redes = [
    { label: "Facebook da Tanques Alfa", href: contato.redes.facebook, icon: <FacebookIcon /> },
    { label: "Instagram da Tanques Alfa", href: contato.redes.instagram, icon: <InstagramIcon /> },
    { label: "YouTube da Tanques Alfa", href: contato.redes.youtube, icon: <YoutubeIcon /> },
  ].filter((r) => r.href.startsWith("http")); // só mostra redes com link confirmado

  return (
    <WordmarkRevealFooter
      wordmark="ALFA"
      reveal="inView"
      wordmarkClassName="font-display tracking-[0.02em]"
      className="[--background:var(--ink)] [--foreground:#ffffff] [--muted-foreground:rgba(255,255,255,.6)] [--border:rgba(255,255,255,.14)] [--ring:var(--alfa-accent)] [--chart-2:#3ddc84] [--chart-4:var(--alfa-accent)] [--destructive:#ff5a5a] [--glint-color:var(--alfa-accent)]"
      brand={{
        name: "Tanques Alfa",
        mark: <Image src="/img/logo-alfa.png" alt="" width={253} height={88} className="h-12 w-auto rounded-md" />,
        blurb: (
          <>
            <p>Tanques rodoviários e estacionários fabricados sob medida em Limeira-SP. Certificada pelo INMETRO desde 2018 para produtos perigosos.</p>
            <address className="mt-4 not-italic">{contato.endereco}<br />{contato.cidade} · CEP {contato.cep}</address>
          </>
        ),
      }}
      columns={[
        { title: "Menu", links: nav.map((n) => ({ label: n.label, href: n.href })) },
        { title: "Tanques", links: tanques.map((t) => ({ label: t.nome, href: `/tanques/${t.slug}/` })) },
        {
          title: "Contato",
          links: [
            { label: `Tel. ${contato.telefone}`, href: contato.telefoneHref },
            { label: `WhatsApp ${contato.whatsapp}`, href: whatsappLink(), external: true },
            { label: contato.email, href: `mailto:${contato.email}` },
            { label: "Trabalhe conosco", href: `mailto:${contato.email}?subject=Trabalhe%20conosco` },
          ],
        },
      ]}
      status={{ label: contato.horario, tone: "ok" }}
      offices={[{ city: "Limeira", timeZone: "America/Sao_Paulo" }]}
      socials={redes}
      feature={
        <section aria-labelledby="rodape-whats" className="relative grid items-center gap-10 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#061CE0] via-[#04108f] to-[#020a52] px-6 pt-12 md:grid-cols-[1.1fr_1fr] md:gap-6 md:px-14 md:pt-0">
          <div className="relative md:py-16">
            <p className="label label-slash text-accent">Atendimento direto</p>
            <h2 id="rodape-whats" className="display mt-4 text-[clamp(40px,5.4vw,84px)] leading-[1.02]">
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
        </section>
      }
      legalNote={<span>{contato.razaoSocial} · CNPJ <span className="confirmar">{contato.cnpj}</span></span>}
    />
  );
}
