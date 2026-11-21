// Loader do next/image para o site estático: para larguras até 900 px usa a versão "-900"
// (gerada para todas as imagens de public/img); acima disso, o arquivo original.
export default function imgLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (width <= 900 && src.startsWith("/img/") && !src.includes("-900.")) return src.replace(/\.(webp|png|jpe?g)$/i, "-900.$1");
  return src;
}
