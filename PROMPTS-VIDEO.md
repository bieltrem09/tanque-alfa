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

Câmera lateral acompanhando o caminhão (*tracking shot*) na mesma velocidade. O caminhão fica no centro, o chão corre e as rodas giram. O tanque se transforma de uma especialidade para a outra: **água → combustível → saneamento → agrícola**.

### Imagens-chave (4 quadros)

**K1 — água andando** · anexe REF-ÁGUA
```
Use the reference image. Keep exactly the same truck, same tank, same side camera angle, same scale and position.
Place the truck driving on a straight dark asphalt road with a white dashed center line, seen from a perfect side view, the truck facing and moving to the right.
Environment: minimalist infinite pure white ground and soft white sky, high-key lighting, only the road is dark.
Motion: wheels spinning with radial motion blur, slight horizontal motion blur on the road surface and ground, the truck itself sharp.
Photorealistic automotive tracking photography, soft natural shadow under the truck, 16:9. No text, no logos.
```

**K2 — combustível andando** · anexe REF-COMB e K1
```
Use both reference images. Same scene, road, camera and position as the second image (driving shot), but the tank is the yellow fuel tank from the first image. Everything else identical: same cab, chassis, wheels, motion blur, white environment. Photorealistic, 16:9. No text, no logos.
```

**K3 — saneamento andando** · anexe REF-SAN e K1 (mesmo texto do K2, trocando *"yellow fuel tank"* por *"sewer vacuum tank with orange suction hoses"*)

**K4 — agrícola andando** · anexe REF-AGRO e K1 (mesmo texto do K2, trocando por *"dark green agricultural water tank with the red water cannon on top"*)

### Vídeo (3 clipes: K1→K2, K2→K3, K3→K4)
```
Side tracking shot moving at the same speed as the truck, which drives steadily to the right on a straight asphalt road in a minimalist white world.
The camera stays locked on the truck; the road and the white dashed line stream from right to left; the wheels spin realistically.
Midway, a bright line of light sweeps over the tank from the rear to the front and the tank smoothly transforms into the tank of the end frame — the paint, shape and equipment morph cleanly while the cab, chassis and wheels stay exactly the same.
Realistic suspension movement, subtle body vibration, cinematic, photorealistic, smooth, 5 seconds.
```
> Dica: se a IA deformar o caminhão na troca, peça *"the transformation happens like a paint wipe from rear to front"* em vez de *"morph"*.

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
