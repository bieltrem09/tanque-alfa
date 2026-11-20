// Detecta, no build, quais imagens/vídeos reais existem em public/img/real/.
// O que existir substitui as ilustrações vetoriais; o que faltar mantém a versão atual.
// Dados de geometria (rodas, gancho, traçado da estrada) ficam em content/cena-real.json.
import "server-only";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { tanques } from "@/content/tanques";

export type RealImg = { src: string; w: number; h: number };
export type Roda = { src: string; x: number; y: number; d: number };
export type Lateral = RealImg & { rodas: Roda[] };
export type RealAssets = {
  montagem: {
    chassi: RealImg;
    tanque: RealImg;
    ponte: RealImg | null;
    viga: string | null;
    carro: RealImg | null;
    gancho: { x: number; y: number } | null;
  } | null;
  lateral: (Lateral | null)[];
  topo: RealImg | null;
  agua: string | null;
  estradaReta: RealImg | null;
  estradaPerspectiva: (RealImg & { vx: number; vy: number }) | null;
  estradaCurva: (RealImg & { pts: [number, number][]; roadW: number }) | null;
  arquitetura: Record<string, string | null>;
  arquiteturaQuadros: Record<string, { inicio: string; fim: string } | null>;
  produto: Record<string, RealImg | null>;
};

type Meta = {
  laterais?: Record<string, { rodas: { x: number; y: number; d: number }[] }>;
  gancho?: { x: number; y: number };
  curva?: { pts: [number, number][]; roadW: number };
  perspectiva?: { vx: number; vy: number };
  quadros?: string[];
};

const dir = path.join(process.cwd(), "public/img/real");
const exists = (f: string) => fs.existsSync(path.join(dir, f));
const metaFile = path.join(process.cwd(), "content/cena-real.json");
const meta: Meta = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, "utf8")) : {};

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
const file = (base: string) => ["webp", "png", "jpg"].map((e) => `${base}.${e}`).find(exists);

export async function getRealAssets(): Promise<RealAssets> {
  const [chassi, tanque, ponte, carro, topo, reta, persp, curva] = await Promise.all([
    img("chassi"), img("tanque-corpo"), img("ponte-rolante"), img("ponte-carro"), img("caminhao-topo"),
    img("estrada-reta"), img("estrada-perspectiva"), img("estrada-curva"),
  ]);
  const viga = file("ponte-viga");

  const lateral = await Promise.all(
    tanques.map(async (t) => {
      const im = await img(`caminhao-lateral-${t.slug}`);
      if (!im) return null;
      const geo = meta.laterais?.[t.slug]?.rodas ?? [];
      const rodas = geo
        .map((r, k) => ({ ...r, src: file(`rodas/${t.slug}-${k}`) }))
        .filter((r): r is Roda => !!r.src)
        .map((r) => ({ ...r, src: `/img/real/${r.src}` }));
      return { ...im, rodas };
    }),
  );

  const produto: Record<string, RealImg | null> = {};
  const arquitetura: Record<string, string | null> = {};
  const arquiteturaQuadros: Record<string, { inicio: string; fim: string } | null> = {};
  const ini = file("arquitetura-inicio"), fim = file("arquitetura-fim");
  for (const t of tanques) {
    produto[t.slug] = await img(`produto-${t.slug}`);
    arquitetura[t.slug] = video(`arquitetura-${t.slug}`) ?? video("arquitetura");
    arquiteturaQuadros[t.slug] = ini && fim && (meta.quadros ?? []).includes(t.slug) ? { inicio: `/img/real/${ini}`, fim: `/img/real/${fim}` } : null;
  }

  return {
    montagem: chassi && tanque && (ponte || (viga && carro))
      ? { chassi, tanque, ponte, viga: viga ? `/img/real/${viga}` : null, carro, gancho: meta.gancho ?? null }
      : null,
    lateral,
    topo,
    agua: video("agua-loop"),
    estradaReta: reta,
    estradaPerspectiva: persp ? { ...persp, vx: meta.perspectiva?.vx ?? 0.5, vy: meta.perspectiva?.vy ?? 0.45 } : null,
    estradaCurva: curva && meta.curva ? { ...curva, ...meta.curva } : null,
    arquitetura,
    arquiteturaQuadros,
    produto,
  };
}
