// Converte imagens reais (PNG/JPG) colocadas em public/img/real/ para WebP otimizado.
// Roda automaticamente antes do build ("prebuild"). Vídeos MP4 são usados como estão.
import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public/img/real");
if (fs.existsSync(dir)) {
  for (const f of fs.readdirSync(dir)) {
    if (!/\.(png|jpe?g)$/i.test(f)) continue;
    const src = path.join(dir, f);
    const out = path.join(dir, f.replace(/\.(png|jpe?g)$/i, ".webp"));
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) continue;
    const meta = await sharp(src).metadata();
    await sharp(src)
      .resize({ width: Math.min(meta.width ?? 2400, 2400), withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 92, effort: 5 })
      .toFile(out);
    console.log("real:", f, "→", path.basename(out));
  }
}
