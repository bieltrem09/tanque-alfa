// Traço técnico (gerado a partir da foto recortada) usado na animação "do projeto ao real".
// Se não houver traço para a linha, a foto se materializa sozinha.
const comTraco = ["agua", "combustivel", "saneamento", "agricola"];
export const lineartFor = (slug: string) => (comTraco.includes(slug) ? `/img/arquitetura/${slug}-linhas.webp` : null);

// Seção "Arquitetura do tanque" (prancha de projeto animada no scroll).
// Medidas aparecem como cotas com letras (A, B, C) — os valores entram quando o cliente confirmar.
export const arquitetura = {
  label: "Arquitetura do tanque",
  titulo1: "Do cálculo",
  titulo2: "ao aço.",
  intro: "Cada tanque Alfa nasce numa prancha de projeto. Role para ver como ele sai do papel e chega pronto ao chassi.",
  etapas: [
    {
      n: "01",
      titulo: "Projeto",
      texto: "Estudo da operação, cálculo estrutural e desenho técnico de cada peça. Nada vai para o corte antes de estar no papel.",
    },
    {
      n: "02",
      titulo: "Estrutura",
      texto: "O tanque é dimensionado para o chassi do cliente: apoio sobre as longarinas, fixação e distribuição do peso entre os eixos.",
    },
    {
      n: "03",
      titulo: "Componentes",
      texto: "Bocas de visita, quebra-ondas internos, válvulas e acessórios definidos para o produto que vai ser transportado.",
    },
    {
      n: "04",
      titulo: "Fabricação",
      texto: "Corte, calandragem e soldagem feitos pela nossa equipe qualificada, com o tanque montado e fixado no chassi dentro da fábrica.",
    },
    {
      n: "05",
      titulo: "Entrega",
      texto: "Inspeção final, documentação técnica e fabricação certificada pelo INMETRO para produtos perigosos desde 2018.",
    },
  ],
  // posições em % da imagem do caminhão (public/img/real/caminhao-lateral-agua.webp)
  componentes: [
    { n: 1, nome: "Bocas de visita", x: 41, y: 29, lx: 34, ly: 8 },
    { n: 2, nome: "Costado em aço carbono", x: 30, y: 44, lx: 17, ly: 6 },
    { n: 3, nome: "Quebra-ondas internos", x: 59, y: 48, lx: 64, ly: 10 },
    { n: 4, nome: "Válvula de descarga", x: 51, y: 72, lx: 44, ly: 97 },
    { n: 5, nome: "Carretel e bomba", x: 10, y: 45, lx: 12, ly: 97 },
    { n: 6, nome: "Chassi e longarinas", x: 62, y: 76, lx: 72, ly: 97 },
  ],
  cotas: [
    { letra: "A", rotulo: "Comprimento do tanque" },
    { letra: "B", rotulo: "Diâmetro / altura" },
    { letra: "C", rotulo: "Entre-eixos" },
  ],
  carimbo: "Certificação INMETRO · Portaria 16/2016",
};
