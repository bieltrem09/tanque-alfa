import type { Metadata } from "next";
import CtaContato from "@/components/sections/CtaContato";
import Reveals from "@/components/ui/Reveals";

export const metadata: Metadata = {
  title: "Contato e orçamento",
  description: "Peça um orçamento de tanque sob medida. Tanques Alfa, Limeira-SP. Tel. (19) 4103-9879 · WhatsApp (19) 98150-6868.",
  alternates: { canonical: "/contato/" },
};

export default function ContatoPage() {
  return (
    <>
      <Reveals />
      <div className="hero-bg h-[110px]" aria-hidden="true" />
      <CtaContato headingLevel="h1" />
    </>
  );
}
