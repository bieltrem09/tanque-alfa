# Prompts do filme — caminhão-tanque Alfa em movimento

Roteiro em **5 cenas** para gerar um vídeo de cerca de 25 a 35 s, com o mesmo caminhão do site.
O processo é sempre o mesmo: **(1) gerar as imagens-chave** (primeiro e último quadro de cada cena) e depois **(2) gerar o vídeo de cada cena** a partir dessas imagens, numa IA de vídeo com "start frame + end frame".

Os prompts estão em inglês porque as IAs entendem melhor. As explicações estão em português.

---

## 0. Antes de começar

**Ferramentas**
- Imagens: **Nano Banana (Gemini)**. Ele edita mantendo o mesmo caminhão. Anexe sempre a imagem de referência indicada.
- Vídeo: **Kling 2.x** (modo *Start & End Frame*), **Veo 3** ou **Runway Gen-4**. Gere cada cena separadamente e junte no CapCut ou Premiere.

**Imagens de referência (já estão no GitHub, pasta `img/`)**

| Apelido | Arquivo | O que é |
|---|---|---|
| REF-ÁGUA | `img/cbefb5a7-aee0-498b-954d-1850958cba5f.webp` | caminhão branco/azul (água), lateral |
| REF-COMB | `img/ce5089dd-d284-48a6-97d4-52c1e16bfde8.webp` | caminhão amarelo (combustível), lateral |
| REF-SAN | `img/35917f0a-eb88-4c5e-a584-12c1786b5397.webp` | caminhão de saneamento, lateral |
| REF-AGRO | `img/c03ad696-e855-4a27-8d68-96e8148c9b66.webp` | caminhão verde com canhão (agrícola), lateral |
| REF-ESTRADA | `img/9cb4acd8a661195035a5be5e0b175ff8.jpg` | estrada em perspectiva |
| REF-CURVA | `img/dbc4cce5-c10d-471f-b469-cdb9df3aa09f.webp` | estrada em S vista de cima |
| REF-WIRE / REF-MAQUETE | `img/cf51c02b-c5bc-4eb4-8f61-116f8343b7c5.webp` / `img/eaa7b799-3334-4737-a0be-9b4a6494f12b.webp` | wireframe e maquete real sobre as plantas |

**O "mundo" do filme (igual ao site):** chão branco infinito e limpo, com **uma única estrada de asfalto escuro** de faixa branca tracejada. Sem cidade, sem árvores, sem outros carros. Isso deixa o caminhão como herói e casa com o fundo branco do site.

**Regras que valem para TODAS as imagens e vídeos**
- Mesmo caminhão: cabine branca moderna (sem logo de montadora), 6x4, chassi preto, rodas cromadas.
- Caminhão **sempre andando para a DIREITA** nas cenas laterais (cabine à direita), como no site.
- **Sem texto e sem logo** gerados pela IA. O logo da Alfa entra na edição, se quiser.
- Formato: **16:9, 1920×1080**, 24 ou 30 fps.

**Negativo (cole no campo "negative prompt" quando existir)**
```
text, letters, watermark, logo, brand names, extra vehicles, people, trees, buildings, city, distorted wheels, melting, deformed truck, extra axles, wrong number of wheels, camera shake, low resolution, cartoon, 3d render look, plastic look
```

---

## CENA 1 — Caminhão andando de lado, trocando de tanque (≈8–10 s)

Câmera lateral acompanhando o caminhão (*tracking shot*) na mesma velocidade. O caminhão fica no centro, o asfalto corre e as rodas giram. O tanque se transforma de uma especialidade para a outra: **água → combustível → saneamento → agrícola**.

### Por que dava confusão
Quando o prompt diz só *"straight road"*, a IA entende uma estrada **indo para o horizonte** (vista de frente, com ponto de fuga), enquanto o caminhão está **de perfil**. Os dois ficam em direções diferentes.
O certo é a estrada **atravessar a imagem da esquerda para a direita, paralela ao caminhão**, como uma faixa horizontal, igual ao site.

### Caminho mais fácil: quadros prontos (recomendado)
Já montei os 4 quadros com os seus caminhões reais em cima de uma estrada vista de lado, todos no mesmo enquadramento. Use direto como *start/end frame* no Kling ou no Veo:

| Quadro | Arquivo (GitHub) |
|---|---|
| K1 água | `img/video/K1-agua.jpg` |
| K2 combustível | `img/video/K2-combustivel.jpg` |
| K3 saneamento | `img/video/K3-saneamento.jpg` |
| K4 agrícola | `img/video/K4-agricola.jpg` |
| Só a estrada (fundo) | `img/video/fundo-estrada-lateral.jpg` |

Se quiser que os quadros fiquem mais fotográficos antes do vídeo, passe cada um no Nano Banana com o prompt de "realismo" abaixo.

**Prompt de realismo (anexe o quadro K pronto)**
```
Use the reference image as the exact layout. Keep the truck exactly as it is: same position, size, side profile, colors and details. Keep the road exactly where it is: a horizontal asphalt strip crossing the whole image from the left edge to the right edge, parallel to the truck.
Only make it more photographic: realistic asphalt texture with fine grain, slightly worn yellow edge lines, white dashed center line as horizontal dashes, a soft natural contact shadow under the tires, subtle reflections on the tank paint, soft white minimalist environment above the road.
Do not rotate the road, do not add perspective, no vanishing point. No text, no logos.
```

### Se preferir gerar do zero (prompts corrigidos)

**Passo A — primeiro o fundo (estrada de lado, sem caminhão)**
```
Photorealistic SIDE VIEW of an empty two-lane asphalt road, camera at 1.5 m height looking perpendicular to the road (90° to the direction of travel).
The road is seen from its side: it appears as a horizontal strip that crosses the entire image from the left edge to the right edge, occupying the lower third of the frame.
The far edge of the road (yellow line) is a straight horizontal line; the white dashed center line runs horizontally across the image as a row of short horizontal dashes; the near edge (yellow line) is another horizontal line closer to the bottom of the frame.
NO vanishing point, the road does NOT go toward the horizon, NO perspective lines converging. Behind the road: a seamless pure white minimalist world, soft high-key light. 16:9, 1920x1080. No vehicles, no text.
```

**Passo B — K1 água (anexe REF-ÁGUA + o fundo do passo A)**
```
Image 1 is the truck, image 2 is the road. Place the truck from image 1 ON the road from image 2, keeping the road exactly as it is (horizontal, parallel to the truck, crossing the frame from left to right).
The truck is in perfect side profile, facing and driving to the RIGHT, parallel to the road. All six tires rest on the asphalt of the far lane, just above the white dashed center line; the dashed line is visible in front of the wheels.
Truck about 75% of the image width, centered. Soft contact shadow under the tires. Wheels with radial motion blur (spinning), slight horizontal motion blur on the asphalt only, truck sharp.
Photorealistic tracking photography, 16:9. Do not change the truck. No text, no logos.
```

**K2, K3, K4** — anexe a nova referência do tanque (REF-COMB, REF-SAN, REF-AGRO) + o **K1 pronto**:
```
Image 1 is the new tank version of the truck, image 2 is the previous keyframe. Keep EVERYTHING from image 2 identical — the road (horizontal strip, parallel to the truck), the camera, the truck position, cab, chassis, wheels and motion blur — and only replace the tank body with the [yellow fuel tank / white-and-green sewer vacuum tank with orange hoses / dark green agricultural tank with red water cannon] from image 1.
Do not move the camera, do not rotate the road. No text, no logos.
```

### Vídeo (3 clipes: K1→K2, K2→K3, K3→K4)
```
Locked side tracking shot: the camera moves sideways at exactly the same speed as the truck, so the truck stays fixed in the center of the frame, in perfect side profile, driving to the right.
The road is a horizontal strip parallel to the truck: the asphalt texture and the white dashed center line stream from right to left under the truck; the wheels spin realistically in the driving direction.
Midway, a bright line of light sweeps over the tank from the rear to the front and the tank changes into the tank of the end frame like a paint wipe — the cab, chassis, wheels and road stay exactly the same.
Realistic suspension movement, subtle body vibration, no camera rotation, no perspective change, photorealistic, smooth, 5 seconds.
```
> Se a IA mudar o ângulo da estrada no meio do vídeo, acrescente no fim: *"the road must remain a horizontal strip parallel to the truck during the whole clip"*.

---

## CENA 2 — Zoom na estrada e entrada nas curvas (≈4–5 s)

A câmera desce para o nível do asfalto, à frente do caminhão, e **mergulha na estrada** em perspectiva. Num movimento contínuo ela sobe para o alto e revela a estrada fazendo curvas, com o caminhão entrando nela.

### Imagens-chave
**K5 — estrada em perspectiva (início)** · anexe REF-ESTRADA
```
Use the reference image of the road. Photorealistic low camera at asphalt level looking down a straight dark road with two white center lines that converge to the horizon.
Replace the background with a pure white foggy horizon, high-key minimalist white world, no checkerboard pattern, no watermark.
Slight forward motion blur on the road surface. 16:9, ultra sharp near the camera. No text.
```

**K6 — vista aérea 3/4 das curvas (fim)** · anexe REF-CURVA e K1
```
Aerial drone photograph at 3/4 angle (about 45° down, not straight top-down) of a single dark asphalt road making smooth S-curves across a pure white minimalist landscape, white dashed center line.
The same white tanker truck from the second image (white cab, white tank with cobalt-blue band) is entering the first curve in the right-hand lane, seen from behind and above.
High-key white environment, soft shadows, photorealistic, 16:9. No text, no logos.
```

### Vídeo (K5 → K6)
```
The camera starts at asphalt level and rushes forward along the straight road, accelerating, then smoothly rises up and tilts down into a high drone view, revealing the road turning into elegant S-curves on a pure white landscape, with the tanker truck entering the first curve.
One continuous fluid camera move, no cuts, cinematic speed ramp, photorealistic, 4 seconds.
```

---

## CENA 3 — Caminhão nas curvas, em zigue-zague (≈6–8 s)

Drone em 3/4 (alto e um pouco atrás), **não** reto de cima, seguindo o caminhão. O caminhão faz as curvas da pista, inclinando levemente a carroceria em cada uma, com o zigue-zague natural da estrada.

### Imagens-chave
**K6** (do fim da cena 2) como quadro inicial.

**K7 — saindo da última curva** · anexe K6
```
Use the reference image. Same road, same white world, same truck, same 3/4 drone angle.
Now the truck is exiting the last S-curve and starting a straight section, seen from the side-rear at 3/4, body slightly leaning from the curve. Photorealistic, 16:9. No text.
```

### Vídeo (K6 → K7)
```
Drone follow shot at a 3/4 high angle behind and slightly to the side of the tanker truck, which drives through a sequence of smooth S-curves on a dark asphalt road across a pure white landscape.
The truck steers left and right following the road — a gentle zig-zag — with realistic weight transfer and slight body roll in each curve; the wheels turn into each bend.
The drone smoothly banks with the curves, keeping the truck centered. Photorealistic, cinematic, 6 seconds.
```

---

## CENA 4 — Câmera lateral: caminhão e tanque juntos (≈5–6 s)

Saindo das curvas, a câmera desce do drone e **termina em vista LATERAL**, mostrando o caminhão e o tanque inteiros, juntos, de perfil. O caminhão desacelera e para, e uma luz percorre o tanque.

### Imagem-chave
**K8 — perfil final** · anexe REF-ÁGUA e K7
```
Use the first reference image for the truck. Perfect side profile of the full tanker truck — cab and tank together, entire vehicle visible from rear bumper to front bumper — standing on the dark asphalt road from the second image, in the same pure white minimalist world.
Camera at about 1.2 m height, perfectly perpendicular to the truck, the truck facing right.
Soft studio-like light, a subtle glossy reflection running along the tank, soft contact shadow. Photorealistic, 16:9, generous empty white space above the truck for text. No text, no logos.
```

### Vídeo (K7 → K8)
```
The drone smoothly descends and orbits from behind the truck to its side, ending in a perfect perpendicular side view at truck height.
The truck exits the curve, straightens, slows down and comes to a gentle stop in full side profile, showing the cab and the tank together.
As it stops, a soft beam of light sweeps along the tank from rear to front. Photorealistic, cinematic, 5 seconds.
```

---

## CENA 5 (opcional) — Arquitetura do tanque: do projeto ao real (≈5–6 s)

Para fechar, ou para usar na seção "Arquitetura do tanque" do site: o wireframe sobre as plantas vira o caminhão real.

**Quadros:** REF-WIRE (início) e REF-MAQUETE (fim). Já existem, não precisa gerar.

### Vídeo (REF-WIRE → REF-MAQUETE)
```
Start: a transparent CAD wireframe of a tanker truck floating on engineering blueprint sheets on a wooden table. End: the finished photorealistic tanker truck model on the same blueprints.
The wireframe materializes into the real truck: first the chassis becomes solid black steel, then the tank fills with glossy white painted steel from the bottom up, the cobalt-blue band appears, and a warm light turns on under the chassis.
Very slow push-in, static composition, elegant architectural visualization, photorealistic, 6 seconds. No text.
```

---

## Montagem final

1. Ordem: **Cena 1 → Cena 2 → Cena 3 → Cena 4** (+ Cena 5 opcional no início ou no fim).
2. Junte os clipes **sem transição de corte**: o último quadro de uma cena é o primeiro da próxima, então emendam sozinhos. Se der "pulo", use um *cross dissolve* de 6 a 10 quadros.
3. Cor: um leve aumento de contraste e saturação deixa tudo igual ao site.
4. Exporte em **MP4 H.264, 1920×1080**, sem áudio para o site (com áudio para redes sociais).

### Para colocar no site
Me mande o MP4 final. Eu otimizo (quadro a quadro, para avançar suave com o scroll) e coloco como `public/img/real/filme-fabrica.mp4`.
O site já está preparado: quando esse arquivo existir, aparece logo depois da cena "A fábrica" uma seção em tela cheia em que **o scroll controla o vídeo**.
A cena 5, se gerada separada, pode virar `arquitetura-agua.mp4` e entra sozinha na prancha de arquitetura do tanque de água.
