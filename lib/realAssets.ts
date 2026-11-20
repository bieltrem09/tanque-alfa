// Detecta, no build, quais imagens/vídeos reais existem em public/img/real/.
// O que existir substitui as ilustrações vetoriais; o que faltar mantém a versão atual.
import "server-only";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { tanques } from "@/content/tanques";

export type RealImg = { src: string; w: number; h: number };
export type RealAssets = {
  montagem: { chassi: RealImg; tanque: RealImg; ponte: RealImg } | null;
  lateral: (RealImg | null)[];
  topo: RealImg | null;
  agua: string | null;
  arquitetura: Record<string, string | null>;
  produto: Record<string, RealImg | null>;
};

const dir = path.join(process.cwd(), "public/img/real");
const exists = (f: string) => fs.existsSync(path.join(dir, f));

async function img(base: string): Promise<RealImg | null> {
  for (const ext of ["webp", "png", "jpg"]) {
    if (exists(`${base}.${ext}`)) {
      const m = await sharp(path.join(dir, `${base}.${ext}`)).metadata();
      return { src: `/img/real/${base}.${ext}`, w: m.width ?? 1600, h: m.height ?? 900 };
    }
  }
  return null;
}
const video = (base: string) => (exists(`${base}.mp4`) ? `/img/real/${base}.mp4` : null);

export async function getRealAssets(): Promise<RealAssets> {
  const [chassi, tanque, ponte, topo] = await Promise.all([img("chassi"), img("tanque-corpo"), img("ponte-rolante"), img("caminhao-topo")]);
  const lateral = await Promise.all(tanques.map((t) => img(`caminhao-lateral-${t.slug}`)));
  const produto: Record<string, RealImg | null> = {};
  const arquitetura: Record<string, string | null> = {};
  for (const t of tanques) {
    produto[t.slug] = await img(`produto-${t.slug}`);
    arquitetura[t.slug] = video(`arquitetura-${t.slug}`) ?? video("arquitetura");
  }
  return {
    montagem: chassi && tanque && ponte ? { chassi, tanque, ponte } : null,
    lateral,
    topo,
    agua: video("agua-loop"),
    arquitetura,
    produto,
  };
}
