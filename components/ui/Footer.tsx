import Link from "next/link";
import Image from "next/image";
import { contato, nav, whatsappLink } from "@/content/site";
import { tanques } from "@/content/tanques";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./Icons";

export default function Footer() {
  const redes = [
    { nome: "Facebook", href: contato.redes.facebook, Icon: FacebookIcon },
    { nome: "Instagram", href: contato.redes.instagram, Icon: InstagramIcon },
    { nome: "YouTube", href: contato.redes.youtube, Icon: YoutubeIcon },
  ];
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-16 md:grid-cols-2 md:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Image src="/img/logo-alfa-hd.webp" alt="Tanques Alfa" width={640} height={223} className="h-12 w-auto" />
          <p className="mt-5 max-w-sm text-white/70">
            Tanques rodoviários e estacionários fabricados sob medida em Limeira-SP. Certificada pelo INMETRO desde 2018 para produtos perigosos.
          </p>
          <ul className="mt-6 flex gap-2">
            {redes.map(({ nome, href, Icon }) => (
              <li key={nome}>
                <a
                  href={href.startsWith("http") ? href : "#"}
                  aria-label={`${nome} da Tanques Alfa${href.startsWith("http") ? "" : " (link a confirmar)"}`}
                  className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-white/20 transition-colors hover:bg-white hover:text-ink"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Rodapé — site">
          <p className="label label-slash text-accent">Menu</p>
          <ul className="mt-5 space-y-2.5">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="text-white/80 hover:text-white">{n.label}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Rodapé — tanques">
          <p className="label label-slash text-accent">Tanques</p>
          <ul className="mt-5 space-y-2.5">
            {tanques.map((t) => <li key={t.slug}><Link href={`/tanques/${t.slug}/`} className="text-white/80 hover:text-white">{t.nome}</Link></li>)}
          </ul>
        </nav>
        <address className="not-italic">
          <p className="label label-slash text-accent">Contato</p>
          <ul className="mt-5 space-y-2.5 text-white/80">
            <li>{contato.endereco}<br />{contato.cidade} · CEP {contato.cep}</li>
            <li><a href={contato.telefoneHref} className="hover:text-white">Tel. {contato.telefone}</a></li>
            <li><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp {contato.whatsapp}</a></li>
            <li><a href={`mailto:${contato.email}`} className="hover:text-white">{contato.email}</a></li>
            <li>{contato.horario}</li>
          </ul>
        </address>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 py-6 text-sm text-white/60 md:flex-row md:justify-between md:px-6">
          <p>© {new Date().getFullYear()} Tanques Alfa · {contato.razaoSocial}</p>
          <p>CNPJ <span className="confirmar">{contato.cnpj}</span></p>
        </div>
      </div>
    </footer>
  );
}
