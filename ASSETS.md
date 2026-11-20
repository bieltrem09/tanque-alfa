# ASSETS — imagens do site

As fotos reais da Alfa (repositório `tanque-alfa`) já estão no site, em WebP.
São 800×450 ou 555×377 px: funcionam bem em cards e galerias, mas ficam pequenas no hero em telas grandes.
A lista abaixo traz o que vale produzir em alta resolução. Os nomes de arquivo são os definitivos, então basta substituir.

## Já em uso

| Arquivo | Origem | Uso |
|---|---|---|
| `recortes/hero-truck.webp` (702×423) | combustivel09.jpg, fundo removido | Hero da home |
| `recortes/agua.webp` | tanques_agua3.jpg | Linha Água |
| `recortes/combustivel.webp` | tanques_combustivel2.jpg | Linha Combustível |
| `recortes/saneamento.webp` | saneamento1.jpg | Linha Saneamento |
| `recortes/agricola.webp` | agua03.jpg | Linha Agrícola |
| `fotos/*.webp` (32) | fotos originais | galerias e cards |
| `og.jpg` 1200×630 | gerado | compartilhamento (Open Graph) |

A cena pinada "A fábrica" usa ilustrações vetoriais (SVG em `components/ui/TruckSvgs.tsx`): caminhão lateral, ponte rolante e caminhão visto de cima. Por isso não depende de fotos.

## Recomendados (alta resolução)

**Regra de consistência:** use sempre o mesmo caminhão de referência em todas as vistas: Mercedes-Benz Atego/Axor com cabine vermelha e tanque de combustível laranja com faixa verde (o do hero atual), ou outro modelo escolhido pelo cliente.

1. **`recortes/hero-truck.webp`**, 2400 px, PNG/WebP transparente.
   > Photorealistic Brazilian rigid tanker truck, 3/4 front view, red Mercedes-Benz cab, polished cylindrical fuel tank painted orange with a green stripe, chrome details, dramatic studio rim light, ultra sharp product photography, isolated on transparent background, no text, no logos

2. **`truck-side.png`**, mesmo caminhão em vista lateral ortográfica, 2400 px, transparente.
   > Same truck as reference, perfect orthographic side view, facing right, flat even studio light, isolated on transparent background, no perspective distortion, no text

3. **`truck-top.png`**, mesmo caminhão visto de cima, 2000 px, transparente.
   > Same tanker truck, perfect top-down orthographic view, visible manhole covers along the tank, isolated on transparent background, no shadow

4. **`tank-body.png`**: só o corpo do tanque, em vista lateral, para a cena de montagem.
   > Cylindrical carbon steel road tank body without truck, side view, lifting lugs on top, isolated on transparent background

5. **`crane.png`**: ponte rolante industrial, traço limpo, transparente.
   > Industrial overhead gantry crane with yellow beam and hook block, clean vector-like render, isolated on transparent background

6. **`drops-water-01..06.png`** e **`drops-fuel-01..06.png`**: respingos congelados, 800 px, transparentes.
   > Frozen splash of clear cyan water droplets in mid-air, high-speed photography, isolated on transparent background
   > Frozen splash of amber diesel fuel droplets in mid-air, high-speed photography, isolated on transparent background

7. **`water-loop.mp4`**: água azul vista de cima, loop de 6 s, 1920×1080, menos de 4 MB.
   > Top-down view of clear blue water surface with caustic light ripples, seamless loop

8. **Renders das 5 linhas** (`recortes/<slug>.webp`, 2000 px): água, combustível, estacionário (hoje é foto com fundo), saneamento e agrícola, sempre no mesmo ângulo 3/4.

## Opcional (premium)

Giro de 180° do caminhão (lateral → topo), gerado em Kling ou Veo e exportado em cerca de 90 frames WebP, para tocar em `<canvas>` na transição 2c→2d.
