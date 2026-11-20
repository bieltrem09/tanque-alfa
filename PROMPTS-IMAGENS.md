# Prompts para gerar as imagens e o vídeo reais — Tanques Alfa

Este guia gera **fotos realistas** (não 3D) do caminhão e dos tanques da Alfa para as cenas animadas do site.
Os prompts estão em inglês porque os geradores entendem melhor. As explicações estão em português.

**Ferramentas sugeridas**
- Imagem: **Nano Banana (Gemini 2.5 Flash Image)**. Ele aceita imagem de referência e edita mantendo o mesmo caminhão, o que é essencial aqui. Também servem Midjourney v7 (`--style raw`) ou Flux.
- Vídeo: **Kling 2.x** ou **Veo 3**, no modo "primeiro e último quadro" (start/end frame).

---

## 0. Regras de consistência (leia antes)

Todas as cenas precisam mostrar **o mesmo caminhão**, com a mesma câmera. O fluxo que garante isso:

1. Gere primeiro a **imagem-mestra** (item 1). Ela define o caminhão da Alfa.
2. Todas as outras imagens saem **editando a imagem-mestra** no Nano Banana ("use this image as reference, keep the exact same truck…"). Não gere do zero.
3. Câmera sempre **ortográfica lateral, caminhão virado para a DIREITA**, cabine à direita (igual às cenas do site), exceto a vista de cima.
4. **Logo:** geradores de imagem erram texto. Gere **sem texto** e aplique o logo da Alfa depois no Photoshop, Canva ou Photopea (arquivo `public/img/logo-alfa.png`). Outra opção é anexar o logo no Nano Banana e pedir: *"apply this logo on the tank side, flat decal, centered"*.
5. **Pintura padrão Alfa (proposta):** tanque em aço pintado de branco gelo, faixa horizontal **azul cobalto (#061CE0)** e friso **amarelo (#FFC400)**, para casar com o site. Se a Alfa já tem uma pintura padrão, troque as cores no prompt.
6. **Referências do concorrente:** use as imagens enviadas (caminhões com a cabine em desenho de traço) só como **referência de estilo**. Não anexe essas imagens no gerador, para não copiar o equipamento de outro fabricante.

**Tamanho de saída:** 2400 px de largura ou mais, PNG. Quando o prompt pede fundo transparente e o gerador não entrega, gere em **cinza liso #BFC2C6**. Eu recorto o fundo aqui com IA.

---

## 1. Imagem-mestra — caminhão-tanque Alfa completo (vista lateral)

**Arquivo:** `public/img/real/caminhao-lateral-agua.png` · 2400×1200 · fundo transparente ou cinza liso

```
Photorealistic product photograph of a Brazilian heavy-duty rigid tanker truck, 6x4, perfect orthographic side view, truck facing right, cab on the right side.
Modern white cab-over-style heavy truck cab (no brand logos), black chassis, chrome hub caps, new black tires.
Mounted on the chassis: a long cylindrical carbon-steel road tank, glossy ice-white paint, one horizontal cobalt-blue band (#061CE0) along the lower third with a thin yellow pinstripe (#FFC400), top walkway with yellow safety handrails, three round manhole covers on top, rear access ladder, rear bumper with red reflective stripes, side tool box, discharge valves under the tank.
Clean studio lighting, soft even light, subtle reflections on the paint, sharp details, 85mm product photography look, no perspective distortion, centered, full truck visible with margin.
Plain seamless light gray background #BFC2C6, soft contact shadow under the wheels. No text, no logos, no people.
```

> Opcional, no estilo das referências (cabine em desenho de traço): acrescente
> `The truck cab is rendered as a clean technical line drawing (thin dark gray outlines on transparent, blueprint style) while the tank and chassis remain photorealistic.`
> Essa versão é ótima para as páginas de produto (item 6).

---

## 2. Cena "Fabricação própria" — o tanque descendo no chassi

Três camadas separadas, **na mesma escala da imagem-mestra**. O site monta a animação: a ponte rolante desce o tanque e o encaixa no chassi.

### 2a. Chassi sem o tanque
**Arquivo:** `public/img/real/chassi.png` · fundo transparente
```
Use the reference image. Keep exactly the same truck, same camera, same scale and position.
Remove the tank completely: show only the cab and the empty bare chassis frame (black steel rails, cross members, mounting brackets, fenders, wheels).
Photorealistic, same studio lighting. Plain light gray background #BFC2C6. No text.
```

### 2b. Só o corpo do tanque (suspenso)
**Arquivo:** `public/img/real/tanque-corpo.png` · fundo transparente
```
Use the reference image. Isolate ONLY the tank body (cylinder, top walkway, yellow handrails, manholes, ladder, valves), exactly the same size and side view, without truck or chassis.
Add two steel lifting lugs on top of the tank and two steel wire-rope slings going up from the lugs and meeting at a yellow crane hook block above the tank.
Photorealistic, same studio light, plain light gray background #BFC2C6. No text.
```

### 2c. Ponte rolante (viga e carro)
**Arquivo:** `public/img/real/ponte-rolante.png` · 3000×500 · fundo transparente
```
Photorealistic industrial overhead bridge crane seen from the side, long horizontal yellow steel I-beam spanning the full image width with black-and-yellow hazard stripes on the edge, a dark gray hoist trolley in the center with a steel wire rope hanging down.
Factory studio lighting, sharp, clean, plain light gray background #BFC2C6, no background building. No text.
```

---

## 3. Cena "Nossos tanques" — caminhão andando + troca de tanques

Cinco versões do **mesmo caminhão**, idênticas em posição, mudando apenas o tanque. O site troca uma pela outra em fade enquanto as colunas de produto passam.

**Arquivos:** `public/img/real/caminhao-lateral-<linha>.png` com `<linha>` = `agua`, `combustivel`, `estacionario`, `saneamento`, `agricola`

Prompt base (edição da imagem-mestra):
```
Use the reference image. Keep exactly the same truck cab, chassis, wheels, camera angle, scale and position — pixel-aligned. Replace ONLY the body on the chassis with: [DESCRIÇÃO DA LINHA]. Photorealistic, same studio light, plain light gray background #BFC2C6. No text, no logos.
```

| Linha | [DESCRIÇÃO DA LINHA] |
|---|---|
| combustível | `a compartmented fuel tank, elliptical cross-section, glossy yellow paint (#FFC400) with a cobalt-blue band, bottom-loading valves and discharge manifold under the tank, hazard placard holders, top walkway with handrails` |
| água | (é a imagem-mestra) |
| estacionário | `a fuel delivery body with a horizontal stationary-style tank, fuel pump, meter, hose reel and filter mounted at the rear, ice-white tank with cobalt-blue band` |
| saneamento | `a vacuum sewer tank: thick cylindrical tank with reinforcing rings, large rear hinged discharge door, vacuum pump, orange suction hoses along the side, white paint with dark green band` |
| agrícola | `a water tank for agriculture painted dark green with a yellow pinstripe, top walkway with yellow handrails and a red water cannon on top at the front` |

**Movimento:** o site já anima o caminhão andando (asfalto correndo e leve balanço). As imagens podem ser estáticas.

---

## 4. Cena da estrada vista de cima

**Arquivo:** `public/img/real/caminhao-topo.png` · 2000×700 · fundo transparente
**Importante:** caminhão apontando para a **DIREITA** (frente/cabine à direita). O site gira a imagem para acompanhar a curva.
```
Photorealistic top-down orthographic view (drone shot straight down, 90°) of the same tanker truck from the reference image, truck pointing to the right, cab on the right.
Visible from above: white cab roof, long cylindrical ice-white tank with cobalt-blue band on the sides, three round manhole covers, yellow walkway handrails along the top, mirrors, wheels slightly visible.
Isolated, no road, plain light gray background #BFC2C6, soft shadow directly below. Sharp, studio quality. No text.
```

Opcional, a estrada real em vez do desenho:
`public/img/real/estrada-curva.jpg` · 1920×1200
```
Top-down drone photograph of a single empty dark asphalt road with a smooth S-curve, white dashed center line, surrounded by clean pure white ground (high-key, overexposed white background), minimalist, no vehicles, no trees.
```

---

## 5. Mergulho no líquido (água)

**Arquivo:** `public/img/real/agua-loop.mp4` · 1920×1080 · 6 s em loop · menos de 4 MB
```
Top-down view of crystal-clear bright blue water surface with gentle ripples and caustic light patterns, seamless loop, calm, no objects, 4K, realistic.
```

---

## 6. Páginas de produto — estilo das referências (corpo real, cabine em traço)

**Arquivos:** `public/img/real/produto-<linha>.png` · 2400×1500 · fundo degradê cinza
```
Use the reference image. Same truck and tank, perfect side view facing right.
Render the cab as a clean technical line drawing (thin dark gray outlines, transparent fill, blueprint style), while the tank, chassis, wheels and equipment stay fully photorealistic with sharp details.
Background: smooth studio gradient from medium gray (#8E9197) at the top to light gray (#C9CCD0), with a soft floor shadow under the wheels. Product catalog photography. No text, no logos.
```
Troque o corpo do tanque conforme a tabela do item 3.

---

## 7. VÍDEO — "Arquitetura do tanque" (do projeto ao real)

Mesmo conceito do vídeo de referência da casa: a maquete começa como **desenho técnico em wireframe sobre plantas** e se materializa até virar o **tanque real**. No site, o vídeo avança conforme o scroll, na seção de desenho técnico de cada linha.

### Passo 1: quadro final (gere primeiro)
**Arquivo:** `arquitetura-fim.png` · 1920×1080
```
Photorealistic scale model of a white tanker truck with a cylindrical ice-white tank and cobalt-blue band, yellow walkway handrails, standing on top of large white architectural/engineering blueprint sheets spread on a table, technical drawings of tanks and cross-sections printed in black lines on the paper.
Camera: three-quarter elevated view, 35°, slightly from the front-right. Soft gray studio background, warm subtle LED strip light under the chassis, shallow depth of field, high-end product photography. No text.
```

### Passo 2: quadro inicial (edite o quadro final)
**Arquivo:** `arquitetura-inicio.png`
```
Use the reference image. Same camera, same composition, same blueprint sheets.
Replace the truck with a transparent technical wireframe of the exact same truck and tank: thin dark gray construction lines, visible internal baffles (wave breakers) inside the tank, compartment walls, chassis frame lines, dimension lines — like a CAD wireframe drawn in the air above the blueprints. No colors, no materials. No text.
```

### Passo 3: vídeo (Kling / Veo com start + end frame)
```
Start frame: wireframe CAD drawing of a tanker truck on blueprint sheets. End frame: the finished photorealistic tanker truck model on the same blueprints.
The wireframe gradually materializes into the real truck: first the chassis frame becomes solid black steel, then the tank cylinder fills in with white painted steel from the bottom up, internal baffles disappear behind the surface, the blue band and yellow handrails appear, warm light turns on under the chassis.
Static camera with a very slow push-in. Smooth, elegant, architectural visualization style. 8 seconds. No text.
```

**Depois de gerar:** me mande o MP4. Eu converto para um formato que avança quadro a quadro no scroll (todos os quadros-chave, ~1600 px, sem áudio) e coloco no site. Se quiser fazer sozinho:
```bash
ffmpeg -i tanque-arquitetura.mp4 -an -vf scale=1600:-2 -c:v libx264 -preset slow -crf 23 -g 1 -pix_fmt yuv420p -movflags +faststart public/img/real/arquitetura-<linha>.mp4
```

Repita o vídeo para cada linha (troque o tanque no prompt do item 3), ou gere um só para todas.

---

## 8. Onde cada arquivo entra no site

Coloque os arquivos em `public/img/real/` com os nomes acima. **O site detecta sozinho** quais existem no build:
o que existir substitui a ilustração vetorial e o que faltar continua com a versão atual. Não precisa mexer em código.

| Arquivo | Cena |
|---|---|
| `ponte-rolante.png`, `tanque-corpo.png`, `chassi.png` | Fabricação própria (tanque descendo) — precisa dos 3 |
| `caminhao-lateral-<linha>.png` (5) | Horizonte, "Nossos tanques" e troca de tanques |
| `caminhao-topo.png` | Estrada vista de cima (curvas) |
| `agua-loop.mp4` | Mergulho no líquido |
| `arquitetura-<linha>.mp4` ou `arquitetura.mp4` | Seção de desenho técnico (vídeo no scroll) |
| `produto-<linha>.png` | Foto principal das páginas de produto |
