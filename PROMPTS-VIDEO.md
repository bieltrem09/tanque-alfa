# Prompts do filme — caminhão-tanque Alfa em movimento (versão 2)

Roteiro em **5 cenas** (cerca de 35 s) com o mesmo caminhão do site.
Esta versão corrige o que deu errado no primeiro teste (`Caminh_o_tanque_Alfa_filme_roteiro…mp4`).

Os prompts estão em inglês porque as IAs entendem melhor. As explicações estão em português.

---

## 1. O que deu errado no primeiro vídeo e como esta versão corrige

| # | Problema que apareceu | Por quê | Correção nesta versão |
|---|---|---|---|
| 1 | Na cena 1 o caminhão está **espelhado** (cabine à esquerda) e no fim vira para a direita | O prompt dizia "andando para a direita", mas não travava **de que lado fica a cabine** | Toda cena lateral diz: *cabine no lado DIREITO do quadro, frente apontando para a direita* |
| 2 | A troca de tanque usa um **raio/risco dourado em diagonal** com brilho | "Bright line of light" virou efeito mágico | Agora é uma **barra de luz vertical, reta, tipo scanner**, e o negativo proíbe *sparkles, lightning, glitter, lens flare* |
| 3 | **Acessórios de um tanque sobram no outro** (carretel azul da água no combustível e no saneamento; mangueiras laranja do saneamento no agrícola) | A IA só trocou a pintura | Cada tanque tem uma **ficha fixa** dizendo o que TEM e o que NÃO tem |
| 4 | Na passagem da cena 1 para a 2 a câmera **entra por baixo do chassi** e sai com outro caminhão lá na frente | O pedido era um movimento contínuo entre ângulos muito diferentes | A câmera **nunca chega a menos de 10 m** do caminhão e existe **só UM caminhão** no filme. Recomendado gerar cada cena separada |
| 5 | Depois do agrícola, o caminhão **volta a ser de água** sem explicação | O roteiro não dizia qual tanque segue nas cenas 2 a 4 | A cena 1 termina **voltando para a água** (4ª troca) e as cenas 2, 3 e 4 usam sempre a ficha ÁGUA |
| 6 | Visual de **render 3D**, luz chapada, pneus "flutuando" | Faltavam pistas de filmagem real | O bloco **LOOK** em todos os prompts pede câmera de cinema, luz natural, sombra de contato e textura de asfalto |
| 7 | O filme todo tem **8 s**, então cada cena dura ~1,5 s | Foi gerado de uma vez só | Cenas geradas separadamente, de 5 a 8 s cada, ou o **prompt mestre com minutagem** (seção 4) |

---

## 2. Blocos fixos: cole em TODOS os prompts

Copie os blocos abaixo e cole no início de cada prompt de vídeo ou imagem. Isso é o que mantém o caminhão igual do começo ao fim.

### TRUCK (base, igual em todas as cenas)
```
TRUCK: one single modern white cab-over heavy truck with a boxy flat front, no brand badges; 6x4 layout — one front axle under the cab and two rear axles in tandem (exactly 3 axles, 6 visible wheels on the side); black ladder chassis; silver wheel hubs; red-and-white reflective strip on the rear bumper.
```

### Fichas dos tanques (use a da cena)
```
TANK ÁGUA: cylindrical tank, upper half glossy white, lower half cobalt blue, separated by a thin yellow pinstripe; two low round manhole domes on top; NO handrails on top; at the rear a small white equipment cabinet with a blue hose reel and a pump.
```
```
TANK COMBUSTÍVEL: elliptical tank painted entirely glossy yellow with one cobalt-blue horizontal band; yellow walkway handrails on top; small orange hazard placard on the side; NO hose reel, NO rear cabinet, NO orange hoses.
```
```
TANK SANEAMENTO: thick cylindrical vacuum tank, white upper half and dark green lower half, visible vertical reinforcing rings, large round hinged door at the rear end, two long orange suction hoses running along the lower side; NO handrails, NO hose reel.
```
```
TANK AGRÍCOLA: tank painted entirely dark green with a thin yellow pinstripe; yellow walkway handrails on top; one red water cannon on top near the front; NO orange hoses, NO hose reel, NO rear cabinet.
```

### LOOK (realismo)
```
LOOK: photorealistic live-action commercial footage, NOT a 3D render, NOT CGI. Shot on ARRI Alexa 35, 50 mm lens, natural soft daylight from the upper left, real contact shadows under every tire, subtle reflections on the glossy paint, fine asphalt grain, a very light haze of dust behind the rear wheels. World: seamless pure white minimalist landscape, one single dark asphalt road with a white dashed center line, nothing else.
```

### NEGATIVO (no campo *negative prompt*, ou no fim do prompt como "Avoid: …")
```
second truck, duplicate truck, mirrored truck, cab on the left, text, letters, logos, watermark, sparkles, lightning bolt, glitter, magic particles, lens flare streaks, diagonal light streak, camera passing under the truck, camera inside the truck, melting, morphing wheels, extra axles, missing wheels, floating truck, toy look, plastic look, 3d render, cgi, cartoon, trees, buildings, people, other vehicles
```

---

## 3. Cenas (gere UMA de cada vez — recomendado)

Configuração: **16:9, 1080p, 24 fps**. Gere **2 a 4 variações** de cada cena e fique com a melhor.
Para emendar, use como quadro inicial de cada cena o último quadro da cena anterior.

### CENA 1 — Caminhão de lado trocando de tanque (4 clipes de ~5 s)

**Quadros prontos** (GitHub, `img/video/`): `K1-agua.jpg`, `K2-combustivel.jpg`, `K3-saneamento.jpg`, `K4-agricola.jpg`.
Clipes: **K1→K2**, **K2→K3**, **K3→K4** e **K4→K1** (volta para a água).

Prompt (troque `[DE]` e `[PARA]` pelas fichas dos tanques):
```
[TRUCK] FROM: [TANK DE]. TO: [TANK PARA]. [LOOK]

Locked side tracking shot. The camera travels sideways at exactly the truck's speed, at 1.5 m height, perpendicular to the road. The truck stays fixed in the center of the frame in perfect side profile, CAB ON THE RIGHT SIDE OF THE FRAME, front pointing right, driving to the right.
The road is a horizontal strip parallel to the truck crossing the whole frame; the asphalt and the white dashes stream from right to left under it; the wheels spin forward; light suspension bounce.
At second 2, a straight VERTICAL bar of soft white light, perpendicular to the ground, slides horizontally along the tank from the rear to the front. Behind the bar the tank is already the new one, in front of it the old one, with a clean hard edge, like a scanner. After the bar passes, ALL accessories of the old tank are gone and ALL accessories of the new tank are present. The cab, chassis, wheels, road and camera never change.
5 seconds. Avoid: [NEGATIVO]
```

### CENA 2 — Zoom na estrada (≈5 s)

**Quadro inicial:** último quadro do clipe K4→K1 (caminhão de água de lado).
**Quadro final:** gere com o prompt de imagem abaixo.

Imagem do quadro final (Nano Banana, anexe REF-ÁGUA):
```
[TRUCK] [TANK ÁGUA] [LOOK]
Low camera at asphalt level, standing in the middle of a straight road, looking down the road toward the horizon. The tanker truck is about 40 m ahead, seen from behind, driving away along the road. The road with two white center lines converges to a soft white horizon. Photorealistic, 16:9. No text.
```

Vídeo:
```
[TRUCK] [TANK ÁGUA] [LOOK]
The truck drives out of frame to the right while the camera smoothly turns 90° to look down the road and lowers to asphalt level, staying at least 15 m away from the truck at all times — it never goes under or through the truck. Then the camera rushes forward along the road behind the truck, low and fast, the white center lines streaming beneath it.
Only one truck in the whole shot. 5 seconds. Avoid: [NEGATIVO]
```
> Se a curva de 90° continuar estranha, faça um **corte seco** entre a cena 1 e a 2. Funciona muito bem em filme publicitário.

### CENA 3 — Curvas em zigue-zague (≈8 s)

Quadro inicial: último quadro da cena 2. Quadro final: gere com a imagem abaixo.

Imagem do quadro final:
```
[TRUCK] [TANK ÁGUA] [LOOK]
High drone shot at a 3/4 angle (about 45° down, behind and to the left of the truck), the truck coming out of the last bend of a long S-shaped road on a pure white landscape, body slightly leaning from the curve, right-hand lane. 16:9. No text.
```

Vídeo:
```
[TRUCK] [TANK ÁGUA] [LOOK]
The camera rises from road level into a smooth drone follow shot, 3/4 high angle behind the truck, 20 m away. The single tanker truck drives through a sequence of S-curves, staying in the right-hand lane: it steers left, then right, then left — a gentle zig-zag that follows the road — with realistic weight transfer, slight body roll and the front wheels turning into each bend. The drone banks smoothly with the curves, keeping the truck centered.
8 seconds. Avoid: [NEGATIVO]
```

### CENA 4 — Câmera lateral final: caminhão e tanque juntos (≈6 s)

Quadro final: `img/video/K1-agua.jpg` (ou o mesmo enquadramento com o caminhão parado).

```
[TRUCK] [TANK ÁGUA] [LOOK]
The drone descends and arcs around to the right side of the truck, ending in a perfect perpendicular side view at 1.5 m height: CAB ON THE RIGHT SIDE OF THE FRAME, the whole vehicle visible from rear bumper to front bumper, cab and tank together.
The truck exits the last curve, straightens, slows down smoothly and stops in the center of the frame. As it stops, a soft reflection glides along the glossy tank from rear to front — a natural studio-light reflection, not a light effect.
6 seconds. Avoid: [NEGATIVO]
```

### CENA 5 (opcional) — Do projeto ao real (≈6 s)

Quadros: `img/cf51c02b-c5bc-4eb4-8f61-116f8343b7c5.webp` (wireframe) → `img/eaa7b799-3334-4737-a0be-9b4a6494f12b.webp` (maquete real).
```
Start: transparent CAD wireframe of a tanker truck floating above engineering blueprint sheets on a wooden table. End: the finished photorealistic model on the same blueprints.
The wireframe materializes from the bottom up: chassis first in black steel, then the tank in glossy white with the cobalt-blue lower half and yellow pinstripe, then a warm LED glow under the chassis. Static camera with a very slow push-in, soft studio light, photorealistic product visualization. 6 seconds.
Avoid: sparkles, magic particles, text, logos, morphing shapes.
```

---

## 4. Prompt mestre (quando a ferramenta gera o filme inteiro de uma vez)

Use em ferramentas com **multi-shot / storyboard** (Kling multi-shot, Veo/Flow, Sora storyboard etc.). Peça **30 a 35 segundos**. Se a ferramenta limitar a 8–10 s, gere as cenas separadas (seção 3).

```
A 32-second photorealistic live-action commercial for a tanker-truck manufacturer. One single truck in the entire film.
TRUCK: one single modern white cab-over heavy truck with a boxy flat front, no badges, 6x4 (exactly 3 axles), black chassis, silver hubs.
WORLD: seamless pure white minimalist landscape with one dark asphalt road with a white dashed center line. Natural soft daylight, real contact shadows, fine asphalt texture, shot on ARRI Alexa 35. NOT a 3D render.

[00–20s] SHOT 1 — locked side tracking shot at 1.5 m, perpendicular to the road. Cab on the RIGHT side of the frame, truck driving right, road as a horizontal strip parallel to the truck, wheels spinning. Every 5 seconds a straight vertical bar of soft white light slides along the tank from rear to front and the tank body changes completely, including accessories:
  00–05s water tank: white upper / cobalt-blue lower half, thin yellow pinstripe, two manhole domes, no handrails, rear cabinet with blue hose reel.
  05–10s fuel tank: entirely glossy yellow with one blue band, yellow handrails, orange hazard placard, no hose reel.
  10–15s sewer vacuum tank: white upper / dark green lower, reinforcing rings, round rear door, two orange suction hoses, no handrails.
  15–20s agricultural tank: entirely dark green, yellow handrails, red water cannon on top, no hoses — then back to the water tank at 20s.
[20–24s] SHOT 2 — hard cut to a low camera at asphalt level in the middle of the road; the water-tank truck is 40 m ahead driving away; the camera rushes forward low over the white center lines.
[24–30s] SHOT 3 — the camera rises into a 3/4 drone follow shot behind the truck as it drives through S-curves in the right-hand lane, gentle zig-zag, slight body roll in each bend.
[30–32s] SHOT 4 — the drone arcs down to a perfect side view at truck height (cab on the right); the truck straightens, slows and stops centered, a soft reflection gliding along the tank.

Avoid: second truck, mirrored truck, cab on the left, sparkles, lightning, glitter, lens flare streaks, camera passing under the truck, morphing wheels, extra axles, floating truck, text, logos, watermark, 3d render look, plastic look.
```

---

## 5. Montagem e entrega

1. Ordem: cena 1 (4 clipes) → 2 → 3 → 4 (+ 5 opcional). Entre as cenas, use **corte seco** ou um *cross dissolve* curto (6 a 8 quadros).
2. Se algum clipe sair espelhado, dá para **espelhar na edição** (*flip horizontal*), porque não há texto na imagem.
3. Cor: um leve aumento de contraste e saturação deixa tudo igual ao site.
4. Exporte em **MP4 H.264, 1920×1080, 24 ou 30 fps**.

**Para o site:** me mande o MP4. Ele entra como `public/img/real/filme-fabrica.mp4`, numa seção em tela cheia em que o scroll controla o vídeo, logo depois da cena "A fábrica".

### Referências (pasta `img/` do GitHub)
| Apelido | Arquivo |
|---|---|
| REF-ÁGUA | `img/cbefb5a7-aee0-498b-954d-1850958cba5f.webp` |
| REF-COMB | `img/ce5089dd-d284-48a6-97d4-52c1e16bfde8.webp` |
| REF-SAN | `img/35917f0a-eb88-4c5e-a584-12c1786b5397.webp` |
| REF-AGRO | `img/c03ad696-e855-4a27-8d68-96e8148c9b66.webp` |
| REF-ESTRADA | `img/9cb4acd8a661195035a5be5e0b175ff8.jpg` |
| REF-CURVA | `img/dbc4cce5-c10d-471f-b469-cdb9df3aa09f.webp` |
| Quadros prontos | `img/video/K1-agua.jpg` … `K4-agricola.jpg`, `fundo-estrada-lateral.jpg` |
