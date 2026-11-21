import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatData, type Post } from "@/content/blog";

// Card do blog: data em selo sobre a foto, categoria, título e resumo
export default function PostCard({ p, priority = false }: { p: Post; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${p.slug}/`}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_20px_44px_-30px_rgba(6,28,224,.55)] ring-1 ring-ink/5 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-2 hover:shadow-[0_34px_60px_-30px_rgba(6,28,224,.7)]"
      data-reveal
    >
      <span className="relative block aspect-[16/10] overflow-hidden">
        <Image src={p.capa} alt={p.capaAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" priority={priority} className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]" />
        <time dateTime={p.data} className="ui absolute left-4 top-4 rounded-full bg-primary px-4 py-2 text-[12px] text-white shadow-lg">{formatData(p.data)}</time>
      </span>
      <span className="flex flex-1 flex-col p-6 md:p-7">
        <span className="label text-[11px] text-primary">{p.categoria}</span>
        <span className="mt-2 font-[family-name:var(--font-archivo)] text-[clamp(20px,1.7vw,24px)] font-bold leading-snug text-ink">{p.titulo}</span>
        <span className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-ink/65">{p.resumo}</span>
        <span className="ui mt-auto inline-flex items-center gap-1.5 pt-5 text-[11px] text-primary">
          Ler artigo <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
        </span>
      </span>
    </Link>
  );
}
