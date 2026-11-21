import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import WhatsAppCta from "@/components/sections/WhatsAppCta";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import Preloader from "@/components/sections/Preloader";
import PageTransition from "@/components/ui/PageTransition";
import { contato } from "@/content/site";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap", preload: false });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap", preload: false });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });

export const SITE_URL = "https://tanques-alfa.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Tanques Alfa | Tanques rodoviários sob medida em Limeira-SP", template: "%s | Tanques Alfa" },
  description:
    "Fabricante de tanques rodoviários e estacionários para água, combustível, saneamento e uso agrícola. Certificada pelo INMETRO desde 2018. Limeira-SP.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Tanques Alfa",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Caminhão-tanque Tanques Alfa" }],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#061CE0", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Tanques Alfa — ALFA Equipamentos Rodoviários",
  url: SITE_URL,
  image: `${SITE_URL}/img/og.jpg`,
  telephone: "+55-19-4103-9879",
  email: contato.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Marginal Via Anhanguera, Km 134, nº 7498",
    addressLocality: "Limeira",
    addressRegion: "SP",
    postalCode: "13487-506",
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:30" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${archivo.variable} ${inter.variable}`}>
      <body>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-3 focus:text-ink">
          Pular para o conteúdo
        </a>
        <Preloader />
        <PageTransition />
        <SmoothScroll />
        <Header />
        <main id="conteudo">{children}</main>
        <WhatsAppCta />
        <Footer />
        <WhatsAppFloat />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
