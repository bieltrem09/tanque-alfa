// Linhas de produto. Cada item gera uma página em /tanques/<slug>/.
// Números técnicos ficam como [CONFIRMAR] até o cliente enviar as fichas.

export type Tanque = {
  slug: string;
  nome: string;
  curto: string;
  liquido: "agua" | "combustivel" | "saneamento" | "agricola" | "estacionario";
  cor: string; // cor das gotas/acentos da página
  recorte: string; // PNG/WebP sem fundo
  resumo: string;
  descricao: string[];
  vantagens: { titulo: string; texto: string }[];
  aplicacoes: string[];
  specs: { valor: string; rotulo: string }[];
  galeria: string[];
};

export const tanques: Tanque[] = [
  {
    slug: "agua",
    nome: "Tanque de Água",
    curto: "Água",
    liquido: "agua",
    cor: "#22E6FF",
    recorte: "/img/recortes/agua.webp",
    resumo: "Caminhão-pipa e tanques para água potável e água bruta, com acabamento que preserva o produto.",
    descricao: [
      "Os tanques de água da Alfa atendem desde o abastecimento de água potável em comunidades até a aspersão em obras, mineração e controle de poeira.",
      "Cada projeto considera o chassi, o tipo de água e a forma de descarga: por gravidade, bomba, canhão ou barra de aspersão. O resultado é um equipamento estável na estrada e simples de operar no dia a dia.",
    ],
    vantagens: [
      { titulo: "Água preservada", texto: "Tratamento interno adequado ao uso, incluindo água potável, para manter a qualidade do produto transportado. [CONFIRMAR especificação do revestimento]" },
      { titulo: "Quebra-ondas internos", texto: "Divisões internas reduzem o movimento do líquido nas frenagens e curvas, dando mais estabilidade ao caminhão." },
      { titulo: "Descarga do seu jeito", texto: "Saídas por gravidade, bomba, canhão de água ou barra de aspersão, definidas no projeto." },
      { titulo: "Acesso seguro", texto: "Passarela, guarda-corpo e escada para inspeção e abastecimento pelo topo." },
    ],
    aplicacoes: ["Abastecimento de água potável", "Obras e terraplanagem", "Mineração e controle de poeira", "Combate a incêndio e apoio a prefeituras"],
    specs: [
      { valor: "[CONFIRMAR]", rotulo: "Litros — capacidade" },
      { valor: "[CONFIRMAR]", rotulo: "Compartimentos" },
    ],
    galeria: ["tanques_agua2", "tanques_agua3", "tanques_agua4", "tanques_agua5", "agua4", "agua5"],
  },
  {
    slug: "combustivel",
    nome: "Tanque de Combustível",
    curto: "Combustível",
    liquido: "combustivel",
    cor: "#FF9A1F",
    recorte: "/img/recortes/combustivel.webp",
    resumo: "Tanques compartimentados para transporte de combustíveis e óleos, certificados para produtos perigosos.",
    descricao: [
      "Transportar combustível exige um equipamento que não deixa margem para erro. Por isso os tanques de combustível da Alfa são fabricados conforme a certificação INMETRO para produtos perigosos, com controle de soldas e materiais em todas as etapas.",
      "A compartimentação é definida junto com você, de acordo com os produtos e as rotas de entrega. Válvulas, bocais, conjunto de descarga e acessórios de segurança completam o equipamento.",
    ],
    vantagens: [
      { titulo: "Compartimentação", texto: "Vários produtos em uma única viagem, com compartimentos dimensionados para a sua rota." },
      { titulo: "Segurança para produto perigoso", texto: "Válvulas de fundo, respiros e dispositivos de segurança conforme a regulamentação." },
      { titulo: "Conformidade INMETRO", texto: "Fabricação certificada desde 2018, com registro nº 002462/2019." },
      { titulo: "Durabilidade", texto: "Estrutura em aço carbono e pintura de alta resistência para anos de estrada." },
    ],
    aplicacoes: ["Distribuição de combustíveis", "Abastecimento de frotas", "Transporte de óleos e lubrificantes", "Comboio para obras e mineração"],
    specs: [
      { valor: "[CONFIRMAR]", rotulo: "Litros — capacidade" },
      { valor: "[CONFIRMAR]", rotulo: "Compartimentos" },
    ],
    galeria: ["tanques_combustivel2", "tanques_combustivel3", "tanques_combustivel4", "tanques_combustivel5", "combustivel01", "combustivel02", "combustivel04", "combustivel05", "combustivel06", "combustivel07", "combustivel09", "combustivel10", "oleo01", "oleo02", "oleo4"],
  },
  {
    slug: "estacionario",
    nome: "Tanque Estacionário",
    curto: "Estacionário",
    liquido: "estacionario",
    cor: "#C9CED6",
    recorte: "/img/fotos/tanques_estacionario1.webp",
    resumo: "Armazenagem fixa de combustível e líquidos em fazendas, obras, garagens e indústrias.",
    descricao: [
      "Para quem precisa de combustível ou água sempre à mão, o tanque estacionário é a solução. Ele é fabricado sob medida para o volume de consumo e para o espaço disponível.",
      "Pode sair com bomba, medidor, filtro e mangueira já instalados, pronto para abastecer máquinas e veículos no próprio local.",
    ],
    vantagens: [
      { titulo: "Pronto para abastecer", texto: "Bomba, medidor, filtro e mangueira integrados ao conjunto." },
      { titulo: "Dimensionado para o seu consumo", texto: "Volume e formato definidos pela sua demanda e pelo espaço disponível." },
      { titulo: "Robustez", texto: "Construção em aço carbono com acabamento para uso externo." },
      { titulo: "Fácil manutenção", texto: "Acesso a bocais e componentes para inspeção e limpeza." },
    ],
    aplicacoes: ["Fazendas e agronegócio", "Canteiros de obra", "Garagens de frota", "Indústrias e geradores"],
    specs: [
      { valor: "[CONFIRMAR]", rotulo: "Litros — capacidade" },
      { valor: "[CONFIRMAR]", rotulo: "Compartimentos" },
    ],
    galeria: ["tanques_estacionario1", "tanques_estacionario2", "tanques_estacionario3", "tanques_estacionario4", "estacionario2"],
  },
  {
    slug: "saneamento",
    nome: "Tanque de Saneamento",
    curto: "Saneamento",
    liquido: "saneamento",
    cor: "#3FA36B",
    recorte: "/img/recortes/saneamento.webp",
    resumo: "Equipamentos de vácuo e sucção para limpeza de fossas, redes de esgoto e efluentes.",
    descricao: [
      "Os tanques de saneamento da Alfa são feitos para trabalho pesado: sucção de fossas, desobstrução de redes e transporte de efluentes com segurança para a equipe e para o meio ambiente.",
      "O conjunto inclui tanque reforçado, sistema de vácuo, mangotes e tampa traseira de descarga, tudo integrado ao chassi.",
    ],
    vantagens: [
      { titulo: "Estrutura reforçada", texto: "Tanque dimensionado para trabalhar sob vácuo, com reforços estruturais." },
      { titulo: "Sucção eficiente", texto: "Conjunto de vácuo, mangotes e válvulas especificados para a sua aplicação." },
      { titulo: "Descarga rápida", texto: "Tampa traseira com abertura ampla para esvaziamento e limpeza." },
      { titulo: "Operação segura", texto: "Comandos acessíveis e acessórios de proteção para o operador." },
    ],
    aplicacoes: ["Limpeza de fossas sépticas", "Desobstrução de redes de esgoto", "Transporte de efluentes", "Serviços para prefeituras e concessionárias"],
    specs: [
      { valor: "[CONFIRMAR]", rotulo: "Litros — capacidade" },
      { valor: "[CONFIRMAR]", rotulo: "Compartimentos" },
    ],
    galeria: ["tanques_saneamento1", "tanques_saneamento2", "tanques_saneamento3", "saneamento1"],
  },
  {
    slug: "agricola",
    nome: "Tanque Agrícola",
    curto: "Agrícola",
    liquido: "agricola",
    cor: "#8BD44A",
    recorte: "/img/recortes/agricola.webp",
    resumo: "Tanques para irrigação, apoio à lavoura e abastecimento no campo.",
    descricao: [
      "No campo, o tanque precisa aguentar estrada de terra e jornada longa. A linha agrícola da Alfa leva água e insumos líquidos até onde a operação acontece.",
      "Pode receber canhão de irrigação, bomba e passarela de acesso, conforme o uso na propriedade. [CONFIRMAR aplicações com o cliente]",
    ],
    vantagens: [
      { titulo: "Feito para o campo", texto: "Estrutura reforçada para rodar em estrada de terra e terreno irregular." },
      { titulo: "Irrigação e aspersão", texto: "Canhão e saídas de água posicionados para a sua operação." },
      { titulo: "Acesso pelo topo", texto: "Passarela com guarda-corpo para abastecimento e inspeção." },
      { titulo: "Projeto sob medida", texto: "Volume e acessórios definidos para o seu chassi e a sua lavoura." },
    ],
    aplicacoes: ["Irrigação", "Abastecimento de água no campo", "Apoio a pulverização", "Combate a incêndio rural"],
    specs: [
      { valor: "[CONFIRMAR]", rotulo: "Litros — capacidade" },
      { valor: "[CONFIRMAR]", rotulo: "Compartimentos" },
    ],
    galeria: ["agua01", "agua03"],
  },
];

export const getTanque = (slug: string) => tanques.find((t) => t.slug === slug);
