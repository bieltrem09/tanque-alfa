import Link from "next/link";
export default function NotFound() {
  return (
    <section className="hero-bg grid min-h-[80vh] place-items-center px-4 pt-28 text-center text-white">
      <div>
        <p className="display text-[clamp(80px,16vw,220px)]">404</p>
        <p className="mt-4 text-lg">Essa página saiu da rota.</p>
        <Link href="/" className="ui mt-8 inline-flex min-h-12 items-center rounded-full bg-white px-6 text-[12px] font-extrabold text-primary">Voltar ao início</Link>
      </div>
    </section>
  );
}
