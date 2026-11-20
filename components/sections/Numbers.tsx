import { numeros } from "@/content/site";
import Counter from "@/components/ui/Counter";

export default function Numbers() {
  return (
    <section aria-label="Números da Tanques Alfa" className="hero-bg grain relative overflow-hidden text-white">
      <ul className="relative mx-auto grid max-w-[1400px] gap-px px-4 py-16 sm:grid-cols-2 md:px-8 md:py-24 lg:grid-cols-4">
        {numeros.map((n) => (
          <li key={n.legenda} data-reveal className="border-white/20 py-6 sm:px-6 lg:border-l lg:first:border-l-0">
            {n.animar ? <Counter value={n.valor} className="display block text-[clamp(56px,7vw,112px)]" /> : <span className="display block whitespace-nowrap text-[clamp(48px,5.6vw,96px)]">{n.texto}</span>}
            <p className="mt-3 max-w-[26ch] text-white/85">{n.legenda}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
