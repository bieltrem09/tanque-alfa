// Rodapé: colunas com menu, tanques e contato + marca "ALFA" gigante que sobe pela linha do chão
// (componente wordmark-reveal-footer, do 21st.dev). Cores da Alfa via variáveis no <footer>.
import Image from "next/image";
import { contato, nav, whatsappLink } from "@/content/site";
import { tanques } from "@/content/tanques";
import { WordmarkRevealFooter } from "./wordmark-reveal-footer";
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
      legalNote={<span>{contato.razaoSocial} · CNPJ <span className="confirmar">{contato.cnpj}</span></span>}
    />
  );
}
