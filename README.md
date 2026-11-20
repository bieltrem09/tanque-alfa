# Tanques Alfa — site institucional

Site estático (Next.js 15 + Tailwind v4 + GSAP 3.13 + Lenis) com scroll storytelling.
O build gera a pasta `out/`, que pode ser hospedada em qualquer servidor.

## Rodar no computador

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera /out
```

## Trocar textos

Todo o texto fica em `content/`. Não é preciso mexer nos componentes.

| Arquivo | O que tem |
|---|---|
| `content/site.ts` | contato, menu, hero, cena "A fábrica", números, normas, clientes, atendimento, CTA |
| `content/tanques.ts` | as 5 linhas de produto (gera `/tanques/<slug>/`) |
| `content/empresa.ts` | página `/empresa` (quem somos, missão, valores, certificação) |
| `content/galeria.ts` | legendas (texto alternativo) das fotos |

## Trocar imagens

- Fotos: `public/img/fotos/<nome>.webp`. Para adicionar uma, coloque o arquivo e a legenda em `content/galeria.ts`.
- Recortes sem fundo (hero e produtos): `public/img/recortes/*.webp`. Foram gerados a partir das fotos atuais com remoção de fundo automática.
- Logos de clientes: `public/img/clientes/`.
- Veja `ASSETS.md` para a lista de imagens recomendadas em alta resolução, com prompts de IA.

### Imagens e vídeos reais das cenas animadas

Coloque os arquivos em `public/img/real/` com os nomes de `PROMPTS-IMAGENS.md` (seção 8) e faça o build.
O site **detecta sozinho** o que existe. Cada foto real substitui a ilustração vetorial da sua cena e o que faltar continua como está.
PNG e JPG são convertidos para WebP automaticamente antes do build (`scripts/optimize-real.mjs`).

As fotos atuais foram ampliadas 2× com IA (Real-ESRGAN) para ficarem nítidas. Os recortes sem fundo
e os traços técnicos (`public/img/arquitetura/*-linhas.webp`) foram gerados a partir delas.

## Hospedar

**Vercel:** importe o repositório em vercel.com/new. Ele detecta Next.js e usa `npm run build`; com `output: "export"` o resultado é estático.

**Hostinger / FTP:** rode `npm run build` e envie **o conteúdo** da pasta `out/` para `public_html/`.
As URLs usam barra no final (`/empresa/`), então funcionam sem configuração extra no Apache.

## Pendências [CONFIRMAR] (dados que só o cliente tem)

- CNPJ (`content/site.ts → contato.cnpj`)
- Links de Facebook, Instagram e YouTube (`contato.redes`)
- Capacidade em litros e número de compartimentos de cada linha (`content/tanques.ts → specs`)
- Especificação do revestimento interno do tanque de água potável
- Aplicações da linha agrícola (as fotos usadas são de tanques verdes com canhão; confirmar se são da linha agrícola)
- Texto da Política da Qualidade (`content/empresa.ts → politicaQualidade`)
- Números da faixa "Números": hoje usamos só dados reais (2018, 5 linhas, OCP 0135, Portaria 16/2016). Anos de fábrica, tanques entregues e estados atendidos podem entrar quando o cliente informar.
- Catálogos em PDF para o card "Informações técnicas"

## Estrutura

```
app/                 páginas (/, /tanques/[slug], /empresa, /galeria, /contato, sitemap, robots)
components/sections  Hero, FactoryScene (cena pinada), ProductLine, Numbers, Normas, Clientes, ...
components/ui        Header, Footer, Accordion, SealButton, Marquee, Blueprint, Gallery, ...
content/             todos os textos
lib/gsap.ts          registro único dos plugins GSAP
design-system/       paleta (preview.html, tokens.css) e design system gerado
```

## Acessibilidade e movimento

- `prefers-reduced-motion`: desliga Lenis, a cena pinada, parallax e scroll horizontal, e mostra a versão estática das cenas.
- Auditoria axe-core (WCAG 2.1 A/AA): 0 violações nas 5 páginas.
